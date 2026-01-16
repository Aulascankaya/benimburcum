import Seo from "../components/Seo";

export default function Privacy() {
  return (
    <div className="space-y-4">
      <Seo
        title="Gizlilik Politikası"
        description="benimburcum.com gizlilik politikası."
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h1 className="text-2xl font-semibold">Gizlilik Politikası</h1>

        <p className="mt-3 leading-relaxed text-zinc-300">
          benimburcum.com, kullanıcı deneyimini iyileştirmek, site güvenliğini
          sağlamak ve ölçümleme/reklam hizmetleri sunmak amacıyla bazı teknik
          verileri (ör. çerezler) kullanabilir.
        </p>

        <p className="mt-3 leading-relaxed text-zinc-300">
          Siteyi kullanarak, bu politikada açıklanan uygulamaları kabul etmiş
          olursunuz. Kişisel veriler, yürürlükteki mevzuata uygun şekilde
          işlenmeye çalışılır.
        </p>

        <p className="mt-3 leading-relaxed text-zinc-300">
          Sorularınız için İletişim sayfasını kullanabilirsiniz.
        </p>
      </div>
    </div>
  );
}
