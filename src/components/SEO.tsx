import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from '../lib/seo-routes';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  image?: string;
  robots?: string;
  schema?: any | any[];
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  canonical, 
  type = "website",
  image = DEFAULT_OG_IMAGE,
  robots = "index, follow",
  schema 
}) => {
  const fullTitle = title.includes("Marne Transdem") ? title : `${title} | Marne Transdem`;
  const fallbackPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const canonicalPath = canonical || fallbackPath;
  const fullUrl = canonicalPath.startsWith('http') ? canonicalPath : `${SITE_URL}${canonicalPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const usesDefaultImage = fullImageUrl === `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
      {usesDefaultImage && <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />}
      {usesDefaultImage && <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />}
      <meta property="og:site_name" content="Marne Transdem" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
      
      {/* Additional SEO */}
      <meta name="robots" content={robots} />
      <meta name="geo.region" content="FR-75" />
      <meta name="geo.placename" content="Paris" />
      
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};
