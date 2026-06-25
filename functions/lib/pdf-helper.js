"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdfBuffer = generatePdfBuffer;
const jsx_runtime_1 = require("react/jsx-runtime");
const renderer_1 = require("@react-pdf/renderer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Register premium fonts locally for the vector PDF rendering
renderer_1.Font.register({
    family: 'Outfit',
    fonts: [
        { src: path_1.default.join(__dirname, '../fonts/Outfit-Regular.ttf'), fontWeight: 'normal' },
        { src: path_1.default.join(__dirname, '../fonts/Outfit-Bold.ttf'), fontWeight: 'bold' }
    ]
});
renderer_1.Font.register({
    family: 'Caveat',
    src: path_1.default.join(__dirname, '../fonts/Caveat-Regular.ttf'),
    fontWeight: 'normal'
});
const pdfStyles = renderer_1.StyleSheet.create({
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
const DevisPdfDocument = ({ data, formula, prestations, expiresDate, clientCode, voyageType, distance, priceHT, tvaVal, cleanPrice, arrhes, solde, fromFloor, toFloor, fromElevator, toElevator, fromLift, toLift, fromPortage, toPortage, logoUrl }) => ((0, jsx_runtime_1.jsxs)(renderer_1.Document, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: pdfStyles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.header, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logoContainer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Image, { src: logoUrl, style: { width: 120, height: 35, objectFit: 'contain' } }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.slogan, children: "D\u00E9m\u00E9nagez en toute s\u00E9r\u00E9nit\u00E9 !" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.headerMeta, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.badge, children: "Devis Commercial" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.devisNo, children: ["Devis N\u00B0 : DEVIS-", data.id] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.dateText, children: ["Date : ", data.createdAt || data.date] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.validityText, children: ["Validit\u00E9 : ", expiresDate] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressesGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCol, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "\uD83C\uDFE2 L'ENTREPRISE" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.companyName, children: "MARNE TRANSDEM S.A.S" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["14 Avenue du G\u00E9n\u00E9ral de Gaulle", "\n", "94054 Cr\u00E9teil Cedex", "\n", "T\u00E9l : 01 43 21 89 00", "\n", "Email : contact@marnetransdem.com"] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "\uD83D\uDC64 LE DESTINATAIRE" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.clientName, children: data.clientName }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Code Client : ", clientCode, "\n", "T\u00E9l : ", data.phone, "\n", data.email ? `Email : ${data.email}\n` : '', "Adresse : ", data.fromAddress || data.fromCity] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.salutation, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.salutationTitle, children: "Ch\u00E8re Madame, Cher Monsieur," }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.salutationText, children: ["Nous vous remercions vivement pour l'int\u00E9r\u00EAt port\u00E9 \u00E0 Marne Transdem pour la r\u00E9alisation de votre projet de d\u00E9m\u00E9nagement. \u00C0 la suite de notre \u00E9change technique, nous avons le plaisir de vous faire part de notre proposition commerciale et logistique. Voici la r\u00E9partition d\u00E9taill\u00E9e des prestations propos\u00E9es dans le cadre de la formule ", formula, " :"] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.prestationsGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.prestationCardLeft, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.prestationTitleLeft, children: "\u00C0 notre charge (Marne Transdem)" }), (0, jsx_runtime_1.jsx)(renderer_1.View, { style: pdfStyles.prestationList, children: prestations.notreCharge.map((p, idx) => ((0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.prestationItem, children: ["\u2022 ", p] }, idx))) }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.warningText, children: "\u26A0\uFE0F Demande administrative d'autorisation de stationnement effectu\u00E9e par nos soins aupr\u00E8s de la mairie comp\u00E9tente." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.prestationCardRight, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.prestationTitleRight, children: "\u00C0 votre charge (Client)" }), (0, jsx_runtime_1.jsx)(renderer_1.View, { style: pdfStyles.prestationList, children: prestations.votreCharge.map((p, idx) => ((0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.prestationItem, children: ["\u2022 ", p] }, idx))) }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.warningText, children: "\u26A0\uFE0F Les frais d'occupation du domaine public (taxes de stationnement dues \u00E0 la ville) sont \u00E0 r\u00E9gler directement par le client si applicables." })] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signaturesBlock, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signaturesGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signatureCol, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.signatureLabel, children: "Pour le Client (Bon pour accord)" }), (0, jsx_runtime_1.jsx)(renderer_1.View, { style: pdfStyles.signatureBox, children: (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.signaturePlaceholder, children: ["Signature pr\u00E9c\u00E9d\u00E9e de la mention manuscrite", "\n", "\"Bon pour accord et ex\u00E9cution\""] }) })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signatureCol, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.signatureLabel, children: "Pour l'entreprise (Marne Transdem)" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signatureBoxRight, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7, color: '#64748b', fontWeight: 'bold' }, children: "Direction des Op\u00E9rations" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.stamp, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.stampTitle, children: "MARNE TRANSDEM" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.stampSub, children: "DIRECTION LOGISTIQUE" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.stampText, children: "CR\u00C9TEIL Cedex" })] })] })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.footerPageNum, children: "Page 1/3 \u2014 Devis commercial Marne Transdem S.A.S. \u2022 Siret: 843 321 890 00012" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: pdfStyles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.header, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logoContainer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Image, { src: logoUrl, style: { width: 120, height: 35, objectFit: 'contain' } }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.slogan, children: "D\u00E9m\u00E9nagez en toute s\u00E9r\u00E9nit\u00E9 !" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.headerMeta, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.badge, children: "Devis Contrat" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.devisNo, children: ["DEVIS CONTRAT N\u00B0 : DEVIS-", data.id] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.dateText, children: ["Date d'\u00E9dition : ", data.createdAt || data.date] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.dateText, children: ["Code Client : ", clientCode] })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.sectionTitle, children: "\uD83D\uDCCA Param\u00E8tres Logistiques" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.technicalTable, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableHeaderRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '25%' }], children: "Volume estim\u00E9" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '25%' }], children: "Formule choisie" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '25%' }], children: "Distance" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '25%', borderRightWidth: 0 }], children: "Type de voyage" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableRow, children: [(0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '25%', fontWeight: 'bold' }], children: [data.volume || 25, " m\u00B3"] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '25%', fontWeight: 'bold', color: '#4f46e5' }], children: formula }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '25%' }], children: distance }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '25%', borderRightWidth: 0 }], children: voyageType })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logisticsGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logisticsBoxLeft, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsBoxTitleLeft, children: "\uD83D\uDCE6 ADRESSE DE D\u00C9PART (Chargement)" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.logisticsLine, { fontWeight: 'bold' }], children: data.fromAddress || data.fromCity }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.logisticsLine, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsLabel, children: "\u00C9tage : " }), fromFloor] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.logisticsLine, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsLabel, children: "Ascenseur : " }), fromElevator] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.logisticsLine, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsLabel, children: "Monte-meuble : " }), fromLift] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.logisticsLine, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsLabel, children: "Portage : " }), fromPortage] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logisticsBoxRight, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsBoxTitleRight, children: "\uD83D\uDE9A ADRESSE D'ARRIV\u00C9E (Livraison)" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.logisticsLine, { fontWeight: 'bold' }], children: data.toAddress || data.toCity }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.logisticsLine, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsLabel, children: "\u00C9tage : " }), toFloor] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.logisticsLine, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsLabel, children: "Ascenseur : " }), toElevator] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.logisticsLine, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsLabel, children: "Monte-meuble : " }), toLift] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.logisticsLine, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.logisticsLabel, children: "Portage : " }), toPortage] })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.sectionTitle, children: "\uD83D\uDCB6 D\u00E9tail Financier" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.pricingTable, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableHeaderRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '50%' }], children: "D\u00E9signation" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '15%', textAlign: 'center' }], children: "Taux TVA" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '18%', textAlign: 'right' }], children: "Montant HT" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '17%', textAlign: 'right', borderRightWidth: 0 }], children: "Montant TTC" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableRow, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.tableCell, { width: '50%', display: 'flex', flexDirection: 'column' }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontWeight: 'bold' }, children: "Prestation de d\u00E9m\u00E9nagement routier complet" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', marginTop: 1 }, children: ["Formule ", formula, " \u2014 Volume de ", data.volume || 25, " m\u00B3 de ", data.fromCity, " \u00E0 ", data.toCity] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '15%', textAlign: 'center' }], children: "20%" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: [pdfStyles.pricingCellHT, { width: '18%' }], children: [priceHT.toLocaleString('fr-FR'), " \u20AC"] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: [pdfStyles.pricingCellTTC, { width: '17%' }], children: [cleanPrice.toLocaleString('fr-FR'), " \u20AC"] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '50%' }], children: "Garantie contractuelle ad-valorem (Assurance incluse jusqu'\u00E0 50 000 \u20AC)" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '15%', textAlign: 'center' }], children: "-" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.pricingCellHT, { width: '18%', color: '#94a3b8' }], children: "Inclus" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.pricingCellTTC, { width: '17%', color: '#4f46e5' }], children: "Inclus" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.totalRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.totalCellLabel, { width: '65%' }], children: "Total G\u00E9n\u00E9ral" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: [pdfStyles.pricingCellHT, { width: '18%', fontWeight: 'bold' }], children: [priceHT.toLocaleString('fr-FR'), " \u20AC HT"] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: [pdfStyles.pricingCellTTC, { width: '17%', color: '#1e1b4b', fontSize: 9.5 }], children: [cleanPrice.toLocaleString('fr-FR'), " \u20AC TTC"] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.paymentCards, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.paymentCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.paymentCardLabel, children: "Arrhes \u00E0 verser \u00E0 la commande (30%)" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.paymentCardVal, children: [arrhes.toLocaleString('fr-FR'), " \u20AC TTC"] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#94a3b8', marginTop: 1 }, children: "Pour r\u00E9server officiellement la date" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.paymentCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.paymentCardLabel, children: "Solde \u00E0 verser \u00E0 la livraison (70%)" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.paymentCardVal, children: [solde.toLocaleString('fr-FR'), " \u20AC TTC"] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#94a3b8', marginTop: 1 }, children: "R\u00E9glable \u00E0 la fin du d\u00E9chargement" })] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signaturesBlock, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7, color: '#64748b', marginBottom: 4, lineHeight: 1.4 }, children: "En signant ce devis contrat, le client d\u00E9clare accepter l'ensemble des termes logistiques d\u00E9crits en page 2 et les Conditions G\u00E9n\u00E9rales de Vente r\u00E9pertori\u00E9es en page 3." }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signaturesGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signatureCol, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.signatureLabel, children: "Le Client (pr\u00E9c\u00E9d\u00E9 de la mention \"Lu et approuv\u00E9\")" }), (0, jsx_runtime_1.jsx)(renderer_1.View, { style: [pdfStyles.signatureBox, { height: 40 }], children: (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.signaturePlaceholder, children: "Date et signature" }) })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signatureCol, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.signatureLabel, children: "Pour la direction (Marne Transdem)" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.signatureBoxRight, { height: 40, justifyContent: 'center' }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7, color: '#4f46e5', fontWeight: 'bold' }, children: "Direction G\u00E9n\u00E9rale" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 6, color: '#64748b', marginTop: 2 }, children: ["Cr\u00E9teil, le ", data.createdAt || data.date] })] })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.footerPageNum, children: "Page 2/3 \u2014 Devis commercial Marne Transdem S.A.S. \u2022 Siret: 843 321 890 00012" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: pdfStyles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.header, { borderBottomWidth: 1, borderBottomColor: '#0f172a', paddingBottom: 6 }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvTitle, children: "CONDITIONS G\u00C9N\u00C9RALES DE VENTE (CGV)" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold', color: '#64748b' }, children: "MARNE TRANSDEM S.A.S" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvCol, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvArticle, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtTitle, children: "ARTICLE 1 - OBJET DU CONTRAT" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtText, children: "Le pr\u00E9sent contrat a pour objet la r\u00E9alisation de prestations logistiques et de d\u00E9m\u00E9nagement routier convenues entre l'entreprise Marne Transdem et le client d\u00E9sign\u00E9 sur le devis contrat. Ces conditions s'appliquent \u00E0 l'exclusion de tout autre document." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvArticle, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtTitle, children: "ARTICLE 2 - FORMULES & PRESTATIONS" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtText, children: "Les prestations sont r\u00E9parties selon la formule retenue (Luxe, Standard, \u00C9conomique) d\u00E9taill\u00E9e en page 1 du pr\u00E9sent devis. Toute prestation non mentionn\u00E9e express\u00E9ment fera l'objet d'un devis compl\u00E9mentaire ou d'un avenant \u00E9crit sign\u00E9 par les deux parties." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvArticle, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtTitle, children: "ARTICLE 3 - PRIX & VALIDIT\u00C9" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtText, children: "Les tarifs sont fermes et d\u00E9finitifs pour les dates et caract\u00E9ristiques mentionn\u00E9es. Le devis est valable pendant 30 jours calendaires \u00E0 compter de sa date d'\u00E9dition. Les prix s'entendent toutes taxes comprises (TVA de 20% incluse)." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvArticle, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtTitle, children: "ARTICLE 4 - MODALIT\u00C9S DE R\u00C8GLEMENT" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtText, children: "Sauf accord contraire \u00E9crit, un acompte de 30% (arrhes) est exigible \u00E0 la signature du devis pour confirmer la r\u00E9servation de la date. Le solde de 70% est payable en totalit\u00E9 au d\u00E9chargement \u00E0 la livraison. En cas de non-paiement du solde, l'entreprise se r\u00E9serve le droit d'exercer un droit de r\u00E9tention sur le mobilier." })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvCol, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvArticle, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtTitle, children: "ARTICLE 5 - RESPONSABILIT\u00C9S & GARANTIES" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtText, children: "L'entreprise est responsable des pertes ou avaries subies par les objets transport\u00E9s conform\u00E9ment \u00E0 la l\u00E9gislation en vigueur, dans la limite d'un plafond de 50 000 \u20AC par v\u00E9hicule (Assurance AXA RC Professionnelle). La d\u00E9claration de valeur obligatoire doit accompagner le contrat. Les dommages doivent faire l'objet de r\u00E9serves \u00E9crites, pr\u00E9cises et caract\u00E9ris\u00E9es sur le bulletin de livraison lors de la remise des meubles." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvArticle, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtTitle, children: "ARTICLE 6 - RETARD & ANNULATION" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtText, children: "Toute annulation par le client intervenant moins de 7 jours avant la date du d\u00E9m\u00E9nagement entra\u00EEnera la perte d\u00E9finitive des arrhes de 30% vers\u00E9es. Les reports de date doivent \u00EAtre demand\u00E9s par \u00E9crit au moins 10 jours ouvr\u00E9s avant la prestation initiale." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvArticle, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtTitle, children: "ARTICLE 7 - OBLIGATIONS DU CLIENT" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtText, children: "Le client s'engage \u00E0 \u00EAtre pr\u00E9sent au chargement et \u00E0 la livraison, ou \u00E0 s'y faire valablement repr\u00E9senter. Le client garantit l'exactitude des renseignements fournis (\u00E9tages, ascenseur, distance de portage, monte-meubles) et s'engage \u00E0 emballer les cartons sous sa charge avant l'arriv\u00E9e de l'\u00E9quipe logistique." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvArticle, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtTitle, children: "ARTICLE 8 - DROIT APPLICABLE & LITIGES" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvArtText, children: "Le pr\u00E9sent contrat est r\u00E9gi par le droit fran\u00E7ais. En cas de contestation ou de litige sur l'ex\u00E9cution ou l'interpr\u00E9tation du pr\u00E9sent contrat, et apr\u00E8s tentative infructueuse de r\u00E9solution amiable, comp\u00E9tence exclusive est attribu\u00E9e aux tribunaux comp\u00E9tents du si\u00E8ge social de l'entreprise (Tribunal de Commerce de Cr\u00E9teil)." })] })] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvApprovalBox, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvApprovalTitle, children: "Cadre d'Approbation du Client pour les Conditions G\u00E9n\u00E9rales de Vente" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvApprovalContent, children: [(0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.cgvApprovalText, children: ["Je soussign\u00E9(e) ", (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontWeight: 'bold' }, children: data.clientName.toUpperCase() }), ", d\u00E9clare avoir pris connaissance et accepter sans r\u00E9serve l'int\u00E9gralit\u00E9 des Conditions G\u00E9n\u00E9rales de Vente (CGV) de Marne Transdem r\u00E9pertori\u00E9es ci-dessus."] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvApprovalSign, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvApprovalSignLabel, children: "Signature :" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvApprovalDateLabel, children: "Date : ____/____/2026" })] })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.footerPageNum, children: "Page 3/3 \u2014 Devis commercial Marne Transdem S.A.S. \u2022 Siret: 843 321 890 00012" })] })] }));
// Component FacturePdfDocument for native vector PDF
const FacturePdfDocument = ({ data, formula, priceHT, tvaVal, cleanPrice, clientCode, expiresDate, logoUrl }) => ((0, jsx_runtime_1.jsx)(renderer_1.Document, { children: (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: pdfStyles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.header, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logoContainer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Image, { src: logoUrl, style: { width: 120, height: 35, objectFit: 'contain' } }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.slogan, children: "D\u00E9m\u00E9nagez en toute s\u00E9r\u00E9nit\u00E9 !" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.headerMeta, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.facturePaidBadge, children: "Facture Officielle" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.devisNo, children: ["Facture N\u00B0 : FACT-", data.id] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.dateText, children: ["Date d'\u00E9dition : ", data.createdAt || data.date] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: [pdfStyles.dateText, { fontWeight: 'bold', color: '#10b981' }], children: ["Date limite : ", data.dueDate || expiresDate] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressesGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCol, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "\uD83C\uDFE2 EMETTEUR" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.companyName, children: "MARNE TRANSDEM S.A.S" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["14 Avenue du G\u00E9n\u00E9ral de Gaulle", "\n", "94054 Cr\u00E9teil Cedex", "\n", "Siret: 843 321 890 00012 \u2022 RCS Cr\u00E9teil", "\n", "TVA: FR 24 843321890"] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "\uD83D\uDC64 DESTINATAIRE CLIENT" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.clientName, children: data.clientName }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Code Client : ", clientCode, "\n", "T\u00E9l : ", data.phone, "\n", data.email ? `Email : ${data.email}\n` : '', "Adresse : ", data.fromAddress || data.fromCity] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { marginTop: 15, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 8 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.colTitle, { fontSize: 7, marginBottom: 5 }], children: "\u26A1 RAPPEL DES CARACT\u00C9RISTIQUES LOGISTIQUES" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '32%' }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }, children: "Lieu de Chargement" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold', color: '#0f172a', marginTop: 1 }, children: data.fromAddress || data.fromCity })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '32%' }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }, children: "Lieu de Livraison" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold', color: '#0f172a', marginTop: 1 }, children: data.toAddress || data.toCity })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '32%' }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }, children: "Volume & Formule" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 8, fontWeight: 'bold', color: '#0f172a', marginTop: 1 }, children: [data.volume || 25, " m\u00B3 \u2022 ", formula] })] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.pricingTable, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableHeaderRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '55%' }], children: "D\u00E9signation des Prestations Logistiques" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '15%', textAlign: 'center' }], children: "Volume (m\u00B3)" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '15%', textAlign: 'center' }], children: "Quantit\u00E9" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '15%', textAlign: 'right', borderRightWidth: 0 }], children: "Montant HT" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableRow, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.tableCell, { width: '55%', display: 'flex', flexDirection: 'column' }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontWeight: 'bold' }, children: "Prestation de D\u00E9m\u00E9nagement routier complet" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', marginTop: 2 }, children: ["Transport s\u00E9curis\u00E9, chargement, d\u00E9chargement et remise en place compl\u00E8te. Formule ", formula, "."] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '15%', textAlign: 'center' }], children: data.volume || 25 }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '15%', textAlign: 'center' }], children: "1 dossier" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: [pdfStyles.pricingCellHT, { width: '15%', fontWeight: 'bold' }], children: [priceHT.toLocaleString('fr-FR'), " \u20AC"] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '55%' }], children: "Assurance contractuelle ad-valorem (Garantie 50 000 \u20AC incluse)" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '15%', textAlign: 'center' }], children: "-" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '15%', textAlign: 'center' }], children: "1" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.pricingCellHT, { width: '15%', color: '#94a3b8' }], children: "Inclus" })] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10 }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '58%', fontSize: 7, color: '#64748b', lineHeight: 1.4 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', fontSize: 7.5, marginBottom: 2 }, children: "Conditions de r\u00E8glement" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { children: "Facture payable sous 30 jours calendaires \u00E0 compter de la date d'\u00E9dition. Aucun escompte applicable pour paiement anticip\u00E9." }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { marginTop: 2 }, children: "Paiement effectu\u00E9 par virement bancaire / carte de cr\u00E9dit." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '38%', display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: '#475569', marginBottom: 2 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { children: "Total Hors Taxes (HT) :" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontWeight: 'bold' }, children: [priceHT.toLocaleString('fr-FR'), " \u20AC"] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: '#475569', marginBottom: 2 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { children: "TVA (20%) :" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontWeight: 'bold' }, children: [tvaVal.toLocaleString('fr-FR'), " \u20AC"] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 9, color: '#065f46', backgroundColor: '#ecfdf5', borderWidth: 1, borderColor: '#a7f3d0', borderRadius: 6, padding: '4px 6px', marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontWeight: 'bold' }, children: "TOTAL TTC :" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontWeight: 'bold' }, children: [cleanPrice.toLocaleString('fr-FR'), " \u20AC"] })] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.paidStatusContainer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#94a3b8' }, children: "MARNE TRANSDEM S.A.S \u2022 Siret: 843 321 890 00012" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { flexDirection: 'row', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.facturePaidStamp, { marginRight: 15 }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.facturePaidStampText, children: "ACQUITT\u00C9" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.facturePaidStampSub, children: "MARNE TRANSDEM" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 4.5, fontWeight: 'normal' }, children: "COMPTABILIT\u00C9" })] }), (0, jsx_runtime_1.jsx)(renderer_1.View, { style: pdfStyles.facturePaidBadgeBig, children: (0, jsx_runtime_1.jsx)(renderer_1.Text, { children: "\u2714 Pay\u00E9 & Valid\u00E9" }) })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.footerPageNum, children: "Page 1/1 \u2014 Facture acquitt\u00E9e Marne Transdem S.A.S. \u2022 Siret: 843 321 890 00012" })] })] }) }));
// Component LettreVoiturePdfDocument for native vector PDF
const LettreVoiturePdfDocument = ({ data, logoUrl }) => {
    const lvNo = `LV-${(data.id || '').replace('DEM-', '')}`;
    const devisId = data.devisId || 'Non spécifié';
    const assignedTruck = data.assignedTruck || 'Fourgon VL 20m³';
    const crewSize = data.crewSize || 2;
    const date = data.date || 'Non programmée';
    return ((0, jsx_runtime_1.jsx)(renderer_1.Document, { children: (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: pdfStyles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.header, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logoContainer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Image, { src: logoUrl, style: { width: 120, height: 35, objectFit: 'contain' } }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.slogan, children: "D\u00E9m\u00E9nagez en toute s\u00E9r\u00E9nit\u00E9 !" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.headerMeta, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.badge, children: "Lettre de Voiture Nationale" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.devisNo, children: ["L.V. N\u00B0 : ", lvNo] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.dateText, children: ["Date de mission : ", date] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.dateText, { fontSize: 6.5 }], children: "Arr\u00EAt\u00E9 Minist\u00E9riel du 9 nov. 1999 \u2022 Transport Routier" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { backgroundColor: '#f5f7ff', borderWidth: 1, borderColor: '#e0e7ff', borderRadius: 8, padding: 10, marginTop: 15 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7.5, fontWeight: 'bold', color: '#1e1b4b', textTransform: 'uppercase', marginBottom: 3 }, children: "AVIS R\u00C8GLEMENTAIRE RENSEIGN\u00C9" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7, color: '#312e81', lineHeight: 1.3 }, children: "La pr\u00E9sente lettre de voiture constitue le contrat de transport obligatoire r\u00E9gissant le transfert de vos effets mobiliers. Elle doit \u00EAtre valid\u00E9e, sign\u00E9e et conserv\u00E9e \u00E0 bord du v\u00E9hicule Marne Transdem durant tout le trajet pour pr\u00E9sentation en cas de contr\u00F4le routier." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressesGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "1. CLIENT & DONNEUR D'ORDRE" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.clientName, children: data.clientName }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Dossier Devis : #", devisId] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.addressDetails, children: "Type de voyage : National Routier" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "2. OP\u00C9RATION DE CHARGEMENT" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Lieu de chargement : ", data.fromCity] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: [pdfStyles.addressDetails, { fontWeight: 'bold' }], children: ["Volume estim\u00E9 : ", data.volume || 25, " m\u00B3"] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Date programm\u00E9e : ", date] })] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.addressesGrid, { marginTop: 10 }], children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "3. OP\u00C9RATION DE LIVRAISON" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Lieu de livraison : ", data.toCity] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Date estim\u00E9e : ", date] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.addressDetails, children: "D\u00E9chargement : Direct \u00E0 domicile" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "4. INFRASTRUCTURE LOGISTIQUE" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Chef d'\u00E9quipe : ", data.teamLeader] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["V\u00E9hicule assign\u00E9 : ", assignedTruck] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Taille d'\u00E9quipe : ", crewSize, " d\u00E9m\u00E9nageurs"] })] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.signaturesBlock, { marginTop: 20 }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.sectionTitle, children: "5. VALIDATION TECHNIQUE & SIGNATURES CONJOINTES" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.signaturesGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.signatureBox, { width: '48%', height: 100, justifyContent: 'space-between', alignItems: 'stretch' }], children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7.5, fontWeight: 'bold', color: '#1e293b', borderBottomWidth: 0.5, borderBottomColor: '#cbd5e1', paddingBottom: 2, marginBottom: 4 }, children: "Phase A - Au Chargement" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', lineHeight: 1.3 }, children: "Je certifie l'ach\u00E8vement complet et sans incident du chargement de mes effets mobiliers par les soins de Marne Transdem." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 6, color: '#94a3b8' }, children: ["Fait \u00E0 ", data.fromCity, ", le ", date] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, fontWeight: 'bold', color: '#64748b', textAlign: 'center', marginTop: 4 }, children: "Signature Client (Bon pour accord)" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.signatureBox, { width: '48%', height: 100, justifyContent: 'space-between', alignItems: 'stretch', position: 'relative' }], children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7.5, fontWeight: 'bold', color: '#1e293b', borderBottomWidth: 0.5, borderBottomColor: '#cbd5e1', paddingBottom: 2, marginBottom: 4 }, children: "Phase B - \u00C0 la Livraison" }), data.clientSignature ? ((0, jsx_runtime_1.jsx)(renderer_1.Image, { src: data.clientSignature, style: { width: 140, height: 40, alignSelf: 'center', marginTop: 4 } })) : ((0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', lineHeight: 1.3 }, children: "Je soussign\u00E9 certifie de la livraison conforme des meubles et de l'encaissement du solde final, sous r\u00E9serve de r\u00E9serves formul\u00E9es sous 10 jours." }))] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6, color: '#94a3b8' }, children: data.signedAt ? `Signé électroniquement le ${new Date(data.signedAt).toLocaleDateString('fr-FR')} à ${new Date(data.signedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : `Fait à ${data.toCity || ''}, le ${date}` }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, fontWeight: 'bold', color: '#64748b', textAlign: 'center', marginTop: 4 }, children: "Signature Client (D\u00E9charge finale)" })] })] })] })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.View, { children: (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.footerPageNum, children: "\u00A9 Marne Transdem Logistique \u2014 Ce document officiel fait foi devant la DREAL et le Tribunal de commerce comp\u00E9tents." }) })] }) }));
};
// Component DeclarationValeurPdfDocument for native vector PDF
const DeclarationValeurPdfDocument = ({ data, logoUrl }) => {
    const dvNo = `DV-${(data.id || '').replace('DEM-', '')}`;
    const date = data.date || 'Non programmée';
    return ((0, jsx_runtime_1.jsx)(renderer_1.Document, { children: (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: pdfStyles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.header, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logoContainer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Image, { src: logoUrl, style: { width: 120, height: 35, objectFit: 'contain' } }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.slogan, children: "D\u00E9m\u00E9nagez en toute s\u00E9r\u00E9nit\u00E9 !" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.headerMeta, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.badge, { backgroundColor: '#4f46e5' }], children: "D\u00E9claration de Valeur Contractuelle" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.devisNo, children: ["D.V. N\u00B0 : ", dvNo] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.dateText, children: ["Date de mission : ", date] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.dateText, { fontSize: 6.5 }], children: "Obligatoire pour l'activation des garanties AXA" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { backgroundColor: '#fffbeb', borderWidth: 1, borderColor: '#fef3c7', borderRadius: 8, padding: 10, marginTop: 15 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7.5, fontWeight: 'bold', color: '#78350f', textTransform: 'uppercase', marginBottom: 3 }, children: "DISPOSITIONS DE S\u00C9CURIT\u00C9 ET ASSURANCES" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7, color: '#92400e', lineHeight: 1.3 }, children: "En cas de perte ou d'avarie fortuite de vos biens lors du transport, les indemnit\u00E9s d'assurance seront calcul\u00E9es sur la base de la d\u00E9claration ci-dessous. Le maximum garanti par objet individuel non list\u00E9 est fix\u00E9 forfaitairement \u00E0 750 \u20AC." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressesGrid, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "\uD83D\uDC64 LE MANDANT (CLIENT)" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.clientName, children: data.clientName }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["D\u00E9part : ", data.fromCity] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Arriv\u00E9e : ", data.toCity] })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.addressCard, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.colTitle, children: "\uD83C\uDFE2 LE MANDATAIRE (MARNE TRANSDEM)" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.addressDetails, children: "Assurance : AXA Courtage Transport" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.addressDetails, { fontWeight: 'bold', color: '#4f46e5' }], children: "Valeur Globale D\u00E9clar\u00E9e : 15 000 \u20AC" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.addressDetails, children: ["Date de Mission : ", date] })] })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.sectionTitle, { marginTop: 15 }], children: "\uD83D\uDCCB INVENTAIRE DES EFFETS INDIVIDUELS (VALEUR SUP\u00C9RIEURE \u00C0 750 \u20AC)" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.technicalTable, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableHeaderRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '20%' }], children: "Code Inventaire" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '60%' }], children: "Description pr\u00E9cise de l'effet" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCellHeader, { width: '20%', borderRightWidth: 0, textAlign: 'right' }], children: "Valeur Estim\u00E9e HT (\u20AC)" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '20%', color: '#64748b', fontWeight: 'bold' }], children: "VAL-001" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '60%' }], children: "T\u00E9l\u00E9viseur OLED LG 65\" avec support mural" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '20%', borderRightWidth: 0, textAlign: 'right', fontWeight: 'bold' }], children: "1 200 \u20AC" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '20%', color: '#64748b', fontWeight: 'bold' }], children: "VAL-002" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '60%' }], children: "Canap\u00E9 d'angle en cuir Roche Bobois" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '20%', borderRightWidth: 0, textAlign: 'right', fontWeight: 'bold' }], children: "2 500 \u20AC" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.tableRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '20%', color: '#64748b', fontWeight: 'bold' }], children: "VAL-003" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '60%' }], children: "Lave-linge tambour Siemens IQ800" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '20%', borderRightWidth: 0, textAlign: 'right', fontWeight: 'bold' }], children: "850 \u20AC" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.tableRow, { borderBottomWidth: 0 }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '20%', color: '#cbd5e1', textAlign: 'center' }], children: "-" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '60%', color: '#94a3b8' }], children: "Aucun autre effet personnel ne d\u00E9passe la limite contractuelle de 750 \u20AC" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.tableCell, { width: '20%', borderRightWidth: 0, textAlign: 'right', color: '#cbd5e1' }], children: "-" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.cgvApprovalBox, { marginTop: 20 }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvApprovalTitle, children: "MANDAT & ENGAGEMENT DU CLIENT" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.cgvApprovalContent, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.cgvApprovalText, { width: '60%' }], children: "Je d\u00E9clare sur l'honneur que l'inventaire et les valeurs r\u00E9pertori\u00E9es ci-dessus refl\u00E8tent la r\u00E9alit\u00E9 imm\u00E9diate de mon patrimoine mobilier confi\u00E9." }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: [pdfStyles.cgvApprovalSign, { width: '36%', height: 60 }], children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvApprovalSignLabel, children: "Le Mandant Client :" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 5, color: '#94a3b8' }, children: "Mention manuscrite \"Lu et approuv\u00E9\"" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.cgvApprovalDateLabel, children: "Fait le : ____/____/2026" })] })] })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.View, { children: (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.footerPageNum, children: "\u00A9 Marne Transdem Logistique \u2014 Ce document officiel fait foi devant la DREAL et le Tribunal de commerce comp\u00E9tents." }) })] }) }));
};
// Component FicheEquipePdfDocument for native vector PDF
const FicheEquipePdfDocument = ({ data, logoUrl }) => {
    const fitNo = `FIT-${(data.id || '').replace('DEM-', '')}`;
    const date = data.date || 'Non programmée';
    const assignedTruck = data.assignedTruck || 'TRK-AA-123-BB';
    const assignedMovers = data.assignedMovers || ['Pascal Porteur', 'Érik Solide'];
    return ((0, jsx_runtime_1.jsx)(renderer_1.Document, { children: (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: pdfStyles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.header, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.logoContainer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Image, { src: logoUrl, style: { width: 120, height: 35, objectFit: 'contain' } }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.slogan, children: "D\u00E9m\u00E9nagez en toute s\u00E9r\u00E9nit\u00E9 !" })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: pdfStyles.headerMeta, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.badge, { backgroundColor: '#1e293b' }], children: "Fiche d'Intervention Terrain" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.devisNo, children: ["INTERV N\u00B0 : ", fitNo] }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: pdfStyles.dateText, children: ["Date d'ex\u00E9cution : ", date] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.dateText, { fontSize: 6.5 }], children: "\u00C0 l'attention exclusive de l'\u00E9quipe terrain" })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '31%', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, textAlign: 'center', backgroundColor: '#f8fafc' }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }, children: "Chef d'\u00C9quipe" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8.5, fontWeight: 'bold', color: '#0f172a', marginTop: 2, textTransform: 'uppercase' }, children: data.teamLeader })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '31%', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, textAlign: 'center', backgroundColor: '#f8fafc' }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }, children: "V\u00E9hicule Assign\u00E9" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8.5, fontWeight: 'bold', color: '#0f172a', marginTop: 2, fontFamily: 'Outfit' }, children: assignedTruck })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '31%', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, textAlign: 'center', backgroundColor: '#f8fafc' }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 6.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }, children: "Date d'Ex\u00E9cution" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8.5, fontWeight: 'bold', color: '#0f172a', marginTop: 2 }, children: date })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.sectionTitle, { marginTop: 15 }], children: "\u23F1 PROGRAMME DE LA MISSION LOGISTIQUE" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 8, borderLeftWidth: 1.5, borderLeftColor: '#e0e7ff', marginLeft: 8, paddingLeft: 12 }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8.5, fontWeight: 'bold', color: '#1e293b' }, children: "08h00 - CHARGEMENT TECHNIQUE (D\u00E9part)" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 7, color: '#64748b' }, children: ["\uD83D\uDCCD Client : ", data.clientName, " | Ville : ", data.fromCity] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7, color: '#475569', lineHeight: 1.3 }, children: "V\u00E9rifier avec le client l'\u00E9tat d'acc\u00E8s (ascenseur, escaliers) et installer la signalisation routi\u00E8re. Poser les couvertures \u00E9paisses de protection sur tous les mobiliers sensibles. Signer l'\u00E9tat de d\u00E9part contradictoire." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8.5, fontWeight: 'bold', color: '#1e293b' }, children: "12h00 - ACHEMINEMENT ROUTIER (Trajet)" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7, color: '#475569', lineHeight: 1.3 }, children: "V\u00E9rifier le bon arrimage de la cargaison et la fermeture s\u00E9curis\u00E9e du hayon avant le d\u00E9part. Conduire de fa\u00E7on rationnelle. Respecter le temps de pause r\u00E8glementaire et les limitations logistiques." })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 8.5, fontWeight: 'bold', color: '#1e293b' }, children: "15h00 - LIVRAISON & RESTITUTION (Arriv\u00E9e)" }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 7, color: '#64748b' }, children: ["\uD83D\uDCCD Destination : ", data.toCity] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 7, color: '#475569', lineHeight: 1.3 }, children: "Positionner le camion en s\u00E9curit\u00E9. D\u00E9charger les pi\u00E8ces selon le plan de disposition du client. Remonter les lits et meubles principaux s'ils ont \u00E9t\u00E9 d\u00E9mont\u00E9s. Faire signer obligatoirement la d\u00E9charge finale de la Lettre de voiture." })] })] }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: [pdfStyles.sectionTitle, { marginTop: 15 }], children: "\uD83D\uDC64 COMPAGNONS D\u00C9M\u00C9NAGEURS ASSIGN\u00C9S" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '47%', borderWidth: 0.5, borderColor: '#cbd5e1', borderRadius: 6, padding: 6, backgroundColor: '#f8fafc', flexDirection: 'row', alignItems: 'center', gap: 6 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.View, { style: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#10b981' } }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 7.5, color: '#475569' }, children: ["Conducteur PL : ", (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontWeight: 'bold', color: '#0f172a' }, children: data.teamLeader })] })] }), assignedMovers.map((m, i) => ((0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { width: '47%', borderWidth: 0.5, borderColor: '#cbd5e1', borderRadius: 6, padding: 6, backgroundColor: '#f8fafc', flexDirection: 'row', alignItems: 'center', gap: 6 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.View, { style: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#4f46e5' } }), (0, jsx_runtime_1.jsxs)(renderer_1.Text, { style: { fontSize: 7.5, color: '#475569' }, children: ["Aide-d\u00E9m\u00E9nageur : ", (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontWeight: 'bold', color: '#0f172a' }, children: m })] })] }, i)))] })] }), (0, jsx_runtime_1.jsx)(renderer_1.View, { children: (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: pdfStyles.footerPageNum, children: "\u00A9 Marne Transdem Logistique \u2014 Ce document officiel fait foi devant la DREAL et le Tribunal de commerce comp\u00E9tents." }) })] }) }));
};
// Helper function to extract prestations based on formula
function getPrestations(formula) {
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
async function generatePdfBuffer(type, data) {
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
    const logoBuffer = fs_1.default.readFileSync(path_1.default.join(__dirname, '../fonts/logo.png'));
    const logoUrl = { data: logoBuffer, format: 'png' };
    let doc;
    if (type === 'devis') {
        doc = ((0, jsx_runtime_1.jsx)(DevisPdfDocument, { data: data, formula: formula, prestations: prestations, expiresDate: expiresDate, clientCode: clientCode, voyageType: voyageType, distance: distance, priceHT: priceHT, tvaVal: tvaVal, cleanPrice: cleanPrice, arrhes: arrhes, solde: solde, fromFloor: fromFloor, toFloor: toFloor, fromElevator: fromElevator, toElevator: toElevator, fromLift: fromLift, toLift: toLift, fromPortage: fromPortage, toPortage: toPortage, logoUrl: logoUrl }));
    }
    else if (type === 'facture') {
        doc = ((0, jsx_runtime_1.jsx)(FacturePdfDocument, { data: data, formula: formula, priceHT: priceHT, tvaVal: tvaVal, cleanPrice: cleanPrice, clientCode: clientCode, expiresDate: expiresDate, logoUrl: logoUrl }));
    }
    else if (type === 'lettre_voiture') {
        doc = ((0, jsx_runtime_1.jsx)(LettreVoiturePdfDocument, { data: data, logoUrl: logoUrl }));
    }
    else if (type === 'declaration_valeur') {
        doc = ((0, jsx_runtime_1.jsx)(DeclarationValeurPdfDocument, { data: data, logoUrl: logoUrl }));
    }
    else if (type === 'fiche_equipe') {
        doc = ((0, jsx_runtime_1.jsx)(FicheEquipePdfDocument, { data: data, logoUrl: logoUrl }));
    }
    else {
        throw new Error(`Type de document inconnu: ${type}`);
    }
    return await (0, renderer_1.renderToBuffer)(doc);
}
//# sourceMappingURL=pdf-helper.js.map