const fs = require('fs');
const path = require('path');

// Tool definitions with type and icon
const tools = [
  // Image Tools
  { name: 'Image to PNG Converter', file: 'image-to-png.html', type: 'image', icon: 'image' },
  { name: 'Image to JPG Converter', file: 'image-to-jpg.html', type: 'image', icon: 'image' },
  { name: 'Image Resizer', file: 'image-resizer.html', type: 'image', icon: 'arrows-move' },
  { name: 'Image Compressor', file: 'image-compressor.html', type: 'image', icon: 'compress' },
  { name: 'Image Cropper', file: 'image-cropper.html', type: 'image', icon: 'crop' },
  { name: 'Convert Image to Base64', file: 'convert-image-to-base64.html', type: 'image', icon: 'code-slash' },
  { name: 'Convert WebP to PNG', file: 'convert-webp-to-png.html', type: 'image', icon: 'file-earmark-image' },
  { name: 'GIF Maker', file: 'gif-maker.html', type: 'image', icon: 'film' },
  { name: 'QR Code Generator', file: 'qr-code-generator.html', type: 'image', icon: 'qr-code' },
  { name: 'Screenshot to PDF Converter', file: 'screenshot-to-pdf.html', type: 'image', icon: 'file-earmark-pdf' },
  // Text Tools
  { name: 'Word Counter', file: 'word-counter.html', type: 'text', icon: 'file-earmark-text' },
  { name: 'Character Counter', file: 'character-counter.html', type: 'text', icon: 'type' },
  { name: 'Case Converter', file: 'case-converter.html', type: 'text', icon: 'arrow-down-up' },
  { name: 'Plagiarism Checker', file: 'plagiarism-checker.html', type: 'text', icon: 'search' },
  { name: 'Grammar Checker', file: 'grammar-checker.html', type: 'text', icon: 'spellcheck' },
  { name: 'Text-to-Speech', file: 'text-to-speech.html', type: 'text', icon: 'mic' },
  { name: 'Speech-to-Text', file: 'speech-to-text.html', type: 'text', icon: 'mic-fill' },
  { name: 'URL Encoder & Decoder', file: 'url-encoder-decoder.html', type: 'text', icon: 'link-45deg' },
  { name: 'Fancy Text Generator', file: 'fancy-text-generator.html', type: 'text', icon: 'stars' },
  { name: 'Random Text Generator', file: 'random-text-generator.html', type: 'text', icon: 'shuffle' },
  // Developer Tools
  { name: 'JSON Formatter', file: 'json-formatter.html', type: 'text', icon: 'braces' },
  { name: 'HTML to Markdown Converter', file: 'html-to-markdown.html', type: 'text', icon: 'code-slash' },
  { name: 'CSS Minifier', file: 'css-minifier.html', type: 'text', icon: 'file-earmark-code' },
  { name: 'JavaScript Minifier', file: 'javascript-minifier.html', type: 'text', icon: 'file-earmark-code' },
  { name: 'SQL Formatter', file: 'sql-formatter.html', type: 'text', icon: 'database' },
  { name: 'HTACCESS Redirect Generator', file: 'htaccess-redirect-generator.html', type: 'text', icon: 'arrow-right' },
  { name: 'Markdown to HTML Converter', file: 'markdown-to-html.html', type: 'text', icon: 'code-slash' },
  { name: 'Color Code Picker', file: 'color-code-picker.html', type: 'text', icon: 'palette' },
  { name: 'Base64 Encoder & Decoder', file: 'base64-encoder-decoder.html', type: 'text', icon: 'code-slash' },
  { name: 'IP Address Lookup', file: 'ip-address-lookup.html', type: 'text', icon: 'geo-alt' },
  // Math & Calculators
  { name: 'Percentage Calculator', file: 'percentage-calculator.html', type: 'calculator', icon: 'percent' },
  { name: 'Age Calculator', file: 'age-calculator.html', type: 'calculator', icon: 'calendar' },
  { name: 'BMI Calculator', file: 'bmi-calculator.html', type: 'calculator', icon: 'calculator' },
  { name: 'Loan EMI Calculator', file: 'loan-emi-calculator.html', type: 'calculator', icon: 'calculator' },
  { name: 'Scientific Calculator', file: 'scientific-calculator.html', type: 'calculator', icon: 'calculator' },
  { name: 'Discount Calculator', file: 'discount-calculator.html', type: 'calculator', icon: 'percent' },
  { name: 'Currency Converter', file: 'currency-converter.html', type: 'calculator', icon: 'currency-exchange' },
  { name: 'Time Zone Converter', file: 'time-zone-converter.html', type: 'calculator', icon: 'clock' },
  { name: 'Binary to Decimal Converter', file: 'binary-to-decimal.html', type: 'calculator', icon: 'calculator' },
  { name: 'Tip Calculator', file: 'tip-calculator.html', type: 'calculator', icon: 'calculator' },
  // Unit Converters
  { name: 'Length Converter', file: 'length-converter.html', type: 'calculator', icon: 'ruler' },
  { name: 'Weight Converter', file: 'weight-converter.html', type: 'calculator', icon: 'scale' },
  { name: 'Speed Converter', file: 'speed-converter.html', type: 'calculator', icon: 'speedometer2' },
  { name: 'Temperature Converter', file: 'temperature-converter.html', type: 'calculator', icon: 'thermometer' },
  { name: 'Volume Converter', file: 'volume-converter.html', type: 'calculator', icon: 'box' },
  { name: 'Data Storage Converter', file: 'data-storage-converter.html', type: 'calculator', icon: 'hdd' },
  { name: 'Energy Converter', file: 'energy-converter.html', type: 'calculator', icon: 'lightning' },
  { name: 'Pressure Converter', file: 'pressure-converter.html', type: 'calculator', icon: 'speedometer' },
  { name: 'Fuel Efficiency Converter', file: 'fuel-efficiency-converter.html', type: 'calculator', icon: 'fuel-pump' },
  { name: 'Angle Converter', file: 'angle-converter.html', type: 'calculator', icon: 'protractor' },
  // Security & Encryption Tools
  { name: 'MD5 Hash Generator', file: 'md5-hash-generator.html', type: 'text', icon: 'shield-lock' },
  { name: 'SHA256 Hash Generator', file: 'sha256-hash-generator.html', type: 'text', icon: 'shield-lock' },
  { name: 'Password Generator', file: 'password-generator.html', type: 'text', icon: 'key' },
  { name: 'Random String Generator', file: 'random-string-generator.html', type: 'text', icon: 'shuffle' },
  { name: 'URL Shortener', file: 'url-shortener.html', type: 'text', icon: 'link-45deg' },
  { name: 'IP Geolocation Finder', file: 'ip-geolocation-finder.html', type: 'text', icon: 'geo-alt' },
  { name: 'SSL Certificate Checker', file: 'ssl-certificate-checker.html', type: 'text', icon: 'shield-check' },
  { name: 'Whois Lookup', file: 'whois-lookup.html', type: 'text', icon: 'search' },
  { name: 'HTTP Headers Checker', file: 'http-headers-checker.html', type: 'text', icon: 'search' },
  { name: 'Privacy Policy Generator', file: 'privacy-policy-generator.html', type: 'text', icon: 'file-earmark-text' },
  // Social Media Tools
  { name: 'YouTube Thumbnail Downloader', file: 'youtube-thumbnail-downloader.html', type: 'image', icon: 'youtube' },
  { name: 'Instagram Photo Downloader', file: 'instagram-photo-downloader.html', type: 'image', icon: 'instagram' },
  { name: 'Twitter Video Downloader', file: 'twitter-video-downloader.html', type: 'image', icon: 'twitter' },
  { name: 'Facebook Video Downloader', file: 'facebook-video-downloader.html', type: 'image', icon: 'facebook' },
  { name: 'TikTok Video Downloader', file: 'tiktok-video-downloader.html', type: 'image', icon: 'music-note' },
  { name: 'YouTube Tags Extractor', file: 'youtube-tags-extractor.html', type: 'text', icon: 'tags' },
  { name: 'Hashtag Generator', file: 'hashtag-generator.html', type: 'text', icon: 'hash' },
  { name: 'Social Media Post Generator', file: 'social-media-post-generator.html', type: 'text', icon: 'chat-quote' },
  { name: 'Emoji Keyboard', file: 'emoji-keyboard.html', type: 'text', icon: 'emoji-smile' },
  { name: 'Twitter Character Counter', file: 'twitter-character-counter.html', type: 'text', icon: 'twitter' },
  // Miscellaneous Tools
  { name: 'Barcode Generator', file: 'barcode-generator.html', type: 'text', icon: 'upc-scan' },
  { name: 'Meme Generator', file: 'meme-generator.html', type: 'image', icon: 'image' },
  { name: 'Resume Builder', file: 'resume-builder.html', type: 'text', icon: 'file-earmark-person' },
  { name: 'Invoice Generator', file: 'invoice-generator.html', type: 'text', icon: 'receipt' },
  { name: 'Business Name Generator', file: 'business-name-generator.html', type: 'text', icon: 'building' },
  { name: 'Lottery Number Generator', file: 'lottery-number-generator.html', type: 'text', icon: 'dice-6' },
  { name: 'Flip a Coin Simulator', file: 'flip-a-coin.html', type: 'text', icon: 'coin' },
  { name: 'Random Number Generator', file: 'random-number-generator.html', type: 'text', icon: 'dice-6' },
  { name: 'Dice Roller Simulator', file: 'dice-roller.html', type: 'text', icon: 'dice-6' },
  { name: 'Internet Speed Test', file: 'internet-speed-test.html', type: 'text', icon: 'speedometer2' },
  { name: 'Daily Planner Creator', file: 'daily-planner.html', type: 'text', icon: 'calendar-check' },
  { name: 'Wedding Invitation Generator', file: 'wedding-invitation-generator.html', type: 'text', icon: 'envelope' },
  { name: 'Story Plot Generator', file: 'story-plot-generator.html', type: 'text', icon: 'book' },
  { name: 'E-book Creator', file: 'ebook-creator.html', type: 'text', icon: 'book' },
  { name: 'AI Chatbot Demo', file: 'ai-chatbot-demo.html', type: 'text', icon: 'robot' },
  { name: 'IP Address Tracker', file: 'ip-address-tracker.html', type: 'text', icon: 'geo-alt' },
  { name: 'Fake Address Generator', file: 'fake-address-generator.html', type: 'text', icon: 'geo-alt' },
  { name: 'Calculator for Electric Bills', file: 'electric-bill-calculator.html', type: 'calculator', icon: 'lightning' },
  { name: 'Leap Year Checker', file: 'leap-year-checker.html', type: 'text', icon: 'calendar-check' },
  { name: 'Name to Numerology Calculator', file: 'name-to-numerology.html', type: 'text', icon: 'calculator' },
];

