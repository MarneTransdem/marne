import React, { useState } from 'react';
import { FileText, Printer, Mail, Download, Check, ShieldCheck, Clock, CheckCircle2, Send } from 'lucide-react';
import { Document as PdfDocument, Page, Text, View, StyleSheet, Font, Image, pdf } from '@react-pdf/renderer';

// Register premium fonts for the vector PDF rendering
Font.register({
  family: 'Outfit',
  fonts: [
    { src: '/fonts/Outfit-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Outfit-Bold.ttf', fontWeight: 'bold' }
  ]
});
Font.register({
  family: 'Caveat',
  src: '/fonts/Caveat-Regular.ttf',
  fontWeight: 'normal'
});

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
        const val = Reflect.get(target, prop);
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

const patchClonedDocument = (clonedDoc: Document, canvasId: string, documentType: 'devis' | 'facture') => {
  const el = clonedDoc.getElementById(canvasId);
  const isDevis = documentType === 'devis';
  const numPages = isDevis ? 3 : 1;
  const widthPx = Math.round(210 * 3.7795); // ~794px
  const pageHeightPx = Math.round(297 * 3.7795); // ~1123px
  const heightPx = pageHeightPx * numPages;

  if (el) {
    el.style.width = `${widthPx}px`;
    el.style.height = `${heightPx}px`;
    el.style.boxShadow = 'none';
    el.style.border = 'none';
    el.style.padding = '0';
    el.style.margin = '0';
    el.style.gap = '0';
    el.style.background = 'white';
    el.style.backgroundColor = 'white';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
  }

  // clean pages inside the cloned document
  const pages = clonedDoc.querySelectorAll('.pdf-page') as NodeListOf<HTMLElement>;
  pages.forEach(p => {
    p.style.boxShadow = 'none';
    p.style.border = 'none';
    p.style.margin = '0';
    p.style.padding = '15mm';
    p.style.width = `${widthPx}px`;
    p.style.height = `${pageHeightPx}px`;
    p.style.boxSizing = 'border-box';
    p.style.background = 'white';
    p.style.backgroundColor = 'white';
  });

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
};

// StyleSheet for the native vector PDF Document
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Outfit',
    fontSize: 8,
    color: '#334155',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 10,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  slogan: {
    fontFamily: 'Caveat',
    fontSize: 12,
    color: '#4f46e5',
    marginTop: 2,
  },
  headerMeta: {
    textAlign: 'right',
  },
  badge: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontSize: 7.5,
    fontWeight: 'bold',
    padding: '3px 8px',
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  devisNo: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 5,
  },
  dateText: {
    fontSize: 7.5,
    color: '#64748b',
    marginTop: 2,
  },
  validityText: {
    fontSize: 7.5,
    color: '#dc2626',
    fontWeight: 'bold',
    marginTop: 2,
  },
  addressesGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  addressCol: {
    width: '46%',
  },
  addressCard: {
    width: '46%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 8,
  },
  colTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  addressDetails: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.4,
  },
  clientName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
  },
  salutation: {
    marginTop: 15,
  },
  salutationTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  salutationText: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.4,
    marginTop: 3,
  },
  prestationsGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  prestationCardLeft: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e0e7ff',
    backgroundColor: '#f5f7ff',
    borderRadius: 8,
    padding: 8,
  },
  prestationCardRight: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 8,
  },
  prestationTitleLeft: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1e1b4b',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e7ff',
    paddingBottom: 3,
    marginBottom: 5,
  },
  prestationTitleRight: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 3,
    marginBottom: 5,
  },
  prestationList: {
    display: 'flex',
    flexDirection: 'column',
  },
  prestationItem: {
    fontSize: 7.5,
    color: '#334155',
    lineHeight: 1.35,
    marginBottom: 3,
  },
  warningText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#b91c1c',
    marginTop: 6,
    lineHeight: 1.3,
  },
  signaturesBlock: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
    marginTop: 15,
  },
  signaturesGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureCol: {
    width: '46%',
  },
  signatureBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 8,
    height: 60,
    backgroundColor: '#f8fafc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  signatureBoxRight: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    height: 60,
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
  },
  signatureLabel: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  signaturePlaceholder: {
    fontSize: 7,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 1.3,
  },
  stamp: {
    borderWidth: 1.5,
    borderColor: '#dc2626',
    borderRadius: 4,
    padding: 3,
    textAlign: 'center',
    color: '#dc2626',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: 90,
    transform: 'rotate(-5deg)',
    marginTop: 2,
  },
  stampTitle: {
    fontSize: 7,
    fontWeight: 'bold',
  },
  stampSub: {
    borderTopWidth: 0.5,
    borderTopColor: '#dc2626',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dc2626',
    fontSize: 5,
    marginVertical: 1,
    paddingVertical: 1,
  },
  stampText: {
    fontSize: 5,
  },
  footerPageNum: {
    fontSize: 7,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 10,
  },
  
  // Page 2
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
    marginBottom: 5,
    marginTop: 10,
  },
  technicalTable: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRightWidth: 1,
    borderRightColor: '#334155',
  },
  tableCell: {
    fontSize: 8,
    padding: '4px 8px',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
  },
  logisticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  logisticsBoxLeft: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#f8fafc',
  },
  logisticsBoxRight: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#f8fafc',
  },
  logisticsBoxTitleLeft: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1e1b4b',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e7ff',
    paddingBottom: 3,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  logisticsBoxTitleRight: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 3,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  logisticsLine: {
    fontSize: 8,
    marginBottom: 3,
  },
  logisticsLabel: {
    color: '#64748b',
    fontWeight: 'bold',
  },
  pricingTable: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 10,
  },
  pricingCellHT: {
    fontSize: 8,
    textAlign: 'right',
    padding: '4px 8px',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
  },
  pricingCellTTC: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'right',
    padding: '4px 8px',
  },
  totalRow: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  totalCellLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'right',
    padding: '5px 8px',
    textTransform: 'uppercase',
  },
  paymentCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  paymentCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 6,
    textAlign: 'center',
  },
  paymentCardLabel: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  paymentCardVal: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 2,
  },
  
  // Page 3
  cgvTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
  },
  cgvGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cgvCol: {
    width: '48%',
  },
  cgvArticle: {
    marginBottom: 6,
  },
  cgvArtTitle: {
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cgvArtText: {
    fontSize: 6,
    color: '#475569',
    textAlign: 'justify',
    lineHeight: 1.25,
  },
  cgvApprovalBox: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  cgvApprovalTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 4,
  },
  cgvApprovalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cgvApprovalText: {
    width: '66%',
    fontSize: 6.5,
    color: '#475569',
    lineHeight: 1.3,
  },
  cgvApprovalSign: {
    width: '30%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 6,
    height: 40,
    backgroundColor: '#ffffff',
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cgvApprovalSignLabel: {
    fontSize: 6,
    color: '#94a3b8',
  },
  cgvApprovalDateLabel: {
    fontSize: 5,
    color: '#94a3b8',
    textAlign: 'right',
  },

  // Facture
  facturePaidBadge: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    fontSize: 7.5,
    fontWeight: 'bold',
    padding: '3px 8px',
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  paidStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  facturePaidStamp: {
    borderWidth: 1.5,
    borderColor: '#10b981',
    borderRadius: 4,
    padding: 3,
    textAlign: 'center',
    color: '#10b981',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: 80,
    transform: 'rotate(-3deg)',
  },
  facturePaidStampText: {
    fontSize: 7,
    fontWeight: 'bold',
  },
  facturePaidStampSub: {
    borderTopWidth: 0.5,
    borderTopColor: '#10b981',
    borderBottomWidth: 0.5,
    borderBottomColor: '#10b981',
    fontSize: 4.5,
    marginVertical: 1,
  },
  facturePaidBadgeBig: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    color: '#065f46',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 8.5,
    padding: '5px 10px',
    borderRadius: 8,
  }
});

