import { useEffect } from "react";

const SITE = "NAKHREL";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/*
 * Sets the page title, description and social preview tags for client-side routes.
 * Crawlers that do not run scripts still see the static defaults in index.html.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const fullTitle = title === SITE ? SITE : `${title} | ${SITE}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
  }, [title, description]);
}