function getDescription(tool) {
  // Improved descriptions based on tool type
  if (tool.type === 'image') {
    return `Use this tool to ${tool.name.toLowerCase().replace(' converter', '').replace(' generator', '').replace(' downloader', '').replace(' maker', '').replace(' cropper', '').replace(' compressor', '').replace(' resizer', '')} images.`;
  }
  if (tool.type === 'text') {
    return `Use this tool to ${tool.name.toLowerCase().replace(' generator', '').replace(' converter', '').replace(' downloader', '').replace(' checker', '').replace(' formatter', '').replace(' minifier', '').replace(' extractor', '').replace(' counter', '').replace(' builder', '').replace(' creator', '').replace(' demo', '').replace(' tracker', '').replace(' lookup', '').replace(' simulator', '').replace(' test', '').replace(' keyboard', '')} text.`;
  }
  if (tool.type === 'calculator') {
    return `Use this tool to ${tool.name.toLowerCase().replace(' calculator', '').replace(' converter', '').replace(' checker', '')} calculations.`;
  }
  return `Use this tool for ${tool.name.toLowerCase()}.`;
}

function imageTemplate(tool) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tool.name} | Multi-Tools</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../assets/css/style.css">
  <style>
    .tool-card { border: 2px dashed #ddd; border-radius: 12px; background: #fafbfc; max-width: 500px; min-height: 250px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); margin: 0 auto; transition: border-color 0.2s; }
    .tool-card.dragover { border-color: #0d6efd; background: #e9f5ff; }
    .tool-card input[type="file"] { display: none; }
    .download-link { margin-top: 1rem; display: none; }
  </style>
</head>
<body>
  <div id="header"></div>
  <div class="container mt-4">
    <h1 class="mb-2">${tool.name}</h1>
    <p class="mb-4 text-muted">${getDescription(tool)}</p>
    <div class="ad-space">Ad Space (Top Banner)</div>
    <div class="tool-card p-5 mb-4 text-center" id="drop-area">
      <div class="mb-3">
        <i class="bi bi-${tool.icon}" style="font-size: 3rem; color: #888;"></i>
      </div>
      <div class="h5 mb-2">Drag & Drop Image Here</div>
      <div class="mb-2 text-muted">or</div>
      <label class="btn btn-primary mb-2">
        Choose File <input type="file" id="fileElem" accept="image/*">
      </label>
      <div id="fileName" class="text-muted small"></div>
      <a id="downloadLink" class="btn btn-success download-link">Download</a>
      <div id="errorMsg" class="text-danger mt-2"></div>
    </div>
    <div class="ad-space">Ad Space (Bottom)</div>
  </div>
  <div id="footer"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/header.js"></script>
  <script src="../assets/js/footer.js"></script>
  <!-- Add tool-specific JS here -->
</body>
</html>
`;
}

function textTemplate(tool) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tool.name} | Multi-Tools</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../assets/css/style.css">
  <style>
    .tool-card { border: 2px dashed #ddd; border-radius: 12px; background: #fafbfc; max-width: 500px; min-height: 250px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); margin: 0 auto; transition: border-color 0.2s; }
  </style>
</head>
<body>
  <div id="header"></div>
  <div class="container mt-4">
    <h1 class="mb-2">${tool.name}</h1>
    <p class="mb-4 text-muted">${getDescription(tool)}</p>
    <div class="ad-space">Ad Space (Top Banner)</div>
    <div class="tool-card p-4 mb-4 text-center">
      <div class="mb-3">
        <i class="bi bi-${tool.icon}" style="font-size: 2.5rem; color: #888;"></i>
      </div>
      <textarea id="text-input" class="form-control mb-3" rows="6" placeholder="Type or paste your text here..."></textarea>
      <div class="row justify-content-center">
        <div class="col-auto">
          <strong>Words:</strong> <span id="word-count">0</span>
        </div>
        <div class="col-auto">
          <strong>Characters:</strong> <span id="char-count">0</span>
        </div>
      </div>
    </div>
    <div class="ad-space">Ad Space (Bottom)</div>
  </div>
  <div id="footer"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/header.js"></script>
  <script src="../assets/js/footer.js"></script>
  <script>
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    if (textInput) {
      textInput.addEventListener('input', function() {
        const text = textInput.value;
        wordCount.textContent = text.trim() ? text.trim().split(/\\s+/).length : 0;
        charCount.textContent = text.length;
      });
    }
  </script>
</body>
</html>
`;
}

function calculatorTemplate(tool) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tool.name} | Multi-Tools</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../assets/css/style.css">
  <style>
    .tool-card { border: 2px dashed #ddd; border-radius: 12px; background: #fafbfc; max-width: 500px; min-height: 250px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); margin: 0 auto; transition: border-color 0.2s; }
    .calculator-input { font-size: 1.2rem; text-align: center; }
  </style>
</head>
<body>
  <div id="header"></div>
  <div class="container mt-4">
    <h1 class="mb-2">${tool.name}</h1>
    <p class="mb-4 text-muted">${getDescription(tool)}</p>
    <div class="ad-space">Ad Space (Top Banner)</div>
    <div class="tool-card p-4 mb-4 text-center">
      <div class="mb-3">
        <i class="bi bi-${tool.icon}" style="font-size: 2.5rem; color: #888;"></i>
      </div>
      <div class="row g-3">
        <div class="col-12">
          <input type="number" class="form-control calculator-input" id="input1" placeholder="Enter first value...">
        </div>
        <div class="col-12">
          <input type="number" class="form-control calculator-input" id="input2" placeholder="Enter second value...">
        </div>
        <div class="col-12">
          <button class="btn btn-primary" id="calculate-btn">Calculate</button>
        </div>
        <div class="col-12">
          <div class="alert alert-info" id="result" style="display: none;">
            <strong>Result:</strong> <span id="result-value">0</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ad-space">Ad Space (Bottom)</div>
  </div>
  <div id="footer"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/header.js"></script>
  <script src="../assets/js/footer.js"></script>
  <script>
    const calculateBtn = document.getElementById('calculate-btn');
    const result = document.getElementById('result');
    const resultValue = document.getElementById('result-value');
    
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        const input1 = parseFloat(document.getElementById('input1').value) || 0;
        const input2 = parseFloat(document.getElementById('input2').value) || 0;
        
        // Simple calculation - can be customized per tool
        const calculatedResult = input1 + input2;
        
        resultValue.textContent = calculatedResult;
        result.style.display = 'block';
      });
    }
  </script>
