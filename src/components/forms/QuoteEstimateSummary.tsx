import React from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import type { QuoteEstimate } from '../../lib/quote-estimate';

interface Props {
  estimate: QuoteEstimate;
  onRemove: () => void;
}

export const QuoteEstimateSummary: React.FC<Props> = ({ estimate, onRemove }) => (
  <section aria-label="Estimation importée du calculateur" className="quote-imported-estimate">
    <div className="quote-estimate">
      <Calculator size={22} aria-hidden="true" />
      <p>Volume du calculateur : <strong>{estimate.estimatedVolume.toLocaleString('fr-FR')} m³</strong></p>
      <button type="button" onClick={onRemove} aria-label="Retirer l’estimation du calculateur"><RotateCcw size={18} aria-hidden="true" /></button>
    </div>
    <details className="quote-details">
      <summary>Vérifier l’inventaire importé ({estimate.itemsCount} objet{estimate.itemsCount > 1 ? 's' : ''}, {estimate.cartonsCount} carton{estimate.cartonsCount > 1 ? 's' : ''})</summary>
      {estimate.rooms.map((room, index) => (
        <div className="quote-imported-room" key={index}>
          <p><strong>{room.name}</strong></p>
          {room.items?.length ? <ul>{room.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item.name} × {item.quantity} — {(item.volume * item.quantity).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} m³</li>
          ))}</ul> : <p>Le détail des objets n’est pas disponible dans cette ancienne estimation.</p>}
        </div>
      ))}
      <p className="quote-hint">Ce volume reste indicatif. Si vous l’ajustez à l’étape « Vos besoins », l’inventaire importé ci-dessus reste celui du calculateur.</p>
    </details>
  </section>
);
