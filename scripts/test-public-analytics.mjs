import { build } from 'esbuild';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const result = await build({ entryPoints: ['src/lib/public-analytics.ts'], bundle: true, write: false, platform: 'node', format: 'cjs', define: { 'import.meta.env': JSON.stringify({ VITE_GA_MEASUREMENT_ID: 'G-TEST', VITE_GOOGLE_ADS_CONVERSION_ID: 'AW-TEST', VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL: 'test' }) } });
function harness(consent = 'accepted', referrer = 'https://www.google.fr/search?q=private') {
  const entries = new Map([['cookie-consent', consent]]);
  const session = new Map();
  const storage = map => ({ getItem:k=>map.get(k)||null, setItem:(k,v)=>map.set(k,v), removeItem:k=>map.delete(k) });
  const scripts=[];
  const window={location:new URL('https://www.devisdemenagement-paris.com/calculateur-volume?fromAddress=PRIVATE#private'),localStorage:storage(entries),sessionStorage:storage(session),dispatchEvent(){},addEventListener(){}};
  const document={referrer,querySelector:()=>null,createElement:()=>({remove(){}}),head:{appendChild:s=>scripts.push(s)}};
  const context={window,document,URL,URLSearchParams,console,module:{exports:{}},exports:{},CustomEvent:class{},require:()=>{throw Error('Unexpected Firebase or network dependency');}};
  vm.runInNewContext(result.outputFiles[0].text,context);
  const api=context.module.exports;
  const calls=()=>Array.from(window.dataLayer||[],args=>Array.from(args));
  return {api,window,scripts,session,calls};
}
let h=harness('declined');
await h.api.trackEvent('phone_click');
h.api.trackConversion('quote_form_submit',{},'q1');
assert.equal(h.scripts.length,0);
assert.equal(h.calls().length,0);
assert.equal(h.api.getVisitAttribution(),null);
for (const origin of ['http://localhost:4188', 'http://127.0.0.1:4188', 'https://marne--marnetransdem20.europe-west4.hosted.app']) {
  const preview=harness();
  preview.window.location=new URL(origin+'/demande-de-devis');
  await preview.api.trackEvent('quote_form_start');
  preview.api.trackConversion('quote_form_submit',{},'preview-id');
  assert.equal(preview.scripts.length,0,'preview must not load production analytics');
  assert.equal(preview.calls().length,0,'preview must not send GA4 or Ads events');
}
h=harness();
const pending=h.api.trackEvent('page_view',{from_city:'PRIVATE',subject:'PRIVATE',page_location:'PRIVATE',placement:'hero'});
assert.equal(h.scripts.length,1);
h.scripts[0].onload(); await pending;
assert.equal(h.calls().filter(c=>c[0]==='event'&&c[1]==='page_view').length,1);
assert(!JSON.stringify(h.calls()).includes('PRIVATE'));
assert(!JSON.stringify(h.calls()).includes('search?q'));
assert.equal(h.api.getVisitAttribution().acquisition_channel,'organic_search');
h.window.location=new URL('https://www.devisdemenagement-paris.com/demande-de-devis?email=PRIVATE');
assert.equal(h.api.getVisitAttribution().landing_page,'/calculateur-volume');
h.api.trackConversion('phone_click');
h.api.trackConversion('quote_form_submit',{},'q1');
h.api.trackConversion('quote_form_submit',{},'q1');
await new Promise(r=>setImmediate(r));
assert.equal(h.calls().filter(c=>c[1]==='generate_lead').length,1);
assert.equal(h.calls().filter(c=>c[1]==='conversion').length,1);
const count=h.calls().filter(c=>c[0]==='event').length;
h.api.setAnalyticsConsent('declined');
await h.api.trackEvent('page_view');
assert.equal(h.calls().filter(c=>c[0]==='event').length,count);
assert.equal(h.session.size,0);
// Revocation while the external script is still loading must cancel queued events.
h=harness(); const queued=h.api.trackEvent('generate_lead');
h.api.setAnalyticsConsent('declined'); h.scripts[0].onload(); await queued;
assert.equal(h.calls().filter(c=>c[0]==='event').length,0);
h=harness(); h.window.location=new URL('https://www.devisdemenagement-paris.com/signature-devis/private-token');
await h.api.trackEvent('page_view'); assert.equal(h.scripts.length,0);
h=harness(); h.window.location=new URL('https://www.devisdemenagement-paris.com/?utm_source=PRIVATE&utm_medium=cpc');
assert.equal(h.api.getVisitAttribution().acquisition_channel,'paid');
assert(!JSON.stringify([...h.session]).includes('PRIVATE'));
h=harness(); h.window.localStorage.getItem=()=>{throw Error('blocked storage');};
await h.api.trackEvent('page_view'); assert.equal(h.scripts.length,0);
console.log('Analytics: consent, revocation, single dispatch, deduplication, URL privacy and attribution passed.');

