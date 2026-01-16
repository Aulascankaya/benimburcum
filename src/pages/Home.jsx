import ZodiacGrid from "../components/ZodiacGrid";
import Seo from "../components/Seo";

export default function Home() {
  return (
    <div className="space-y-6">
      <Seo
        title="Günlük, Haftalık ve Aylık Burç Yorumları"
        description="12 burç için günlük, haftalık ve aylık burç yorumları. Aşk, para, kariyer ve sağlık yorumları."
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
        <h1 className="text-2xl font-semibold">
          benimburcum.com • Burç Yorumları
        </h1>
        <p className="mt-2 text-zinc-400">
          Burcunu seç, günlük/haftalık/aylık yorumunu oku.
        </p>
      </div>

      <ZodiacGrid />
    </div>
  );
}
