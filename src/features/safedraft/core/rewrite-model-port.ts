export type RewriteModelRequest = {
  prompt: string;
};

export type RewriteModelResponse = {
  raw_output: string;
  provider: string;
  model_id: string;
  latency_ms: number;
  estimated_cost_usd: number;
};

export type RewriteModelPort = {
  rewrite(request: RewriteModelRequest): Promise<RewriteModelResponse>;
};
