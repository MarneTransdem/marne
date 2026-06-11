import React, { useState } from 'react';
import { FileText, Printer, ShieldAlert, Navigation, Columns, Check, Truck, Users, Calendar, Download } from 'lucide-react';

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
          return function(this: any, key: string) {
            return cleanValue((style as any).getPropertyValue(key));
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
              return function(this: any, key: string) {
                return cleanValue((style as any).getPropertyValue(key));
              };
            }
            return cleanValue(Reflect.get(target, prop, receiver));
          }
        });
      };
    }
  }
};

interface DocumentTemplatesProps {
  move: {
    id: string;
    clientName: string;
    devisId: string;
    volume: number;
    fromCity: string;
    toCity: string;
    date: string;
    teamLeader: string;
    crewSize: number;
    assignedMovers?: string[];
    assignedTruck?: string;
  };
  onClose: () => void;
}

export const DocumentTemplates: React.FC<DocumentTemplatesProps> = ({ move, onClose }) => {
  const [activeTemplate, setActiveTemplate] = useState<'lettre_voiture' | 'declaration_valeur' | 'fiche_equipe'>('lettre_voiture');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');
    const element = document.getElementById('official-doc-canvas');
    if (!element) return;
    
    setIsGeneratingPdf(true);
    let cleanupStyles: (() => void) | null = null;
    try {
      cleanupStyles = prepareStylesForPdf();
      let canvas;
      try {
        canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc) => {
            patchClonedDocument(clonedDoc, 'official-doc-canvas');
          }
        });
      } catch (corsErr) {
        console.warn("Generating official doc PDF with useCORS=false fallback", corsErr);
        canvas = await html2canvas(element, {
          scale: 2,
          useCORS: false,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc) => {
            patchClonedDocument(clonedDoc, 'official-doc-canvas');
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
      
      while (heightLeft > 5) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Document_${activeTemplate}_${move.id}.pdf`);
    } catch (e) {
      console.error("Failed to generate official document PDF:", e);
      alert("Une erreur est survenue lors du téléchargement du document PDF.");
    } finally {
      if (cleanupStyles) {
        cleanupStyles();
      }
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto print:p-0 print:bg-white print:relative print:z-0">
      <div className="bg-white dark:bg-slate-950 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Navigation header for templates selection - Hidden during printing */}
        <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="text-accent" size={18} />
            <span className="text-xs font-black uppercase tracking-wider">
              Éditeur de Documents Réglementaires 🇫🇷
            </span>
          </div>

          {/* Subtabs for template selection */}
          <div className="flex bg-slate-800 p-1.5 rounded-2xl gap-1">
            <button
              onClick={() => setActiveTemplate('lettre_voiture')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer ${activeTemplate === 'lettre_voiture' ? 'bg-accent text-brand-950' : 'text-slate-400 hover:text-white'}`}
            >
              Lettre de Voiture
            </button>
            <button
              onClick={() => setActiveTemplate('declaration_valeur')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer ${activeTemplate === 'declaration_valeur' ? 'bg-accent text-brand-950' : 'text-slate-400 hover:text-white'}`}
            >
              Déclaration Valeur
            </button>
            <button
              onClick={() => setActiveTemplate('fiche_equipe')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer ${activeTemplate === 'fiche_equipe' ? 'bg-accent text-brand-950' : 'text-slate-400 hover:text-white'}`}
            >
              Fiche Équipe
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-accent text-brand-950 hover:bg-accent-hover text-[10px] font-black py-1.5 px-3 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Download size={12} className={isGeneratingPdf ? 'animate-bounce' : ''} /> 
              {isGeneratingPdf ? 'Génération...' : 'Télécharger PDF'}
            </button>

            <button 
              onClick={handlePrint}
              className="bg-slate-800 text-white hover:bg-slate-700 text-[10px] font-black py-1.5 px-3 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Printer size={12} /> Imprimer / PDF
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 ml-1"
            >
              Fermer [X]
            </button>
          </div>
        </div>

        {/* Printable View Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-950 print:p-0 print:bg-white flex justify-center">
          
          {/* Inner Template display */}
          <div 
            id="official-doc-canvas"
            className="bg-white text-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 print:shadow-none print:border-none print:p-0 w-full max-w-[210mm] min-h-[297mm] text-[10px] font-sans flex flex-col justify-between"
          >
            
            {/* 1. LETTRE DE VOITURE TEMPLATE */}
            {activeTemplate === 'lettre_voiture' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="grid grid-cols-2 border-b pb-4 border-slate-200">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/logo-clair.webp" 
                      alt="Marne Transdem Logo" 
                      className="h-9 w-auto object-contain shrink-0" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h1 className="text-xs font-black text-slate-950 leading-none">MARNE TRANSDEM</h1>
                      <p className="text-[7.5px] uppercase font-bold text-slate-400 mt-1">S.A.S LOGISTIQUE DE DEMENAGEMENT</p>
                      <p className="text-[7px] text-slate-500 font-light mt-0.5">14 Avenue du Général de Gaulle, 94000 Créteil<br />RCS CRETEIL • SIRET 843 321 890 00012</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-brand-900 text-white font-black px-2.5 h-6 rounded inline-flex items-center justify-center text-[8px] uppercase tracking-wider leading-none">
                      Lettre de Voiture de Déménagement
                    </span>
                    <p className="font-mono mt-2 font-bold text-slate-800 text-[9px]">L.V. Nº {move.id.replace('DEM', 'LV')}</p>
                    <p className="text-slate-400 text-[8px] mt-0.5">Émis en application de l'Arrêté ministériel du 9 nov. 1999</p>
                  </div>
                </div>

                {/* Important notice */}
                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-500/10 text-[8.5px] text-amber-900 leading-normal">
                  <strong>AVIS RÈGLEMENTAIRE :</strong> La lettre de voiture constitue le contrat de transport commercial indispensable qui doit couvrir les marchandises à bord des véhicules Marne Transdem. Elle doit être présentée en double exemplaire (Entreprise + Client) à tout contrôle routier de la DREAL ou de la Gendarmerie nationale.
                </div>

                {/* Core Columns layout */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column Container */}
                  <div className="space-y-4">
                    <div className="border p-3 rounded-xl bg-slate-50/50">
                      <h4 className="font-bold text-[8.5px] uppercase border-b pb-1 text-slate-500">1. CLIENT & DONNEUR D'ORDRE</h4>
                      <div className="mt-2 space-y-1 text-slate-700">
                        <p><strong>Nom complet :</strong> {move.clientName}</p>
                        <p><strong>Dossier Devis :</strong> {move.devisId}</p>
                        <p><strong>Régime de transport :</strong> National Routier (VL/PL)</p>
                      </div>
                    </div>

                    <div className="border p-3 rounded-xl bg-slate-50/50">
                      <h4 className="font-bold text-[8.5px] uppercase border-b pb-1 text-slate-500">2. OPÉRATION DE CHARGEMENT</h4>
                      <div className="mt-2 space-y-1 text-slate-700">
                        <p><strong>Ville de départ :</strong> {move.fromCity}</p>
                        <p><strong>Volume total autorisé :</strong> {move.volume} m³</p>
                        <p><strong>Date de prise en charge :</strong> {move.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Container */}
                  <div className="space-y-4">
                    <div className="border p-3 rounded-xl bg-slate-50/50">
                      <h4 className="font-bold text-[8.5px] uppercase border-b pb-1 text-slate-500">3. OPÉRATION DE LIVRAISON</h4>
                      <div className="mt-2 space-y-1 text-slate-700">
                        <p><strong>Ville de destination :</strong> {move.toCity}</p>
                        <p><strong>Date estimée de livraison :</strong> {move.date}</p>
                        <p><strong>Conditions de déchargement :</strong> Directes</p>
                      </div>
                    </div>

                    <div className="border p-3 rounded-xl bg-slate-50/50">
                      <h4 className="font-bold text-[8.5px] uppercase border-b pb-1 text-slate-500">4. INFRASTRUCTURE & VÉHICULE</h4>
                      <div className="mt-2 space-y-1 text-slate-700">
                        <p><strong>Chauffeur & Chef d'équipe :</strong> {move.teamLeader}</p>
                        <p><strong>Matricule Véhicule assigné :</strong> {move.assignedTruck || 'TRK-AA-123-BB'}</p>
                        <p><strong>Taille d'équipe active :</strong> {move.crewSize} Compagnons</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms conditions text box */}
                <div className="pt-2">
                  <h4 className="font-bold text-[8.5px] uppercase text-slate-500 mb-2">5. CONDITIONS DE FIN DE CONTRAT & DÉCHARGE (CRITICAL)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border p-3.5 rounded-xl text-[7.5px] text-slate-500 text-justify leading-relaxed h-32 flex flex-col justify-between bg-slate-50">
                      <span>
                        <strong>DÉCLARATION AU CHARGEMENT (Étape A) :</strong><br />
                        Je certifie l'achèvement complet et sans incident du chargement de mes effets mobiliers par les soins de Marne Transdem.<br />
                        <span className="font-bold block mt-1">Date : {move.date}</span>
                      </span>
                      <div className="border-t pt-1 border-dashed text-center font-bold text-slate-400">
                        SIGNATURE CLIENT (CONFIÉ)
                      </div>
                    </div>

                    <div className="border p-3.5 rounded-xl text-[7.5px] text-slate-500 text-justify leading-relaxed h-32 flex flex-col justify-between bg-slate-50">
                      <span>
                        <strong>DÉCHARGE À LA LIVRAISON (Étape B) :</strong><br />
                        Je soussigné certifie de la livraison conforme des meubles et de l'encaissement du solde final, sous réserve de réserves formulées sous 10 jours.<br />
                        <span className="font-bold block mt-1">Date de fin : {move.date}</span>
                      </span>
                      <div className="border-t pt-1 border-dashed text-center font-bold text-slate-400">
                        SIGNATURE CLIENT (DÉCHARGÉ)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DÉCLARATION DE VALEUR TEMPLATE */}
            {activeTemplate === 'declaration_valeur' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 border-b pb-4 border-slate-200">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/logo-clair.webp" 
                      alt="Marne Transdem Logo" 
                      className="h-9 w-auto object-contain shrink-0" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h1 className="text-xs font-black text-slate-950 leading-none">MARNE TRANSDEM</h1>
                      <p className="text-[7.5px] uppercase font-bold text-slate-400 mt-1">S.A.S LOGISTIQUE DE DEMENAGEMENT</p>
                      <p className="text-[7px] text-slate-500 font-light mt-0.5">Garantie Contractuelle AXA Assurance N* 843210-94</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-indigo-900 text-white font-black px-2.5 h-6 rounded inline-flex items-center justify-center text-[8px] uppercase tracking-wider leading-none">
                      Déclaration de Valeur Contractuelle
                    </span>
                    <p className="font-mono mt-2 font-bold text-slate-800 text-[9px]">D.V. Nº {move.id.replace('DEM', 'DV')}</p>
                    <p className="text-slate-400 text-[8px] mt-0.5">Obligatoire selon Conditions Générales des Assurances Mobiles</p>
                  </div>
                </div>

                <div className="bg-indigo-50 p-2.5 rounded-lg border border-indigo-500/10 text-[8.5px] text-indigo-900 leading-normal">
                  <strong>IMPORTANT :</strong> En cas de perte ou d'avarie fortuite de vos biens lors du transport, les indemnités d'assurance seront calculées sur la base de la déclaration ci-dessous. Le maximum garanti par objet individuel non listé est fixé forfaitairement à <strong>750 €</strong>.
                </div>

                {/* Details list */}
                <div className="space-y-3.5">
                  <h4 className="font-bold text-[8.5px] uppercase text-slate-400 border-b pb-1">Identification</h4>
                  <div className="grid grid-cols-2 gap-4 text-slate-700">
                    <p><strong>Identité du Mandant:</strong> {move.clientName}</p>
                    <p><strong>Dénomination du Voyage:</strong> {move.fromCity} ➔ {move.toCity}</p>
                    <p><strong>Valeur Globale Déterminée (€) :</strong> 15 000 € (Limite Contractuelle de Base)</p>
                    <p><strong>Date d'effet :</strong> {move.date}</p>
                  </div>

                  <h4 className="font-bold text-[8.5px] uppercase text-slate-400 border-b pb-1 mt-4">Inventaire des Objets de Valeur Particulière (Supérieure à 750 €)</h4>
                  <table className="w-full text-left font-light text-slate-500 border border-collapse divide-y">
                    <thead>
                      <tr className="bg-slate-50 font-bold text-slate-700 text-[8px] uppercase">
                        <th className="p-2 border">Nº d'Inventaire</th>
                        <th className="p-2 border">Description précise de l'effet</th>
                        <th className="p-2 border text-right">Valeur Estimée Déclarée HT (€)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-[9px]">
                      <tr>
                        <td className="p-2 border font-mono">VAL-001</td>
                        <td className="p-2 border">Téléviseur OLED LG 65" avec support mural</td>
                        <td className="p-2 border text-right font-bold text-slate-800">1 200 €</td>
                      </tr>
                      <tr>
                        <td className="p-2 border font-mono">VAL-002</td>
                        <td className="p-2 border">Canapé d'angle en cuir Roche Bobois</td>
                        <td className="p-2 border text-right font-bold text-slate-800">2 500 €</td>
                      </tr>
                      <tr>
                        <td className="p-2 border font-mono">VAL-003</td>
                        <td className="p-2 border">Lave-linge tambour Siemens IQ800</td>
                        <td className="p-2 border text-right font-bold text-slate-800">850 €</td>
                      </tr>
                      <tr className="italic">
                        <td className="p-2 border text-center">-</td>
                        <td className="p-2 border text-slate-400">Aucun autre meuble ne dépasse la limite de 750€</td>
                        <td className="p-2 border text-right font-mono text-[8px]">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border p-4 bg-slate-50 text-[7.5px] leading-relaxed rounded-xl text-slate-400 border-dashed text-justify mt-8">
                  <strong>MENTION ET MANDAT :</strong> Je déclare sur l'honneur que l'inventaire et les valeurs ci-dessous reflètent la réalité immédiate de mon capital de mobilier transporté. Fait le {move.date} à Paris.
                  <div className="mt-8 flex justify-between font-bold text-slate-500">
                    <span>Signature Mandataire Marne Transdem</span>
                    <span className="mr-8">Signature Mandant Client (Fait Précéder de Lu et Approuvé)</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. FICHE ÉQUIPE TEMPLATE */}
            {activeTemplate === 'fiche_equipe' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 border-b pb-4 border-slate-200">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/logo-clair.webp" 
                      alt="Marne Transdem Logo" 
                      className="h-9 w-auto object-contain shrink-0" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h1 className="text-xs font-black text-slate-950 leading-none">MARNE TRANSDEM</h1>
                      <p className="text-[7.5px] uppercase font-bold text-slate-400 mt-1">FICHE DE ROUTE ET D'INSTRUCTIONS ÉQUIPE</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-slate-900 text-white font-black px-2.5 h-6 rounded inline-flex items-center justify-center text-[8px] uppercase tracking-wider leading-none">
                      Fiche d'Intervention Terrain
                    </span>
                    <p className="font-mono mt-2 font-bold text-slate-800 text-[9px]">INTERV_Nº {move.id}</p>
                    <p className="text-slate-400 text-[8px] mt-0.5">Pour le conducteur en charge de l'exécution</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="border p-3.5 rounded-xl text-center space-y-1 bg-slate-50/50">
                    <Users className="mx-auto text-brand-900" size={16} />
                    <span className="text-[8px] text-slate-400 block uppercase font-bold">Chef d'Équipe</span>
                    <strong className="text-slate-800 font-black">{move.teamLeader}</strong>
                  </div>
                  <div className="border p-3.5 rounded-xl text-center space-y-1 bg-slate-50/50">
                    <Truck className="mx-auto text-brand-900" size={16} />
                    <span className="text-[8px] text-slate-400 block uppercase font-bold">Véhicule assigné</span>
                    <strong className="text-slate-800 font-mono">{move.assignedTruck || 'Fourgon VL 20m³ (AA-123-BB)'}</strong>
                  </div>
                  <div className="border p-3.5 rounded-xl text-center space-y-1 bg-slate-50/50">
                    <Calendar className="mx-auto text-brand-900" size={16} />
                    <span className="text-[8px] text-slate-400 block uppercase font-bold">Date de Mission</span>
                    <strong className="text-slate-800 font-extrabold">{move.date}</strong>
                  </div>
                </div>

                {/* Address logistics instructions */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[8.5px] uppercase text-slate-400 border-b pb-1">📌 Programme de la journée</h4>
                  
                  <div className="border p-4 rounded-2xl space-y-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                      <span className="bg-slate-900 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div>
                        <h5 className="font-extrabold text-[11px]">8h00 - CHARGEMENT (Départ client : {move.fromCity})</h5>
                        <p className="text-slate-550 font-light mt-0.5">Vérifier l'état de la cage d'escalier s'il n'y a pas d'ascenseur. Installer les couvertures de protection en cabine pour protéger les meubles vernis. Rédiger l'inventaire de départ avec le client.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="bg-slate-900 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div>
                        <h5 className="font-extrabold text-[11px]">13h00 - TRAJET ROUTIER</h5>
                        <p className="text-slate-550 font-light mt-0.5">Arrimage à contrôler avant départ de l'autoroute. Conduire de façon défensive. Vérifier les limitations de tonnage dans la ville de livraison.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="bg-slate-900 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <div>
                        <h5 className="font-extrabold text-[11px]">15h00 - LIVRAISON (Arrivée : {move.toCity})</h5>
                        <p className="text-slate-550 font-light mt-0.5">Décharger avec précaution. Réassembler les lits et armoires si l'option est mentionnée dans le devis d'origine. Faire signer la lettre de voiture de fin de prestation (Décharge).</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-bold text-[8.5px] uppercase text-slate-400 border-b pb-1 mt-4">👤 Équipe Technique Assignée</h4>
                  <div className="grid grid-cols-2 gap-3 text-slate-700">
                    <div className="border p-2 rounded-xl flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Conducteur PL: <strong>{move.teamLeader}</strong></span>
                    </div>
                    {move.assignedMovers && move.assignedMovers.length > 0 ? (
                      move.assignedMovers.map((m, i) => (
                        <div key={i} className="border p-2 rounded-xl flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                          <span>Movers: <strong>{m}</strong></span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="border p-2 rounded-xl flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                          <span>Équipier d'aide: <strong>Pascal Porteur</strong></span>
                        </div>
                        <div className="border p-2 rounded-xl flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                          <span>Aide-déménageur: <strong>Érik Solide</strong></span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Standard Legal Footer */}
            <div className="border-t pt-4 text-center text-[7.5px] text-slate-400 border-slate-205 mt-6">
              © Marne Transdem Logistique — Ce document physique fait foi devant la DREAL et le Tribunal de commerce compétents.
            </div>

          </div>
        </div>

        {/* Footer banner informational - Hidden on print */}
        <div className="bg-slate-100 dark:bg-slate-900 p-3 text-center text-[10px] text-slate-400 leading-none shrink-0 print:hidden border-t dark:border-slate-800">
          Utilisez la commande "Imprimer ce document" pour générer un fichier PDF avec les normes de marges standard ISO.
        </div>
      </div>
    </div>
  );
};
