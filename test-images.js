#!/usr/bin/env node

/**
 * Image Testing Script for ohao.tech
 *
 * This script tests image accessibility and helps debug image loading issues
 * Run with: node test-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, 'public', imagePath);
  return fs.existsSync(fullPath);
}

function getImageSize(imagePath) {
  const fullPath = path.join(__dirname, 'public', imagePath);
  try {
    const stats = fs.statSync(fullPath);
    return `${(stats.size / 1024).toFixed(2)} KB`;
  } catch (error) {
    return 'Unknown';
  }
}

function scanDirectory(dirPath) {
  const fullPath = path.join(__dirname, 'public', dirPath);
  try {
    const items = fs.readdirSync(fullPath, { withFileTypes: true });
    return items.map(item => ({
      name: item.name,
      isDirectory: item.isDirectory(),
      path: path.join(dirPath, item.name).replace(/\\/g, '/')
    }));
  } catch (error) {
    return [];
  }
}

function getAllImages() {
  const images = [];

  function scanRecursively(dirPath) {
    const items = scanDirectory(dirPath);

    items.forEach(item => {
      if (item.isDirectory) {
        scanRecursively(item.path);
      } else if (/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(item.name)) {
        images.push(item.path);
      }
    });
  }

  scanRecursively('images');
  return images;
}

function extractImageReferencesFromContent() {
  const references = [];
  const contentDir = path.join(__dirname, 'src', 'content');

  function scanContentDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });

      items.forEach(item => {
        const itemPath = path.join(dirPath, item.name);

        if (item.isDirectory()) {
          scanContentDirectory(itemPath);
        } else if (item.name.endsWith('.md')) {
          const content = fs.readFileSync(itemPath, 'utf8');

          // Find image references in frontmatter and content
          const imageMatches = content.match(/(?:src|cover):\s*["']([^"']*\.(?:png|jpg|jpeg|gif|svg|webp))["']/gi);

          if (imageMatches) {
            imageMatches.forEach(match => {
              const imagePath = match.match(/["']([^"']*)["']/)[1];
              if (imagePath.startsWith('/images/')) {
                references.push({
                  path: imagePath.substring(1), // Remove leading slash
                  file: path.relative(__dirname, itemPath)
                });
              }
            });
          }
        }
      });
    } catch (error) {
      // Directory doesn't exist or can't be read
    }
  }

  scanContentDirectory(contentDir);
  return references;
}

function main() {
  log('🖼️  Image Testing Script for ohao.tech', 'bold');
  log('=====================================', 'blue');
  log('');

  // Check if public/images directory exists
  const imagesDir = path.join(__dirname, 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    log('❌ ERROR: public/images directory not found!', 'red');
    process.exit(1);
  }

  log('✅ public/images directory found', 'green');
  log('');

  // Scan all images in public/images
  log('📁 Scanning all images in public/images:', 'blue');
  const allImages = getAllImages();

  if (allImages.length === 0) {
    log('⚠️  No images found in public/images directory', 'yellow');
  } else {
    log(`Found ${allImages.length} images:`, 'green');

    allImages.forEach(imagePath => {
      const exists = checkImageExists(imagePath);
      const size = exists ? getImageSize(imagePath) : 'N/A';
      const status = exists ? '✅' : '❌';

      log(`  ${status} /${imagePath} (${size})`, exists ? 'green' : 'red');
    });
  }

  log('');

  // Check image references in content files
  log('📄 Checking image references in content files:', 'blue');
  const references = extractImageReferencesFromContent();

  if (references.length === 0) {
    log('⚠️  No image references found in content files', 'yellow');
  } else {
    log(`Found ${references.length} image references:`, 'green');

    let missingCount = 0;

    references.forEach(ref => {
      const exists = checkImageExists(ref.path);
      const status = exists ? '✅' : '❌';

      if (!exists) missingCount++;

      log(`  ${status} /${ref.path}`, exists ? 'green' : 'red');
      log(`      Referenced in: ${ref.file}`, 'blue');
    });

    log('');

    if (missingCount > 0) {
      log(`❌ ${missingCount} missing images found!`, 'red');
    } else {
      log('✅ All referenced images exist!', 'green');
    }
  }

  log('');

  // Test common image paths
  log('🔍 Testing common image paths:', 'blue');
  const commonPaths = [
    'images/avatar.png',
    'images/cover.png',
    'images/placeholder.svg',
    'images/projects/nocturne_ai/ecosystem.svg',
    'images/projects/nocturne_ai/agents.png',
    'images/projects/nocturne_ai/chat.png'
  ];

  commonPaths.forEach(imagePath => {
    const exists = checkImageExists(imagePath);
    const status = exists ? '✅' : '❌';
    const size = exists ? getImageSize(imagePath) : 'N/A';

    log(`  ${status} /${imagePath} (${size})`, exists ? 'green' : 'red');
  });

  log('');

  // Summary
  log('📊 Summary:', 'bold');
  log(`Total images in public/images: ${allImages.length}`, 'blue');
  log(`Total image references in content: ${references.length}`, 'blue');

  const missingRefs = references.filter(ref => !checkImageExists(ref.path));
  if (missingRefs.length > 0) {
    log(`Missing referenced images: ${missingRefs.length}`, 'red');
    log('');
    log('🔧 To fix missing images:', 'yellow');
    missingRefs.forEach(ref => {
      log(`   - Add image: public/${ref.path}`, 'yellow');
      log(`     (referenced in ${ref.file})`, 'yellow');
    });
  } else {
    log('✅ All image references are valid!', 'green');
  }

  log('');
  log('💡 Tips for debugging on Vercel:', 'blue');
  log('   - Check browser developer tools for 404 errors', 'blue');
  log('   - Verify image paths start with "/" in your code', 'blue');
  log('   - Test images directly: https://your-site.vercel.app/images/path/to/image.png', 'blue');
  log('   - Use the ImageDebugger component added to your pages', 'blue');
  log('');
}

main();
