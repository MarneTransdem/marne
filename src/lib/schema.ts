import { CONTACT } from '../constants';
import { DEFAULT_OG_IMAGE, SITE_URL } from './seo-routes';

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Marne Transdem",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": CONTACT.phone.replace(/\s/g, ''),
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": "French"
  },
  "sameAs": [
    // Add social links if available
  ]
});

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "Marne Transdem",
  "image": `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  "@id": SITE_URL,
  "url": SITE_URL,
  "telephone": CONTACT.phone.replace(/\s/g, ''),
  "address": {
    "@type": "PostalAddress",
    "streetAddress": CONTACT.address,
    "addressLocality": "Paris",
    "postalCode": "75020",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8631,
    "longitude": 2.4001
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "19:00"
  },
  "areaServed": {
    "@type": "State",
    "name": "Île-de-France"
  },
  "description": "Marne Transdem est une entreprise de déménagement professionnelle basée à Paris 20e, spécialisée dans le déménagement de particuliers et d'entreprises en Île-de-France."
});

export const getBreadcrumbSchema = (items: { name: string, item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.item.startsWith('http')
      ? item.item.replace('https://marnetransdem.com', SITE_URL)
      : `${SITE_URL}${item.item.startsWith('/') ? item.item : `/${item.item}`}`
  }))
});

export const getServiceSchema = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Moving Service",
  "provider": {
    "@type": "MovingCompany",
    "name": "Marne Transdem"
  },
  "name": name,
  "description": description,
  "areaServed": "Île-de-France"
});

export const getFAQSchema = (questions: { q: string, a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(q => ({
    "@type": "Question",
    "name": q.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.a
    }
  }))
});

export const getContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Marne Transdem",
  "description": "Contactez Marne Transdem pour votre déménagement à Paris. Informations de contact et formulaire de message.",
  "url": `${SITE_URL}/contact`,
  "mainEntity": getLocalBusinessSchema()
});
