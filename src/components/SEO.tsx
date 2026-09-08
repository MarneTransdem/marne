import React from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, getCanonicalPath, getGoogleSiteVerificationCode, getSeoRoute, SITE_URL } from '../lib/seo-routes';
import { getLocalBusinessSchema } from '../lib/schema';

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

// React 19 owns head elements in SSR and hydration; there is no second head manager.
export const SEO: React.FC<SEOProps> = ({ title, description, canonical, type = 'website', image, robots, schema }) => {
  const location = useLocation();
  const route = getSeoRoute(location.pathname);
  const known = route.status === 200 && route.robots === 'index, follow';
  const fullTitle = known ? route.title : title.includes('Marne Transdem') ? title : `${title} | Marne Transdem`;
  const metaDescription = known ? route.description : description;
  const path = getCanonicalPath(canonical ? new URL(canonical, SITE_URL).pathname : location.pathname);
  const fullUrl = `${SITE_URL}${path}`;
  const imageUrl = new URL(image || route.image || DEFAULT_OG_IMAGE, SITE_URL).href;
  const verification = getGoogleSiteVerificationCode();
  const supplied = Array.isArray(schema) ? schema : schema ? [schema] : [];
  const schemas = [...(known ? [getLocalBusinessSchema()] : []), ...supplied.filter(item => !['Organization', 'MovingCompany'].includes(item?.['@type']))];
  return <>
    <title data-seo="true">{fullTitle}</title>
    <meta data-seo="true" name="description" content={metaDescription} />
    <link data-seo="true" rel="canonical" href={fullUrl} />
    <meta data-seo="true" name="robots" content={robots || route.robots || 'index, follow'} />
    {verification && <meta data-seo="true" name="google-site-verification" content={verification} />}
    <meta data-seo="true" property="og:locale" content="fr_FR" />
    <meta data-seo="true" property="og:type" content={type} />
    <meta data-seo="true" property="og:title" content={fullTitle} />
    <meta data-seo="true" property="og:description" content={metaDescription} />
    <meta data-seo="true" property="og:url" content={fullUrl} />
    <meta data-seo="true" property="og:image" content={imageUrl} />
    <meta data-seo="true" property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
    <meta data-seo="true" property="og:site_name" content="Marne Transdem" />
    <meta data-seo="true" name="twitter:card" content="summary_large_image" />
    <meta data-seo="true" name="twitter:title" content={fullTitle} />
    <meta data-seo="true" name="twitter:description" content={metaDescription} />
    <meta data-seo="true" name="twitter:image" content={imageUrl} />
    {schemas.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }} />)}
  </>;
};
