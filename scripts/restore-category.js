#!/usr/bin/env node

/**
 * Restore category field from tags array
 *
 * Takes the first tag and uses it as category (string)
 * Clears tags array for manual layout hints later
 */

const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '..', 'content', 'gallery');

async function restoreCategory() {
  console.log('Restoring category from tags\n');

  const files = fs.readdirSync(GALLERY_DIR).filter(f => f.endsWith('.json'));
  let modified = 0;

  for (const file of files) {
    const filePath = path.join(GALLERY_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    let data;

    try {
      data = JSON.parse(content);
    } catch (e) {
      console.log(`⚠️  Skipping ${file}: Invalid JSON`);
      continue;
    }

    // Get category from tags if it exists
    if (data.tags && data.tags.length > 0 && !data.category) {
      data.category = data.tags[0]; // Use first tag as category
      data.tags = []; // Clear tags for layout hints

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
      console.log(`✓ ${file}: category="${data.category}"`);
      modified++;
    } else if (data.category) {
      // Already has category, just clear tags if they match
      if (data.tags && data.tags.includes(data.category)) {
        data.tags = data.tags.filter(t => t !== data.category);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        console.log(`✓ ${file}: cleared duplicate from tags`);
        modified++;
      } else {
        console.log(`- ${file}: already has category`);
      }
    } else {
      console.log(`- ${file}: no tags to convert`);
    }
  }

  console.log(`\n✅ Done: ${modified} files updated`);
}

restoreCategory().catch(console.error);
