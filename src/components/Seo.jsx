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

export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | benimburcum.com` : "benimburcum.com";
    document.title = fullTitle;

    const desc =
      description ||
      "benimburcum.com’da tüm burçlar için günlük, haftalık ve aylık burç yorumlarını okuyun.";

    upsertMeta("description", desc);
  }, [title, description]);

  return null;
}
