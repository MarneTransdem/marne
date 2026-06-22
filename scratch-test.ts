import { generatePdfBuffer } from './functions/src/pdf-helper.tsx';
import fs from 'fs';

async function run() {
  try {
    console.log('Rendering devis PDF...');
    const buffer = await generatePdfBuffer('devis', {
      id: '123',
      clientName: 'Test Client',
      price: 1000,
      date: '16/06/2026',
      fromCity: 'Paris',
      toCity: 'Creteil',
      volume: 15,
      formula: 'Standard'
    });
    fs.writeFileSync('test_output.pdf', buffer);
    console.log('Successfully wrote test_output.pdf! Size:', buffer.length);
  } catch (err) {
    console.error('Error generating PDF:', err);
  }
}
run();
