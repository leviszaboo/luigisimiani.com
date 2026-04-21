#!/usr/bin/env node

/**
 * Migration script: Convert category to tags in gallery files
 *
 * Converts:
 *   "category": "digital"  →  "tags": ["digital"]
 *   "category": ["a", "b"] →  "tags": ["a", "b"]
 *
 * Run with: node scripts/migrate-gallery-tags.js
 */

const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '..', 'content', 'gallery');

async function migrateGalleries() {
  console.log('Starting migration: category → tags\n');

  const files = fs.readdirSync(GALLERY_DIR).filter(f => f.endsWith('.json'));
  let modified = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(GALLERY_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    let data;

    try {
      data = JSON.parse(content);
    } catch (e) {
      console.log(`⚠️  Skipping ${file}: Invalid JSON`);
      skipped++;
      continue;
    }

    // Skip if already has tags and no category
    if (data.tags && !data.category) {
      console.log(`✓ ${file}: Already migrated`);
      skipped++;
      continue;
    }

    // Convert category to tags
    if (data.category !== undefined) {
      // Initialize tags array
      if (!data.tags) {
        data.tags = [];
      }

      // Add category values to tags
      if (Array.isArray(data.category)) {
        data.tags = [...new Set([...data.tags, ...data.category])];
      } else if (typeof data.category === 'string' && data.category) {
        data.tags = [...new Set([...data.tags, data.category])];
      }

      // Remove the old category field
      delete data.category;

      // Write back
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
      console.log(`✓ ${file}: Migrated category to tags: [${data.tags.join(', ')}]`);
      modified++;
    } else {
      console.log(`- ${file}: No category field`);
      skipped++;
    }
  }

  console.log(`\n✅ Migration complete: ${modified} modified, ${skipped} skipped`);
}

migrateGalleries().catch(console.error);
