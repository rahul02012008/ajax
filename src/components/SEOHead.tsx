import { useEffect } from 'react';
import { Article } from '../data/articles';

interface SEOHeadProps {
  article?: Article | null;
  path: string;
}

const SITE_URL = 'https://kura-design.vercel.app';
const SITE_NAME = 'KURA';

export const SEOHead: React.FC<SEOHeadProps> = ({ article, path }) => {
  useEffect(() => {
    // 1. Determine Title & Meta Description based on current page
    let title = 'Warm Minimalist Architecture & Spatial Design | KURA';
    let description =
      'Explore KURA, a curated journal exploring warm minimalist architecture, spatial reductionism, and tactile materials for tranquil interior living.';
    let canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
    let ogType = 'website';
    let ogImage =
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&fm=webp&w=1600&q=80';
    let keywords = 'warm minimalist architecture, spatial reductionism, tactile materials, Japanese machiya, concealed joinery';

    if (article) {
      title = article.seoTitle || `${article.title} | KURA`;
      description = article.metaDescription || article.excerpt;
      canonicalUrl = `${SITE_URL}${article.path}`;
      ogType = 'article';
      ogImage = article.featuredImage.url;
      keywords = [article.mainKeyword, ...(article.relatedKeywords || [])].join(', ');
    }

    // 2. Update Document Title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (selector: string, attr: string, value: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for link tags (canonical)
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta Tags
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    setLink('canonical', canonicalUrl);

    // OpenGraph Tags
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);

    // Twitter Tags
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 3. Inject Structured Data (JSON-LD) for AEO & Search Engines
    const existingSchema = document.getElementById('dynamic-jsonld-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const script = document.createElement('script');
    script.id = 'dynamic-jsonld-schema';
    script.type = 'application/ld+json';

    if (article) {
      // Build Article + Breadcrumbs + FAQPage Schema
      const schemas: object[] = [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.metaDescription,
          url: canonicalUrl,
          datePublished: '2026-10-01T08:00:00+00:00',
          dateModified: '2026-10-09T12:00:00+00:00',
          author: {
            '@type': 'Person',
            name: article.author.name,
            jobTitle: article.author.role,
          },
          publisher: {
            '@type': 'Organization',
            name: 'KURA Architectural Editions',
            url: SITE_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/favicon.ico`,
            },
          },
          image: [article.featuredImage.url],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
          keywords: [article.mainKeyword, ...(article.relatedKeywords || [])].join(', '),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: article.category,
              item: `${SITE_URL}/#${article.category.toLowerCase()}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: canonicalUrl,
            },
          ],
        },
      ];

      // If article has FAQ Q&A pairs, add FAQPage schema for Answer Engine Optimization
      if (article.faq && article.faq.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${item.quickAnswer} ${item.fullAnswer}`,
            },
          })),
        });
      }

      script.textContent = JSON.stringify(schemas);
    } else {
      // Homepage WebSite + Blog Schema
      const homeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'KURA — Warm Minimalist Architecture & Spatial Design',
            description:
              'Explore KURA, a curated journal exploring warm minimalist architecture, spatial reductionism, and tactile materials for tranquil interior living.',
            publisher: {
              '@type': 'Organization',
              name: 'KURA Architectural Editions',
              url: SITE_URL,
            },
            inLanguage: 'en-US',
          },
          {
            '@type': 'Blog',
            '@id': `${SITE_URL}/#blog`,
            name: 'KURA Architectural Journal',
            url: SITE_URL,
            description:
              'A curated journal exploring warm minimalist architecture, spatial reductionism, and tactile materials.',
            inLanguage: 'en-US',
          },
        ],
      };
      script.textContent = JSON.stringify(homeSchema);
    }

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount if needed
    };
  }, [article, path]);

  return null;
};