// A form attempt never stores field content or replays pre-consent interactions.
const progressBuild=await build({entryPoints:['src/lib/quote-progress.ts'],bundle:true,write:false,platform:'node',format:'cjs'});
const progressContext={module:{exports:{}},exports:{},Set};
vm.runInNewContext(progressBuild.outputFiles[0].text,progressContext);
let progressConsent=false;
const progressCalls=[];
const progressTracker=progressContext.module.exports.createQuoteProgressTracker({hasConsent:()=>progressConsent,send:event=>progressCalls.push(event)});
progressTracker.start(); progressTracker.reachStep(2);
assert.equal(progressCalls.length,0);
progressConsent=true;
progressTracker.start(); progressTracker.start(); progressTracker.reachStep(2); progressTracker.reachStep(3); progressTracker.reachStep(2);
assert.deepEqual(progressCalls,['quote_form_start','quote_step_2_view','quote_step_3_view']);
progressConsent=false;
const laterTracker=progressContext.module.exports.createQuoteProgressTracker({hasConsent:()=>progressConsent,send:event=>progressCalls.push(event)});
laterTracker.start(); laterTracker.reachStep(3);
assert.equal(progressCalls.length,3);
progressConsent=true;
laterTracker.reachStep(0); laterTracker.reachStep(4);
assert.equal(progressCalls.length,3);
laterTracker.start(); laterTracker.reachStep(3);
assert.deepEqual(progressCalls.slice(3),['quote_form_start','quote_step_3_view'],'a late grant must not invent an unseen step 2');
const unavailableTracker=progressContext.module.exports.createQuoteProgressTracker({hasConsent:()=>{throw Error('storage unavailable');},send:()=>assert.fail('must not send')});
assert.doesNotThrow(()=>unavailableTracker.start());
console.log('Quote progress: consent, step deduplication, late grant, no replay and unavailable analytics passed.');

