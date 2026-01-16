import Seo from "../components/Seo";

export default function Cookies() {
  return (
    <div className="space-y-4">
      <Seo
        title="Çerez Politikası"
        description="benimburcum.com çerez politikası."
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h1 className="text-2xl font-semibold">Çerez Politikası</h1>

        <p className="mt-3 leading-relaxed text-zinc-300">
          Çerezler (cookies), web sitelerinin tarayıcınıza bıraktığı küçük veri
          parçalarıdır. benimburcum.com çerezleri; site performansı, güvenlik,
          analiz ve reklam amaçlarıyla kullanabilir.
        </p>

        <p className="mt-3 leading-relaxed text-zinc-300">
          Çerezleri tarayıcı ayarlarınızdan silebilir veya engelleyebilirsiniz.
          Ancak bazı özellikler bu durumda beklediğiniz gibi çalışmayabilir.
        </p>
      </div>
    </div>
  );
}
