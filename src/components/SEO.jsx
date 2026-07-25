import React, { useEffect } from 'react';

const SEO = ({
    title = "Ayodhya Agarbatti | Pure Sacred Incense Sticks Hand-Rolled in Ayodhya",
    description = "Experience 100% natural, charcoal-free premium incense sticks hand-rolled in the holy city of Ayodhya. Sourced from organic temple flowers, pure Mysore sandalwood, and therapeutic essential oils.",
    keywords = "Ayodhya Agarbatti, natural incense sticks, charcoal free agarbatti, Mysore sandalwood incense, temple flower agarbatti, organic incense sticks India, luxury agarbatti, pooja incense, Ayodhya incense online buy",
    canonical = "https://www.ayodhyaagarbatti.in/",
    ogImage = "https://www.ayodhyaagarbatti.in/images/ayodhya_package.png",
    ogType = "website",
    schema = null
}) => {
    useEffect(() => {
        // 1. Update Title
        document.title = title;

        // 2. Helper to set/update meta tag
        const setMeta = (attrName, attrValue, content) => {
            let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attrName, attrValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // 3. Update Standard Meta Tags
        setMeta('name', 'description', description);
        setMeta('name', 'keywords', keywords);
        setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

        // 4. Update OpenGraph Tags
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:type', ogType);
        setMeta('property', 'og:url', canonical);
        setMeta('property', 'og:image', ogImage);

        // 5. Update Twitter Card Tags
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:image', ogImage);

        // 6. Update Canonical Link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonical);

        // 7. Inject Page-Specific JSON-LD Schema if provided
        let scriptTag = document.getElementById('dynamic-page-schema');
        if (schema) {
            if (!scriptTag) {
                scriptTag = document.createElement('script');
                scriptTag.id = 'dynamic-page-schema';
                scriptTag.type = 'application/ld+json';
                document.head.appendChild(scriptTag);
            }
            scriptTag.textContent = JSON.stringify(schema);
        } else if (scriptTag) {
            scriptTag.remove();
        }
    }, [title, description, keywords, canonical, ogImage, ogType, schema]);

    return null;
};

export default SEO;
