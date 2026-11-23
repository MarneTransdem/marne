import assert from 'node:assert/strict';
import { getEstimateFields, parseQuoteEstimate, removeEstimateFields, shouldRestoreEstimate } from '../src/lib/quote-estimate.ts';

const saved = { estimatedVolume: 12.5, cartonsCount: 8, itemsCount: 4, rooms: [{ name: 'Salon' }], recommendedVolume: 13 };
assert.deepEqual(parseQuoteEstimate(JSON.stringify(saved)), saved);
for (const value of ['{', 'null', '{}', JSON.stringify({ ...saved, rooms: [null] }), JSON.stringify({ ...saved, estimatedVolume: -1 }), JSON.stringify({ ...saved, itemsCount: '4' })]) {
  assert.equal(parseQuoteEstimate(value), null, `Invalid stored draft accepted: ${value}`);
}
assert.equal(shouldRestoreEstimate(new URLSearchParams('volume=30')), false);
assert.equal(shouldRestoreEstimate(new URLSearchParams('volume=60%2B')), false);
assert.equal(shouldRestoreEstimate(new URLSearchParams('formula=standard')), true);
const imported = getEstimateFields(saved);
assert.deepEqual(removeEstimateFields({ ...imported, fromCity: 'Paris' }, saved), { volume: '', message: '', fromCity: 'Paris' });
const edited = { volume: '30 m³', message: 'Un piano à transporter.', fromCity: 'Paris' };
assert.deepEqual(removeEstimateFields(edited, saved), edited);
const appended = { ...imported, message: imported.message + '\nUn piano à transporter.' };
assert.deepEqual(removeEstimateFields(appended, saved), { ...appended, volume: '' });
assert.deepEqual(removeEstimateFields({ ...imported, volume: '30 m³' }, saved), { volume: '30 m³', message: '' });
console.log('Quote estimate: explicit volume wins; removing a draft preserves customer edits; invalid storage is ignored.');

const detailed = { ...saved, rooms: [{ name: 'Salon', items: [{ name: 'Canapé 2 places', quantity: 1, volume: 1.2 }] }] };
assert.deepEqual(parseQuoteEstimate(JSON.stringify(detailed)), detailed, 'Detailed inventory must survive import');
for (const item of [null, { name: 'Canapé', quantity: -1, volume: 1.2 }, { name: 'Canapé', quantity: 1, volume: '1.2' }]) {
  assert.equal(parseQuoteEstimate(JSON.stringify({ ...saved, rooms: [{ name: 'Salon', items: [item] }] })), null);
}
console.log('Detailed inventory is retained; malformed item details are rejected; legacy room-only drafts remain supported.');
