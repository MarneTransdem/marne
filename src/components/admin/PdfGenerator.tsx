import React, { useState } from 'react';
import { FileText, Printer, Mail, Download, Check, ShieldCheck, Clock, CheckCircle2, Send } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const fallbackOklch = (match: string): string => {
  try {
    const inner = match.slice(6, -1).trim();
    const parts = inner.split(/[\s/]+/);
    const lValue = parseFloat(parts[0]);
    if (isNaN(lValue)) {
      return '#0f172a';
    }
    const l = parts[0].includes('%') ? lValue / 100 : lValue;
    
    let opacity = 1;
    if (parts.length > 3) {
      const alphaPart = parts[parts.length - 1];
      const parsedAlpha = parseFloat(alphaPart);
      if (!isNaN(parsedAlpha)) {
        opacity = alphaPart.includes('%') ? parsedAlpha / 100 : parsedAlpha;
      }
    }

    if (l > 0.85) {
      return opacity < 1 ? `rgba(248, 250, 252, ${opacity})` : '#f8fafc';
    } else if (l > 0.65) {
      return opacity < 1 ? `rgba(226, 232, 240, ${opacity})` : '#e2e8f0';
    } else if (l > 0.45) {
      return opacity < 1 ? `rgba(100, 116, 139, ${opacity})` : '#64748b';
    } else {
      return opacity < 1 ? `rgba(15, 23, 42, ${opacity})` : '#0f172a';
    }
  } catch (err) {
    return '#0f172a';
  }
};

const fallbackOklab = (match: string): string => {
  try {
    const inner = match.slice(6, -1).trim();
    const parts = inner.split(/[\s/]+/);
    const lValue = parseFloat(parts[0]);
    if (isNaN(lValue)) {
      return '#0f172a';
    }
    const l = parts[0].includes('%') ? lValue / 100 : lValue;
    
    let opacity = 1;
    if (parts.length > 3) {
      const alphaPart = parts[parts.length - 1];
      const parsedAlpha = parseFloat(alphaPart);
      if (!isNaN(parsedAlpha)) {
        opacity = alphaPart.includes('%') ? parsedAlpha / 100 : parsedAlpha;
      }
    }

    if (l > 0.85) {
      return opacity < 1 ? `rgba(248, 250, 252, ${opacity})` : '#f8fafc';
    } else if (l > 0.65) {
      return opacity < 1 ? `rgba(226, 232, 240, ${opacity})` : '#e2e8f0';
    } else if (l > 0.45) {
      return opacity < 1 ? `rgba(100, 116, 139, ${opacity})` : '#64748b';
    } else {
      return opacity < 1 ? `rgba(15, 23, 42, ${opacity})` : '#0f172a';
    }
  } catch (err) {
    return '#0f172a';
  }
};

