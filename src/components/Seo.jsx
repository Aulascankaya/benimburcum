import { useEffect } from "react";

function upsertMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertJsonLd(id, json) {
  const scriptId = `jsonld-${id}`;
  let tag = document.getElementById(scriptId);

  if (!json) {
    if (tag) tag.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = scriptId;
    document.head.appendChild(tag);
  }

  tag.text = JSON.stringify(json);
}

export default function Seo({ title, description, jsonLdId, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | benimburcum.com` : "benimburcum.com";
    document.title = fullTitle;

    const desc =
      description ||
      "benimburcum.com’da tüm burçlar için günlük, haftalık ve aylık burç yorumlarını okuyun.";

    upsertMeta("description", desc);

    // JSON-LD (FAQ gibi) - SEO için
    if (jsonLdId) upsertJsonLd(jsonLdId, jsonLd);
  }, [title, description, jsonLdId, jsonLd]);

  return null;
}
