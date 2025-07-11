const fs = require('fs');
const path = require('path');

// List of image tools to update
const imageTools = [
  'image-resizer.html',
  'image-compressor.html', 
  'image-cropper.html',
  'convert-image-to-base64.html',
  'convert-webp-to-png.html',
  'gif-maker.html',
  'qr-code-generator.html',
  'screenshot-to-pdf.html'
];

// Tool-specific icon mappings
const toolIcons = {
  'image-resizer.html': { icon: 'bi-arrows-angle-expand', class: 'resizer' },
  'image-compressor.html': { icon: 'bi-file-earmark-zip', class: 'compressor' },
  'image-cropper.html': { icon: 'bi-crop', class: 'cropper' },
  'convert-image-to-base64.html': { icon: 'bi-code-slash', class: 'encoder' },
  'convert-webp-to-png.html': { icon: 'bi-arrow-repeat', class: 'converter' },
  'gif-maker.html': { icon: 'bi-film', class: 'generator' },
  'qr-code-generator.html': { icon: 'bi-qr-code', class: 'generator' },
  'screenshot-to-pdf.html': { icon: 'bi-file-earmark-pdf', class: 'pdf' }
};

// Tool titles and descriptions
const toolInfo = {
  'image-resizer.html': {
    title: 'Image Resizer',
    description: 'Resize images to any dimensions with batch processing, aspect ratio lock, and multiple output formats. Fully mobile-friendly and supports dark mode.'
  },
  'image-compressor.html': {
    title: 'Image Compressor',
    description: 'Compress images to reduce file size while maintaining quality. Batch processing, adjustable compression levels, and multiple output formats. Mobile-friendly with dark mode support.'
  },
  'image-cropper.html': {
    title: 'Image Cropper',
    description: 'Crop images with precision using an interactive interface. Support for aspect ratios, zoom, rotate, and multiple output formats. Mobile-friendly with dark mode.'
  },
  'convert-image-to-base64.html': {
    title: 'Image to Base64 Converter',
    description: 'Convert images to Base64 format for web embedding. Instant conversion, copy to clipboard, and download options. Mobile-friendly with dark mode support.'
  },
  'convert-webp-to-png.html': {
    title: 'WebP to PNG Converter',
    description: 'Convert WebP images to PNG format with batch processing and quality preservation. Mobile-friendly with dark mode support.'
  },
  'gif-maker.html': {
    title: 'GIF Maker',
    description: 'Create animated GIFs from images or videos. Customizable frame delay, loop settings, and output options. Mobile-friendly with dark mode support.'
  },
  'qr-code-generator.html': {
    title: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, contact info, and more. Customizable colors, sizes, and logo embedding. Mobile-friendly with dark mode support.'
  },
  'screenshot-to-pdf.html': {
    title: 'Screenshot to PDF Converter',
    description: 'Convert multiple screenshots to PDF with custom page settings. Batch processing, reordering, and multiple output formats. Mobile-friendly with dark mode support.'
  }
};

function updateToolFile(filename) {
  const filepath = path.join('tools', filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`Skipping ${filename} - file not found`);
    return;
  }

  let content = fs.readFileSync(filepath, 'utf8');
  const toolData = toolInfo[filename];
  const iconInfo = toolIcons[filename];

  // Add branding CSS link
  if (!content.includes('image-tools-branding.css')) {
    content = content.replace(
      '<link rel="stylesheet" href="../assets/css/style.css">',
      '<link rel="stylesheet" href="../assets/css/style.css">\n  <link rel="stylesheet" href="../assets/css/image-tools-branding.css">'
    );
  }

  // Remove old CSS variables and styling
  content = content.replace(/:root\s*\{[\s\S]*?\}/g, '');
  content = content.replace(/body\.dark-mode\s*\{[\s\S]*?\}/g, '');
  content = content.replace(/\.tool-card\s*\{[\s\S]*?\}/g, '');
  content = content.replace(/\.dark-toggle\s*\{[\s\S]*?\}/g, '');

  // Update header section
  const headerPattern = /<h1[^>]*>.*?<\/h1>\s*<p[^>]*>.*?<\/p>/s;
  const newHeader = `<div class="tool-header fade-in">
      <div class="tool-icon ${iconInfo.class} large">
        <i class="bi ${iconInfo.icon}"></i>
      </div>
      <h1 class="tool-title">${toolData.title}</h1>
      <p class="tool-description">${toolData.description}</p>
    </div>`;
  
  content = content.replace(headerPattern, newHeader);

  // Update main icon in tool card
  const iconPattern = /<i class="bi bi-[^"]*"[^>]*><\/i>/;
  const newIcon = `<div class="tool-icon ${iconInfo.class}">
          <i class="bi ${iconInfo.icon}"></i>
        </div>`;
  
  content = content.replace(iconPattern, newIcon);

  // Update buttons to use brand styling
  content = content.replace(/class="btn btn-primary/g, 'class="btn btn-brand');
  content = content.replace(/class="btn btn-success/g, 'class="btn btn-brand');

  // Add upload icon to file input buttons
  content = content.replace(
    /Choose (Files?|Images?)/g,
    '<i class="bi bi-upload"></i> Choose $1'
  );

  // Clean up any remaining old styling
  content = content.replace(/@media \(max-width: 768px\)\s*\{\s*\.tool-card[^}]*\}/g, '');

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Updated ${filename}`);
}

// Update all image tools
console.log('Updating image tools with new branding...');
imageTools.forEach(updateToolFile);
console.log('Branding update complete!'); 