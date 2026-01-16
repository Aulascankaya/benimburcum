import Seo from "../components/Seo";

export default function About() {
  return (
    <div className="space-y-4">
      <Seo title="Hakkımızda" description="benimburcum.com hakkında bilgiler." />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h1 className="text-2xl font-semibold">Hakkımızda</h1>

        <p className="mt-3 leading-relaxed text-zinc-300">
          benimburcum.com, 12 burç için günlük, haftalık ve aylık burç
          yorumlarını bir araya getiren bilgilendirme amaçlı bir web sitesidir.
        </p>

        <p className="mt-3 leading-relaxed text-zinc-300">
          Burada yer alan içerikler eğlence ve genel bilgilendirme amaçlıdır.
          Kesin doğrular veya profesyonel danışmanlık yerine geçmez.
        </p>
      </div>
    </div>
  );
}
