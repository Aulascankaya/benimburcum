import { Link } from "react-router-dom";
import { ZODIACS } from "../data/zodiac";

const ZODIAC_QUOTES = {
  koc: "Cesaret bugün sana kazandırır.",
  boga: "Güvende kalmak her zaman kazançtır.",
  ikizler: "Bir söz her şeyi değiştirebilir.",
  yengec: "Hissettiklerin sandığından güçlü.",
  aslan: "Sahne seni bekliyor.",
  basak: "Detaylar kaderi belirler.",
  terazi: "Denge kuran kazanır.",
  akrep: "Herkes her şeyi bilmez.",
  yay: "Ufuk geniş, adım senin.",
  oglak: "Sabır seni zirveye taşır.",
  kova: "Farklı olmak avantajdır.",
  balik: "Sezgilerin bugün çok açık."
};

function PillLink({ to, label }) {
  return (
    <Link
      to={to}
      className="rounded-full border border-zinc-800 bg-zinc-950/30 px-3 py-1 text-xs text-zinc-200 hover:bg-zinc-900 transition"
    >
      {label}
    </Link>
  );
}

export default function ZodiacGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {ZODIACS.map((z) => (
        <div
          key={z.slug}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:bg-zinc-900 transition"
        >
          {/* Burç adı + tarih */}
          <div className="text-base font-semibold">{z.name}</div>
          <div className="mt-1 text-xs text-zinc-400">{z.dates}</div>

          {/* Karakter cümlesi */}
          <div className="mt-3 text-xs text-zinc-300 italic">
            “{ZODIAC_QUOTES[z.slug]}”
          </div>

          {/* Günlük / Haftalık / Aylık */}
          <div className="mt-4 flex flex-wrap gap-2">
            <PillLink to={`/${z.slug}/gunluk`} label="Günlük" />
            <PillLink to={`/${z.slug}/haftalik`} label="Haftalık" />
            <PillLink to={`/${z.slug}/aylik`} label="Aylık" />
          </div>
        </div>
      ))}
    </div>
  );
}
