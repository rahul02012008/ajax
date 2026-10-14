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
    let title = 'Japandi Interior Design Architecture & Warm Minimalism | KURA';
    let description =
      "Explore KURA's curated architectural monographs on Japandi interior design architecture, wabi sabi house aesthetics, and warm soft minimalism.";
    let canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
    let ogType = 'website';
    let ogImage =
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&fm=webp&w=1600&q=80';
    let keywords =
      'Japandi interior design architecture, wabi sabi house aesthetic, soft minimalism interior, organic modern architecture, how to design a japandi living room, warm minimalist home decor ideas, wabi sabi interior design principles';

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
    const imageAlt = article
      ? article.featuredImage.alt
      : 'Japandi Interior Design Architecture and Warm Minimalist Interior Design';

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/webp');
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1600');
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '900');
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', imageAlt);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);

    // Twitter Tags
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', imageAlt);

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
          dateModified: '2026-10-14T08:00:00+00:00',
          wordCount: article.wordCount || 1000,
          articleSection: article.category,
          inLanguage: 'en-US',
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
              url: `${SITE_URL}/favicon.svg`,
            },
          },
          image: {
            '@type': 'ImageObject',
            url: article.featuredImage.url,
            contentUrl: article.featuredImage.url,
            width: article.featuredImage.width || 1600,
            height: article.featuredImage.height || 900,
            caption: article.featuredImage.caption,
            description: article.featuredImage.alt,
          },
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
      // Homepage WebSite + Blog + FAQPage Schema for AEO
      const homeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'KURA — Japandi Interior Design Architecture & Warm Minimalism',
            description:
              "Explore KURA's curated architectural monographs on Japandi interior design architecture, wabi sabi house aesthetics, and warm soft minimalism.",
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
              'A curated journal exploring Japandi interior design architecture, wabi sabi house aesthetics, and warm soft minimalism.',
            inLanguage: 'en-US',
          },
          {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}/#faq`,
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do you design a Japandi living room?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'To design a Japandi living room, pair low-profile Japanese furniture silhouettes with warm Scandinavian textiles, neutral earth-toned lime wash walls, raw pale oak or hinoki woods, and unadorned negative space.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are core wabi sabi interior design principles?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Core wabi sabi interior design principles celebrate asymmetry, organic imperfection, transient beauty, natural materials that age with patina (such as slaked lime, unlacquered metals, and unglazed ceramics), and the elimination of superfluous ornament.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are warm minimalist home decor ideas for small spaces?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Warm minimalist decor for small spaces relies on flush concealed joinery cabinets to eliminate visual clutter, floor-grazing 2700K indirect lighting, multifunctional monolithic furniture, and heavily textured natural fibers like linen and bouclé to add comfort without taking up floor space.',
                },
              },
            ],
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
