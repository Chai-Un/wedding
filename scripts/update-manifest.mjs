import { promises as fs } from 'fs';
import path from 'path';

const manifestPath = '/Users/hoangtran/Desktop/wedding-website/src/assets/images-optimized/manifest.json';

// New entries to add
const newEntries = [
  {
    original: "envelope/envelope_flower_open_1.png",
    orientation: "square",
    preset: "background",
    originalSize: "2646×2646",
    hasAlpha: true,
    variants: [
      {
        size: "sm",
        dimensions: "828×828",
        webp: "envelope/envelope_flower_open_1-sm.webp",
        webpKB: 53
      },
      {
        size: "md",
        dimensions: "1536×1536",
        webp: "envelope/envelope_flower_open_1-md.webp",
        webpKB: 118
      },
      {
        size: "lg",
        dimensions: "1920×1920",
        webp: "envelope/envelope_flower_open_1-lg.webp",
        webpKB: 158
      }
    ]
  },
  {
    original: "envelope/envelope_flower_open.png",
    orientation: "square",
    preset: "background",
    originalSize: "2646×2646",
    hasAlpha: true,
    variants: [
      {
        size: "sm",
        dimensions: "828×828",
        webp: "envelope/envelope_flower_open-sm.webp",
        webpKB: 54
      },
      {
        size: "md",
        dimensions: "1536×1536",
        webp: "envelope/envelope_flower_open-md.webp",
        webpKB: 121
      },
      {
        size: "lg",
        dimensions: "1920×1920",
        webp: "envelope/envelope_flower_open-lg.webp",
        webpKB: 162
      }
    ]
  }
];

async function main() {
  // Read existing manifest
  const manifestContent = await fs.readFile(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestContent);
  
  // Find and update envelope_online entry
  const onlineIndex = manifest.findIndex(item => item.original === "envelope/envelope_online.png");
  if (onlineIndex !== -1) {
    // Add WebP variants to existing entry
    const existing = manifest[onlineIndex];
    if (!existing.variants.some(v => v.webp)) {
      existing.variants = [
        {
          size: "sm",
          dimensions: "640×756",
          webp: "envelope/envelope_online-sm.webp",
          png: existing.variants.find(v => v.size === "sm")?.png,
          webpKB: 28,
          pngKB: existing.variants.find(v => v.size === "sm")?.pngKB
        },
        {
          size: "md",
          dimensions: "1024×1209",
          webp: "envelope/envelope_online-md.webp",
          png: existing.variants.find(v => v.size === "md")?.png,
          webpKB: 51,
          pngKB: existing.variants.find(v => v.size === "md")?.pngKB
        },
        {
          size: "lg",
          dimensions: "1600×1889",
          webp: "envelope/envelope_online-lg.webp",
          png: existing.variants.find(v => v.size === "lg")?.png,
          webpKB: 67,
          pngKB: existing.variants.find(v => v.size === "lg")?.pngKB
        }
      ];
    }
    console.log('✓ Updated envelope_online with WebP variants');
  }
  
  // Find and update envelope_open entry (or create if not exists)
  const openIndex = manifest.findIndex(item => item.original === "envelope/envelope_open.png");
  if (openIndex !== -1) {
    // Update existing
    manifest[openIndex].variants = [
      {
        size: "sm",
        dimensions: "828×828",
        webp: "envelope/envelope_open-sm.webp",
        webpKB: 44
      },
      {
        size: "md",
        dimensions: "1536×1536",
        webp: "envelope/envelope_open-md.webp",
        webpKB: 94
      },
      {
        size: "lg",
        dimensions: "1920×1920",
        webp: "envelope/envelope_open-lg.webp",
        webpKB: 119
      }
    ];
    console.log('✓ Updated envelope_open with WebP variants');
  } else {
    // Add new entry
    manifest.push({
      original: "envelope/envelope_open.png",
      orientation: "square",
      preset: "background",
      originalSize: "3000×3000",
      hasAlpha: true,
      variants: [
        {
          size: "sm",
          dimensions: "828×828",
          webp: "envelope/envelope_open-sm.webp",
          webpKB: 44
        },
        {
          size: "md",
          dimensions: "1536×1536",
          webp: "envelope/envelope_open-md.webp",
          webpKB: 94
        },
        {
          size: "lg",
          dimensions: "1920×1920",
          webp: "envelope/envelope_open-lg.webp",
          webpKB: 119
        }
      ]
    });
    console.log('✓ Added envelope_open entry');
  }
  
  // Add new flower envelope entries
  for (const entry of newEntries) {
    const exists = manifest.some(item => item.original === entry.original);
    if (!exists) {
      manifest.push(entry);
      console.log(`✓ Added ${entry.original}`);
    } else {
      console.log(`  Already exists: ${entry.original}`);
    }
  }
  
  // Write updated manifest
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('\n✅ Manifest updated successfully!');
}

main().catch(console.error);
