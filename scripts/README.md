# Scripts Documentation

## OG Image Generator

Professional Open Graph image generator for LessManual.ai social media sharing.

### Overview

Generates a 1200x630px OG image with:
- **Brand colors**: Night (#0C0D0A), Pear (#DDE000), Tekhelet (#5716A2)
- **Logo**: LessManual LM logo
- **Headline**: "Make Your Business LESSMANUAL"
- **Subheadline**: "AI + Automatyzacja dla polskich firm"
- **Tagline**: "Wdrożenie w 7 dni. ROI w miesiąc."
- **Visual effects**: Radial gradients, geometric shapes, subtle grid pattern

### Usage

```bash
# Generate OG image
npm run generate:og

# Manual generation
node scripts/generate-og-image.js
```

### Output

**File**: `/public/images/og-image.png`
**Size**: ~189 KB (optimized)
**Dimensions**: 1200x630px (Facebook/LinkedIn/Twitter standard)

### Technologies

- **Canvas API** (node-canvas): Server-side image generation
- **Sharp** (optional): PNG optimization if size exceeds 200KB

### Design Specifications

**Safe Zones:**
- Keep important text within 1200x600px center
- Account for cropping on different platforms

**Typography:**
- Headline: 62px bold sans-serif (white)
- "LESSMANUAL": 76px bold sans-serif (pear yellow)
- Subheadline: 44px medium sans-serif (white)
- Tagline: 32px regular sans-serif (white with 85% opacity)

**Visual Effects:**
- Radial gradients for depth (top-right pear glow, bottom-left purple glow)
- Geometric circles for tech aesthetic (8% opacity)
- Subtle grid pattern (2% opacity)
- Accent decorations (pear and tekhelet circles)

### Customization

To modify the OG image design:

1. Edit `scripts/generate-og-image.js`
2. Update colors in the `colors` object
3. Adjust typography sizes/positions
4. Modify gradient positions/intensities
5. Run `npm run generate:og` to regenerate

### Integration

The OG image is automatically included in Next.js metadata:

```tsx
// src/app/[locale]/layout.tsx
export const metadata: Metadata = {
  openGraph: {
    images: [{
      url: '/images/og-image.png',
      width: 1200,
      height: 630,
      alt: 'LessManual - Make Your Business LESSMANUAL',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.png'],
  },
}
```

### Testing

**Social Media Debuggers:**
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**Preview:**
1. Deploy to Vercel
2. Enter URL in social media debugger
3. Verify image displays correctly
4. Check image dimensions and aspect ratio

### Troubleshooting

**Image not updating on social media:**
- Clear cache in social media debugger tools
- Add version query param: `/images/og-image.png?v=2`
- Wait 24-48 hours for cache to expire

**Canvas error "Unsupported image type":**
- Ensure logo is PNG format (not WebP)
- Canvas package doesn't support WebP

**File size too large (>200KB):**
- Script auto-optimizes with Sharp if available
- Reduce gradient complexity
- Lower compression quality in Sharp settings

### Version History

**v1.0** (2025-11-02)
- Initial OG image generator
- Professional design matching LessManual brand
- 189 KB optimized output
