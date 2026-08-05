const fs = require('fs');

let content = fs.readFileSync('src/app/about/page.tsx', 'utf8');

// Replace unescaped characters in text
content = content
  .replace(/people's/g, "people&apos;s")
  .replace(/I've/g, "I&apos;ve")
  .replace(/I'm/g, "I&apos;m")
  .replace(/Tunisia's/g, "Tunisia&apos;s")
  .replace(/continent's/g, "continent&apos;s")
  .replace(/world's/g, "world&apos;s")
  .replace(/Mauritania's/g, "Mauritania&apos;s")
  .replace(/women's/g, "women&apos;s")
  .replace(/UNESCO's/g, "UNESCO&apos;s")
  .replace(/Jouini's/g, "Jouini&apos;s")
  .replace(/l'esprit/g, "l&apos;esprit")
  .replace(/North Africa's/g, "North Africa&apos;s")
  .replace(/"The future of AI will not be built by one region alone. It must be co-created by the communities it seeks to serve."/g, "&quot;The future of AI will not be built by one region alone. It must be co-created by the communities it seeks to serve.&quot;")
  .replace(/"Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself."/g, "&quot;Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.&quot;");

fs.writeFileSync('src/app/about/page.tsx', content);
