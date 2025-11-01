# Image Optimization Report
**Generated:** 2025-10-31
**Project:** LessManual Website (lessmanual.ai)

---

## Executive Summary

**Total Images Found:** 66 files
**Total Size (Production):** ~31MB
**Unused Images:** ~29MB (94% of total size!)
**Optimization Potential:** **Reduce page weight by 94% + compress 1 image**

---

## 🔴 CRITICAL: Unused Images (DELETE IMMEDIATELY)

### Location: `public/3d/` — **29.1MB total** ❌ NOT USED IN CODE

These 3D PNG images are **NOT referenced anywhere** in the codebase and should be **deleted immediately**:

| File | Size | Status |
|------|------|--------|
| `purple-composition2 1.png` | **8.8MB** | ❌ Unused |
| `holo-S.png` | **3.0MB** | ❌ Unused |
| `holo-rec.png` | **2.9MB** | ❌ Unused |
| `holo-sphere.png` | **2.8MB** | ❌ Unused |
| `purple-helix.png` | **2.7MB** | ❌ Unused |
| `holo-cylinder.png` | **2.3MB** | ❌ Unused |
| `purple-sphere.png` | **2.2MB** | ❌ Unused |
| `purple-cylinder.png` | **2.0MB** | ❌ Unused |
| `purple-cube.png` | **2.0MB** | ❌ Unused |
| `holo-diamond.png` | **1.8MB** | ❌ Unused |
| `holo-star.png` | **1.5MB** | ❌ Unused |
| `purple-diamond.png` | **924KB** | ❌ Unused |

**Action Required:**
```bash
rm -rf public/3d/
```

**Impact:** Will reduce bundle size by **29MB** with ZERO functionality loss.

---

## 🟡 Images That Need Compression

### 1. Profile Photo: `public/images/team/bartlomiej.jpg`
- **Current Size:** 636KB
- **Used In:** `src/components/sections/AboutSection.tsx:line X`
- **Recommended Size:** <150KB (75% reduction)
- **Format:** Keep as JPG (no transparency needed)

**Optimization Steps:**
```bash
# Using ImageMagick (recommended)
convert public/images/team/bartlomiej.jpg -quality 85 -resize 800x800\> -strip public/images/team/bartlomiej-optimized.jpg

# Or use online tools:
# - TinyJPG.com (recommended - smart compression)
# - Squoosh.app (Google's tool)
# - ImageOptim (Mac app)
```

**Expected Result:** 636KB → ~140KB (78% savings)

---

### 2. Logo: `public/images/logo.png`
- **Current Size:** 104KB
- **Used In:** `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- **Status:** ⚠️ Acceptable but can be improved
- **Recommended:** Convert to WebP or compress PNG

**Optimization Steps:**
```bash
# Convert to WebP (recommended)
cwebp -q 90 public/images/logo.png -o public/images/logo.webp

# Or compress PNG
optipng -o7 public/images/logo.png
```

**Expected Result:** 104KB → ~50KB (52% savings)

**Note:** If converting to WebP, update imports in Header.tsx and Footer.tsx

---

## ✅ Well-Optimized Images (Already Good!)

### Specializations Images — All WebP, optimized sizes
| File | Size | Status |
|------|------|--------|
| `custom.webp` | 104KB | ✅ Good |
| `sales-automation.webp` | 64KB | ✅ Good |
| `rag-chatbot.webp` | 60KB | ✅ Good |
| `content-agent.webp` | 60KB | ✅ Good |
| `voice-agent.webp` | 52KB | ✅ Good |
| `chatbot.webp` | 52KB | ✅ Good |

**Used In:** `src/components/sections/SpecializationsSection.tsx`

---

### Problem/Solution Images — All WebP, optimized sizes
| File | Size | Status |
|------|------|--------|
| `marketing problem.webp` | 60KB | ✅ Good |
| `CS problem.webp` | 52KB | ✅ Good |
| `marketing solution.webp` | 40KB | ✅ Good |
| `sales problem.webp` | 40KB | ✅ Good |
| `CS solution.webp` | 36KB | ✅ Good |
| `sales solution.webp` | 28KB | ✅ Good |

**Used In:** `src/components/sections/ProblemSolutionSection.tsx`

---

## 📂 Other Unused/Duplicate Files

### Root Directory Clutter
These files are duplicates or unused and can be deleted:

```
/purple-composition2 1.png (duplicate of public/3d/)
/Zrzut ekranu 2025-10-9 o 13.48.52.png (screenshot)
/AI Startup Website UI Kit — Framer Website Kit (Community).png (Figma export)
/Zrzut ekranu 2025-10-21 o 18.47.56.png (screenshot)
/pattern 1.png (unused)
/stars 1.png (duplicate of public/images/stars.png)
```

**Action:**
```bash
rm "purple-composition2 1.png"
rm "Zrzut ekranu 2025-10-9 o 13.48.52.png"
rm "AI Startup Website UI Kit — Framer Website Kit (Community).png"
rm "Zrzut ekranu 2025-10-21 o 18.47.56.png"
rm "pattern 1.png"
rm "stars 1.png"
```

---

### `logo/` Directory — Multiple Unused Versions
```
logo/path316.svg (unused)
logo/path317.svg (unused)
logo/ChatGPT Image 11 paź 2025, 19_33_47.png (unused)
logo/Logo v3.png (unused)
logo/Logo LessManual v1 (3).png (unused)
logo/Logo LessManual v1 (4).png (unused)
logo/Untitled (1000 x 1000 px).png (unused)
logo/Untitled (1000 x 1000 px) (500 x 500 px).png (unused)
logo/wybrane logo/logo LM (1000 x 1000 px).png (unused)
logo/wybrane logo/logo LM (500 x 500 px).png (unused)
logo/profilowe/profile-pic (1).png (unused)
logo/profilowe/profile-pic (2).png (unused)
```

**Recommendation:** Keep only the final versions needed, delete old iterations

---

### `3d's/` Directory — Duplicate of `public/3d/`
All files in `3d's/` directory are duplicates of `public/3d/`. Since `public/3d/` files are unused, delete both directories:

