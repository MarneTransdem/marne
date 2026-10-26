import assert from 'node:assert/strict';
import { auditInitialHtml } from './initial-html-audit.mjs';

assert.deepEqual(auditInitialHtml('<main><!--$--><h1>Paris</h1><a href="/demande-de-devis">Devis</a><!--/$--></main>'), []);
assert.deepEqual(auditInitialHtml('<main><h1>Devis</h1><div hidden><input name="website"></div></main>'), [], 'normal hidden form controls are allowed');
const streamed = '<main><!--$?--><template id="B:0"></template><p>Chargement</p><!--/$--></main><div hidden id="S:0"><h1>Paris</h1><a href="/demande-de-devis">Devis</a></div>';
assert.equal(auditInitialHtml(streamed).length, 3, 'an h1 outside main in a hidden segment must not pass');
assert(auditInitialHtml('<main><!--$!--><h1>Fallback</h1><!--/$--></main>').includes('unresolved Suspense boundary in initial HTML'));
assert(auditInitialHtml('<h1>Outside main</h1>').includes('initial main content has no h1'));
console.log('Initial HTML audit: complete content accepted; streamed, missing and failed content rejected.');
