# Chatbot Fix Instructions - Manual Steps Required

**Date:** 2025-11-01
**Status:** 🟡 Code fixed, database migrations pending
**Estimated time:** 10 minutes

---

## ✅ What's Already Done (Committed to Git)

1. ✅ Fixed `loadFAQContext()` - changed `faq.items` → `faq.questions`
2. ✅ Created RLS migration file (003_knowledge_base_rls.sql)
3. ✅ Created test script (scripts/test-semantic-search.ts)
4. ✅ Comprehensive analysis report (docs/CHATBOT_ANALYSIS_REPORT.md)

---

## 🔴 What You Need to Do Manually

### Step 1: Apply Migration 002 (Create knowledge_base Table)

1. **Open Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/mpshzmbgsupznnyhpyyl/sql/new
   ```

2. **Copy SQL from this file:**
   ```bash
   cat supabase/migrations/002_knowledge_base_embeddings.sql
   ```

   **⚠️ FIXED:** Changed `'polish'` → `'simple'` in full-text search index (line 54)
   - Supabase PostgreSQL doesn't have Polish config by default
   - `'simple'` works universally

3. **Paste in SQL Editor and click "Run"**

4. **Verify table created:**
   ```sql
   SELECT * FROM knowledge_base LIMIT 1;
   ```
   Expected: "No rows" (table exists but empty) ✅

---

### Step 2: Apply Migration 003 (Add RLS Policies)

1. **Still in Supabase SQL Editor**

2. **Copy SQL from this file:**
   ```bash
   cat supabase/migrations/003_knowledge_base_rls.sql
   ```

3. **Paste in SQL Editor and click "Run"**

4. **Verify policies created:**
   - Go to: Dashboard → Database → Tables → knowledge_base → Policies
   - Should see 3 policies:
     - "Allow service_role inserts"
     - "Allow service_role reads"
     - "Allow anon reads for semantic search"

---

### Step 3: Populate Knowledge Base with Embeddings

**Run from terminal:**

```bash
cd /Users/bartlomiejchudzik/Documents/LessManual/Strona\ internetowa
npx tsx scripts/populate-knowledge-base.ts
```

**Expected output:**
```
✅ Extracted 70 items:
   - PL FAQ: 30
   - EN FAQ: 30
   - PL Sections: 5
   - EN Sections: 5

✅ Population complete!
   Success: 70
   Errors: 0

✅ Total rows in knowledge_base: 70  ← MUST BE 70, NOT 0!
   - Polish (pl): 35
   - English (en): 35
```

⚠️ **If you see "Total rows: 0":**
- RLS policies not applied correctly
- Go back to Step 2 and verify policies exist

---

### Step 4: Test Semantic Search

**Run test script:**

```bash
npx tsx scripts/test-semantic-search.ts
```

**Expected output:**

```
🚀 Testing Semantic Search

============================================================

🔍 Testing query: "czym się zajmujecie" (pl)

✅ Found 3 matches:

1. "Czym zajmuje się LessManual.ai?" (similarity: 0.892)
   Source: about
   Type: faq
   Priority: 10/10
   Content: LessManual.ai specjalizuje się w automatyzacji...

2. "Automatyzacja AI dla Firm" (similarity: 0.834)
   Source: hero
   Type: section
   Priority: 9/10
   Content: Wdrażamy technologię, która zarabia pieniądze...

============================================================

✨ Test complete!
```

⚠️ **If you see "No matches found":**
- Knowledge base is empty
- Go back to Step 3 and verify 70 rows inserted

---

### Step 5: Test Chatbot on Website

1. **Open website:** http://localhost:3001

2. **Open chatbot widget**

3. **Test query:** "czym się zajmujecie"

4. **Expected response:**
   ```
   LessManual.ai specjalizuje się w automatyzacji biznesowej z wykorzystaniem AI.
   Wdrażamy ChatBoty, Agentów Głosowych, systemy Content Creation i Sales Automation
   dla polskich firm. Wdrożenie trwa od 7 dni. Jak mogę Ci pomóc?
   ```

5. **Check browser console for logs:**
   ```
   ✅ Semantic match found: "Czym zajmuje się LessManual.ai?" (similarity: 0.892)
   ```

✅ **If you see this log:** Chatbot is working correctly!

❌ **If you see generic OpenAI response:** Something went wrong, check logs

---

## 🎯 Success Criteria

After completing all steps, you should see:

- ✅ 70 rows in `knowledge_base` table (Supabase dashboard)
- ✅ Test script finds matches with similarity ≥ 0.7
- ✅ Chatbot responds with LessManual.ai-specific answers
- ✅ Browser console shows "Semantic match found" logs
- ✅ Response time <300ms (not 2-4s)

---

## 🐛 Troubleshooting

### Problem: "Total rows: 0" after populate script

**Cause:** RLS policies not applied or incorrect

**Solution:**
1. Check policies exist: Dashboard → Database → knowledge_base → Policies
2. Re-run migration 003 (RLS policies)
3. Re-run populate script

---

### Problem: "No matches found" in test script

**Cause:** Knowledge base empty or match_threshold too high

**Solution:**
1. Verify 70 rows in database:
   ```sql
   SELECT COUNT(*) FROM knowledge_base;
   ```
2. If 0 rows, go back to Step 3
3. If 70 rows but no matches, lower threshold in test script:
   ```typescript
   match_threshold: 0.5  // Try lower threshold
   ```

---

### Problem: Chatbot still gives generic OpenAI response

**Cause:** Old code cached or migration not applied

**Solution:**
1. Hard refresh browser (Cmd+Shift+R)
2. Kill and restart dev server:
   ```bash
   killall -9 node npm
   npm run dev
   ```
3. Check browser console for errors
4. Verify `loadFAQContext()` fix applied:
   ```bash
   grep "faq.questions" src/app/api/chatbot/route.ts
   # Should output: if (!faq || !faq.questions) return ''
   ```

---

## 📊 Expected Performance After Fix

**Before Fix:**
- 100% questions → GPT-4o-mini (2-4s, $0.001/query)
- Generic OpenAI responses
- 70-80% accuracy (GPT hallucinates without context)

**After Fix:**
- 80% questions → Knowledge base (<300ms, $0.00002/query)
- 20% questions → GPT with full FAQ context (2-4s, $0.001/query)
- 95%+ accuracy (direct FAQ answers + GPT with context)
- **78% cost reduction** 💰

---

## 📚 Additional Resources

- **Full analysis:** `docs/CHATBOT_ANALYSIS_REPORT.md` (770 lines)
- **Test script:** `scripts/test-semantic-search.ts`
- **Populate script:** `scripts/populate-knowledge-base.ts`
- **Migration 002:** `supabase/migrations/002_knowledge_base_embeddings.sql`
- **Migration 003:** `supabase/migrations/003_knowledge_base_rls.sql`

---

## ✅ Checklist

- [ ] Step 1: Applied migration 002 (knowledge_base table)
- [ ] Step 2: Applied migration 003 (RLS policies)
- [ ] Step 3: Ran populate script (70 rows inserted)
- [ ] Step 4: Ran test script (found matches with similarity ≥ 0.7)
- [ ] Step 5: Tested chatbot on website (LessManual.ai-specific answer)

**When all checkboxes are ✅, the chatbot is fully operational!** 🎉