// Component DevisPdfDocument for native vector PDF
const DevisPdfDocument = ({ data, formula, prestations, expiresDate, clientCode, voyageType, distance, priceHT, tvaVal, cleanPrice, arrhes, solde, fromFloor, toFloor, fromElevator, toElevator, fromLift, toLift, fromPortage, toPortage, logoUrl }: any) => (
  <PdfDocument>
    {/* Page 1 */}
    <Page size="A4" style={pdfStyles.page}>
      <View>
        <View style={pdfStyles.header}>
          <View style={pdfStyles.logoContainer}>
            <Image src={logoUrl} style={{ width: 120, height: 35, objectFit: 'contain' }} />
            <Text style={pdfStyles.slogan}>Déménagez en toute sérénité !</Text>
          </View>
          <View style={pdfStyles.headerMeta}>
            <Text style={pdfStyles.badge}>Devis Commercial</Text>
            <Text style={pdfStyles.devisNo}>Devis N° : DEVIS-{data.id}</Text>
            <Text style={pdfStyles.dateText}>Date : {data.createdAt || data.date}</Text>
            <Text style={pdfStyles.validityText}>Validité : {expiresDate}</Text>
          </View>
        </View>

        <View style={pdfStyles.addressesGrid}>
          <View style={pdfStyles.addressCol}>
            <Text style={pdfStyles.colTitle}>🏢 L'ENTREPRISE</Text>
            <Text style={pdfStyles.companyName}>MARNE TRANSDEM S.A.S</Text>
            <Text style={pdfStyles.addressDetails}>
              14 Avenue du Général de Gaulle{"\n"}
              94054 Créteil Cedex{"\n"}
              Tél : 01 43 21 89 00{"\n"}
              Email : contact@marnetransdem.com
            </Text>
          </View>
          <View style={pdfStyles.addressCard}>
            <Text style={pdfStyles.colTitle}>👤 LE DESTINATAIRE</Text>
            <Text style={pdfStyles.clientName}>{data.clientName}</Text>
            <Text style={pdfStyles.addressDetails}>
              Code Client : {clientCode}{"\n"}
              Tél : {data.phone}{"\n"}
              {data.email ? `Email : ${data.email}\n` : ''}
              Adresse : {data.fromAddress || data.fromCity}
            </Text>
          </View>
        </View>

        <View style={pdfStyles.salutation}>
          <Text style={pdfStyles.salutationTitle}>Chère Madame, Cher Monsieur,</Text>
          <Text style={pdfStyles.salutationText}>
            Nous vous remercions vivement pour l'intérêt porté à Marne Transdem pour la réalisation de votre projet de déménagement.
            À la suite de notre échange technique, nous avons le plaisir de vous faire part de notre proposition commerciale et logistique.
            Voici la répartition détaillée des prestations proposées dans le cadre de la formule {formula} :
          </Text>
        </View>

        <View style={pdfStyles.prestationsGrid}>
          <View style={pdfStyles.prestationCardLeft}>
            <Text style={pdfStyles.prestationTitleLeft}>À notre charge (Marne Transdem)</Text>
            <View style={pdfStyles.prestationList}>
              {prestations.notreCharge.map((p: string, idx: number) => (
                <Text key={idx} style={pdfStyles.prestationItem}>• {p}</Text>
              ))}
            </View>
            <Text style={pdfStyles.warningText}>
              ⚠️ Demande administrative d'autorisation de stationnement effectuée par nos soins auprès de la mairie compétente.
            </Text>
          </View>

          <View style={pdfStyles.prestationCardRight}>
            <Text style={pdfStyles.prestationTitleRight}>À votre charge (Client)</Text>
            <View style={pdfStyles.prestationList}>
              {prestations.votreCharge.map((p: string, idx: number) => (
                <Text key={idx} style={pdfStyles.prestationItem}>• {p}</Text>
              ))}
            </View>
            <Text style={pdfStyles.warningText}>
              ⚠️ Les frais d'occupation du domaine public (taxes de stationnement dues à la ville) sont à régler directement par le client si applicables.
            </Text>
          </View>
        </View>
      </View>

      <View style={pdfStyles.signaturesBlock}>
        <View style={pdfStyles.signaturesGrid}>
          <View style={pdfStyles.signatureCol}>
            <Text style={pdfStyles.signatureLabel}>Pour le Client (Bon pour accord)</Text>
            <View style={pdfStyles.signatureBox}>
              <Text style={pdfStyles.signaturePlaceholder}>
                Signature précédée de la mention manuscrite{"\n"}"Bon pour accord et exécution"
              </Text>
            </View>
          </View>
          <View style={pdfStyles.signatureCol}>
            <Text style={pdfStyles.signatureLabel}>Pour l'entreprise (Marne Transdem)</Text>
            <View style={pdfStyles.signatureBoxRight}>
              <Text style={{ fontSize: 7, color: '#64748b', fontWeight: 'bold' }}>Direction des Opérations</Text>
              <View style={pdfStyles.stamp}>
                <Text style={pdfStyles.stampTitle}>MARNE TRANSDEM</Text>
                <Text style={pdfStyles.stampSub}>DIRECTION LOGISTIQUE</Text>
                <Text style={pdfStyles.stampText}>CRÉTEIL Cedex</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={pdfStyles.footerPageNum}>
          Page 1/3 — Devis commercial Marne Transdem S.A.S. • Siret: 843 321 890 00012
        </Text>
      </View>
    </Page>

    {/* Page 2 */}
    <Page size="A4" style={pdfStyles.page}>
      <View>
        <View style={pdfStyles.header}>
          <View style={pdfStyles.logoContainer}>
            <Image src={logoUrl} style={{ width: 120, height: 35, objectFit: 'contain' }} />
            <Text style={pdfStyles.slogan}>Déménagez en toute sérénité !</Text>
          </View>
          <View style={pdfStyles.headerMeta}>
            <Text style={pdfStyles.badge}>Devis Contrat</Text>
            <Text style={pdfStyles.devisNo}>DEVIS CONTRAT N° : DEVIS-{data.id}</Text>
            <Text style={pdfStyles.dateText}>Date d'édition : {data.createdAt || data.date}</Text>
            <Text style={pdfStyles.dateText}>Code Client : {clientCode}</Text>
          </View>
        </View>

        <Text style={pdfStyles.sectionTitle}>📊 Paramètres Logistiques</Text>
        <View style={pdfStyles.technicalTable}>
          <View style={pdfStyles.tableHeaderRow}>
            <Text style={[pdfStyles.tableCellHeader, { width: '25%' }]}>Volume estimé</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '25%' }]}>Formule choisie</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '25%' }]}>Distance</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '25%', borderRightWidth: 0 }]}>Type de voyage</Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.tableCell, { width: '25%', fontWeight: 'bold' }]}>{data.volume || 25} m³</Text>
            <Text style={[pdfStyles.tableCell, { width: '25%', fontWeight: 'bold', color: '#4f46e5' }]}>{formula}</Text>
            <Text style={[pdfStyles.tableCell, { width: '25%' }]}>{distance}</Text>
            <Text style={[pdfStyles.tableCell, { width: '25%', borderRightWidth: 0 }]}>{voyageType}</Text>
          </View>
        </View>

        <View style={pdfStyles.logisticsGrid}>
          <View style={pdfStyles.logisticsBoxLeft}>
            <Text style={pdfStyles.logisticsBoxTitleLeft}>📦 ADRESSE DE DÉPART (Chargement)</Text>
            <Text style={[pdfStyles.logisticsLine, { fontWeight: 'bold' }]}>{data.fromAddress || data.fromCity}</Text>
            <Text style={pdfStyles.logisticsLine}><Text style={pdfStyles.logisticsLabel}>Étage : </Text>{fromFloor}</Text>
            <Text style={pdfStyles.logisticsLine}><Text style={pdfStyles.logisticsLabel}>Ascenseur : </Text>{fromElevator}</Text>
            <Text style={pdfStyles.logisticsLine}><Text style={pdfStyles.logisticsLabel}>Monte-meuble : </Text>{fromLift}</Text>
            <Text style={pdfStyles.logisticsLine}><Text style={pdfStyles.logisticsLabel}>Portage : </Text>{fromPortage}</Text>
          </View>

          <View style={pdfStyles.logisticsBoxRight}>
            <Text style={pdfStyles.logisticsBoxTitleRight}>🚚 ADRESSE D'ARRIVÉE (Livraison)</Text>
            <Text style={[pdfStyles.logisticsLine, { fontWeight: 'bold' }]}>{data.toAddress || data.toCity}</Text>
            <Text style={pdfStyles.logisticsLine}><Text style={pdfStyles.logisticsLabel}>Étage : </Text>{toFloor}</Text>
            <Text style={pdfStyles.logisticsLine}><Text style={pdfStyles.logisticsLabel}>Ascenseur : </Text>{toElevator}</Text>
            <Text style={pdfStyles.logisticsLine}><Text style={pdfStyles.logisticsLabel}>Monte-meuble : </Text>{toLift}</Text>
            <Text style={pdfStyles.logisticsLine}><Text style={pdfStyles.logisticsLabel}>Portage : </Text>{toPortage}</Text>
          </View>
        </View>

        <Text style={pdfStyles.sectionTitle}>💶 Détail Financier</Text>
        <View style={pdfStyles.pricingTable}>
          <View style={pdfStyles.tableHeaderRow}>
            <Text style={[pdfStyles.tableCellHeader, { width: '50%' }]}>Désignation</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '15%', textAlign: 'center' }]}>Taux TVA</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '18%', textAlign: 'right' }]}>Montant HT</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '17%', textAlign: 'right', borderRightWidth: 0 }]}>Montant TTC</Text>
          </View>
          
          <View style={pdfStyles.tableRow}>
            <View style={[pdfStyles.tableCell, { width: '50%', display: 'flex', flexDirection: 'column' }]}>
              <Text style={{ fontWeight: 'bold' }}>Prestation de déménagement routier complet</Text>
              <Text style={{ fontSize: 6.5, color: '#64748b', marginTop: 1 }}>
                Formule {formula} — Volume de {data.volume || 25} m³ de {data.fromCity} à {data.toCity}
              </Text>
            </View>
            <Text style={[pdfStyles.tableCell, { width: '15%', textAlign: 'center' }]}>20%</Text>
            <Text style={[pdfStyles.pricingCellHT, { width: '18%' }]}>{priceHT.toLocaleString('fr-FR')} €</Text>
            <Text style={[pdfStyles.pricingCellTTC, { width: '17%' }]}>{cleanPrice.toLocaleString('fr-FR')} €</Text>
          </View>
          
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.tableCell, { width: '50%' }]}>Garantie contractuelle ad-valorem (Assurance incluse jusqu'à 50 000 €)</Text>
            <Text style={[pdfStyles.tableCell, { width: '15%', textAlign: 'center' }]}>-</Text>
            <Text style={[pdfStyles.pricingCellHT, { width: '18%', color: '#94a3b8' }]}>Inclus</Text>
            <Text style={[pdfStyles.pricingCellTTC, { width: '17%', color: '#4f46e5' }]}>Inclus</Text>
          </View>

          <View style={pdfStyles.totalRow}>
            <Text style={[pdfStyles.totalCellLabel, { width: '65%' }]}>Total Général</Text>
            <Text style={[pdfStyles.pricingCellHT, { width: '18%', fontWeight: 'bold' }]}>{priceHT.toLocaleString('fr-FR')} € HT</Text>
            <Text style={[pdfStyles.pricingCellTTC, { width: '17%', color: '#1e1b4b', fontSize: 9.5 }]}>{cleanPrice.toLocaleString('fr-FR')} € TTC</Text>
          </View>
        </View>

        <View style={pdfStyles.paymentCards}>
          <View style={pdfStyles.paymentCard}>
            <Text style={pdfStyles.paymentCardLabel}>Arrhes à verser à la commande (30%)</Text>
            <Text style={pdfStyles.paymentCardVal}>{arrhes.toLocaleString('fr-FR')} € TTC</Text>
            <Text style={{ fontSize: 6.5, color: '#94a3b8', marginTop: 1 }}>Pour réserver officiellement la date</Text>
          </View>
          <View style={pdfStyles.paymentCard}>
            <Text style={pdfStyles.paymentCardLabel}>Solde à verser à la livraison (70%)</Text>
            <Text style={pdfStyles.paymentCardVal}>{solde.toLocaleString('fr-FR')} € TTC</Text>
            <Text style={{ fontSize: 6.5, color: '#94a3b8', marginTop: 1 }}>Réglable à la fin du déchargement</Text>
          </View>
        </View>
      </View>

      <View style={pdfStyles.signaturesBlock}>
        <Text style={{ fontSize: 7, color: '#64748b', marginBottom: 4, lineHeight: 1.4 }}>
          En signant ce devis contrat, le client déclare accepter l'ensemble des termes logistiques décrits en page 2 et les Conditions Générales de Vente répertoriées en page 3.
        </Text>
        <View style={pdfStyles.signaturesGrid}>
          <View style={pdfStyles.signatureCol}>
            <Text style={pdfStyles.signatureLabel}>Le Client (précédé de la mention "Lu et approuvé")</Text>
            <View style={[pdfStyles.signatureBox, { height: 40 }]}>
              <Text style={pdfStyles.signaturePlaceholder}>Date et signature</Text>
            </View>
          </View>
          <View style={pdfStyles.signatureCol}>
            <Text style={pdfStyles.signatureLabel}>Pour la direction (Marne Transdem)</Text>
            <View style={[pdfStyles.signatureBoxRight, { height: 40, justifyContent: 'center' }]}>
              <Text style={{ fontSize: 7, color: '#4f46e5', fontWeight: 'bold' }}>Direction Générale</Text>
              <Text style={{ fontSize: 6, color: '#64748b', marginTop: 2 }}>Créteil, le {data.createdAt || data.date}</Text>
            </View>
          </View>
        </View>
        <Text style={pdfStyles.footerPageNum}>
          Page 2/3 — Devis commercial Marne Transdem S.A.S. • Siret: 843 321 890 00012
        </Text>
      </View>
    </Page>

    {/* Page 3 */}
    <Page size="A4" style={pdfStyles.page}>
      <View>
        <View style={[pdfStyles.header, { borderBottomWidth: 1, borderBottomColor: '#0f172a', paddingBottom: 6 }]}>
          <Text style={pdfStyles.cgvTitle}>CONDITIONS GÉNÉRALES DE VENTE (CGV)</Text>
          <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#64748b' }}>MARNE TRANSDEM S.A.S</Text>
        </View>

        <View style={pdfStyles.cgvGrid}>
          <View style={pdfStyles.cgvCol}>
            <View style={pdfStyles.cgvArticle}>
              <Text style={pdfStyles.cgvArtTitle}>ARTICLE 1 - OBJET DU CONTRAT</Text>
              <Text style={pdfStyles.cgvArtText}>
                Le présent contrat a pour objet la réalisation de prestations logistiques et de déménagement routier convenues entre l'entreprise Marne Transdem et le client désigné sur le devis contrat. Ces conditions s'appliquent à l'exclusion de tout autre document.
              </Text>
            </View>
            <View style={pdfStyles.cgvArticle}>
              <Text style={pdfStyles.cgvArtTitle}>ARTICLE 2 - FORMULES & PRESTATIONS</Text>
              <Text style={pdfStyles.cgvArtText}>
                Les prestations sont réparties selon la formule retenue (Luxe, Standard, Économique) détaillée en page 1 du présent devis. Toute prestation non mentionnée expressément fera l'objet d'un devis complémentaire ou d'un avenant écrit signé par les deux parties.
              </Text>
            </View>
            <View style={pdfStyles.cgvArticle}>
              <Text style={pdfStyles.cgvArtTitle}>ARTICLE 3 - PRIX & VALIDITÉ</Text>
              <Text style={pdfStyles.cgvArtText}>
                Les tarifs sont fermes et définitifs pour les dates et caractéristiques mentionnées. Le devis est valable pendant 30 jours calendaires à compter de sa date d'édition. Les prix s'entendent toutes taxes comprises (TVA de 20% incluse).
              </Text>
            </View>
            <View style={pdfStyles.cgvArticle}>
              <Text style={pdfStyles.cgvArtTitle}>ARTICLE 4 - MODALITÉS DE RÈGLEMENT</Text>
              <Text style={pdfStyles.cgvArtText}>
                Sauf accord contraire écrit, un acompte de 30% (arrhes) est exigible à la signature du devis pour confirmer la réservation de la date. Le solde de 70% est payable en totalité au déchargement à la livraison. En cas de non-paiement du solde, l'entreprise se réserve le droit d'exercer un droit de rétention sur le mobilier.
              </Text>
            </View>
          </View>

          <View style={pdfStyles.cgvCol}>
            <View style={pdfStyles.cgvArticle}>
              <Text style={pdfStyles.cgvArtTitle}>ARTICLE 5 - RESPONSABILITÉS & GARANTIES</Text>
              <Text style={pdfStyles.cgvArtText}>
                L'entreprise est responsable des pertes ou avaries subies par les objets transportés conformément à la législation en vigueur, dans la limite d'un plafond de 50 000 € par véhicule (Assurance AXA RC Professionnelle). La déclaration de valeur obligatoire doit accompagner le contrat. Les dommages doivent faire l'objet de réserves écrites, précises et caractérisées sur le bulletin de livraison lors de la remise des meubles.
              </Text>
            </View>
            <View style={pdfStyles.cgvArticle}>
              <Text style={pdfStyles.cgvArtTitle}>ARTICLE 6 - RETARD & ANNULATION</Text>
              <Text style={pdfStyles.cgvArtText}>
                Toute annulation par le client intervenant moins de 7 jours avant la date du déménagement entraînera la perte définitive des arrhes de 30% versées. Les reports de date doivent être demandés par écrit au moins 10 jours ouvrés avant la prestation initiale.
              </Text>
            </View>
            <View style={pdfStyles.cgvArticle}>
              <Text style={pdfStyles.cgvArtTitle}>ARTICLE 7 - OBLIGATIONS DU CLIENT</Text>
              <Text style={pdfStyles.cgvArtText}>
                Le client s'engage à être présent au chargement et à la livraison, ou à s'y faire valablement représenter. Le client garantit l'exactitude des renseignements fournis (étages, ascenseur, distance de portage, monte-meubles) et s'engage à emballer les cartons sous sa charge avant l'arrivée de l'équipe logistique.
              </Text>
            </View>
            <View style={pdfStyles.cgvArticle}>
              <Text style={pdfStyles.cgvArtTitle}>ARTICLE 8 - DROIT APPLICABLE & LITIGES</Text>
              <Text style={pdfStyles.cgvArtText}>
                Le présent contrat est régi par le droit français. En cas de contestation ou de litige sur l'exécution ou l'interprétation du présent contrat, et après tentative infructueuse de résolution amiable, compétence exclusive est attribuée aux tribunaux compétents du siège social de l'entreprise (Tribunal de Commerce de Créteil).
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={pdfStyles.cgvApprovalBox}>
        <Text style={pdfStyles.cgvApprovalTitle}>Cadre d'Approbation du Client pour les Conditions Générales de Vente</Text>
        <View style={pdfStyles.cgvApprovalContent}>
          <Text style={pdfStyles.cgvApprovalText}>
            Je soussigné(e) <Text style={{ fontWeight: 'bold' }}>{data.clientName.toUpperCase()}</Text>, déclare avoir pris connaissance et accepter sans réserve l'intégralité des Conditions Générales de Vente (CGV) de Marne Transdem répertoriées ci-dessus.
          </Text>
          <View style={pdfStyles.cgvApprovalSign}>
            <Text style={pdfStyles.cgvApprovalSignLabel}>Signature :</Text>
            <Text style={pdfStyles.cgvApprovalDateLabel}>Date : ____/____/2026</Text>
          </View>
        </View>
      </View>

      <Text style={pdfStyles.footerPageNum}>
        Page 3/3 — Devis commercial Marne Transdem S.A.S. • Siret: 843 321 890 00012
      </Text>
    </Page>
  </PdfDocument>
);

