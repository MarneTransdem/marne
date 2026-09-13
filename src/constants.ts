import { 
  Home, 
  Truck, 
  Building2, 
  Warehouse, 
  Box, 
  MoveUp, 
  ClipboardCheck, 
  Phone, 
  Mail, 
  Info,
  Calendar,
  ShieldCheck,
  Zap,
  MapPin,
  Star,
  Globe,
  Palette,
  GraduationCap,
  Heart,
  Briefcase,
  Music,
  Shield,
  Monitor,
  Server,
  Factory,
  Microscope,
  Files
} from 'lucide-react';

export const CONTACT = {
  name: "Marne Transdem",
  phone: "01 44 93 54 86",
  email: "contact@marnetransdem.com",
  address: "43 rue des Maraîchers",
  zipCode: "75020",
  city: "Paris",
  domain: "devisdemenagement-paris.com",
  fullAddress: "43 rue des Maraîchers, 75020 Paris",
  openingHours: [
    { label: 'Lundi à vendredi', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00', closed: false },
    { label: 'Samedi', days: ['Saturday'], opens: '10:00', closes: '16:00', closed: false },
    { label: 'Dimanche', days: ['Sunday'], opens: '00:00', closes: '00:00', closed: true },
  ],
};

export const NAVIGATION = [
  { name: 'Qui sommes-nous', path: '/a-propos' },
  { name: 'Particuliers', path: '/demenagement-particuliers-paris' },
  { name: 'Entreprises', path: '/demenagement-entreprises-paris' },
  { name: 'Services', path: '/services' },
  { name: 'Formules', path: '/formules-demenagement' },
  { name: 'Conseils', path: '/blog' },
  { name: 'Secteurs', path: '/secteurs-desservis' },
  { name: 'Contact', path: '/contact' },
];

export const SERVICES = [
  {
    id: 'garde-meuble',
    title: 'Garde-meuble / Stockage',
    description: 'Espaces sécurisés pour stocker vos biens à court ou long terme en Île-de-France.',
    icon: Warehouse,
    path: '/garde-meuble-paris'
  },
  {
    id: 'monte-meuble',
    title: 'Location Monte-meuble',
    description: 'Étude des accès difficiles et du matériel adapté à votre étage et à vos meubles.',
    icon: MoveUp,
    path: '/location-monte-meuble-paris'
  },
  {
    id: 'emballage',
    title: 'Emballage et protection',
    description: 'Soin et préservation de vos biens.',
    icon: Box,
    path: '/emballage-protection-demenagement'
  },
  {
    id: 'cartons',
    title: 'Cartons et matériel de déménagement',
    description: 'Cartons, protections et matériel d’emballage pour préparer votre déménagement dans de bonnes conditions.',
    icon: Box,
    path: '/cartons-demenagement-paris'
  },
  {
    id: 'longue-distance',
    title: 'Déménagement Longue Distance',
    description: 'Organisation de votre départ depuis Paris ou l’Île-de-France vers toute la France.',
    icon: Globe,
    path: '/demenagement-longue-distance'
  },
  {
    id: 'oeuvres-art',
    title: "Déménagement d'œuvres d'art",
    description: "Dimensions, fragilités et accès à préciser pour préparer le transport de vos tableaux et objets de valeur.",
    icon: Palette,
    path: '/demenagement-oeuvres-art'
  },
  {
    id: 'etudiant',
    title: "Déménagement Étudiant",
    description: "Solutions économiques et flexibles pour studios et chambres de bonne.",
    icon: GraduationCap,
    path: '/demenagement-etudiant'
  },
  {
    id: 'mutation',
    title: "Mutation Professionnelle",
    description: "Inventaire, calendrier et devis à transmettre à votre employeur pour préparer votre mobilité.",
    icon: Briefcase,
    path: '/demenagement-mutation-professionnelle'
  },
  {
    id: 'senior',
    title: "Déménagement Senior",
    description: "Organisation du déménagement avec votre proche, selon le mobilier conservé et les prestations choisies.",
    icon: Heart,
    path: '/demenagement-senior'
  },
  {
    id: 'militaire',
    title: "Militaire & Gendarmerie",
    description: "Préparation du volume, des accès et du devis selon les démarches confirmées par votre service gestionnaire.",
    icon: Shield,
    path: '/demenagement-militaire'
  },
  {
    id: 'petit-volume',
    title: "Petit Volume",
    description: "Transport de quelques meubles ou cartons, avec un devis adapté au volume, aux accès et à la distance.",
    icon: Box,
    path: '/demenagement-petit-volume'
  },
  {
    id: 'piano',
    title: "Piano & Objets Lourds",
    description: "Étude du transport selon le modèle, les dimensions, le poids et les accès aux deux adresses.",
    icon: Music,
    path: '/demenagement-piano-objets-lourds'
  },
  {
    id: 'transfert-bureaux',
    title: 'Transfert de Bureaux',
    description: 'Préparation du mobilier, étiquetage et planning de transfert convenu avec votre entreprise.',
    icon: Building2,
    path: '/transfert-bureaux-paris'
  },
  {
    id: 'transfert-informatique',
    title: 'Transfert Informatique',
    description: 'Préparation du transport de vos équipements en coordination avec votre prestataire informatique.',
    icon: Monitor,
    path: '/transfert-informatique-paris'
  },
  {
    id: 'transfert-industriel',
    title: 'Transfert Industriel',
    description: 'Inventaire de votre atelier, poids des équipements et contraintes d’accès pour étudier le transfert.',
    icon: Factory,
    path: '/transfert-industriel-paris'
  },
  {
    id: 'transfert-laboratoire',
    title: 'Transfert de Laboratoire',
    description: 'Inventaire du mobilier et des appareils, accès et calendrier pour faire préciser les prestations au devis.',
    icon: Microscope,
    path: '/transfert-laboratoire-paris'
  },
  {
    id: 'gestion-archives',
    title: "Gestion d'Archives",
    description: "Préparation du transfert de vos archives : volume, repérage des boîtes, accès et réception.",
    icon: Files,
    path: '/gestion-archives-paris'
  }
];

export const FORMULAS = [
  {
    name: 'Économique',
    price_level: 1,
    description: 'Vous préparez vos cartons, notre équipe prend en charge le chargement, le transport et le déchargement.',
    features: [
      'Fourniture de cartons',
      'Chargement et déchargement',
      'Transport en camion capitonné',
      'Mise en place des meubles',
      'Assurance selon conditions contractuelles'
    ]
  },
  {
    name: 'Standard',
    price_level: 2,
    popular: true,
    description: 'Une solution équilibrée avec prise en charge des biens fragiles et accompagnement renforcé.',
    features: [
      'Tout de la formule Économique',
      'Emballage du fragile (vaisselle, verrerie)',
      'Déballage du fragile',
      'Démontage et remontage des meubles',
      'Mise sur penderies des vêtements'
    ]
  },
  {
    name: 'Luxe',
    price_level: 3,
    description: 'Une prestation complète pour déléguer l’emballage, la manutention, le transport et l’installation.',
    features: [
      'Tout de la formule Standard',
      'Emballage de TOUS vos biens',
      'Mise en cartons complète',
      'Déballage complet sur demande'
    ]
  }
];

export const REASSURANCES = [
  {
    title: "Devis personnalisé",
    description: "Réponse rapide avec une estimation claire et détaillée.",
    icon: ClipboardCheck,
  },
  {
    title: "Accompagnement professionnel",
    description: "Une équipe à votre écoute pour organiser votre projet.",
    icon: ShieldCheck,
  },
  {
    title: "Protection soignée",
    description: "Matériel adapté pour sécuriser vos biens durant le transport.",
    icon: Box,
  },
  {
    title: "Particuliers & Entreprises",
    description: "Solutions adaptées à chaque type de déménagement.",
    icon: Building2,
  }
];

export const FAQ_ITEMS = [
  {
    question: "Combien coûte un déménagement à Paris ?",
    answer: "Le coût d'un déménagement dépend de plusieurs critères : le volume à transporter, la distance entre les deux adresses, l'accessibilité (étages, ascenseur) et le niveau de service choisi. Nous proposons des solutions adaptées à différents budgets."
  },
  {
    question: "Comment obtenir un devis de déménagement ?",
    answer: "Vous pouvez obtenir une estimation gratuite en remplissant notre formulaire en ligne ou en nous contactant par téléphone au 01 44 93 54 86. Nous conviendrons si nécessaire d'un rendez-vous pour évaluer précisément vos besoins."
  },
  {
    question: "Proposez-vous un monte-meuble ?",
    answer: "Oui, nous pouvons mettre à disposition un monte-meuble si vos accès sont complexes (escaliers étroits, absence d'ascenseur) ou pour le transport d'objets particulièrement lourds ou volumineux."
  },
  {
    question: "Proposez-vous un service de garde-meuble ?",
    answer: "Nous proposons des solutions de stockage sécurisées pour vos biens, que ce soit pour quelques semaines ou pour une durée indéterminée, en fonction des disponibilités de nos espaces partenaires."
  },
  {
    question: "Quelle formule choisir pour mon déménagement ?",
    answer: "Le choix dépend de votre budget et de votre souhait de participation. La formule Économique est centrée sur le transport, la Standard inclut l'emballage du fragile, et la Luxe assure une prise en charge complète."
  },
  {
    question: "Intervenez-vous en Île-de-France ?",
    answer: "Marne Transdem intervient principalement à Paris et dans tous les départements d'Île-de-France, mais nous accompagnons également nos clients pour des déménagements longue distance vers la province."
  }
];
