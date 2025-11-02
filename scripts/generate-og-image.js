const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Brand colors
const colors = {
  night: '#0C0D0A',
  pear: '#DDE000',
  tekhelet: '#5716A2',
  white: '#FEFEFE'
};

// Convert hex to RGB for gradients
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

async function generateOGImage() {
  console.log('🎨 Generating OG Image for LessManual.ai...');

  // Create canvas
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background - dark with subtle gradient effect
  const nightRgb = hexToRgb(colors.night);

  // Base dark background
  ctx.fillStyle = colors.night;
  ctx.fillRect(0, 0, width, height);

  // Radial gradient overlay for depth
  const centerGradient = ctx.createRadialGradient(600, 315, 100, 600, 315, 800);
  centerGradient.addColorStop(0, 'rgba(30, 30, 30, 0.8)');
  centerGradient.addColorStop(0.5, `rgba(${nightRgb.r}, ${nightRgb.g}, ${nightRgb.b}, 0.5)`);
  centerGradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
  ctx.fillStyle = centerGradient;
  ctx.fillRect(0, 0, width, height);

  // Pear accent glow (top right)
  const pearRgb = hexToRgb(colors.pear);
  const pearGlow = ctx.createRadialGradient(1000, 150, 50, 1000, 150, 450);
  pearGlow.addColorStop(0, `rgba(${pearRgb.r}, ${pearRgb.g}, ${pearRgb.b}, 0.15)`);
  pearGlow.addColorStop(0.5, `rgba(${pearRgb.r}, ${pearRgb.g}, ${pearRgb.b}, 0.08)`);
  pearGlow.addColorStop(1, `rgba(${pearRgb.r}, ${pearRgb.g}, ${pearRgb.b}, 0)`);
  ctx.fillStyle = pearGlow;
  ctx.fillRect(0, 0, width, height);

  // Purple accent glow (bottom left)
  const purpleRgb = hexToRgb(colors.tekhelet);
  const purpleGlow = ctx.createRadialGradient(200, 500, 50, 200, 500, 400);
  purpleGlow.addColorStop(0, `rgba(${purpleRgb.r}, ${purpleRgb.g}, ${purpleRgb.b}, 0.2)`);
  purpleGlow.addColorStop(0.5, `rgba(${purpleRgb.r}, ${purpleRgb.g}, ${purpleRgb.b}, 0.1)`);
  purpleGlow.addColorStop(1, `rgba(${purpleRgb.r}, ${purpleRgb.g}, ${purpleRgb.b}, 0)`);
  ctx.fillStyle = purpleGlow;
  ctx.fillRect(0, 0, width, height);

  // Geometric decorations for tech feel
  ctx.save();
  ctx.globalAlpha = 0.08;

  // Large circle (top right)
  ctx.beginPath();
  ctx.arc(1100, 100, 200, 0, Math.PI * 2);
  ctx.strokeStyle = colors.pear;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Medium circle
  ctx.beginPath();
  ctx.arc(1050, 90, 140, 0, Math.PI * 2);
  ctx.strokeStyle = colors.pear;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Small accent circle (bottom left)
  ctx.beginPath();
  ctx.arc(150, 520, 80, 0, Math.PI * 2);
  ctx.strokeStyle = colors.tekhelet;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();

  // Subtle grid pattern (very faint for texture)
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.strokeStyle = colors.pear;
  ctx.lineWidth = 0.5;

  for (let i = 0; i < width; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }

  for (let j = 0; j < height; j += 50) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(width, j);
    ctx.stroke();
  }
  ctx.restore();

  // Load and draw logo (use PNG version as canvas doesn't support WebP)
  const logoPath = path.join(__dirname, '../public/images/logo.png');
  const logo = await loadImage(logoPath);
  const logoSize = 110;
  ctx.drawImage(logo, 70, 50, logoSize, logoSize);

  // Typography - Register custom fonts would go here in production
  // For now, using Canvas default fonts

  // Main headline - "Make Your Business"
  ctx.fillStyle = colors.white;
  ctx.font = 'bold 62px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  const line1 = 'Make Your Business';
  ctx.fillText(line1, 70, 240);

  // "LESSMANUAL" with pear color
  ctx.fillStyle = colors.pear;
  ctx.font = 'bold 76px sans-serif';
  ctx.fillText('LESSMANUAL', 70, 320);

  // Subheadline
  ctx.fillStyle = colors.white;
  ctx.font = '500 44px sans-serif';
  ctx.fillText('AI + Automatyzacja dla polskich firm', 70, 430);

  // Accent line before tagline
  ctx.fillStyle = colors.pear;
  ctx.fillRect(70, 500, 70, 3);

  // Tagline
  ctx.fillStyle = 'rgba(254, 254, 254, 0.85)';
  ctx.font = '400 32px sans-serif';
  ctx.fillText('Wdrożenie w 7 dni. ROI w miesiąc.', 70, 530);

  // Accent decoration (bottom right corner)
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = colors.pear;
  ctx.beginPath();
  ctx.arc(1080, 520, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Small purple accent (mid-right)
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = colors.tekhelet;
  ctx.beginPath();
  ctx.arc(1050, 350, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Save the image
  const outputPath = path.join(__dirname, '../public/images/og-image.png');
  const buffer = canvas.toBuffer('image/png', { compressionLevel: 9 });

  fs.writeFileSync(outputPath, buffer);

  const fileSizeKB = (buffer.length / 1024).toFixed(2);
  console.log(`✅ OG Image generated successfully!`);
  console.log(`📁 Saved to: ${outputPath}`);
  console.log(`📦 File size: ${fileSizeKB} KB`);
  console.log(`📐 Dimensions: ${width}x${height}px`);

  // Optional: Optimize with sharp if size > 200KB
  if (buffer.length / 1024 > 200) {
    console.log('⚠️  Warning: File size exceeds 200KB. Consider optimizing with sharp.');
    await optimizeWithSharp(outputPath);
  }
}

async function optimizeWithSharp(imagePath) {
  try {
    const sharp = require('sharp');
    const optimizedPath = imagePath.replace('.png', '-optimized.png');

    await sharp(imagePath)
      .png({ quality: 90, compressionLevel: 9, effort: 10 })
      .toFile(optimizedPath);

    const stats = fs.statSync(optimizedPath);
    const optimizedSizeKB = (stats.size / 1024).toFixed(2);

    console.log(`✨ Optimized version saved: ${optimizedPath}`);
    console.log(`📦 Optimized size: ${optimizedSizeKB} KB`);

    // Replace original with optimized
    fs.renameSync(optimizedPath, imagePath);
    console.log('✅ Original replaced with optimized version');
  } catch (error) {
    console.log('⚠️  Sharp optimization skipped:', error.message);
  }
}

// Run the generator
generateOGImage().catch(console.error);
