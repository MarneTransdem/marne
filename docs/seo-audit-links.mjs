import fs from 'node:fs';
import {sectorsData} from '../src/constants/sectorsData.ts';
const dir='docs/seo-audit-2026-09-08';
const xml=JSON.parse(fs.readFileSync(dir+'/sitemap-response.json')).body;
const known=new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>new URL(x[1]).pathname));
const refs=sectorsData.flatMap(s=>s.nearbySectors.map(x=>({source:'/demenagement-'+s.slug,target:x.l})));
for(const f of fs.readdirSync('src/pages').filter(x=>x.endsWith('.tsx'))){const t=fs.readFileSync('src/pages/'+f,'utf8');for(const m of t.matchAll(/(?:href|to)="(\/[^"?#]*)"/g))refs.push({source:f,target:m[1]});}
const candidates=[...new Set(refs.filter(x=>!known.has(x.target)&&!x.target.startsWith('/admin')).map(x=>x.target))];
const results=[];let i=0;
await Promise.all(Array.from({length:4},async()=>{while(i<candidates.length){const p=candidates[i++];try{const r=await fetch('https://www.devisdemenagement-paris.com'+p,{redirect:'manual',signal:AbortSignal.timeout(20000)});results.push({target:p,status:r.status,location:r.headers.get('location'),sources:[...new Set(refs.filter(x=>x.target===p).map(x=>x.source))]});await r.body.cancel();}catch(e){results.push({target:p,error:e.message});}}}));
fs.writeFileSync(dir+'/link-targets.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
const assets=[...fs.readFileSync(dir+'/home-initial.html','utf8').matchAll(/(?:src|href)="(\/assets\/[^" ]+)"/g)].map(x=>x[1]);
const sizes=await Promise.all(assets.map(async p=>{const r=await fetch('https://www.devisdemenagement-paris.com'+p);const b=await r.arrayBuffer();return {asset:p,decodedBytes:b.byteLength,encoding:r.headers.get('content-encoding'),cache:r.headers.get('cache-control')};}));
fs.writeFileSync(dir+'/initial-assets.json',JSON.stringify(sizes,null,2));console.log('INITIAL_ASSETS',JSON.stringify(sizes));
