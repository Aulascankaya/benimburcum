import Seo from "../components/Seo";

export default function Contact() {
  return (
    <div className="space-y-4">
      <Seo title="İletişim" description="benimburcum.com iletişim bilgileri." />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h1 className="text-2xl font-semibold">İletişim</h1>

        <p className="mt-3 leading-relaxed text-zinc-300">
          Geri bildirim ve iş birliği için:
        </p>

        <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
          <div className="text-sm text-zinc-200">
            E-posta: <span className="underline">iletisim@benimburcum.com</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-zinc-400">
          (Not: Bu e-posta şu an örnek. Domaini bağlayınca gerçek mail adresi
          kullanırsın.)
        </p>
      </div>
    </div>
  );
}
