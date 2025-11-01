# 🧹 Cleanup Action Plan
**Created:** 2025-10-31
**Based on:** CODEBASE_AUDIT_REPORT.md + IMAGE_OPTIMIZATION_REPORT.md

---

## ✅ ALREADY COMPLETED

1. ✅ **Deleted duplicate `./messages/` folder** (was causing MISSING_MESSAGE bugs)
2. ✅ **Deleted `public/3d/` folder** (29.1MB unused 3D images)
3. ✅ **Deleted `3d's/` folder** (duplicate of public/3d/)
4. ✅ **Optimized bartlomiej.jpg** (635KB → 62KB, 90% reduction!)

**Savings so far:** ~29.6MB removed

---

## 🔴 PRIORITY 1: DELETE IMMEDIATELY (18MB root clutter)

### Root-level files to delete:
```bash
cd "/Users/bartlomiejchudzik/Documents/LessManual/Strona internetowa"

# Screenshots (8.2MB + 9.1MB + unknown)
rm "AI Startup Website UI Kit — Framer Website Kit (Community).png"  # 8.2MB
rm "purple-composition2 1.png"  # 9.1MB (duplicate)
rm "Zrzut ekranu 2025-10-9 o 13.48.52.png"
rm "Zrzut ekranu 2025-10-21 o 18.47.56.png"

# Unused patterns/stars (124KB + unknown)
rm "pattern 1.png"
rm "stars 1.png"  # duplicate of public/images/stars.png

# Old profile photo (635KB - replaced with 62KB version)
rm "bartlomiej.jpg"
```

**Total savings:** ~18MB

---

## 🟡 PRIORITY 2: ARCHIVE OLD VERSIONS (not urgent, but cleanup recommended)

### Option 1: Archive for history
```bash
# Create archive directory
mkdir -p archive/logo
mkdir -p archive/images

# Move old logo versions
mv logo/* archive/logo/

# Move backup images
mv "zdjęcia sekcja specjalizacje" archive/images/

# Add to .gitignore
echo "archive/" >> .gitignore
```

### Option 2: Delete if no longer needed
```bash
# Delete old logo versions
rm -rf logo/path*.svg
rm logo/ChatGPT*.png
rm logo/Logo*.png
rm logo/Untitled*.png
rm -rf logo/profilowe/
rm -rf "logo/wybrane logo/"

# Delete backup images
rm -rf "zdjęcia sekcja specjalizacje"
```

**My recommendation:** Archive (safe), not delete

---

## 🟡 PRIORITY 3: ORGANIZE DOCUMENTATION (~200KB docs)

Move documentation to `/docs/` folder:

```bash
# Create docs structure
mkdir -p docs/roi

# Move ROI-related docs
mv roi_calculator_prompt.md docs/roi/
mv roi_calculator_PRD.md docs/roi/
mv calculator_data_structure.md docs/roi/
mv kalkulator_ROI.md docs/roi/

# Move other planning docs
mv lessmanual_website_pain_points.md docs/
mv lessmanual_specializations_content.md docs/
mv GTM_SETUP.md docs/

# Keep in root (essential):
# - README.md
# - CLAUDE.md
# - SETUP.md
# - lessmanual-website-PRD-v2.md
# - IMAGE_OPTIMIZATION_REPORT.md
# - CODEBASE_AUDIT_REPORT.md
# - CLEANUP_ACTION_PLAN.md (this file)
```

---

## 🟢 PRIORITY 4: CLEANUP OLD BACKUPS

```bash
# Delete node_modules backup (8.1KB)
rm -rf node_modules.backup-*
```

---

## 🔍 PRIORITY 5: VERIFY & DECIDE

Check these folders and decide:

### 1. `legal/` folder
```bash
ls -lh legal/
# If contains actual legal docs (privacy, terms) → KEEP
# If empty or unused → DELETE
```

### 2. `docs/` folder (current)
```bash
ls -lh docs/
# If empty (96B suggests it is) → DELETE with `rmdir docs/`
```

### 3. `Formularz/` folder (23K)
```bash
ls -lh Formularz/
# If old contact form → ARCHIVE or DELETE
# If still used → KEEP
```

---

## 📊 EXPECTED RESULTS AFTER FULL CLEANUP

| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| **Repository size** | ~50MB | ~3MB | **-94%** |
| **Root files** | 30+ | 8 | **-73%** |
| **Images** | 31MB | 1.5MB | **-95%** |
| **Duplicate folders** | 3 | 0 | **-100%** |

---

## 🚀 QUICK CLEANUP SCRIPT

Run this for immediate Priority 1 cleanup:

```bash
#!/bin/bash
cd "/Users/bartlomiejchudzik/Documents/LessManual/Strona internetowa"

echo "🧹 Starting Priority 1 cleanup..."

# Root-level files
rm "AI Startup Website UI Kit — Framer Website Kit (Community).png" 2>/dev/null
rm "purple-composition2 1.png" 2>/dev/null
rm "pattern 1.png" 2>/dev/null
rm "stars 1.png" 2>/dev/null
rm "Zrzut ekranu 2025-10-9 o 13.48.52.png" 2>/dev/null
rm "Zrzut ekranu 2025-10-21 o 18.47.56.png" 2>/dev/null
rm "bartlomiej.jpg" 2>/dev/null

# Old backups
rm -rf node_modules.backup-* 2>/dev/null

echo "✅ Priority 1 cleanup complete! (~18MB removed)"
echo ""
echo "Next steps:"
echo "1. Review PRIORITY 2 (archive old versions)"
echo "2. Run PRIORITY 3 (organize docs)"
echo "3. Check PRIORITY 5 (verify folders)"
```

---

## 📝 CHECKLIST

After cleanup:

- [ ] Run `git status` to see what was deleted
- [ ] Test `npm run build` - should succeed
- [ ] Check website loads correctly (especially images)
- [ ] Commit: `git commit -m "chore: cleanup repository - remove 47MB unused files"`
- [ ] Push to remote

---

## 🎯 RECOMMENDED ORDER

1. **NOW:** Run Priority 1 script (delete 18MB root clutter)
2. **TODAY:** Organize docs (Priority 3)
3. **THIS WEEK:** Archive old versions (Priority 2)
4. **ANYTIME:** Verify folders (Priority 5)

---

**Total potential cleanup:** ~47MB → ~3MB (94% reduction!)
