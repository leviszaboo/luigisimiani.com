const fs = require('fs');
const path = require('path');

const galleriesDir = './public/images/galleries';
const folders = fs.readdirSync(galleriesDir).filter(f => {
  const stat = fs.statSync(path.join(galleriesDir, f));
  return stat.isDirectory() && !f.startsWith('.');
});

const galleries = folders.map((folder, index) => {
  const folderPath = path.join(galleriesDir, folder);
  const files = fs.readdirSync(folderPath)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort((a, b) => {
      // Sort numerically if possible
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      return numA - numB;
    });

  const slug = folder.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const isAnalog = folder === 'GALLERY';

  return {
    id: slug,
    category: isAnalog ? 'analog' : 'digital',
    title: folder.replace(/-/g, ' '),
    subTitle: '',
    coverPhoto: files.length > 0 ? `/images/galleries/${encodeURIComponent(folder)}/${encodeURIComponent(files[0])}` : '',
    imageUrls: files.map(f => `/images/galleries/${encodeURIComponent(folder)}/${encodeURIComponent(f)}`),
    imageAspectRatios: files.map(() => 1.5),
    order: index + 1
  };
});

fs.writeFileSync('./content/galleries.json', JSON.stringify(galleries, null, 2));
console.log(`Generated ${galleries.length} galleries`);
galleries.forEach(g => console.log(`  - ${g.title} (${g.imageUrls.length} images)`));
