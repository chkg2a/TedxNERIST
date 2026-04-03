import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_NAME, getSeoForPath } from "../seo/seoConfig";

const setMetaTag = (attribute, key, content) => {
  const selector = `meta[${attribute}="${key}"]`;

  if (!content) {
    document.head.querySelector(selector)?.remove();
    return;
  }

  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const setCanonicalLink = (href) => {
  let tag = document.head.querySelector('link[rel="canonical"]');

  if (!href) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const setAlternateLink = (hrefLang, href) => {
  const selector = `link[rel="alternate"][hreflang="${hrefLang}"]`;
  let tag = document.head.querySelector(selector);

  if (!href) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "alternate");
    tag.setAttribute("hreflang", hrefLang);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const setJsonLd = (graph) => {
  const selector = 'script[data-seo="route"]';
  let tag = document.head.querySelector(selector);

  if (!graph?.length) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-seo", "route");
    document.head.appendChild(tag);
  }

  tag.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
};

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);

    document.title = seo.title;
    document.documentElement.lang = "en-IN";

    setMetaTag("name", "description", seo.description);
    setMetaTag("name", "keywords", seo.keywords?.join(", "));
    setMetaTag("name", "robots", seo.robots);
    setMetaTag("name", "googlebot", seo.robots);
    setMetaTag("name", "author", SITE_NAME);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", seo.title);
    setMetaTag("name", "twitter:description", seo.description);
    setMetaTag("name", "twitter:image", seo.imageUrl);
    setMetaTag("name", "twitter:image:alt", seo.imageAlt);
    setMetaTag("name", "twitter:site", "@tedxnerist");

    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:locale", "en_IN");
    setMetaTag("property", "og:type", seo.openGraphType);
    setMetaTag("property", "og:title", seo.title);
    setMetaTag("property", "og:description", seo.description);
    setMetaTag("property", "og:url", seo.canonicalUrl);
    setMetaTag("property", "og:image", seo.imageUrl);
    setMetaTag("property", "og:image:secure_url", seo.imageUrl);
    setMetaTag("property", "og:image:alt", seo.imageAlt);
    setMetaTag("property", "og:image:width", "1920");
    setMetaTag("property", "og:image:height", "1080");

    setCanonicalLink(seo.canonicalUrl);
    setAlternateLink("en-IN", seo.canonicalUrl);
    setJsonLd(seo.graph);
  }, [location.pathname]);

  return null;
}

export default SeoManager;
