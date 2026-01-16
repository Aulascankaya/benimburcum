import fs from "node:fs";
import path from "node:path";

const SIGNS = [
  { slug: "koc", name: "Koç" },
  { slug: "boga", name: "Boğa" },
  { slug: "ikizler", name: "İkizler" },
  { slug: "yengec", name: "Yengeç" },
  { slug: "aslan", name: "Aslan" },
  { slug: "basak", name: "Başak" },
  { slug: "terazi", name: "Terazi" },
  { slug: "akrep", name: "Akrep" },
  { slug: "yay", name: "Yay" },
  { slug: "oglak", name: "Oğlak" },
  { slug: "kova", name: "Kova" },
  { slug: "balik", name: "Balık" },
];

const PERIODS = [
  { key: "gunluk", label: "Günlük", dateLabel: "Bugün" },
  { key: "haftalik", label: "Haftalık", dateLabel: "Bu hafta" },
  { key: "aylik", label: "Aylık", dateLabel: "Bu ay" },
];

function template(signName, periodLabel, dateLabel) {
  return {
    title: `${signName} ${periodLabel} Yorum`,
    dateLabel,
    sections: {
      ask: `${dateLabel} aşk tarafında netlik arıyorsun. Küçük bir konuşma büyük bir yanlış anlaşılmayı çözebilir.`,
      para: `${dateLabel} harcamalarda “küçük kaçaklar” var. Minik kalemleri kısarsan rahat nefes alırsın.`,
      kariyer: `${dateLabel} iş tarafında tempo artıyor. Öncelik listesi yap, en kritik işi önce bitir.`,
      saglik: `${dateLabel} enerji iniş çıkış yapabilir. Su + uyku + kısa yürüyüş, klasik ama işe yarar.`,
    },
  };
}

const outDir = path.join(process.cwd(), "src", "data", "readings");
fs.mkdirSync(outDir, { recursive: true });

for (const s of SIGNS) {
  const obj = {};
  for (const p of PERIODS) {
    obj[p.key] = template(s.name, p.label, p.dateLabel);
  }
  const filePath = path.join(outDir, `${s.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf-8");
}

console.log("✅ 12 burç için JSON dosyaları üretildi:", outDir);