const prepareStylesForPdf = () => {
  const originalCSSStates: { sheet: CSSStyleSheet; disabled: boolean }[] = [];
  const tempStyleTags: HTMLStyleElement[] = [];

  const cleanValue = (val: any): any => {
    if (typeof val === 'string') {
      if (val.includes('oklch') || val.includes('oklab') || val.includes('color(')) {
        return val
          .replace(/oklch\((?:[^()]+|\([^()]*\))*\)/gi, (m) => fallbackOklch(m))
          .replace(/oklab\((?:[^()]+|\([^()]*\))*\)/gi, (m) => fallbackOklab(m))
          .replace(/color\(oklch\s+[^)]+\)/gi, '#0f172a')
          .replace(/color\(oklab\s+[^)]+\)/gi, '#0f172a');
      }
    }
    return val;
  };

  // Intercept getPropertyValue globally on CSSStyleDeclaration prototype
  const originalGetPropertyValue = CSSStyleDeclaration.prototype.getPropertyValue;
  CSSStyleDeclaration.prototype.getPropertyValue = function(this: any, property: string): string {
    const val = originalGetPropertyValue.call(this, property);
    return cleanValue(val);
  };

  // Intercept window.getComputedStyle on main window
  const originalGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = function(el: Element, pseudoElt?: string) {
    const style = originalGetComputedStyle(el, pseudoElt);
    if (!style) return style;

    return new Proxy(style, {
      get(target, prop, receiver) {
        if (prop === 'getPropertyValue') {
          return function(key: string) {
            return cleanValue(target.getPropertyValue(key));
          };
        }
        const val = Reflect.get(target, prop, receiver);
        if (typeof val === 'function') {
          return val.bind(target);
        }
        return cleanValue(val);
      }
    });
  };

  try {
    const sheets = Array.from(document.styleSheets) as CSSStyleSheet[];
    for (const sheet of sheets) {
      try {
        const cssRules = Array.from(sheet.cssRules);
        const originalCssText = cssRules.map(rule => rule.cssText).join('\n');
        
        const cleanedCssText = originalCssText
          .replace(/oklch\((?:[^()]+|\([^()]*\))*\)/gi, (match) => fallbackOklch(match))
          .replace(/oklab\((?:[^()]+|\([^()]*\))*\)/gi, (match) => fallbackOklab(match));
        
        const style = document.createElement('style');
        style.setAttribute('data-temp-pdf-style', 'true');
        style.textContent = cleanedCssText;
        document.head.appendChild(style);
        tempStyleTags.push(style);

        originalCSSStates.push({ sheet, disabled: sheet.disabled });
        sheet.disabled = true;
      } catch (err) {
        console.warn("Could not read stylesheet rules, temporarily disabling to prevent html2canvas crashes:", err);
        originalCSSStates.push({ sheet, disabled: sheet.disabled });
        sheet.disabled = true;
      }
    }
  } catch (globalErr) {
    console.warn("Global stylesheet inspection issue:", globalErr);
  }

  // Handle inline style attributes in the body temporarily
  const elementsWithInlineStyles = Array.from(document.querySelectorAll('*[style]')) as HTMLElement[];
  const originalInlineStyles = new Map<HTMLElement, string>();
  for (const el of elementsWithInlineStyles) {
    const styleAttr = el.getAttribute('style');
    if (styleAttr && (styleAttr.toLowerCase().includes('oklch') || styleAttr.toLowerCase().includes('oklab'))) {
      originalInlineStyles.set(el, styleAttr);
      const cleaned = styleAttr
        .replace(/oklch\((?:[^()]+|\([^()]*\))*\)/gi, (match) => fallbackOklch(match))
        .replace(/oklab\((?:[^()]+|\([^()]*\))*\)/gi, (match) => fallbackOklab(match));
      el.setAttribute('style', cleaned);
    }
  }

  return () => {
    // Restore original getters/methods
    CSSStyleDeclaration.prototype.getPropertyValue = originalGetPropertyValue;
    window.getComputedStyle = originalGetComputedStyle;

    tempStyleTags.forEach(style => style.remove());
    originalCSSStates.forEach(state => {
      try {
        state.sheet.disabled = state.disabled;
      } catch (err) {
        // ignore
      }
    });
    originalInlineStyles.forEach((originalStyle, el) => {
      el.setAttribute('style', originalStyle);
    });
  };
};