```bash
rm -rf 3d's/
```

---

### `zdjęcia sekcja specjalizacje/` Directory — Backup Files
These appear to be source files before optimization:

```
voice_agent.webp
rag_chatbot.webp
email_marketing-lead_gen.webp
custom.webp
chatbot-kopia.webp
content_agent-kopia.webp
```

**Recommendation:** Move to `/archive/` folder for backup, remove from production repository

```bash
mkdir archive
mv "zdjęcia sekcja specjalizacje" archive/
```

---

## 📊 Summary & Action Plan

### Immediate Actions (Delete Unused Files)
```bash
# 1. Delete unused 3D images (saves 29MB)
rm -rf public/3d/

# 2. Delete duplicate 3D directory
rm -rf "3d's/"

# 3. Delete root-level screenshots and duplicates
rm "purple-composition2 1.png"
rm "Zrzut ekranu 2025-10-9 o 13.48.52.png"
rm "Zrzut ekranu 2025-10-21 o 18.47.56.png"
rm "AI Startup Website UI Kit — Framer Website Kit (Community).png"
rm "pattern 1.png"
rm "stars 1.png"

# 4. Archive backup images
mkdir -p archive
mv "zdjęcia sekcja specjalizacje" archive/
```

### Optimization Actions (Compress Used Images)
```bash
# 1. Compress profile photo (636KB → ~140KB)
# Use TinyJPG.com or ImageMagick

# 2. Optimize logo (104KB → ~50KB)
# Use WebP conversion or PNG compression
```

---

## 📈 Expected Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Total Image Size** | 31MB | 1.5MB | **-95%** |
| **Unused Files** | 29MB | 0MB | **-100%** |
| **Profile Photo** | 636KB | 140KB | **-78%** |
| **Logo** | 104KB | 50KB | **-52%** |
| **First Load JS** | TBD | TBD | Estimate: **-30% total** |
| **Lighthouse Performance** | TBD | TBD | Estimate: **+10-15 points** |

---

## 🔧 Tools Recommended

### Compression Tools
1. **TinyJPG** (https://tinyjpg.com) - Best for JPG compression
2. **Squoosh** (https://squoosh.app) - Google's image optimizer
3. **ImageOptim** (Mac app) - Lossless optimization
4. **ImageMagick** (CLI) - Batch processing

### WebP Conversion
```bash
# Install cwebp (WebP encoder)
brew install webp  # macOS

# Convert image
cwebp -q 85 input.jpg -o output.webp
```

### Batch Optimization Script
```bash
#!/bin/bash
# optimize-images.sh

# Compress all JPGs in public/images/team/
for img in public/images/team/*.jpg; do
  convert "$img" -quality 85 -strip "${img%.jpg}-optimized.jpg"
done

# Convert PNGs to WebP
for img in public/images/*.png; do
  cwebp -q 90 "$img" -o "${img%.png}.webp"
done
```

---

## ✅ Verification Checklist

After cleanup and optimization:

- [ ] Run `npm run build` and check bundle size
- [ ] Run Lighthouse audit (Performance should be >90)
- [ ] Check Network tab in DevTools (images should load <1s on 3G)
- [ ] Verify all images still display correctly
- [ ] Test on mobile device (check image quality)
- [ ] Commit changes with message: `perf: remove 29MB unused images, compress profile photo`

---

## 📝 Notes for Future

### Image Upload Guidelines (Add to CLAUDE.md)
```markdown
## Image Guidelines

**Before adding ANY image to the project:**

1. **Optimize first:**
   - JPG: Use quality 80-85%, strip metadata
   - PNG: Use optipng or convert to WebP
   - Target: <200KB per image

2. **Choose correct format:**
   - Photos → JPG or WebP
   - Graphics with transparency → PNG or WebP
   - Icons/logos → SVG (preferred) or WebP

3. **Responsive images:**
   - Provide multiple sizes (400px, 800px, 1200px)
   - Use Next.js Image component with `sizes` prop
   - Enable lazy loading for below-fold images

4. **Location:**
   - Production images → `public/images/`
   - Source/backup → `archive/` (not in git)

5. **Delete unused:**
   - Run `npm run analyze-images` monthly
   - Remove any images not referenced in code
```

---

**Report End** | For questions: bartlomiej@lessmanual.ai