</body>
</html>
`;
}

function defaultTemplate(tool) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tool.name} | Multi-Tools</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../assets/css/style.css">
  <style>
    .tool-card { border: 2px dashed #ddd; border-radius: 12px; background: #fafbfc; max-width: 500px; min-height: 250px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); margin: 0 auto; transition: border-color 0.2s; }
  </style>
</head>
<body>
  <div id="header"></div>
  <div class="container mt-4">
    <h1 class="mb-2">${tool.name}</h1>
    <p class="mb-4 text-muted">${getDescription(tool)}</p>
    <div class="ad-space">Ad Space (Top Banner)</div>
    <div class="tool-card p-4 mb-4 text-center">
      <div class="mb-3">
        <i class="bi bi-${tool.icon || 'tools'}" style="font-size: 2.5rem; color: #888;"></i>
      </div>
      <div class="alert alert-info">
        <i class="bi bi-info-circle me-2"></i>
        This tool is coming soon! We're working hard to bring you the best experience.
      </div>
      <p class="text-muted">Check back soon for updates.</p>
    </div>
    <div class="ad-space">Ad Space (Bottom)</div>
  </div>
  <div id="footer"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/header.js"></script>
  <script src="../assets/js/footer.js"></script>
</body>
</html>
`;
}

const toolsDir = path.join(__dirname, 'tools');
if (!fs.existsSync(toolsDir)) {
  fs.mkdirSync(toolsDir);
}

tools.forEach(tool => {
  const filePath = path.join(toolsDir, tool.file);
  let html = '';
  if (tool.type === 'image') html = imageTemplate(tool);
  else if (tool.type === 'text') html = textTemplate(tool);
  else if (tool.type === 'calculator') html = calculatorTemplate(tool);
  else html = defaultTemplate(tool);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Created: ${tool.file}`);
});

console.log('All tool files generated!'); 