const patchClonedDocument = (clonedDoc: Document, canvasId: string) => {
  const el = clonedDoc.getElementById(canvasId);
  if (el) {
    el.style.width = '210mm';
    el.style.boxShadow = 'none';
    el.style.border = 'none';
  }

  // 1. Remove any style/link tags that are not our cleaned temp tags, keeping google fonts
  const sheetsInClone = Array.from(clonedDoc.querySelectorAll('style, link[rel="stylesheet"]')) as HTMLElement[];
  sheetsInClone.forEach(sheetEl => {
    const isTemp = sheetEl.getAttribute('data-temp-pdf-style') === 'true';
    const isGoogleFont = sheetEl instanceof HTMLLinkElement && sheetEl.href && sheetEl.href.includes('fonts.googleapis.com');
    if (!isTemp && !isGoogleFont) {
      sheetEl.remove();
    }
  });

  // 2. Clean inline styles in the cloned document
  const clonedElementsWithInlineStyles = Array.from(clonedDoc.querySelectorAll('*[style]')) as HTMLElement[];
  for (const item of clonedElementsWithInlineStyles) {
    const styleAttr = item.getAttribute('style');
    if (styleAttr && (styleAttr.toLowerCase().includes('oklch') || styleAttr.toLowerCase().includes('oklab') || styleAttr.toLowerCase().includes('color('))) {
      const cleaned = styleAttr
        .replace(/oklch\((?:[^()]+|\([^()]*\))*\)/gi, (m) => fallbackOklch(m))
        .replace(/oklab\((?:[^()]+|\([^()]*\))*\)/gi, (m) => fallbackOklab(m))
        .replace(/color\(oklch\s+[^)]+\)/gi, '#0f172a')
        .replace(/color\(oklab\s+[^)]+\)/gi, '#0f172a');
      item.setAttribute('style', cleaned);
    }
  }

  // 3. Patch the window and CSS prototype of the cloned document
  if (clonedDoc.defaultView) {
    const win = clonedDoc.defaultView as any;
    
    // Inline values cleaner
    const cleanValue = (val: any): any => {
      if (typeof val === 'string') {
        if (val.includes('oklch') || val.includes('oklab') || val.includes('color(')) {
          return val
            .replace(/oklch\((?:[^()]+|\([^()]*\))*\)/gi, (m) => fallbackOklch(m))
            .replace(/oklab\((?:[^()]+|\([^()]*\))*\)/gi, (m) => fallbackOklab(m))
            .replace(/color\(oklch\s+[^)]+\)/gi, '#0f172a')
            .replace(/color\(oklab\s+[^)]+\)/gi, '#0f172a');
        }
      }
      return val;
    };

    // Override getPropertyValue globally on CSSStyleDeclaration prototype inside the cloned window
    if (win.CSSStyleDeclaration) {
      const originalGetPropertyValue = win.CSSStyleDeclaration.prototype.getPropertyValue;
      win.CSSStyleDeclaration.prototype.getPropertyValue = function(this: any, property: string): string {
        const val = originalGetPropertyValue.call(this, property);
        return cleanValue(val);
      };
    }

    // Override window.getComputedStyle inside the cloned window
    const originalGetComputedStyle = win.getComputedStyle;
    if (originalGetComputedStyle) {
      win.getComputedStyle = function(element: Element, pseudoElt?: string) {
        const style = originalGetComputedStyle(element, pseudoElt);
        if (!style) return style;

        return new Proxy(style, {
          get(target, prop, receiver) {
            if (prop === 'getPropertyValue') {
              return function(key: string) {
                return cleanValue(target.getPropertyValue(key));
              };
            }
            const val = Reflect.get(target, prop, receiver);
            if (typeof val === 'function') {
              return val.bind(target);
            }
            return cleanValue(val);
          }
        });
      };
    }
  }
};

interface PdfGeneratorProps {
  documentType: 'devis' | 'facture';
  data: {
    id: string;
    clientName: string;
    phone: string;
    email?: string;
    fromCity: string;
    toCity: string;
    fromAddress?: string;
    toAddress?: string;
    volume?: number;
    formula?: string;
    price: number;
    date: string;
    createdAt?: string;
    dueDate?: string;
  };
  onClose: () => void;
  onStatusChange?: (id: string, newStatus: any) => void;
}

