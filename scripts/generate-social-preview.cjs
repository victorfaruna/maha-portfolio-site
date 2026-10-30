/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node asset generator. */
// Render the existing logo unchanged on a white social card. No generated artwork.
const fs = require('node:fs/promises');
const path = require('node:path');
const React = require('react');
const { ImageResponse } = require('next/og');

async function main() {
  const project = path.resolve(__dirname, '..');
  const logo = await fs.readFile(path.join(project, 'public/images/logo.png'));
  const card = React.createElement('div', {
    style: {
      width: '100%', height: '100%', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#ffffff',
    },
  }, React.createElement('img', {
    src: `data:image/png;base64,${logo.toString('base64')}`,
    width: 630, height: 630, alt: 'Maha Jouini logo',
  }));
  const response = new ImageResponse(card, { width: 1200, height: 630 });
  const output = path.join(project, 'public/images/social-logo.png');
  const png = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(output, png);
  console.log(JSON.stringify({ image: output, width: 1200, height: 630, bytes: png.length }));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
