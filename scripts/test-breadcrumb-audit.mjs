import assert from 'node:assert/strict';
import { auditBreadcrumbNames } from './breadcrumb-audit.mjs';

const trail = names => ({ '@type': 'BreadcrumbList', itemListElement: names.map((name, index) => ({ '@type': 'ListItem', position: index + 1, name })) });
assert.deepEqual(auditBreadcrumbNames(trail(['Accueil', 'Longue distance'])), []);
// Regression from Search Console: the final item had no name.
assert.equal(auditBreadcrumbNames(trail(['Accueil', 'Longue distance', ''])).length, 1);
assert.equal(auditBreadcrumbNames({ '@graph': [trail(['Accueil', '   '])] }).length, 1);
assert.equal(auditBreadcrumbNames([trail(['Accueil', 'Services']), trail(['Accueil', null])]).length, 1);
assert.deepEqual(auditBreadcrumbNames({ '@type': 'BreadcrumbList', itemListElement: [{ name: 'Accueil' }, { item: { '@id': 'https://example.com/service', name: 'Service' } }] }), []);
assert.equal(auditBreadcrumbNames({ '@type': 'BreadcrumbList' }).length, 1);
assert.deepEqual(auditBreadcrumbNames({ '@type': 'Organization', name: '' }), []);
console.log('Breadcrumb name audit: historical missing-label regression, arrays, graphs and nested labels passed.');
