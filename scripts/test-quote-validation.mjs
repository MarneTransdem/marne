import assert from 'node:assert/strict';
import { isPlausiblePhone } from '../src/lib/quote-validation.ts';

for (const phone of ['01 44 93 54 86', '06.12.34.56.78', '06-12-34-56-78', '+33 (0)6 12 34 56 78', '0033 6 12 34 56 78', '+44 20 7946 0958', ' 06\u00a012\u202f34 56 78 ']) {
  assert.equal(isPlausiblePhone(phone), true, `Usual phone format rejected: ${phone}`);
}
for (const phone of ['', 'abcdefgh', '06 12 ab 56 78', '        ', '01 23 45 6', '+( )-....', '06+12345678', '++33612345678', '1'.repeat(26)]) {
  assert.equal(isPlausiblePhone(phone), false, `Invalid phone format accepted: ${phone}`);
}
console.log('Quote phone validation: usual formats accepted, letters and incomplete numbers rejected.');
