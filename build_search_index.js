const fs = require('fs');
const path = require('path');

function getFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const subjectNames = {
  "constitucional": "Constitucional II",
  "civil-ii": "Direito Civil II",
  "civil-iii": "Direito Civil III",
  "direito-digital": "Direito Digital",
  "direitos-humanos": "Direitos Humanos",
  "penal-ii": "Direito Penal II",
  "penal-iii": "Direito Penal III",
  "processo-civil": "Direito Processual Civil I",
  "direito-do-trabalho": "Direito do Trabalho",
  "psicologia-juridica": "Psicologia Jurídica"
};

function cleanText(text) {
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

const htmlFiles = getFiles('./subjects');
const allPills = [];

htmlFiles.forEach(filepath => {
  const normalizedPath = filepath.replace(/\\/g, '/');
  const filename = path.basename(normalizedPath);
  if (filename === 'index.html') return;

  const parts = normalizedPath.split('/');
  const subjectDir = parts[parts.indexOf('subjects') + 1];
  const subjectName = subjectNames[subjectDir] || subjectDir.replace(/-/g, ' ');

  const content = fs.readFileSync(filepath, 'utf8');

  // Extract page title
  let summaryTitle = 'Resumo';
  const titleMatch = content.match(/<title>(.*?)<\/title>/i) || content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (titleMatch) {
    summaryTitle = cleanText(titleMatch[1]).split(/[-–|]/)[0].trim();
  }

  const relativeUrl = `subjects/${subjectDir}/${filename}`;

  // Match all <section id="...">...</section>
  const sectionRegex = /<section\s+[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const secId = match[1];
    const secContent = match[2];

    // Extract H2
    let secTitle = secId.charAt(0).toUpperCase() + secId.slice(1);
    const h2Match = secContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (h2Match) {
      secTitle = cleanText(h2Match[1]);
    }

    const plainText = cleanText(secContent);
    const excerpt = plainText.length > 160 ? plainText.substring(0, 160) + '...' : plainText;

    // generate simple tags
    const words = plainText.toLowerCase().match(/[a-zà-ú]{4,}/g) || [];
    const stopWords = new Set(["para", "como", "uma", "mais", "com", "por", "dos", "das", "sua", "seu", "pelo", "pela", "este", "esta", "isso", "sobre", "entre"]);
    const tags = Array.from(new Set(words.filter(w => !stopWords.has(w)))).slice(0, 12).join(' ');

    allPills.push({
      id: secId,
      subject: subjectName,
      summaryTitle: summaryTitle,
      url: relativeUrl,
      title: secTitle,
      excerpt: excerpt,
      content: plainText,
      tags: tags
    });
  }
});

const outputContent = `// Generated automatically. Do not edit manually.\nwindow.SEARCH_INDEX = ${JSON.stringify(allPills, null, 2)};\n`;
fs.writeFileSync('./search-index.js', outputContent, 'utf8');
console.log(`Generated search-index.js with ${allPills.length} search pills.`);
