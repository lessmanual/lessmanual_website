-- LessManual rate limits for /api/generate-email (3 reqs per 24h per identifier)
-- Atomic upsert via RPC to avoid race conditions

CREATE TABLE IF NOT EXISTS public.lessmanual_rate_limits (
  identifier TEXT PRIMARY KEY,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for cleanup (stale windows)
CREATE INDEX IF NOT EXISTS idx_lessmanual_rate_limits_window
  ON public.lessmanual_rate_limits (window_start);

-- RLS: service_role only (API route uses service role)
ALTER TABLE public.lessmanual_rate_limits ENABLE ROW LEVEL SECURITY;

-- Note: service_role bypasses RLS by default. No policies needed for service-role-only access.

-- RPC: atomic check-and-increment rate limit
-- Returns JSON: { allowed: bool, remaining: int, reset_at: timestamptz }
CREATE OR REPLACE FUNCTION public.check_and_increment_rate_limit(
  p_identifier TEXT,
  p_window_seconds INTEGER,
  p_max INTEGER
) RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row public.lessmanual_rate_limits%ROWTYPE;
  v_result JSON;
BEGIN
  -- Upsert + lock row for update
  INSERT INTO public.lessmanual_rate_limits (identifier, window_start, count, updated_at)
  VALUES (p_identifier, now(), 0, now())
  ON CONFLICT (identifier) DO NOTHING;

  -- Re-fetch with row lock
  SELECT * INTO v_row
  FROM public.lessmanual_rate_limits
  WHERE identifier = p_identifier
  FOR UPDATE;

  -- Check if window expired -> reset
  IF v_row.window_start < now() - (p_window_seconds || ' seconds')::INTERVAL THEN
    UPDATE public.lessmanual_rate_limits
    SET window_start = now(), count = 0, updated_at = now()
    WHERE identifier = p_identifier;
    v_row.window_start := now();
    v_row.count := 0;
  END IF;

  -- Check limit
  IF v_row.count >= p_max THEN
    v_result := json_build_object(
      'allowed', false,
      'remaining', 0,
      'reset_at', v_row.window_start + (p_window_seconds || ' seconds')::INTERVAL
    );
  ELSE
    -- Increment
    UPDATE public.lessmanual_rate_limits
    SET count = count + 1, updated_at = now()
    WHERE identifier = p_identifier;

    v_result := json_build_object(
      'allowed', true,
      'remaining', p_max - (v_row.count + 1),
      'reset_at', v_row.window_start + (p_window_seconds || ' seconds')::INTERVAL
    );
  END IF;

  RETURN v_result;
END;
$$;

-- Grant execute to service_role (explicit, though service_role has it by default)
GRANT EXECUTE ON FUNCTION public.check_and_increment_rate_limit(TEXT, INTEGER, INTEGER) TO service_role;
