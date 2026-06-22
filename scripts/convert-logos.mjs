import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

async function convertLogos() {
  try {
    console.log('Converting logo-clair.webp to logo-clair.png...');
    await sharp(path.join(publicDir, 'images/logo-clair.webp'))
      .png()
      .toFile(path.join(publicDir, 'images/logo-clair.png'));
    console.log('Successfully created logo-clair.png');

    console.log('Converting logo-sombre.webp to logo-sombre.png...');
    await sharp(path.join(publicDir, 'images/logo-sombre.webp'))
      .png()
      .toFile(path.join(publicDir, 'images/logo-sombre.png'));
    console.log('Successfully created logo-sombre.png');
  } catch (error) {
    console.error('Error converting logos:', error);
  }
}

convertLogos();
