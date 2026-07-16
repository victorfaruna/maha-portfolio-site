const fs = require('fs');
let svg = fs.readFileSync('public/images/possible.svg', 'utf8');
// Crop viewBox tightly around the letters (they sit around y=190-270, x=270-590)
svg = svg.replace(/viewBox="[^"]*"/, 'viewBox="270 188 320 78"');
fs.writeFileSync('public/images/possible.svg', svg);
console.log('done - new viewBox applied');