// Exercise the actual form submit handler with mocked persistence and notification.
const realFormHelpers = new Set(['../../lib/quote-validation', '../../lib/quote-estimate', '../../lib/quote-progress']);
const formBuild=await build({entryPoints:['src/components/forms/QuoteForm.tsx'],bundle:true,write:false,platform:'node',format:'cjs',plugins:[{name:'mock-imports',setup(b){b.onResolve({filter:/.*/},a=>a.kind==='entry-point'||realFormHelpers.has(a.path)?undefined:{path:a.path,external:true});}}]});
async function checkForm({failSave=false,failEmail=false,activeStep=3,invalid=false,progressOnly=false}={}) {
  const progressEvents=[];
  let saves=0,emails=0,leads=0,errors=0;
  let resolveSave;
  const waitSave=new Promise(r=>resolveSave=r);
  const states=[], refs=[], effects=[];
  let stateIndex=0,refIndex=0,focused=0,scrolled=0;
  const react={useState(initial){const index=stateIndex++;if(!(index in states))states[index]=initial?.consent===false?{...initial,fullName:'Test User',phone:invalid?'':'0100000000',email:'test@example.test',consent:!invalid,date:'2026-10-20'}:initial === 1 ? activeStep : initial;return[states[index],update=>{states[index]=typeof update==='function'?update(states[index]):update;}];},useEffect(effect){effects.push(effect);},useRef(value){const index=refIndex++;return refs[index]??=( {current:value} );},createElement:(type,props,...children)=>({type,props,children})};
  const mocks={react,'motion/react':{motion:{div:'div'},AnimatePresence:'div'},'lucide-react':{},'react-router-dom':{Link:'a',useSearchParams:()=>[new URLSearchParams()]},'../../lib/firebase':{db:{}},'firebase/firestore':{collection:()=>({}),serverTimestamp:()=>0,addDoc:async(collection,data)=>{assert.equal(data.date,'','an unconfirmed date must not reach the CRM');assert.equal(data.fromElevator,'À préciser');assert.equal(data.needsPacking,'À préciser');saves++;await waitSave;if(failSave)throw Error('save failed');return{id:'saved-id'};}},'../../lib/firestore-errors':{OperationType:{CREATE:'create'},handleFirestoreError:()=>errors++},'@vis.gl/react-google-maps':{useMapsLibrary:()=>null},'../../lib/public-analytics':{getVisitAttribution:()=>null,hasAnalyticsConsent:()=>progressOnly,trackEvent:(name,params)=>progressEvents.push({name,params}),trackConversion:(action,params,id)=>{assert.equal(id,'saved-id');leads++;}}};
  const context={module:{exports:{}},exports:{},require:n=>{if(!(n in mocks))throw Error(n);return mocks[n];},console:{warn(){},error(){}},window:{scrollTo(){assert.fail('confirmation must not send the user back to the page top');}},document:{querySelector:()=>null},localStorage:{getItem:()=>null,removeItem(){}},fetch:async()=>{emails++;if(failEmail)throw Error('notification offline');return{ok:true};},URLSearchParams};
  mocks['react/jsx-runtime']={jsx:(type,props)=>({type,props,children:[props?.children]}),jsxs:(type,props)=>({type,props,children:[props?.children]})};
  vm.runInNewContext(formBuild.outputFiles[0].text,context);
  const tree=context.module.exports.QuoteForm();
  const find=node=>{if(!node||typeof node!=='object')return null;if(node.type==='form')return node;for(const child of (node.children||[]).flat(Infinity)){const found=find(child);if(found)return found;}return null;};
  const form=find(tree);assert(form);
  if (progressOnly) {
    form.props.onChangeCapture({target:{name:'website',value:'PRIVATE'}});
    assert.equal(progressEvents.length,0,'honeypot is not a user start');
    form.props.onChangeCapture({target:{name:'fromAddress',value:'PRIVATE'}});
    form.props.onChangeCapture({target:{name:'email',value:'PRIVATE'}});
    assert.deepEqual(progressEvents.map(x=>x.name),['quote_form_start','quote_step_2_view']);
    assert(!JSON.stringify(progressEvents).includes('PRIVATE'));
    assert.equal(saves,0); assert.equal(emails,0); assert.equal(leads,0);
    return;
  }
  const first=form.props.onSubmit({preventDefault(){}});
  await form.props.onSubmit({preventDefault(){}});
  if (activeStep < 3 || invalid) { assert.equal(saves,0); assert.equal(emails,0); assert.equal(leads,0); return; }
  assert.equal(saves,1,'concurrent submit must not create a second record');
  resolveSave(); await first;
  assert.equal(leads,failSave?0:1); assert.equal(emails,failSave?0:1); assert.equal(errors,failSave?1:0);
  stateIndex=0;refIndex=0;effects.length=0;
  const result=context.module.exports.QuoteForm();
  const findHeading=node=>{if(!node||typeof node!=='object')return null;if(node.type==='h2')return node;for(const child of(node.children||[]).flat(Infinity)){const found=findHeading(child);if(found)return found;}return null;};
  const confirmation=findHeading(result);
  assert.equal(Boolean(confirmation),!failSave,'only a saved request displays confirmation');
  if(confirmation){
    assert.equal(confirmation.props.tabIndex,-1);
    confirmation.props.ref.current={focus(options){assert.equal(options.preventScroll,true);focused++;},closest(){return{scrollIntoView(options){assert.equal(options.block,'start');scrolled++;}};}};
  }
  effects.forEach(effect=>effect());
  assert.equal(focused,failSave?0:1,'saved confirmation receives keyboard focus, including after email failure');
  assert.equal(scrolled,failSave?0:1,'saved confirmation is brought into view');
}
await checkForm({activeStep:1}); await checkForm({activeStep:2}); await checkForm({invalid:true});
await checkForm(); await checkForm({failEmail:true}); await checkForm({failSave:true});
await checkForm({activeStep:2,progressOnly:true});
console.log('Quote handler: confirmed save, failed save, notification failure and concurrent submit passed.');

// Exercise URL prefill through the actual component effects without submitting a lead.
for (const requested of ['economique', 'standard', 'luxe', 'unexpected', '']) {
  let data;
  const effects = [];
  const react = {
    useState(initial) {
      if (initial?.consent === false) {
        data = { ...initial, email: 'existing@example.test', formula: 'je ne sais pas' };
        return [data, update => { data = typeof update === 'function' ? update(data) : update; }];
      }
      return [initial, () => {}];
    },
    useEffect(effect) { effects.push(effect); }, useRef: value => ({ current: value }),
    createElement: (type, props, ...children) => ({ type, props, children }),
  };
  const mocks = {
    react, 'motion/react': { motion: { div: 'div' }, AnimatePresence: 'div' }, 'lucide-react': {},
    'react-router-dom': { Link: 'a', useSearchParams: () => [new URLSearchParams({ formula: requested })] },
    '../../lib/firebase': { db: {} }, 'firebase/firestore': {}, '../../lib/firestore-errors': {},
    '@vis.gl/react-google-maps': { useMapsLibrary: () => null }, '../../lib/public-analytics': {},
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
  };
  const context = { module: { exports: {} }, exports: {}, require: name => {
    if (!(name in mocks)) throw Error(name); return mocks[name];
  }, localStorage: { getItem: () => null }, URLSearchParams };
  vm.runInNewContext(formBuild.outputFiles[0].text, context);
  context.module.exports.QuoteForm();
  effects.forEach(effect => effect());
  assert.equal(data.formula, ['economique', 'standard', 'luxe'].includes(requested) ? requested : 'je ne sais pas');
  assert.equal(data.email, 'existing@example.test', 'prefill must preserve existing form fields');
}
console.log('Formula handoff: three valid selections applied, invalid values ignored, existing fields preserved.');
