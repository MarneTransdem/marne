import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trackConversion } from '../../lib/public-analytics';

export function QuotePreparation() {
  return (
    <section aria-labelledby="home-quote-heading" className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 id="home-quote-heading" className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-white mb-6">Votre devis de déménagement à Paris et en Île-de-France</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5">Un appartement sans ascenseur, une maison avec un accès éloigné du camion ou des bureaux à transférer ne demandent pas la même organisation. Pour préparer votre devis, nous examinons le volume, le trajet, les accès et les prestations souhaitées.</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-7">Vous préparez votre budget ? Notre <Link className="underline underline-offset-4 font-semibold" to="/blog/combien-coute-demenagement-paris">guide du prix d’un déménagement à Paris</Link> explique les critères à comparer. Le chiffrage de votre projet dépend ensuite de votre situation.</p>
            <Link to="/demande-de-devis" onClick={() => trackConversion('quote_cta_click', { placement: 'home_quote_preparation' })} className="inline-flex items-center gap-3 bg-brand-900 dark:bg-accent text-white dark:text-brand-900 px-6 py-4 rounded-xl font-bold">Préparer mon devis de déménagement <ArrowRight size={20} aria-hidden="true" className="shrink-0" /></Link>
          </div>
          <ol className="space-y-6">
            <li className="border-b border-slate-200 dark:border-slate-700 pb-6"><h3 className="text-xl font-bold text-brand-900 dark:text-white mb-2">1. Décrire le trajet et les accès</h3><p className="text-slate-600 dark:text-slate-300 leading-relaxed">Précisez les villes de départ et d’arrivée, la date envisagée, les étages et les ascenseurs. Signalez les difficultés de stationnement ou de passage des meubles.</p></li>
            <li className="border-b border-slate-200 dark:border-slate-700 pb-6"><h3 className="text-xl font-bold text-brand-900 dark:text-white mb-2">2. Estimer les biens à transporter</h3><p className="text-slate-600 dark:text-slate-300 leading-relaxed">Recensez meubles, cartons et objets particuliers. Utilisez notre <Link to="/calculateur-volume" className="underline underline-offset-4 font-semibold">calculateur de volume en m³</Link> pour préparer une première estimation.</p></li>
            <li><h3 className="text-xl font-bold text-brand-900 dark:text-white mb-2">3. Choisir votre accompagnement</h3><p className="text-slate-600 dark:text-slate-300 leading-relaxed">Comparez les <Link to="/formules-demenagement" className="underline underline-offset-4 font-semibold">formules de déménagement</Link> et indiquez vos besoins d’emballage, de démontage ou de stockage. Les prestations retenues doivent figurer dans votre devis.</p></li>
          </ol>
        </div>
      </div>
    </section>
  );
}
