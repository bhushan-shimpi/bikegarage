import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  robots?: string;
}

const DEFAULT_TITLE = 'Chaudhary Auto | Bike Service & Repair in Pahur, Jamner';
const DEFAULT_DESCRIPTION =
  'Chaudhary Auto is a premier bike garage in Pahur, Taluka Jamner, Dist. Jalgaon offering expert bike servicing, repair, engine work, and complete restoration.';
const DOMAIN = 'https://www.chaudhariauto.com';
const DEFAULT_IMAGE = `${DOMAIN}/images/hero-bike.jpg`;

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  robots = 'index, follow',
}) => {
  const fullTitle = title
    ? `${title} | Chaudhary Auto`
    : DEFAULT_TITLE;
  const fullDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = `${DOMAIN}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`.replace(
    /\/$/,
    canonicalPath === '' || canonicalPath === '/' ? '/' : ''
  );
  const fullImage = image.startsWith('http') ? image : `${DOMAIN}${image}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to create or update meta tags
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', fullDescription);
    setMetaTag('name', 'robots', robots);

    // 3. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', fullDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullImage);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Chaudhary Auto');
    setMetaTag('property', 'og:locale', 'en_IN');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', fullDescription);
    setMetaTag('name', 'twitter:image', fullImage);

    // 6. Dynamic JSON-LD Structured Data
    let scriptTag = document.getElementById('page-structured-data');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'page-structured-data';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [fullTitle, fullDescription, canonicalUrl, fullImage, type, jsonLd, robots]);

  return null;
};