// Component FacturePdfDocument for native vector PDF
const FacturePdfDocument = ({ data, formula, priceHT, tvaVal, cleanPrice, clientCode, expiresDate, logoUrl }: any) => (
  <PdfDocument>
    <Page size="A4" style={pdfStyles.page}>
      <View>
        <View style={pdfStyles.header}>
          <View style={pdfStyles.logoContainer}>
            <Image src={logoUrl} style={{ width: 120, height: 35, objectFit: 'contain' }} />
            <Text style={pdfStyles.slogan}>Déménagez en toute sérénité !</Text>
          </View>
          <View style={pdfStyles.headerMeta}>
            <Text style={pdfStyles.facturePaidBadge}>Facture Officielle</Text>
            <Text style={pdfStyles.devisNo}>Facture N° : FACT-{data.id}</Text>
            <Text style={pdfStyles.dateText}>Date d'édition : {data.createdAt || data.date}</Text>
            <Text style={[pdfStyles.dateText, { fontWeight: 'bold', color: '#10b981' }]}>Date limite : {data.dueDate || expiresDate}</Text>
          </View>
        </View>

        <View style={pdfStyles.addressesGrid}>
          <View style={pdfStyles.addressCol}>
            <Text style={pdfStyles.colTitle}>🏢 EMETTEUR</Text>
            <Text style={pdfStyles.companyName}>MARNE TRANSDEM S.A.S</Text>
            <Text style={pdfStyles.addressDetails}>
              14 Avenue du Général de Gaulle{"\n"}
              94054 Créteil Cedex{"\n"}
              Siret: 843 321 890 00012 • RCS Créteil{"\n"}
              TVA: FR 24 843321890
            </Text>
          </View>
          <View style={pdfStyles.addressCard}>
            <Text style={pdfStyles.colTitle}>👤 DESTINATAIRE CLIENT</Text>
            <Text style={pdfStyles.clientName}>{data.clientName}</Text>
            <Text style={pdfStyles.addressDetails}>
              Code Client : {clientCode}{"\n"}
              Tél : {data.phone}{"\n"}
              {data.email ? `Email : ${data.email}\n` : ''}
              Adresse : {data.fromAddress || data.fromCity}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 15, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 8 }}>
          <Text style={[pdfStyles.colTitle, { fontSize: 7, marginBottom: 5 }]}>⚡ RAPPEL DES CARACTÉRISTIQUES LOGISTIQUES</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '32%' }}>
              <Text style={{ fontSize: 6.5, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Lieu de Chargement</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0f172a', marginTop: 1 }}>{data.fromAddress || data.fromCity}</Text>
            </View>
            <View style={{ width: '32%' }}>
              <Text style={{ fontSize: 6.5, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Lieu de Livraison</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0f172a', marginTop: 1 }}>{data.toAddress || data.toCity}</Text>
            </View>
            <View style={{ width: '32%' }}>
              <Text style={{ fontSize: 6.5, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Volume & Formule</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0f172a', marginTop: 1 }}>{data.volume || 25} m³ • {formula}</Text>
            </View>
          </View>
        </View>

        <View style={pdfStyles.pricingTable}>
          <View style={pdfStyles.tableHeaderRow}>
            <Text style={[pdfStyles.tableCellHeader, { width: '55%' }]}>Désignation des Prestations Logistiques</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '15%', textAlign: 'center' }]}>Volume (m³)</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '15%', textAlign: 'center' }]}>Quantité</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: '15%', textAlign: 'right', borderRightWidth: 0 }]}>Montant HT</Text>
          </View>
          
          <View style={pdfStyles.tableRow}>
            <View style={[pdfStyles.tableCell, { width: '55%', display: 'flex', flexDirection: 'column' }]}>
              <Text style={{ fontWeight: 'bold' }}>Prestation de Déménagement routier complet</Text>
              <Text style={{ fontSize: 6.5, color: '#64748b', marginTop: 2 }}>
                Transport sécurisé, chargement, déchargement et remise en place complète. Formule {formula}.
              </Text>
            </View>
            <Text style={[pdfStyles.tableCell, { width: '15%', textAlign: 'center' }]}>{data.volume || 25}</Text>
            <Text style={[pdfStyles.tableCell, { width: '15%', textAlign: 'center' }]}>1 dossier</Text>
            <Text style={[pdfStyles.pricingCellHT, { width: '15%', fontWeight: 'bold' }]}>{priceHT.toLocaleString('fr-FR')} €</Text>
          </View>
          
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.tableCell, { width: '55%' }]}>Assurance contractuelle ad-valorem (Garantie 50 000 € incluse)</Text>
            <Text style={[pdfStyles.tableCell, { width: '15%', textAlign: 'center' }]}>-</Text>
            <Text style={[pdfStyles.tableCell, { width: '15%', textAlign: 'center' }]}>1</Text>
            <Text style={[pdfStyles.pricingCellHT, { width: '15%', color: '#94a3b8' }]}>Inclus</Text>
          </View>
        </View>
      </View>

      <View style={{ borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ width: '58%', fontSize: 7, color: '#64748b', lineHeight: 1.4 }}>
            <Text style={{ fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', fontSize: 7.5, marginBottom: 2 }}>Conditions de règlement</Text>
            <Text>Facture payable sous 30 jours calendaires à compter de la date d'édition. Aucun escompte applicable pour paiement anticipé.</Text>
            <Text style={{ marginTop: 2 }}>Paiement effectué par virement bancaire / carte de crédit.</Text>
          </View>
          
          <View style={{ width: '38%', display: 'flex', flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: '#475569', marginBottom: 2 }}>
              <Text>Total Hors Taxes (HT) :</Text>
              <Text style={{ fontWeight: 'bold' }}>{priceHT.toLocaleString('fr-FR')} €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: '#475569', marginBottom: 2 }}>
              <Text>TVA (20%) :</Text>
              <Text style={{ fontWeight: 'bold' }}>{tvaVal.toLocaleString('fr-FR')} €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 9, color: '#065f46', backgroundColor: '#ecfdf5', borderWidth: 1, borderColor: '#a7f3d0', borderRadius: 6, padding: '4px 6px', marginTop: 2 }}>
              <Text style={{ fontWeight: 'bold' }}>TOTAL TTC :</Text>
              <Text style={{ fontWeight: 'bold' }}>{cleanPrice.toLocaleString('fr-FR')} €</Text>
            </View>
          </View>
        </View>

        <View style={pdfStyles.paidStatusContainer}>
          <Text style={{ fontSize: 6.5, color: '#94a3b8' }}>
            MARNE TRANSDEM S.A.S • Siret: 843 321 890 00012
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Stamp */}
            <View style={[pdfStyles.facturePaidStamp, { marginRight: 15 }]}>
              <Text style={pdfStyles.facturePaidStampText}>ACQUITTÉ</Text>
              <Text style={pdfStyles.facturePaidStampSub}>MARNE TRANSDEM</Text>
              <Text style={{ fontSize: 4.5, fontWeight: 'normal' }}>COMPTABILITÉ</Text>
            </View>

            {/* Status Badge */}
            <View style={pdfStyles.facturePaidBadgeBig}>
              <Text>✔ Payé & Validé</Text>
            </View>
          </View>
        </View>

        <Text style={pdfStyles.footerPageNum}>
          Page 1/1 — Facture acquittée Marne Transdem S.A.S. • Siret: 843 321 890 00012
        </Text>
      </View>
    </Page>
  </PdfDocument>
);

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
    // Optional Devis fields
    expiresAt?: string;
    fromFloor?: string;
    toFloor?: string;
    fromElevator?: 'Oui' | 'Non';
    toElevator?: 'Oui' | 'Non';
    fromLift?: 'Oui' | 'Non';
    toLift?: 'Oui' | 'Non';
    fromPortage?: string;
    toPortage?: string;
    clientCode?: string;
    distance?: string;
    voyageType?: 'Urbain' | 'National';
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
    setIsGeneratingPdf(true);
    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: documentType,
          data: data
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || "Erreur lors de la génération du PDF.");
      }

      // Download from server URL
      const link = document.createElement('a');
      link.href = result.url;
      link.target = '_blank';
      link.download = `${documentType === 'devis' ? 'Devis' : 'Facture'}_${data.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e: any) {
      console.error("Failed to generate PDF:", e);
      alert(`Une erreur est survenue lors de la génération du fichier PDF : ${e.message || e}`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSendEmail = async () => {
    const targetEmail = data.email || window.prompt("L'e-mail du client n'est pas renseigné dans le dossier. Veuillez saisir son adresse e-mail :");
    if (!targetEmail || !targetEmail.trim()) {
      return;
    }

    setEmailStatus('sending');
    try {
      const pdfName = `${documentType === 'devis' ? 'Devis' : 'Facture'}_${data.id}.pdf`;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'admin-doc',
          documentType,
          data: {
            id: data.id,
            clientName: data.clientName,
            clientEmail: targetEmail.trim(),
            pdfName,
            docData: data // Pass document data directly; the backend compiles the PDF on the fly
          }
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || "Erreur de serveur");
      }

      setEmailStatus('sent');
      setTimeline([
        { title: 'Document PDF vectoriel généré', time: 'À l\'instant', status: 'done' },
        { title: `Expédié à ${targetEmail.trim()}`, time: 'Il y a 2s', status: 'done' },
        { title: 'Délivré avec succès (SMTP)', time: 'Il y a 1s', status: 'done' }
      ]);

      if (documentType === 'devis' && onStatusChange) {
        onStatusChange(data.id, 'Envoyé');
      }
    } catch (e: any) {
      console.error("Failed to send email:", e);
      setEmailStatus('idle');
      alert(`Une erreur est survenue lors de l'envoi de l'e-mail : ${e.message || e}`);
    }
  };

  // Calculations
  const cleanPrice = data.price || 1200;
  const priceHT = Math.round(cleanPrice / 1.2);
  const tvaVal = cleanPrice - priceHT;
  const arrhes = Math.round(cleanPrice * 0.3);
  const solde = cleanPrice - arrhes;

  const expiresDate = data.expiresAt || new Date(new Date(data.createdAt || data.date || Date.now()).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');
  const clientCode = data.clientCode || (data.clientName ? data.clientName.substring(0, 3).toUpperCase() + '-' + data.id.substring(0, 4) : 'CL-MT');
  const voyageType = data.voyageType || 'Urbain';
  const distance = data.distance || '15 km';
  const fromFloor = data.fromFloor || 'RDC';
  const toFloor = data.toFloor || 'RDC';
  const fromElevator = data.fromElevator || 'Non';
  const toElevator = data.toElevator || 'Non';
  const fromLift = data.fromLift || 'Non';
  const toLift = data.toLift || 'Non';
  const fromPortage = data.fromPortage || 'Non';
  const toPortage = data.toPortage || 'Non';

  const formula = data.formula || 'Standard';
  
  const getPrestations = () => {
    switch (formula.toLowerCase()) {
      case 'luxe':
        return {
          notreCharge: [
            "Fourniture de tous les cartons de déménagement, rubans adhésifs et fournitures de protection de haute qualité.",
            "Emballage complet de tous vos effets personnels (vaisselle, verrerie, bibelots, vêtements sur cintres, livres, linge).",
            "Démontage complet de tous les mobiliers nécessitant d'être démontés pour le transport.",
            "Protection individuelle de tout le mobilier sous couvertures professionnelles épaisses et housses plastiques.",
            "Chargement, transport sécurisé en camion capitonné, déchargement et remise en place complète.",
            "Remontage complet de tous les mobiliers préalablement démontés.",
            "Demande d'autorisation de stationnement effectuée par nos soins auprès de la mairie/commissariat."
          ],
          votreCharge: [
            "Déconnexion des appareils électriques, électroniques et électroménagers.",
            "Décrochage des objets fixés aux murs et plafonds (luminaires, étagères, tringles).",
            "Retrait des objets précieux, bijoux, fonds de tiroir, clés, valeurs et documents personnels.",
            "Les frais d'occupation du domaine public (taxes de stationnement dues à la ville) sont à la charge exclusive du client."
          ]
        };
      case 'economique':
      case 'économique':
      case 'eco':
        return {
          notreCharge: [
            "Protection individuelle de tout le mobilier sous couvertures professionnelles et housses pour matelas.",
            "Chargement, transport sécurisé en camion capitonné, déchargement et mise en place dans vos pièces de destination.",
            "Demande d'autorisation de stationnement effectuée par nos soins auprès de la mairie/commissariat."
          ],
          votreCharge: [
            "Fourniture de tous les cartons et matériels d'emballage.",
            "Emballage complet de tous vos objets fragiles et non fragiles dans les cartons avant notre arrivée.",
            "Démontage et remontage complet de tous les mobiliers par vos soins.",
            "Déconnexion des appareils électriques, électroniques et électroménagers.",
            "Décrochage des objets fixés aux murs et plafonds (luminaires, étagères, tringles).",
            "Retrait des objets précieux, bijoux, fonds de tiroir, clés, valeurs et documents personnels.",
            "Les frais d'occupation du domaine public (taxes de stationnement dues à la ville) sont à la charge exclusive du client."
          ]
        };
      case 'standard':
      default:
        return {
          notreCharge: [
            "Fourniture des cartons de déménagement et rubans adhésifs professionnels nécessaires.",
            "Emballage de tous vos objets fragiles (vaisselle, verrerie, miroirs, bibelots).",
            "Démontage et remontage des mobiliers de base (lits, tables, armoires standards si nécessaire).",
            "Protection individuelle de tout le mobilier sous couvertures professionnelles et housses.",
            "Chargement, transport sécurisé en camion capitonné, déchargement et remise en place dans les pièces indiquées.",
            "Demande d'autorisation de stationnement effectuée par nos soins auprès de la mairie/commissariat."
          ],
          votreCharge: [
            "Emballage de tous les objets non fragiles (livres, vêtements, linge de lit) dans les cartons fournis par nos soins.",
            "Déconnexion des appareils électriques, électroniques et électroménagers.",
            "Décrochage des objets fixés aux murs et plafonds (luminaires, étagères, tringles).",
            "Retrait des objets précieux, bijoux, fonds de tiroir, clés, valeurs et documents personnels.",
            "Les frais d'occupation du domaine public (taxes de stationnement dues à la ville) sont à la charge exclusive du client."
          ]
        };
    }
  };

  const prestations = getPrestations();

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto print:p-0 print:bg-white print:relative print:z-0">
      
      {/* Import Caveat and Great Vibes Google fonts for the handwritten signatures & slogan */}
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Great+Vibes&display=swap" rel="stylesheet" />

      <div className="bg-white dark:bg-slate-950 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[95vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
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
              {isGeneratingPdf ? 'Génération...' : 'Télécharger PDF'}
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
            className="lg:col-span-8 bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 print:border-none print:p-0 print:bg-white w-full flex flex-col items-center overflow-x-auto gap-6 print:gap-0"
          >
            {/* Inject CSS print styles directly for print breaks */}
            <style dangerouslySetInnerHTML={{ __html: `
              @media print {
                body * {
                  visibility: hidden;
                }
                #pdf-document-canvas, #pdf-document-canvas * {
                  visibility: visible;
                }
                #pdf-document-canvas {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 210mm !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  background: white !important;
                  box-shadow: none !important;
                  border: none !important;
                }
                .pdf-page {
                  page-break-after: always !important;
                  break-after: page !important;
                  width: 210mm !important;
                  height: 297mm !important;
                  padding: 15mm !important;
                  box-sizing: border-box !important;
                  margin: 0 !important;
                  border: none !important;
                  box-shadow: none !important;
                  background: white !important;
                }
              }
            `}} />

            {documentType === 'devis' ? (
              <div className="flex flex-col gap-6 print:gap-0 w-full items-center">
                
                {/* PAGE 1 : LETTRE D'ACCOMPAGNEMENT */}
                <div className="pdf-page bg-white shadow-lg print:shadow-none p-[15mm] border border-slate-200 print:border-none flex flex-col justify-between overflow-hidden shrink-0" style={{ width: '210mm', height: '297mm', boxSizing: 'border-box' }}>
                  
                  {/* Page 1 Header */}
                  <div>
                    <div className="flex justify-between items-start border-b pb-4 border-slate-200">
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
                        <p style={{ fontFamily: '"Caveat", "Brush Script MT", "Segoe Print", cursive' }} className="text-indigo-600 text-sm font-semibold italic mt-1">
                          Déménagez en toute sérénité !
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-slate-900 text-white font-black px-3 py-1 rounded inline-block text-[9px] uppercase tracking-wider">
                          Devis Commercial
                        </span>
                        <p className="font-mono text-[9px] font-black mt-2 text-slate-900 uppercase">Devis N° : DEVIS-{data.id}</p>
                        <p className="text-[8px] text-slate-500 mt-0.5">Date : {data.createdAt || data.date}</p>
                        <p className="text-[8px] text-red-650 font-bold mt-0.5">Validité : {expiresDate}</p>
                      </div>
                    </div>

                    {/* Grid de Coordonnées */}
                    <div className="grid grid-cols-2 gap-8 pt-4 text-[9px]">
                      <div>
                        <h4 className="font-bold text-slate-500 uppercase tracking-wide text-[8px] mb-1">🏢 L'ENTREPRISE</h4>
                        <p className="font-extrabold text-[10px] text-slate-800">MARNE TRANSDEM S.A.S</p>
                        <p className="text-slate-600 font-light mt-0.5 leading-relaxed">
                          14 Avenue du Général de Gaulle<br />
                          94054 Créteil Cedex<br />
                          Tél : 01 43 21 89 00<br />
                          Email : contact@marnetransdem.com
                        </p>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150">
                        <h4 className="font-bold text-slate-500 uppercase tracking-wide text-[8px] mb-1">👤 LE DESTINATAIRE</h4>
                        <p className="font-extrabold text-[10px] text-slate-800 uppercase">{data.clientName}</p>
                        <p className="text-slate-600 font-light mt-0.5 leading-relaxed">
                          Code Client : <span className="font-mono font-bold">{clientCode}</span><br />
                          Tél : {data.phone}<br />
                          {data.email && <>Email : {data.email}<br /></>}
                          Adresse : {data.fromAddress || data.fromCity}
                        </p>
                      </div>
                    </div>

                    {/* Accompagnement Intro */}
                    <div className="mt-4 pt-2">
                      <p className="font-bold text-slate-850 text-[10px]">Chère Madame, Cher Monsieur,</p>
                      <p className="text-slate-650 font-light mt-1.5 leading-relaxed text-[9px]">
                        Nous vous remercions vivement pour l'intérêt porté à Marne Transdem pour la réalisation de votre projet de déménagement.
                        À la suite de notre échange technique, nous avons le plaisir de vous faire part de notre proposition commerciale et logistique. 
                        Voici la répartition détaillée des prestations proposées dans le cadre de la formule <strong className="text-slate-850">{formula}</strong> :
                      </p>
                    </div>

                    {/* Prestations Table/List layout */}
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-1">
                      {/* À Notre Charge */}
                      <div className="border border-indigo-100 rounded-xl p-3.5 bg-indigo-50/10">
                        <h5 className="font-bold text-indigo-950 uppercase tracking-wider text-[8px] border-b border-indigo-100 pb-1.5 mb-2 flex items-center gap-1">
                          <Check className="text-indigo-600" size={10} /> À notre charge (Marne Transdem)
                        </h5>
                        <ul className="space-y-1.5 text-[8.5px] leading-relaxed text-slate-700">
                          {prestations.notreCharge.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-indigo-500 mt-0.5">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-[8px] font-extrabold text-red-650 leading-relaxed">
                          ⚠️ Demande administrative d'autorisation de stationnement effectuée par nos soins auprès de la mairie compétente.
                        </p>
                      </div>

                      {/* À Votre Charge */}
                      <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/20">
                        <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[8px] border-b border-slate-200 pb-1.5 mb-2 flex items-center gap-1">
                          <Check className="text-slate-500" size={10} /> À votre charge (Client)
                        </h5>
                        <ul className="space-y-1.5 text-[8.5px] leading-relaxed text-slate-650">
                          {prestations.votreCharge.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-slate-400 mt-0.5">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-[8px] font-extrabold text-red-650 leading-relaxed">
                          ⚠️ Les frais d'occupation du domaine public (taxes de stationnement dues à la ville) sont à régler directement par le client si applicables.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Page 1 Footer Signatures */}
                  <div className="border-t border-slate-150 pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="font-bold text-slate-500 text-[7.5px] uppercase tracking-wider mb-1">Pour le Client (Bon pour accord)</p>
                        <div className="border border-dashed border-slate-300 rounded-xl h-20 bg-slate-50 flex items-center justify-center p-2 text-center text-[7px] text-slate-400 leading-relaxed">
                          Signature précédée de la mention manuscrite<br />"Bon pour accord et exécution"
                        </div>
                      </div>
                      <div className="relative">
                        <p className="font-bold text-slate-500 text-[7.5px] uppercase tracking-wider mb-1">Pour l'entreprise (Marne Transdem)</p>
                        <div className="border border-dashed border-slate-200 rounded-xl h-20 bg-slate-50/50 flex flex-col justify-between items-center p-2 relative overflow-hidden">
                          <span className="text-[7px] text-slate-500 font-bold">Direction des Opérations</span>
                          
                          {/* Cachet stamp */}
                          <div className="border-2 border-red-650 rounded p-1 text-center text-red-650 font-black uppercase text-[7px] tracking-wider rotate-[-6deg] w-28 select-none pointer-events-none mb-1">
                            <div className="text-[7.5px]">MARNE TRANSDEM</div>
                            <div className="border-t border-b border-red-650 my-0.5 py-0.5 font-bold text-[5px]">DIRECTION LOGISTIQUE</div>
                            <div className="text-[5px] font-normal">CRÉTEIL Cedex</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-slate-400 text-[7px] mt-4 leading-none">
                      Page 1/3 — Devis commercial Marne Transdem S.A.S. • Siret: 843 321 890 00012
                    </div>
                  </div>

                </div>

                {/* PAGE 2 : FICHE DESCRIPTIVE TECHNIQUE & TARIFICATION */}
                <div className="pdf-page bg-white shadow-lg print:shadow-none p-[15mm] border border-slate-200 print:border-none flex flex-col justify-between overflow-hidden shrink-0" style={{ width: '210mm', height: '297mm', boxSizing: 'border-box' }}>
                  
                  {/* Page 2 Header */}
                  <div>
                    <div className="flex justify-between items-start border-b pb-4 border-slate-200">
                      <div>
                        <span className="bg-slate-900 text-white font-black px-3 py-1 rounded inline-block text-[9px] uppercase tracking-wider">
                          Devis Contrat
                        </span>
                        <h2 className="text-sm font-black text-slate-900 uppercase mt-2">DEVIS CONTRAT N° : DEVIS-{data.id}</h2>
                      </div>
                      <div className="text-right text-[8px] text-slate-500 leading-normal">
                        <p>Code Client : <span className="font-mono font-bold text-slate-800">{clientCode}</span></p>
                        <p>Date d'édition : {data.createdAt || data.date}</p>
                      </div>
                    </div>

                    {/* Parameters Grid */}
                    <div className="mt-4">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[8px] mb-2">📊 Paramètres Logistiques</h4>
                      <table className="w-full text-left border border-collapse border-slate-200 text-[9px]">
                        <thead>
                          <tr className="bg-slate-900 text-white text-[8px] uppercase font-black">
                            <th className="py-1.5 px-3 border border-slate-300">Volume estimé</th>
                            <th className="py-1.5 px-3 border border-slate-300">Formule choisie</th>
                            <th className="py-1.5 px-3 border border-slate-300">Distance</th>
                            <th className="py-1.5 px-3 border border-slate-300">Type de voyage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="font-medium text-slate-700">
                            <td className="py-1.5 px-3 border border-slate-200 bg-slate-50/50 font-bold">{data.volume || 25} m³</td>
                            <td className="py-1.5 px-3 border border-slate-200 font-bold text-indigo-700">{formula}</td>
                            <td className="py-1.5 px-3 border border-slate-200 bg-slate-50/50">{distance}</td>
                            <td className="py-1.5 px-3 border border-slate-200">{voyageType}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Chargement vs Livraison side-by-side */}
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      {/* Chargement */}
                      <div>
                        <h4 className="font-bold text-indigo-950 uppercase tracking-wide text-[8px] mb-2 pb-1 border-b border-indigo-200">
                          📦 ADRESSE DE DÉPART (Chargement)
                        </h4>
                        <div className="bg-indigo-50/10 border border-indigo-100 rounded-xl p-3 space-y-1.5 text-[9px] text-slate-700">
                          <p className="leading-relaxed">
                            <span className="text-slate-400 font-bold block text-[7.5px] uppercase">Adresse :</span>
                            <strong className="text-slate-900">{data.fromAddress || data.fromCity}</strong>
                          </p>
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-indigo-50">
                            <p><span className="text-slate-400 block text-[7px] uppercase">Étage :</span> <strong>{fromFloor}</strong></p>
                            <p><span className="text-slate-400 block text-[7px] uppercase">Ascenseur :</span> <strong>{fromElevator}</strong></p>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-indigo-50">
                            <p><span className="text-slate-400 block text-[7px] uppercase">Monte-meuble :</span> <strong>{fromLift}</strong></p>
                            <p><span className="text-slate-400 block text-[7px] uppercase">Portage :</span> <strong>{fromPortage}</strong></p>
                          </div>
                        </div>
                      </div>

                      {/* Livraison */}
                      <div>
                        <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[8px] mb-2 pb-1 border-b border-slate-300">
                          🚚 ADRESSE D'ARRIVÉE (Livraison)
                        </h4>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 text-[9px] text-slate-700">
                          <p className="leading-relaxed">
                            <span className="text-slate-400 font-bold block text-[7.5px] uppercase">Adresse :</span>
                            <strong className="text-slate-900">{data.toAddress || data.toCity}</strong>
                          </p>
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-150">
                            <p><span className="text-slate-400 block text-[7px] uppercase">Étage :</span> <strong>{toFloor}</strong></p>
                            <p><span className="text-slate-400 block text-[7px] uppercase">Ascenseur :</span> <strong>{toElevator}</strong></p>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-150">
                            <p><span className="text-slate-400 block text-[7px] uppercase">Monte-meuble :</span> <strong>{toLift}</strong></p>
                            <p><span className="text-slate-400 block text-[7px] uppercase">Portage :</span> <strong>{toPortage}</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Pricing Table */}
                    <div className="mt-5">
                      <h4 className="font-bold text-slate-850 uppercase tracking-wide text-[8px] mb-2">💶 Détail Financier</h4>
                      <table className="w-full text-left border border-collapse border-slate-200 text-[9px]">
                        <thead>
                          <tr className="bg-slate-900 text-white text-[8px] uppercase font-black">
                            <th className="py-2 px-3 border border-slate-300">Désignation</th>
                            <th className="py-2 px-3 border border-slate-300 text-center">Taux TVA</th>
                            <th className="py-2 px-3 border border-slate-300 text-right">Montant HT</th>
                            <th className="py-2 px-3 border border-slate-300 text-right">Montant TTC</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-700">
                          <tr>
                            <td className="py-2 px-3 border border-slate-200 font-bold leading-normal">
                              Prestation de déménagement routier complet
                              <span className="block font-normal text-[7.5px] text-slate-400 mt-0.5">
                                Formule {formula} — Volume de {data.volume || 25} m³ de {data.fromCity} à {data.toCity}
                              </span>
                            </td>
                            <td className="py-2 px-3 border border-slate-200 text-center">20%</td>
                            <td className="py-2 px-3 border border-slate-200 text-right font-mono">{priceHT.toLocaleString('fr-FR')} €</td>
                            <td className="py-2 px-3 border border-slate-200 text-right font-mono font-bold">{cleanPrice.toLocaleString('fr-FR')} €</td>
                          </tr>
                          <tr className="bg-slate-50 font-light">
                            <td className="py-1.5 px-3 border border-slate-200">Garantie contractuelle ad-valorem (Assurance incluse jusqu'à 50 000 €)</td>
                            <td className="py-1.5 px-3 border border-slate-200 text-center">-</td>
                            <td className="py-1.5 px-3 border border-slate-200 text-right italic text-slate-400">Inclus</td>
                            <td className="py-1.5 px-3 border border-slate-200 text-right italic text-indigo-700 font-bold">Inclus</td>
                          </tr>
                          <tr className="font-bold text-slate-900 bg-slate-100">
                            <td colSpan={2} className="py-2 px-3 border border-slate-200 text-right uppercase tracking-wider text-[8px]">Total Général</td>
                            <td className="py-2 px-3 border border-slate-200 text-right font-mono">{priceHT.toLocaleString('fr-FR')} € HT</td>
                            <td className="py-2 px-3 border border-slate-200 text-right font-mono text-indigo-900 text-[10px]">{cleanPrice.toLocaleString('fr-FR')} € TTC</td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Payment Terms Cards */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="border border-indigo-200 rounded-xl p-3 bg-indigo-50/5 text-center">
                          <span className="text-[7.5px] font-bold uppercase text-slate-500 block">Arrhes à verser à la commande (30%)</span>
                          <strong className="text-indigo-900 font-mono text-xs block mt-1">{arrhes.toLocaleString('fr-FR')} € TTC</strong>
                          <span className="text-[7px] text-slate-400 block mt-0.5">Pour réserver officiellement la date</span>
                        </div>
                        <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 text-center">
                          <span className="text-[7.5px] font-bold uppercase text-slate-500 block">Solde à verser à la livraison (70%)</span>
                          <strong className="text-slate-900 font-mono text-xs block mt-1">{solde.toLocaleString('fr-FR')} € TTC</strong>
                          <span className="text-[7px] text-slate-400 block mt-0.5">Réglable à la fin du déchargement</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Page 2 Signatures */}
                  <div className="border-t border-slate-150 pt-4 mt-4">
                    <p className="text-[7.5px] text-slate-500 leading-relaxed mb-3">
                      En signant ce devis contrat, le client déclare accepter l'ensemble des termes logistiques décrits en page 2 et les Conditions Générales de Vente répertoriées en page 3.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="font-bold text-slate-500 text-[7.5px] uppercase tracking-wider mb-1">Le Client (précédé de la mention "Lu et approuvé")</p>
                        <div className="border border-dashed border-slate-300 rounded-xl h-14 bg-slate-50 flex items-center justify-center p-2 text-center text-[7px] text-slate-400">
                          Date et signature
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-500 text-[7.5px] uppercase tracking-wider mb-1">Pour la direction (Marne Transdem)</p>
                        <div className="border border-dashed border-slate-200 rounded-xl h-14 bg-slate-50/50 flex flex-col justify-between items-center p-1.5 relative overflow-hidden">
                          <span className="text-[7px] text-slate-500 font-bold">Créteil, le {data.createdAt || data.date}</span>
                          <div className="text-[7px] font-extrabold text-indigo-700">Direction Générale</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-slate-400 text-[7px] mt-4 leading-none">
                      Page 2/3 — Devis commercial Marne Transdem S.A.S. • Siret: 843 321 890 00012
                    </div>
                  </div>

                </div>

                {/* PAGE 3 : CONDITIONS GÉNÉRALES DE VENTE (CGV) */}
                <div className="pdf-page bg-white shadow-lg print:shadow-none p-[15mm] border border-slate-200 print:border-none flex flex-col justify-between overflow-hidden shrink-0 text-[6.5px]" style={{ width: '210mm', height: '297mm', boxSizing: 'border-box' }}>
                  
                  {/* Page 3 Header */}
                  <div>
                    <div className="flex justify-between items-center border-b pb-2 border-slate-200">
                      <h2 className="text-[10px] font-black text-slate-900 uppercase">CONDITIONS GÉNÉRALES DE VENTE (CGV)</h2>
                      <span className="text-[7.5px] text-slate-500 font-bold">MARNE TRANSDEM S.A.S</span>
                    </div>

                    {/* CGV content in 2 columns */}
                    <div className="grid grid-cols-2 gap-4 mt-3 text-justify leading-tight text-slate-600">
                      {/* Column 1 */}
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase text-[7px] mb-0.5">ARTICLE 1 - OBJET DU CONTRAT</h4>
                          <p>
                            Le présent contrat a pour objet la réalisation de prestations logistiques et de déménagement routier convenues entre l'entreprise Marne Transdem et le client désigné sur le devis contrat. Ces conditions s'appliquent à l'exclusion de tout autre document.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase text-[7px] mb-0.5">ARTICLE 2 - FORMULES & PRESTATIONS</h4>
                          <p>
                            Les prestations sont réparties selon la formule retenue (Luxe, Standard, Économique) détaillée en page 1 du présent devis. Toute prestation non mentionnée expressément fera l'objet d'un devis complémentaire ou d'un avenant écrit signé par les deux parties.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase text-[7px] mb-0.5">ARTICLE 3 - PRIX & VALIDITÉ</h4>
                          <p>
                            Les tarifs sont fermes et définitifs pour les dates et caractéristiques mentionnées. Le devis est valable pendant 30 jours calendaires à compter de sa date d'édition. Les prix s'entendent toutes taxes comprises (TVA de 20% incluse).
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase text-[7px] mb-0.5">ARTICLE 4 - MODALITÉS DE RÈGLEMENT</h4>
                          <p>
                            Sauf accord contraire écrit, un acompte de 30% (arrhes) est exigible à la signature du devis pour confirmer la réservation de la date. Le solde de 70% est payable en totalité au déchargement à la livraison. En cas de non-paiement du solde, l'entreprise se réserve le droit d'exercer un droit de rétention sur le mobilier.
                          </p>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase text-[7px] mb-0.5">ARTICLE 5 - RESPONSABILITÉS & GARANTIES</h4>
                          <p>
                            L'entreprise est responsable des pertes ou avaries subies par les objets transportés conformément à la législation en vigueur, dans la limite d'un plafond de 50 000 € par véhicule (Assurance AXA RC Professionnelle). La déclaration de valeur obligatoire doit accompagner le contrat. Les dommages doivent faire l'objet de réserves écrites, précises et caractérisées sur le bulletin de livraison lors de la remise des meubles.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase text-[7px] mb-0.5">ARTICLE 6 - RETARD & ANNULATION</h4>
                          <p>
                            Toute annulation par le client intervenant moins de 7 jours avant la date du déménagement entraînera la perte définitive des arrhes de 30% versées. Les reports de date doivent être demandés par écrit au moins 10 jours ouvrés avant la prestation initiale.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase text-[7px] mb-0.5">ARTICLE 7 - OBLIGATIONS DU CLIENT</h4>
                          <p>
                            Le client s'engage à être présent au chargement et à la livraison, ou à s'y faire valablement représenter. Le client garantit l'exactitude des renseignements fournis (étages, ascenseur, distance de portage, monte-meubles) et s'engage à emballer les cartons sous sa charge avant l'arrivée de l'équipe logistique.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase text-[7px] mb-0.5">ARTICLE 8 - DROIT APPLICABLE & LITIGES</h4>
                          <p>
                            Le présent contrat est régi par le droit français. En cas de contestation ou de litige sur l'exécution ou l'interprétation du présent contrat, et après tentative infructueuse de résolution amiable, compétence exclusive est attribuée aux tribunaux compétents du siège social de l'entreprise (Tribunal de Commerce de Créteil).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Page 3 Final Client Approval */}
                  <div className="border-t border-slate-150 pt-4 mt-4 text-[7px]">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <p className="font-bold text-slate-800 text-[7.5px] uppercase tracking-wider mb-2 text-center">
                        Cadre d'Approbation du Client pour les Conditions Générales de Vente
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 text-slate-650 leading-normal text-[7px]">
                          Je soussigné(e) <strong className="text-slate-800 uppercase">{data.clientName}</strong>, déclare avoir pris connaissance et accepter sans réserve l'intégralité des Conditions Générales de Vente (CGV) de Marne Transdem répertoriées ci-dessus.
                        </div>
                        <div className="border border-dashed border-slate-300 rounded-lg h-12 bg-white flex flex-col justify-between p-1 text-[6.5px] text-slate-400">
                          <span>Signature :</span>
                          <span className="text-[6px] text-right text-slate-300">Date : ____/____/2026</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-slate-400 text-[7px] mt-4 leading-none">
                      Page 3/3 — Devis commercial Marne Transdem S.A.S. • Siret: 843 321 890 00012
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="flex flex-col w-full items-center">
                
                {/* INVOICE (FACTURE) : 1-PAGE LAYOUT */}
                <div className="pdf-page bg-white shadow-lg print:shadow-none p-[15mm] border border-slate-200 print:border-none flex flex-col justify-between overflow-hidden shrink-0" style={{ width: '210mm', height: '297mm', boxSizing: 'border-box' }}>
                  
                  {/* Facture Header */}
                  <div>
                    <div className="flex justify-between items-start border-b pb-4 border-slate-200">
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
                        <p style={{ fontFamily: '"Caveat", "Brush Script MT", "Segoe Print", cursive' }} className="text-indigo-600 text-sm font-semibold italic mt-1">
                          Déménagez en toute sérénité !
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-600 text-white font-black px-3 py-1 rounded inline-block text-[9px] uppercase tracking-wider">
                          Facture Officielle
                        </span>
                        <p className="font-mono text-[9px] font-black mt-2 text-slate-900 uppercase">Facture N° : FACT-{data.id}</p>
                        <p className="text-[8px] text-slate-500 mt-0.5">Date d'édition : {data.createdAt || data.date}</p>
                        <p className="text-[8px] text-emerald-650 font-bold mt-0.5">Date limite : {data.dueDate || expiresDate}</p>
                      </div>
                    </div>

                    {/* Addresses Grid */}
                    <div className="grid grid-cols-2 gap-8 pt-4 text-[9px]">
                      <div>
                        <h4 className="font-bold text-slate-500 uppercase tracking-wide text-[8px] mb-1">🏢 EMETTEUR</h4>
                        <p className="font-extrabold text-[10px] text-slate-800">MARNE TRANSDEM S.A.S</p>
                        <p className="text-slate-600 font-light mt-0.5 leading-relaxed">
                          14 Avenue du Général de Gaulle<br />
                          94054 Créteil Cedex<br />
                          Siret: 843 321 890 00012 • RCS Créteil<br />
                          TVA: FR 24 843321890
                        </p>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150">
                        <h4 className="font-bold text-slate-500 uppercase tracking-wide text-[8px] mb-1">👤 DESTINATAIRE CLIENT</h4>
                        <p className="font-extrabold text-[10px] text-slate-800 uppercase">{data.clientName}</p>
                        <p className="text-slate-600 font-light mt-0.5 leading-relaxed">
                          Code Client : <span className="font-mono font-bold">{clientCode}</span><br />
                          Tél : {data.phone}<br />
                          {data.email && <>Email : {data.email}<br /></>}
                          Adresse : {data.fromAddress || data.fromCity}
                        </p>
                      </div>
                    </div>

                    {/* Logistics Specification Summary */}
                    <div className="mt-4 bg-slate-50/50 p-3.5 rounded-xl border border-dashed border-slate-200">
                      <h4 className="text-[8px] font-black uppercase text-slate-400 tracking-wider mb-2">⚡ RAPPEL DES CARACTÉRISTIQUES LOGISTIQUES</h4>
                      <div className="grid grid-cols-3 gap-3 text-[9px] text-slate-700">
                        <div>
                          <span className="text-slate-400 block font-bold text-[7px] uppercase">Lieu de Chargement</span>
                          <strong className="text-slate-900">{data.fromAddress || data.fromCity}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-bold text-[7px] uppercase">Lieu de Livraison</span>
                          <strong className="text-slate-900">{data.toAddress || data.toCity}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-bold text-[7px] uppercase">Volume & Formule</span>
                          <strong className="text-slate-900">{data.volume || 25} m³ • {formula}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Breakdown Table */}
                    <div className="mt-5">
                      <table className="w-full text-left border-collapse text-[9px] border border-slate-200">
                        <thead>
                          <tr className="bg-slate-900 text-white text-[8px] uppercase font-black tracking-wider">
                            <th className="py-2 px-3 border border-slate-300">Désignation des Prestations Logistiques</th>
                            <th className="py-2 px-3 border border-slate-300 text-center">Volume (m³)</th>
                            <th className="py-2 px-3 border border-slate-300 text-center">Quantité</th>
                            <th className="py-2 px-3 border border-slate-300 text-right">Montant HT</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-700">
                          <tr>
                            <td className="py-2.5 px-3 border border-slate-200 font-bold">
                              Prestation de Déménagement routier complet
                              <span className="block font-normal text-[7.5px] text-slate-400 mt-1">
                                Transport sécurisé, chargement, déchargement et remise en place complète. Formule {formula}.
                              </span>
                            </td>
                            <td className="py-2.5 px-3 border border-slate-200 text-center font-mono">{data.volume || 25}</td>
                            <td className="py-2.5 px-3 border border-slate-200 text-center">1 dossier</td>
                            <td className="py-2.5 px-3 border border-slate-200 text-right font-mono font-bold">{priceHT.toLocaleString('fr-FR')} €</td>
                          </tr>
                          <tr className="bg-slate-50 font-light text-slate-500">
                            <td className="py-2 px-3 border border-slate-200 italic">
                              Assurance contractuelle ad-valorem (Garantie 50 000 € incluse)
                            </td>
                            <td className="py-2 px-3 border border-slate-200 text-center">-</td>
                            <td className="py-2 px-3 border border-slate-200 text-center">1</td>
                            <td className="py-2 px-3 border border-slate-200 text-right font-mono text-[8.5px]">Inclus</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pricing and Payment Status Block */}
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex justify-between items-start">
                      <div className="text-[8px] text-slate-500 max-w-sm leading-relaxed">
                        <p className="font-bold uppercase text-slate-650 text-[8.5px] mb-1">Conditions de règlement</p>
                        <p>Facture payable sous 30 jours calendaires à compter de la date d'édition. Aucun escompte applicable pour paiement anticipé.</p>
                        <p className="mt-1">Paiement effectué par virement bancaire / carte de crédit.</p>
                      </div>
                      
                      <div className="w-60 space-y-1.5 text-right text-[9px] text-slate-700">
                        <div className="flex justify-between font-light">
                          <span>Total Hors Taxes (HT) :</span>
                          <span className="font-mono">{priceHT.toLocaleString('fr-FR')} €</span>
                        </div>
                        <div className="flex justify-between font-light">
                          <span>TVA (20%) :</span>
                          <span className="font-mono">{tvaVal.toLocaleString('fr-FR')} €</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-1.5 text-sm font-black text-slate-900 bg-slate-50 p-1.5 rounded-lg">
                          <span>TOTAL TTC :</span>
                          <span className="text-emerald-700 font-mono">{cleanPrice.toLocaleString('fr-FR')} €</span>
                        </div>
                      </div>
                    </div>

                    {/* Paid & Validated stamp/badge */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-150">
                      <div>
                        <p className="font-mono text-[7px] text-slate-400">MARNE TRANSDEM S.A.S • Siret: 843 321 890 00012</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Stamp */}
                        <div className="border-2 border-emerald-600 rounded p-1 text-center text-emerald-600 font-black uppercase text-[7px] tracking-wider rotate-[-3deg] w-28 select-none pointer-events-none">
                          <div className="text-[7.5px]">ACQUITTÉ</div>
                          <div className="border-t border-b border-emerald-600 my-0.5 py-0.5 text-[5px] font-bold">MARNE TRANSDEM</div>
                          <div className="text-[5px] font-normal">COMPTABILITÉ</div>
                        </div>

                        {/* Status Badge */}
                        <div className="font-extrabold flex items-center justify-center gap-1.5 text-emerald-700 uppercase text-[10px] bg-emerald-100/40 border border-emerald-500/20 px-3.5 py-2 rounded-2xl shadow-xs">
                          <ShieldCheck size={14} /> Payé & Validé
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-slate-400 text-[7px] mt-4 leading-none">
                      Page 1/1 — Facture acquittée Marne Transdem S.A.S. • Siret: 843 321 890 00012
                    </div>
                  </div>

                </div>

              </div>
            )}
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
                    className="w-full bg-brand-900 dark:bg-accent text-white dark:text-brand-950 hover:bg-opacity-95 text-xs font-bold py-2.5 px-4 rounded-xl shadow cursor-pointer transition active:scale-95"
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