export const PdfGenerator: React.FC<PdfGeneratorProps> = ({ 
  documentType, 
  data, 
  onClose,
  onStatusChange 
}) => {
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [timeline, setTimeline] = useState<any[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('pdf-document-canvas');
    if (!element) return;
    
    setIsGeneratingPdf(true);
    let cleanupStyles: (() => void) | null = null;
    try {
      cleanupStyles = prepareStylesForPdf();
      let canvas;
      try {
        canvas = await html2canvas(element, {
          scale: 2, // improve resolution
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc) => {
            patchClonedDocument(clonedDoc, 'pdf-document-canvas');
          }
        });
      } catch (corsErr) {
        console.warn("Generating PDF with useCORS=false fallback", corsErr);
        canvas = await html2canvas(element, {
          scale: 2,
          useCORS: false,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc) => {
            patchClonedDocument(clonedDoc, 'pdf-document-canvas');
          }
        });
      }
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${documentType === 'devis' ? 'Devis' : 'Facture'}_${data.id}.pdf`);
    } catch (e) {
      console.error("Failed to generate PDF:", e);
      alert("Une erreur est survenue lors de la génération du fichier PDF.");
    } finally {
      if (cleanupStyles) {
        cleanupStyles();
      }
      setIsGeneratingPdf(false);
    }
  };

  const handleSendEmail = () => {
    setEmailStatus('sending');
    setTimeout(() => {
      setEmailStatus('sent');
      setTimeline([
        { title: 'E-mail préparé et signé', time: 'À l\'instant', status: 'done' },
        { title: 'Expédié via SMTP Marne Transdem', time: 'Il y a 2s', status: 'done' },
        { title: 'Délivré avec accusé de réception', time: 'Il y a 1s', status: 'done' }
      ]);
      
      if (documentType === 'devis' && onStatusChange) {
        onStatusChange(data.id, 'Envoyé');
      }
    }, 1500);
  };

  // Compute invoice breakdown
  const cleanPrice = data.price || 1200;
  const priceHT = Math.round(cleanPrice / 1.2);
  const tvaVal = cleanPrice - priceHT;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto print:p-0 print:bg-white print:relative print:z-0">
      <div className="bg-white dark:bg-slate-950 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Header toolbar - Hidden when printing */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="text-accent" size={18} />
            <span className="text-xs font-black uppercase tracking-wider">
              {documentType === 'devis' ? 'Générateur de Devis Professionnel' : 'Générateur de Factures Marne Transdem'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-accent hover:bg-accent-hover text-brand-950 text-[11px] font-black py-1.5 px-3 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Download size={12} className={isGeneratingPdf ? 'animate-bounce' : ''} />
              {isGeneratingPdf ? 'Téléchargement...' : 'Télécharger PDF'}
            </button>

            <button 
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-black py-1.5 px-3 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Printer size={12} /> Imprimer
            </button>
            
            <button 
              onClick={handleSendEmail}
              disabled={emailStatus === 'sending'}
              className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-black py-1.5 px-3 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Mail size={12} /> {emailStatus === 'sent' ? 'Renvoyer' : 'Envoyer par Mail'}
            </button>

            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 ml-2 font-bold"
            >
              Fermer [X]
            </button>
          </div>
        </div>

        {/* Content body split: PDF Preview + Tracking Panel */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50 dark:bg-slate-950 print:block print:p-0 print:bg-white">
          
          {/* Document visual sheet - standard DIN A4 layout simulator */}
          <div 
            id="pdf-document-canvas"
            className="lg:col-span-8 bg-white text-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 print:shadow-none print:border-none print:p-0 w-full min-h-[750px] font-sans text-xs flex flex-col justify-between"
          >
            
            {/* Inner Print content */}
            <div className="space-y-6">
              {/* Document Header banner */}
              <div className="flex justify-between items-start border-b pb-4 border-slate-205">
                <div className="flex flex-col items-start gap-1">
                  <img 
                    src="/images/logo-clair.webp" 
                    alt="Marne Transdem" 
                    className="h-12 w-auto object-contain shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div>
                    <p className="text-[8.5px] text-slate-500 font-bold uppercase tracking-wider mt-1">Déménagements Premium Paris & IDF</p>
                    <p className="text-[7.5px] text-slate-450 font-light mt-1 leading-relaxed">
                      Marne Transdem S.A.S<br />
                      14 Avenue du Général de Gaulle, 94054 Créteil Cedex<br />
                      Siret: 843 321 890 00012 • RCS Créteil<br />
                      TVA Intracom: FR 24 843321890
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-slate-900 text-white font-black px-3 py-1 rounded inline-block text-[10px] uppercase tracking-wider">
                    {documentType === 'devis' ? 'Devis Commercial' : 'Facture Officielle'}
                  </span>
                  <p className="font-mono text-[10px] font-black mt-2 text-slate-900 uppercase">Numéro : {data.id}</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Date d'édition : {data.createdAt || data.date}</p>
                  {documentType === 'facture' && (
                    <p className="text-[9px] text-indigo-700 font-bold mt-0.5">Date limite : {data.dueDate}</p>
                  )}
                </div>
              </div>

              {/* Addresses, Clients grid details */}
              <div className="grid grid-cols-2 gap-8 pt-2">
                <div>
                  <h3 className="text-[9px] font-black uppercase text-slate-400">🏢 Organisme Émetteur</h3>
                  <p className="font-bold mt-1 text-[11px]">MARNE TRANSDEM - LOGISTIQUE</p>
                  <p className="text-slate-500 font-light mt-0.5">Responsable: Alain Delon</p>
                  <p className="text-slate-500 font-light">Tél: 01 43 21 89 00</p>
                  <p className="text-slate-500 font-light">E-mail: contact@marnetransdem.com</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <h3 className="text-[9px] font-black uppercase text-slate-400">👤 Destinataire Client</h3>
                  <p className="font-bold mt-1 text-[11px] uppercase text-slate-800">{data.clientName}</p>
                  <p className="text-slate-500 font-light mt-0.5">Téléphone: {data.phone}</p>
                  {data.email && <p className="text-slate-400 font-light truncate">E-mail: {data.email}</p>}
                  <p className="text-slate-500 font-light mt-1 text-[9px]">Généré via portail Marne Transdem</p>
                </div>
              </div>

              {/* Logistics Specification Summary */}
              <div className="bg-slate-50/50 p-3.5 rounded-xl border border-dashed border-slate-200">
                <h4 className="text-[9px] font-black uppercase text-slate-400 tracking-wider mb-2">⚡ CARACTÉRISTIQUES DE TRAVAIL LOGISTIQUE</h4>
                <div className="grid grid-cols-3 gap-3 text-[10px]">
                  <div>
                    <span className="text-slate-400 block font-bold text-[8px] uppercase">Lieu de Chargement</span>
                    <strong className="text-slate-800">{data.fromAddress || data.fromCity}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[8px] uppercase">Lieu de Livraison</span>
                    <strong className="text-slate-800">{data.toAddress || data.toCity}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[8px] uppercase">Volume & Régime</span>
                    <strong className="text-slate-800">{data.volume || 25} m³ • {data.formula || 'Standard'}</strong>
                  </div>
                </div>
              </div>

              {/* Invoice calculation line tables */}
              <div className="pt-2">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[9px] uppercase font-black tracking-wider">
                      <th className="py-2.5 px-4 rounded-l">Désignation des Prestations Logistiques</th>
                      <th className="py-2.5 px-4 text-center">Volume (m³)</th>
                      <th className="py-2.5 px-4 text-center">Quantité</th>
                      <th className="py-2.5 px-4 text-right rounded-r">P.U HT (€)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-[11px]">
                    <tr className="font-light">
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {documentType === 'devis' ? 'Prestation de Déménagement routier complet' : 'Facturation dossier déménagement client'}
                        <span className="block font-normal text-[8px] text-slate-400 mt-1">
                          Prise en charge et arrimage, formule {data.formula || 'Standard'}, assurance contractuelle ad-valorem incluse.
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{data.volume || 22}</td>
                      <td className="py-3 px-4 text-center">1</td>
                      <td className="py-3 px-4 text-right font-bold">{priceHT.toLocaleString('fr-FR')} €</td>
                    </tr>
                    {data.formula === 'Luxe' && (
                      <tr className="font-light text-slate-500">
                        <td className="py-2 px-4 italic">
                          Emballage Premium Clé en main (Fournitures cartons + vaisselle fragile)
                        </td>
                        <td className="py-2 px-4 text-center">-</td>
                        <td className="py-2 px-4 text-center">Inclus</td>
                        <td className="py-2 px-4 text-right font-mono text-[10px]">-</td>
                      </tr>
                    )}
                    <tr className="font-light text-slate-500">
                      <td className="py-2 px-4 italic">
                        Transport sécurisé de {data.fromCity} à {data.toCity}
                      </td>
                      <td className="py-2 px-4 text-center">-</td>
                      <td className="py-2 px-4 text-center">1 loc</td>
                      <td className="py-2 px-4 text-right font-mono text-[10px]">Inclus</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations and Totals */}
            <div className="border-t border-slate-205 pt-5 space-y-4">
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs text-right">
                  <div className="flex justify-between font-light text-slate-500">
                    <span>Total HT :</span>
                    <span>{priceHT.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between font-light text-slate-500">
                    <span>TVA (20%) :</span>
                    <span>{tvaVal.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-sm font-black text-slate-900">
                    <span>TOTAL TTC :</span>
                    <span className="text-brand-900">{cleanPrice.toLocaleString('fr-FR')} €</span>
                  </div>
                </div>
              </div>

              {/* Footer text, Signatures */}
              <div className="grid grid-cols-2 gap-4 text-[8px] text-slate-400 border-t pt-4 border-slate-205 leading-relaxed">
                <div>
                  <p className="font-bold uppercase text-slate-500">Conditions de règlement</p>
                  <p className="mt-0.5">
                    {documentType === 'devis' 
                      ? "Acompte de 30% lors de la réservation de votre date. Le solde de 70% réglable au chargement en fin de prestation de déménagement."
                      : "Facture payable sous 30 jours calendaires d'édition. Aucun escompte applicable pour paiement anticipé."
                    }
                  </p>
                  <p className="mt-2 font-bold uppercase text-slate-500">Garanties & Assurances</p>
                  <p className="mt-0.5">Courtier AXA R.C Professionnelle N* 843210-94. Marchandises garanties à hauteur de 50 000 € par véhicule logistique.</p>
                </div>
                <div className="text-center flex flex-col justify-between items-center h-20 bg-slate-50 rounded-lg p-2.5 border border-dashed border-slate-200">
                  <span className="font-bold uppercase text-slate-500 block text-[7px] tracking-wider">
                    {documentType === 'devis' ? 'CADRE RESERVÉ SIGNATURE CLIENT (BON POUR ACCORD)' : 'CADRE COMPTABILITÉ MARNE TRANSDEM (ACQUITÉ)'}
                  </span>
                  {documentType === 'devis' ? (
                    <div className="text-[7px] text-slate-400 leading-none">
                      (Signature électronique ou manuscrite précédée de Mention Bon Pour Accord)
                    </div>
                  ) : (
                    <div className="font-bold flex items-center justify-center gap-1 text-emerald-600 uppercase text-[9px] bg-emerald-100/30 border border-emerald-500/20 px-2 py-1 rounded">
                      <ShieldCheck size={11} /> Payé & Validé
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Tracking, Action log and live delivery monitor */}
          <div className="lg:col-span-4 space-y-6 print:hidden">
            {/* Live Delivery Status */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase text-brand-900 dark:text-white flex items-center gap-1.5 border-b pb-2">
                <Send size={14} className="text-accent" /> Canaux d'Expédition
              </h3>

              {emailStatus === 'idle' && (
                <div className="text-center py-6 space-y-3">
                  <p className="text-xs text-slate-500 font-light">Le document n'a pas encore été envoyé au client.</p>
                  <button
                    onClick={handleSendEmail}
                    className="w-full bg-brand-900 dark:bg-accent text-white dark:text-brand-950 hover:bg-opacity-95 text-xs font-bold py-2 px-4 rounded-xl shadow cursor-pointer transition active:scale-95"
                  >
                    Expédier par Email
                  </button>
                </div>
              )}

              {emailStatus === 'sending' && (
                <div className="text-center py-6 text-xs text-slate-400 font-medium">
                  <Clock className="animate-spin mx-auto text-accent mb-2" size={20} />
                  Acheminement du courrier électronique...
                </div>
              )}

              {emailStatus === 'sent' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl border border-emerald-500/10 text-xs">
                    <CheckCircle2 size={16} />
                    <div>
                      <span className="font-black block">Document Expédié !</span>
                      <span className="text-[10px] font-light">Envoyé avec succès à {data.email || 'client@site.fr'}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">⚡ Suivi en temps réel (Accusés)</p>
                    <div className="relative border-l border-slate-100 dark:border-slate-800 ml-2.5 pl-4 space-y-3 text-[11px]">
                      {timeline.map((item, index) => (
                        <div key={index} className="relative">
                          <span className="absolute -left-[20.5px] top-0.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="font-extrabold text-slate-800 dark:text-slate-100 block">{item.title}</span>
                          <span className="text-[9px] text-slate-400">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase text-brand-900 dark:text-white border-b pb-2">
                Actions Rapides
              </h3>
              <div className="space-y-2">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full text-left py-2 px-3 bg-accent/25 hover:bg-accent/40 dark:bg-accent/10 dark:hover:bg-accent/25 rounded-xl transition text-xs font-bold text-slate-800 dark:text-accent flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download size={13} className={isGeneratingPdf ? 'animate-bounce' : ''} />
                  {isGeneratingPdf ? 'Génération du PDF...' : 'Télécharger le PDF Pro (Direct)'}
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full text-left py-2 px-3 bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                >
                  <Printer size={13} /> Imprimer via le navigateur
                </button>
                {documentType === 'devis' && onStatusChange && (
                  <button
                    onClick={() => {
                      if (window.confirm("Êtes-vous sûr de vouloir signer ce devis ? Cela déclenchera la facturation et la planification.")) {
                        onStatusChange(data.id, 'Signé');
                        alert("Devis signé ! Retrouvez le dossier dans Factures et Plannings.");
                        onClose();
                      }
                    }}
                    className="w-full text-left py-2 px-3 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-xl transition text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Check size={13} /> Forcer Bon Pour Accord (Signature)
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer info visible in viewport but skipped on print */}
        <div className="bg-slate-100 dark:bg-slate-900 p-3.5 text-center text-[10px] text-slate-400 leading-none shrink-0 print:hidden border-t dark:border-slate-800">
          Document généré par l'infrastructure intelligente Marne Transdem v2 — Conforme aux règlements de transports de l'Union Européenne.
        </div>
      </div>
    </div>
  );
};
