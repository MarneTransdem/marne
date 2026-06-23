import { Document as PdfDocument, Page, Text, View, StyleSheet, Font, Image, renderToBuffer } from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';

// Register premium fonts locally for the vector PDF rendering
Font.register({
  family: 'Outfit',
  fonts: [
    { src: path.join(__dirname, '../fonts/Outfit-Regular.ttf'), fontWeight: 'normal' },
    { src: path.join(__dirname, '../fonts/Outfit-Bold.ttf'), fontWeight: 'bold' }
  ]
});
Font.register({
  family: 'Caveat',
  src: path.join(__dirname, '../fonts/Caveat-Regular.ttf'),
  fontWeight: 'normal'
});

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


// Component LettreVoiturePdfDocument for native vector PDF
const LettreVoiturePdfDocument = ({ data, logoUrl }: any) => {
  const lvNo = `LV-${(data.id || '').replace('DEM-', '')}`;
  const devisId = data.devisId || 'Non spécifié';
  const assignedTruck = data.assignedTruck || 'Fourgon VL 20m³';
  const crewSize = data.crewSize || 2;
  const date = data.date || 'Non programmée';

  return (
    <PdfDocument>
      <Page size="A4" style={pdfStyles.page}>
        <View>
          {/* Header */}
          <View style={pdfStyles.header}>
            <View style={pdfStyles.logoContainer}>
              <Image src={logoUrl} style={{ width: 120, height: 35, objectFit: 'contain' }} />
              <Text style={pdfStyles.slogan}>Déménagez en toute sérénité !</Text>
            </View>
            <View style={pdfStyles.headerMeta}>
              <Text style={pdfStyles.badge}>Lettre de Voiture Nationale</Text>
              <Text style={pdfStyles.devisNo}>L.V. N° : {lvNo}</Text>
              <Text style={pdfStyles.dateText}>Date de mission : {date}</Text>
              <Text style={[pdfStyles.dateText, { fontSize: 6.5 }]}>Arrêté Ministériel du 9 nov. 1999 • Transport Routier</Text>
            </View>
          </View>

          {/* Regulatory Notice */}
          <View style={{ backgroundColor: '#f5f7ff', borderWidth: 1, borderColor: '#e0e7ff', borderRadius: 8, padding: 10, marginTop: 15 }}>
            <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#1e1b4b', textTransform: 'uppercase', marginBottom: 3 }}>
              AVIS RÈGLEMENTAIRE RENSEIGNÉ
            </Text>
            <Text style={{ fontSize: 7, color: '#312e81', lineHeight: 1.3 }}>
              La présente lettre de voiture constitue le contrat de transport obligatoire régissant le transfert de vos effets mobiliers. Elle doit être validée, signée et conservée à bord du véhicule Marne Transdem durant tout le trajet pour présentation en cas de contrôle routier.
            </Text>
          </View>

          {/* Core Columns Grid */}
          <View style={pdfStyles.addressesGrid}>
            {/* Left Column */}
            <View style={pdfStyles.addressCard}>
              <Text style={pdfStyles.colTitle}>1. CLIENT & DONNEUR D'ORDRE</Text>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Text style={pdfStyles.clientName}>{data.clientName}</Text>
                <Text style={pdfStyles.addressDetails}>Dossier Devis : #{devisId}</Text>
                <Text style={pdfStyles.addressDetails}>Type de voyage : National Routier</Text>
              </View>
            </View>

            {/* Right Column */}
            <View style={pdfStyles.addressCard}>
              <Text style={pdfStyles.colTitle}>2. OPÉRATION DE CHARGEMENT</Text>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Text style={pdfStyles.addressDetails}>Lieu de chargement : {data.fromCity}</Text>
                <Text style={[pdfStyles.addressDetails, { fontWeight: 'bold' }]}>Volume estimé : {data.volume || 25} m³</Text>
                <Text style={pdfStyles.addressDetails}>Date programmée : {date}</Text>
              </View>
            </View>
          </View>

          <View style={[pdfStyles.addressesGrid, { marginTop: 10 }]}>
            {/* Left Column 2 */}
            <View style={pdfStyles.addressCard}>
              <Text style={pdfStyles.colTitle}>3. OPÉRATION DE LIVRAISON</Text>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Text style={pdfStyles.addressDetails}>Lieu de livraison : {data.toCity}</Text>
                <Text style={pdfStyles.addressDetails}>Date estimée : {date}</Text>
                <Text style={pdfStyles.addressDetails}>Déchargement : Direct à domicile</Text>
              </View>
            </View>

            {/* Right Column 2 */}
            <View style={pdfStyles.addressCard}>
              <Text style={pdfStyles.colTitle}>4. INFRASTRUCTURE LOGISTIQUE</Text>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Text style={pdfStyles.addressDetails}>Chef d'équipe : {data.teamLeader}</Text>
                <Text style={pdfStyles.addressDetails}>Véhicule assigné : {assignedTruck}</Text>
                <Text style={pdfStyles.addressDetails}>Taille d'équipe : {crewSize} déménageurs</Text>
              </View>
            </View>
          </View>

          {/* Signatures and Décharge */}
          <View style={[pdfStyles.signaturesBlock, { marginTop: 20 }]}>
            <Text style={pdfStyles.sectionTitle}>5. VALIDATION TECHNIQUE & SIGNATURES CONJOINTES</Text>
            <View style={pdfStyles.signaturesGrid}>
              {/* Loading Sign */}
              <View style={[pdfStyles.signatureBox, { width: '48%', height: 100, justifyContent: 'space-between', alignItems: 'stretch' }]}>
                <View>
                  <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#1e293b', borderBottomWidth: 0.5, borderBottomColor: '#cbd5e1', paddingBottom: 2, marginBottom: 4 }}>
                    Phase A - Au Chargement
                  </Text>
                  <Text style={{ fontSize: 6.5, color: '#64748b', lineHeight: 1.3 }}>
                    Je certifie l'achèvement complet et sans incident du chargement de mes effets mobiliers par les soins de Marne Transdem.
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 6, color: '#94a3b8' }}>Fait à {data.fromCity}, le {date}</Text>
                  <Text style={{ fontSize: 6.5, fontWeight: 'bold', color: '#64748b', textAlign: 'center', marginTop: 4 }}>
                    Signature Client (Bon pour accord)
                  </Text>
                </View>
              </View>

              {/* Delivery Sign */}
              <View style={[pdfStyles.signatureBox, { width: '48%', height: 100, justifyContent: 'space-between', alignItems: 'stretch', position: 'relative' }]}>
                <View>
                  <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#1e293b', borderBottomWidth: 0.5, borderBottomColor: '#cbd5e1', paddingBottom: 2, marginBottom: 4 }}>
                    Phase B - À la Livraison
                  </Text>
                  {data.clientSignature ? (
                    <Image src={data.clientSignature} style={{ width: 140, height: 40, alignSelf: 'center', marginTop: 4 }} />
                  ) : (
                    <Text style={{ fontSize: 6.5, color: '#64748b', lineHeight: 1.3 }}>
                      Je soussigné certifie de la livraison conforme des meubles et de l'encaissement du solde final, sous réserve de réserves formulées sous 10 jours.
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={{ fontSize: 6, color: '#94a3b8' }}>
                    {data.signedAt ? `Signé électroniquement le ${new Date(data.signedAt).toLocaleDateString('fr-FR')} à ${new Date(data.signedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : `Fait à ${data.toCity || ''}, le ${date}`}
                  </Text>
                  <Text style={{ fontSize: 6.5, fontWeight: 'bold', color: '#64748b', textAlign: 'center', marginTop: 4 }}>
                    Signature Client (Décharge finale)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text style={pdfStyles.footerPageNum}>
            © Marne Transdem Logistique — Ce document officiel fait foi devant la DREAL et le Tribunal de commerce compétents.
          </Text>
        </View>
      </Page>
    </PdfDocument>
  );
};

// Component DeclarationValeurPdfDocument for native vector PDF
const DeclarationValeurPdfDocument = ({ data, logoUrl }: any) => {
  const dvNo = `DV-${(data.id || '').replace('DEM-', '')}`;
  const date = data.date || 'Non programmée';

  return (
    <PdfDocument>
      <Page size="A4" style={pdfStyles.page}>
        <View>
          {/* Header */}
          <View style={pdfStyles.header}>
            <View style={pdfStyles.logoContainer}>
              <Image src={logoUrl} style={{ width: 120, height: 35, objectFit: 'contain' }} />
              <Text style={pdfStyles.slogan}>Déménagez en toute sérénité !</Text>
            </View>
            <View style={pdfStyles.headerMeta}>
              <Text style={[pdfStyles.badge, { backgroundColor: '#4f46e5' }]}>Déclaration de Valeur Contractuelle</Text>
              <Text style={pdfStyles.devisNo}>D.V. N° : {dvNo}</Text>
              <Text style={pdfStyles.dateText}>Date de mission : {date}</Text>
              <Text style={[pdfStyles.dateText, { fontSize: 6.5 }]}>Obligatoire pour l'activation des garanties AXA</Text>
            </View>
          </View>

          {/* Warning notice */}
          <View style={{ backgroundColor: '#fffbeb', borderWidth: 1, borderColor: '#fef3c7', borderRadius: 8, padding: 10, marginTop: 15 }}>
            <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#78350f', textTransform: 'uppercase', marginBottom: 3 }}>
              DISPOSITIONS DE SÉCURITÉ ET ASSURANCES
            </Text>
            <Text style={{ fontSize: 7, color: '#92400e', lineHeight: 1.3 }}>
              En cas de perte ou d'avarie fortuite de vos biens lors du transport, les indemnités d'assurance seront calculées sur la base de la déclaration ci-dessous. Le maximum garanti par objet individuel non listé est fixé forfaitairement à 750 €.
            </Text>
          </View>

          {/* Cards grid */}
          <View style={pdfStyles.addressesGrid}>
            <View style={pdfStyles.addressCard}>
              <Text style={pdfStyles.colTitle}>👤 LE MANDANT (CLIENT)</Text>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Text style={pdfStyles.clientName}>{data.clientName}</Text>
                <Text style={pdfStyles.addressDetails}>Départ : {data.fromCity}</Text>
                <Text style={pdfStyles.addressDetails}>Arrivée : {data.toCity}</Text>
              </View>
            </View>
            <View style={pdfStyles.addressCard}>
              <Text style={pdfStyles.colTitle}>🏢 LE MANDATAIRE (MARNE TRANSDEM)</Text>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Text style={pdfStyles.addressDetails}>Assurance : AXA Courtage Transport</Text>
                <Text style={[pdfStyles.addressDetails, { fontWeight: 'bold', color: '#4f46e5' }]}>Valeur Globale Déclarée : 15 000 €</Text>
                <Text style={pdfStyles.addressDetails}>Date de Mission : {date}</Text>
              </View>
            </View>
          </View>

          {/* Table */}
          <Text style={[pdfStyles.sectionTitle, { marginTop: 15 }]}>📋 INVENTAIRE DES EFFETS INDIVIDUELS (VALEUR SUPÉRIEURE À 750 €)</Text>
          <View style={pdfStyles.technicalTable}>
            <View style={pdfStyles.tableHeaderRow}>
              <Text style={[pdfStyles.tableCellHeader, { width: '20%' }]}>Code Inventaire</Text>
              <Text style={[pdfStyles.tableCellHeader, { width: '60%' }]}>Description précise de l'effet</Text>
              <Text style={[pdfStyles.tableCellHeader, { width: '20%', borderRightWidth: 0, textAlign: 'right' }]}>Valeur Estimée HT (€)</Text>
            </View>

            <View style={pdfStyles.tableRow}>
              <Text style={[pdfStyles.tableCell, { width: '20%', color: '#64748b', fontWeight: 'bold' }]}>VAL-001</Text>
              <Text style={[pdfStyles.tableCell, { width: '60%' }]}>Téléviseur OLED LG 65" avec support mural</Text>
              <Text style={[pdfStyles.tableCell, { width: '20%', borderRightWidth: 0, textAlign: 'right', fontWeight: 'bold' }]}>1 200 €</Text>
            </View>

            <View style={pdfStyles.tableRow}>
              <Text style={[pdfStyles.tableCell, { width: '20%', color: '#64748b', fontWeight: 'bold' }]}>VAL-002</Text>
              <Text style={[pdfStyles.tableCell, { width: '60%' }]}>Canapé d'angle en cuir Roche Bobois</Text>
              <Text style={[pdfStyles.tableCell, { width: '20%', borderRightWidth: 0, textAlign: 'right', fontWeight: 'bold' }]}>2 500 €</Text>
            </View>

            <View style={pdfStyles.tableRow}>
              <Text style={[pdfStyles.tableCell, { width: '20%', color: '#64748b', fontWeight: 'bold' }]}>VAL-003</Text>
              <Text style={[pdfStyles.tableCell, { width: '60%' }]}>Lave-linge tambour Siemens IQ800</Text>
              <Text style={[pdfStyles.tableCell, { width: '20%', borderRightWidth: 0, textAlign: 'right', fontWeight: 'bold' }]}>850 €</Text>
            </View>

            <View style={[pdfStyles.tableRow, { borderBottomWidth: 0 }]}>
              <Text style={[pdfStyles.tableCell, { width: '20%', color: '#cbd5e1', textAlign: 'center' }]}>-</Text>
              <Text style={[pdfStyles.tableCell, { width: '60%', color: '#94a3b8' }]}>Aucun autre effet personnel ne dépasse la limite contractuelle de 750 €</Text>
              <Text style={[pdfStyles.tableCell, { width: '20%', borderRightWidth: 0, textAlign: 'right', color: '#cbd5e1' }]}>-</Text>
            </View>
          </View>

          {/* Mandat / Engagement */}
          <View style={[pdfStyles.cgvApprovalBox, { marginTop: 20 }]}>
            <Text style={pdfStyles.cgvApprovalTitle}>MANDAT & ENGAGEMENT DU CLIENT</Text>
            <View style={pdfStyles.cgvApprovalContent}>
              <Text style={[pdfStyles.cgvApprovalText, { width: '60%' }]}>
                Je déclare sur l'honneur que l'inventaire et les valeurs répertoriées ci-dessus reflètent la réalité immédiate de mon patrimoine mobilier confié.
              </Text>
              <View style={[pdfStyles.cgvApprovalSign, { width: '36%', height: 60 }]}>
                <Text style={pdfStyles.cgvApprovalSignLabel}>Le Mandant Client :</Text>
                <Text style={{ fontSize: 5, color: '#94a3b8' }}>Mention manuscrite "Lu et approuvé"</Text>
                <Text style={pdfStyles.cgvApprovalDateLabel}>Fait le : ____/____/2026</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text style={pdfStyles.footerPageNum}>
            © Marne Transdem Logistique — Ce document officiel fait foi devant la DREAL et le Tribunal de commerce compétents.
          </Text>
        </View>
      </Page>
    </PdfDocument>
  );
};

// Component FicheEquipePdfDocument for native vector PDF
const FicheEquipePdfDocument = ({ data, logoUrl }: any) => {
  const fitNo = `FIT-${(data.id || '').replace('DEM-', '')}`;
  const date = data.date || 'Non programmée';
  const assignedTruck = data.assignedTruck || 'TRK-AA-123-BB';
  const assignedMovers = data.assignedMovers || ['Pascal Porteur', 'Érik Solide'];

  return (
    <PdfDocument>
      <Page size="A4" style={pdfStyles.page}>
        <View>
          {/* Header */}
          <View style={pdfStyles.header}>
            <View style={pdfStyles.logoContainer}>
              <Image src={logoUrl} style={{ width: 120, height: 35, objectFit: 'contain' }} />
              <Text style={pdfStyles.slogan}>Déménagez en toute sérénité !</Text>
            </View>
            <View style={pdfStyles.headerMeta}>
              <Text style={[pdfStyles.badge, { backgroundColor: '#1e293b' }]}>Fiche d'Intervention Terrain</Text>
              <Text style={pdfStyles.devisNo}>INTERV N° : {fitNo}</Text>
              <Text style={pdfStyles.dateText}>Date d'exécution : {date}</Text>
              <Text style={[pdfStyles.dateText, { fontSize: 6.5 }]}>À l'attention exclusive de l'équipe terrain</Text>
            </View>
          </View>

          {/* Cards boxes */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            <View style={{ width: '31%', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, textAlign: 'center', backgroundColor: '#f8fafc' }}>
              <Text style={{ fontSize: 6.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Chef d'Équipe</Text>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0f172a', marginTop: 2, textTransform: 'uppercase' }}>{data.teamLeader}</Text>
            </View>
            <View style={{ width: '31%', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, textAlign: 'center', backgroundColor: '#f8fafc' }}>
              <Text style={{ fontSize: 6.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Véhicule Assigné</Text>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0f172a', marginTop: 2, fontFamily: 'Outfit' }}>{assignedTruck}</Text>
            </View>
            <View style={{ width: '31%', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, textAlign: 'center', backgroundColor: '#f8fafc' }}>
              <Text style={{ fontSize: 6.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Date d'Exécution</Text>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0f172a', marginTop: 2 }}>{date}</Text>
            </View>
          </View>

          {/* Timeline */}
          <Text style={[pdfStyles.sectionTitle, { marginTop: 15 }]}>⏱ PROGRAMME DE LA MISSION LOGISTIQUE</Text>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 8, borderLeftWidth: 1.5, borderLeftColor: '#e0e7ff', marginLeft: 8, paddingLeft: 12 }}>
            {/* Step 1 */}
            <View style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#1e293b' }}>
                08h00 - CHARGEMENT TECHNIQUE (Départ)
              </Text>
              <Text style={{ fontSize: 7, color: '#64748b' }}>
                📍 Client : {data.clientName} | Ville : {data.fromCity}
              </Text>
              <Text style={{ fontSize: 7, color: '#475569', lineHeight: 1.3 }}>
                Vérifier avec le client l'état d'accès (ascenseur, escaliers) et installer la signalisation routière. Poser les couvertures épaisses de protection sur tous les mobiliers sensibles. Signer l'état de départ contradictoire.
              </Text>
            </View>

            {/* Step 2 */}
            <View style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#1e293b' }}>
                12h00 - ACHEMINEMENT ROUTIER (Trajet)
              </Text>
              <Text style={{ fontSize: 7, color: '#475569', lineHeight: 1.3 }}>
                Vérifier le bon arrimage de la cargaison et la fermeture sécurisée du hayon avant le départ. Conduire de façon rationnelle. Respecter le temps de pause règlementaire et les limitations logistiques.
              </Text>
            </View>

            {/* Step 3 */}
            <View style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#1e293b' }}>
                15h00 - LIVRAISON & RESTITUTION (Arrivée)
              </Text>
              <Text style={{ fontSize: 7, color: '#64748b' }}>
                📍 Destination : {data.toCity}
              </Text>
              <Text style={{ fontSize: 7, color: '#475569', lineHeight: 1.3 }}>
                Positionner le camion en sécurité. Décharger les pièces selon le plan de disposition du client. Remonter les lits et meubles principaux s'ils ont été démontés. Faire signer obligatoirement la décharge finale de la Lettre de voiture.
              </Text>
            </View>
          </View>

          {/* Assigned crew list */}
          <Text style={[pdfStyles.sectionTitle, { marginTop: 15 }]}>👤 COMPAGNONS DÉMÉNAGEURS ASSIGNÉS</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <View style={{ width: '47%', borderWidth: 0.5, borderColor: '#cbd5e1', borderRadius: 6, padding: 6, backgroundColor: '#f8fafc', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#10b981' }} />
              <Text style={{ fontSize: 7.5, color: '#475569' }}>
                Conducteur PL : <Text style={{ fontWeight: 'bold', color: '#0f172a' }}>{data.teamLeader}</Text>
              </Text>
            </View>
            {assignedMovers.map((m: string, i: number) => (
              <View key={i} style={{ width: '47%', borderWidth: 0.5, borderColor: '#cbd5e1', borderRadius: 6, padding: 6, backgroundColor: '#f8fafc', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#4f46e5' }} />
                <Text style={{ fontSize: 7.5, color: '#475569' }}>
                  Aide-déménageur : <Text style={{ fontWeight: 'bold', color: '#0f172a' }}>{m}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text style={pdfStyles.footerPageNum}>
            © Marne Transdem Logistique — Ce document officiel fait foi devant la DREAL et le Tribunal de commerce compétents.
          </Text>
        </View>
      </Page>
    </PdfDocument>
  );
};

// Helper function to extract prestations based on formula
function getPrestations(formula: string) {
  switch ((formula || 'Standard').toLowerCase()) {
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
}

// Main helper generator
export async function generatePdfBuffer(
  type: 'devis' | 'facture' | 'lettre_voiture' | 'declaration_valeur' | 'fiche_equipe',
  data: any
): Promise<Buffer> {
  const cleanPrice = data.price || 1200;
  const priceHT = Math.round(cleanPrice / 1.2);
  const tvaVal = cleanPrice - priceHT;
  const arrhes = Math.round(cleanPrice * 0.3);
  const solde = cleanPrice - arrhes;

  const expiresDate = data.expiresAt || new Date(new Date(data.createdAt || data.date || Date.now()).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');
  const clientCode = data.clientCode || (data.clientName ? data.clientName.substring(0, 3).toUpperCase() + '-' + (data.id || '').substring(0, 4) : 'CL-MT');
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
  const prestations = getPrestations(formula);

  const logoBuffer = fs.readFileSync(path.join(__dirname, '../fonts/logo.png'));
  const logoUrl = { data: logoBuffer, format: 'png' as const };

  let doc: any;
  if (type === 'devis') {
    doc = (
      <DevisPdfDocument
        data={data}
        formula={formula}
        prestations={prestations}
        expiresDate={expiresDate}
        clientCode={clientCode}
        voyageType={voyageType}
        distance={distance}
        priceHT={priceHT}
        tvaVal={tvaVal}
        cleanPrice={cleanPrice}
        arrhes={arrhes}
        solde={solde}
        fromFloor={fromFloor}
        toFloor={toFloor}
        fromElevator={fromElevator}
        toElevator={toElevator}
        fromLift={fromLift}
        toLift={toLift}
        fromPortage={fromPortage}
        toPortage={toPortage}
        logoUrl={logoUrl}
      />
    );
  } else if (type === 'facture') {
    doc = (
      <FacturePdfDocument
        data={data}
        formula={formula}
        priceHT={priceHT}
        tvaVal={tvaVal}
        cleanPrice={cleanPrice}
        clientCode={clientCode}
        expiresDate={expiresDate}
        logoUrl={logoUrl}
      />
    );
  } else if (type === 'lettre_voiture') {
    doc = (
      <LettreVoiturePdfDocument
        data={data}
        logoUrl={logoUrl}
      />
    );
  } else if (type === 'declaration_valeur') {
    doc = (
      <DeclarationValeurPdfDocument
        data={data}
        logoUrl={logoUrl}
      />
    );
  } else if (type === 'fiche_equipe') {
    doc = (
      <FicheEquipePdfDocument
        data={data}
        logoUrl={logoUrl}
      />
    );
  } else {
    throw new Error(`Type de document inconnu: ${type}`);
  }

  return await renderToBuffer(doc);
}
