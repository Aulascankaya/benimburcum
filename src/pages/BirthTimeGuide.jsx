import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import AdSlot from "../components/AdSlot";

export default function BirthTimeGuide() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Doğum saatini bilmiyorsam yükselen burç hesaplanır mı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yükselen burç doğum saatine çok duyarlıdır. Saat bilinmiyorsa yükselen burç kesin hesaplanamaz. Yine de aile bireylerine sormak, hastane kaydı veya resmi belgelerle yaklaşık saat aralığı bulmak mümkündür.",
        },
      },
      {
        "@type": "Question",
        name: "Yaklaşık doğum saati işe yarar mı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yaklaşık saat (ör. sabah/öğlen/akşam) bazı durumlarda fikir verebilir ama kesin sonuç vermez. Yükselen burç geçiş saatlerinde hızlı değişebilir.",
        },
      },
      {
        "@type": "Question",
        name: "Doğum yerini bilmiyorsam ne yapmalıyım?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Doğum yeri için şehir/ilçe bilgisi çoğu zaman yeterlidir. Şehir adını yazarak enlem/boylam otomatik bulunabilir.",
        },
      },
    ],
  };

  return (
    <div className="space-y-6">
      <Seo
        title="Doğum Saatini Bilmiyorum: Yükselen Burç Rehberi"
        description="Doğum saati bilinmiyorsa yükselen burç nasıl bulunur? Yaklaşık saat, kayıtlar ve pratik öneriler."
        jsonLdId="birth-time-faq"
        jsonLd={faqJsonLd}
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
        <h1 className="text-2xl font-semibold">Doğum Saatini Bilmiyorum</h1>
        <p className="mt-2 text-zinc-400">
          Bu sayfa, yükselen hesaplamak isterken “burada kaldım” dememen için.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
        <h2 className="text-lg font-semibold">1) Aileye sor (en hızlı yol)</h2>
        <p className="text-zinc-300 leading-relaxed">
          Anne-baba veya büyükler genelde “sabah erken”, “öğleden sonra” gibi bir
          aralık hatırlar. Bu bile başlangıç için iş görür.
        </p>

        <h2 className="text-lg font-semibold">2) Kayıtları araştır</h2>
        <ul className="list-disc pl-5 text-zinc-300 space-y-2">
          <li>Hastane doğum belgesi / doğum raporu</li>
          <li>Resmi kayıtlar (bazı ülkelerde saat bilgisi olabilir)</li>
          <li>Aile albümü / doğum günü notları / mesaj kayıtları</li>
        </ul>

        <h2 className="text-lg font-semibold">3) Yaklaşık saat ile deneme (kesin değil)</h2>
        <p className="text-zinc-300 leading-relaxed">
          Saatin çok belirsiz olduğu durumda yükselenin kesin çıkmasını bekleme.
          Yine de bir aralık bulduysan (ör. 09:00–11:00) denemeler yapabilirsin.
        </p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
          <div className="text-sm text-zinc-200 font-semibold">Hemen dene</div>
          <p className="mt-2 text-sm text-zinc-400">
            Doğum yerini yaz, tarih/saat gir, yükseleni hesapla:
          </p>
          <Link className="mt-3 inline-block underline text-sm" to="/yukselen-hesapla">
            Yükselen Hesaplama sayfasına git →
          </Link>
        </div>
      </div>

      <AdSlot />
    </div>
  );
}
