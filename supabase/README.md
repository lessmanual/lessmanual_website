# Supabase Setup Instructions

## Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New project"
3. Choose:
   - **Name:** lessmanual-website
   - **Database Password:** [Strong password]
   - **Region:** Europe (Frankfurt) - for RODO compliance
   - **Plan:** Free tier (upgrade to Pro when >50k rows)

### 2. Run Migration

1. Open Supabase Dashboard → SQL Editor
2. Copy entire contents of `migrations/001_initial_schema.sql`
3. Paste into SQL Editor
4. Click "Run"
5. Verify tables created: `contacts`, `roi_calculations`, `chatbot_conversations`

### 3. Get API Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ SECRET - never expose to client)

### 4. Update Environment Variables

Edit `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci... (your anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (your service role key)
```

### 5. Test Connection

```bash
npm run dev
```

Then test in browser console:
```javascript
import { supabase } from '@/lib/supabase'

// Test insert (should work due to RLS policy)
const { data, error } = await supabase
  .from('contacts')
  .insert({
    name: 'Test User',
    email: 'test@example.com',
    source: 'test',
  })
  .select()

console.log({ data, error })
```

## Database Schema

### Table: `contacts`
**Purpose:** Contact form submissions

**Columns:**
- `id` (UUID, PK) - Auto-generated
- `created_at` (TIMESTAMPTZ) - Auto-generated
- `name` (TEXT, required)
- `email` (TEXT, required, validated)
- `phone` (TEXT, optional)
- `company` (TEXT, optional)
- `industry` (TEXT, optional) - One of: e-commerce, gabinet, agencja, uslugi_b2b, inne
- `message` (TEXT, optional)
- `source` (TEXT, default: 'website_form')
- `status` (TEXT, default: 'new') - One of: new, contacted, qualified, demo_scheduled, lost
- `hot_lead_score` (INT, 1-10) - Auto-calculated based on criteria

**Indexes:**
- created_at DESC
- status
- email
- hot_lead_score DESC

**RLS:**
- ✅ Public inserts (anon role)
- ✅ Authenticated reads only

---

### Table: `roi_calculations`
**Purpose:** ROI calculator usage tracking

**Columns:**
- `id` (UUID, PK)
- `created_at` (TIMESTAMPTZ)
- `email` (TEXT, optional, validated)
- `specialization` (TEXT, required) - One of: obsluga_klienta, lead_gen, content
- `hours_per_month` (INT, required, 0-1000)
- `hourly_rate` (INT, required, 0-10000)
- `potential_savings` (INT, required) - Calculated: (hours_per_month * hourly_rate) - 800
- `hot_lead_score` (INT, 1-10) - **Auto-calculated via trigger:**
  - ≥5000 PLN savings → 9
  - 3000-5000 PLN → 7
  - <3000 PLN → 5

**Triggers:**
- `before_roi_insert` - Auto-calculates hot_lead_score

---

### Table: `chatbot_conversations`
**Purpose:** Chatbot conversation logs

**Columns:**
- `id` (UUID, PK)
- `created_at` (TIMESTAMPTZ)
- `session_id` (UUID, required) - Groups messages by conversation
- `messages` (JSONB[], required) - Array of `{role, content, timestamp}`
- `specialization` (TEXT, optional) - User's interest
- `queries_per_day` (TEXT, optional) - One of: <50, 50-200, 200+, nie_wiem
- `budget` (TEXT, optional) - One of: 3-5k, 5-10k, 10k+, chce_dowiedziec_sie_wiecej
- `outcome` (TEXT, optional) - One of: demo_requested, email_sent, abandoned
- `email` (TEXT, optional, validated)
- `phone` (TEXT, optional)
- `hot_lead_score` (INT, 1-10) - **Auto-calculated via trigger:**
  - 200+ queries + 5-10k budget → 10
  - Budget-based scoring (3-5k: +1, 5-10k: +2, 10k+: +3)
  - Queries-based scoring (50-200: +1, 200+: +2)

**Triggers:**
- `before_chatbot_insert` - Auto-calculates hot_lead_score

---

## Row Level Security (RLS)

All tables have RLS enabled with these policies:

**Public (anon role):**
- ✅ INSERT only (form submissions, calculator, chatbot)
- ❌ SELECT, UPDATE, DELETE blocked

**Authenticated role:**
- ✅ SELECT (read-only access for future admin dashboard)

**Service role:**
- ✅ Full access (via `supabaseAdmin()` in API routes)

---

## Usage Examples

### Insert Contact Form Submission

```typescript
import { supabase } from '@/lib/supabase'

const { data, error } = await supabase
  .from('contacts')
  .insert({
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    phone: '+48 123 456 789',
    company: 'Example Sp. z o.o.',
    industry: 'e-commerce',
    message: 'Interested in ChatBot for customer support',
    source: 'website_form',
  })
  .select()
  .single()

if (error) {
  console.error('Error inserting contact:', error)
} else {
  console.log('Contact created:', data)
  // Hot lead score is auto-calculated
}
```

### Insert ROI Calculation

```typescript
const hours = 40 // hours per month
const rate = 150 // PLN per hour
const savings = (hours * rate) - 800 // Cost of automation

const { data, error } = await supabase
  .from('roi_calculations')
  .insert({
    email: 'jan@example.com',
    specialization: 'obsluga_klienta',
    hours_per_month: hours,
    hourly_rate: rate,
    potential_savings: savings,
  })
  .select()
  .single()

// Hot lead score is auto-calculated based on savings
console.log('ROI calculation hot lead score:', data.hot_lead_score)
```

### Insert Chatbot Conversation

```typescript
const sessionId = crypto.randomUUID()

const { data, error } = await supabase
  .from('chatbot_conversations')
  .insert({
    session_id: sessionId,
    messages: [
      { role: 'assistant', content: 'Cześć! W czym mogę pomóc?', timestamp: new Date().toISOString() },
      { role: 'user', content: 'Interested in automation', timestamp: new Date().toISOString() },
    ],
    specialization: 'obsluga_klienta',
    queries_per_day: '200+',
    budget: '5-10k',
    email: 'jan@example.com',
    outcome: 'demo_requested',
  })
  .select()
  .single()

// Hot lead score is auto-calculated: 200+ queries + 5-10k budget = score 10
console.log('Chatbot hot lead score:', data.hot_lead_score)
```

---

## Troubleshooting

### Error: "Missing Supabase environment variables"

**Solution:** Ensure `.env.local` has valid credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Error: "new row violates row-level security policy"

**Solution:** Check RLS policies are enabled. Run in SQL Editor:
```sql
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';
```

Should show policies for all 3 tables.

### Error: "relation does not exist"

**Solution:** Migration not run. Go to SQL Editor and run `001_initial_schema.sql`.

---

## Next Steps

1. ✅ Run migration in Supabase
2. ✅ Add credentials to `.env.local`
3. ✅ Test connection with `npm run dev`
4. ⏭️ Build contact form (Task 12)
5. ⏭️ Build ROI calculator (Task 9)
6. ⏭️ Build chatbot (Task 14-15)
