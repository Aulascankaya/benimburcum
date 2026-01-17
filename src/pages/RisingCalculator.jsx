import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import AdSlot from "../components/AdSlot";
import { calculateAstrology } from "natalengine";

const SIGNS_TR = {
  Aries: "Koç",
  Taurus: "Boğa",
  Gemini: "İkizler",
  Cancer: "Yengeç",
  Leo: "Aslan",
  Virgo: "Başak",
  Libra: "Terazi",
  Scorpio: "Akrep",
  Sagittarius: "Yay",
  Capricorn: "Oğlak",
  Aquarius: "Kova",
  Pisces: "Balık",
};

const SLUG_MAP = {
  Aries: "koc",
  Taurus: "boga",
  Gemini: "ikizler",
  Cancer: "yengec",
  Leo: "aslan",
  Virgo: "basak",
  Libra: "terazi",
  Scorpio: "akrep",
  Sagittarius: "yay",
  Capricorn: "oglak",
  Aquarius: "kova",
  Pisces: "balik",
};

function toDecimalHour(timeStr) {
  if (!timeStr || !timeStr.includes(":")) return null;
  const [hStr, mStr] = timeStr.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h + m / 60;
}

function tzOffsetHoursFromMinutes(minutes) {
  return -minutes / 60;
}

function isNum(x) {
  return Number.isFinite(Number(x));
}

export default function RisingCalculator() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Yükselen burç hesaplamak için ne gerekir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yükselen burç hesaplamak için doğum tarihi, doğum saati, doğum yeri (şehir) ve doğum anındaki UTC offset bilgisi gerekir.",
        },
      },
      {
        "@type": "Question",
        name: "Lat/Lon bilmeden yükselen hesaplanır mı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evet. Şehir adını yazarak enlem/boylam otomatik bulunabilir. Bu sayfada şehir araması ile lat/lon otomatik doldurulur.",
        },
      },
      {
        "@type": "Question",
        name: "Doğum saatini bilmiyorsam ne yapmalıyım?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aileye sormak, hastane kaydı veya resmi belgelerle saat aralığı bulmak gerekir. Saat bilinmiyorsa yükselen kesin hesaplanamaz.",
        },
      },
    ],
  };

  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [tzOffset, setTzOffset] = useState(() =>
    String(tzOffsetHoursFromMinutes(new Date().getTimezoneOffset()))
  );

  const [placeQuery, setPlaceQuery] = useState("");
  const [placeResults, setPlaceResults] = useState([]);
  const [placeLoading, setPlaceLoading] = useState(false);

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  const tzHelp = useMemo(() => {
    const n = Number(tzOffset);
    if (!Number.isFinite(n)) return "Örn: Türkiye +3, Almanya kışın +1 yazın +2";
    return `Seçtiğin UTC offset: ${n >= 0 ? "+" : ""}${n}`;
  }, [tzOffset]);

  async function searchPlace() {
    setErr("");
    setPlaceResults([]);

    const q = placeQuery.trim();
    if (!q) return setErr("Doğum yerini yaz (örn: Antalya, Turkey).");

    setPlaceLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
        q
      )}`;

      const res = await fetch(url, {
        headers: { "Accept-Language": "tr" },
      });

      if (!res.ok) throw new Error("Arama başarısız");
      const data = await res.json();

      const mapped = (data || []).map((x) => ({
        displayName: x.display_name,
        lat: x.lat,
        lon: x.lon,
      }));

      if (mapped.length === 0) {
        setErr("Sonuç bulunamadı. Daha spesifik yaz: 'İzmir, Turkey' gibi.");
      }

      setPlaceResults(mapped);
    } catch (e) {
      setErr("Şehir araması şu an çalışmadı. İnterneti kontrol et veya lat/lon'u manuel gir.");
    } finally {
      setPlaceLoading(false);
    }
  }

  function choosePlace(p) {
    setLat(String(Number(p.lat).toFixed(6)));
    setLon(String(Number(p.lon).toFixed(6)));
    setPlaceResults([]);
  }

  function fillMyLocation() {
    setErr("");
    if (!navigator.geolocation) {
      setErr("Tarayıcı konum özelliğini desteklemiyor.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(String(latitude.toFixed(6)));
        setLon(String(longitude.toFixed(6)));
      },
      () => setErr("Konum alınamadı. İzin vermedin ya da cihaz konumu kapalı.")
    );
  }

  function calc() {
    setErr("");
    setResult(null);

    if (!birthDate) return setErr("Doğum tarihini gir.");
    const decHour = toDecimalHour(birthTime);
    if (decHour === null) return setErr("Doğum saatini HH:MM formatında gir (örn 14:30).");

    const tz = Number(tzOffset);
    if (!Number.isFinite(tz)) return setErr("UTC offset sayısal olmalı. Örn: 3, 2, 1, -5");

    if (!isNum(lat) || !isNum(lon)) {
      return setErr("Doğum yerini seçmen gerekiyor. Şehir araması yap veya lat/lon gir.");
    }

    try {
      const astro = calculateAstrology(birthDate, decHour, tz, Number(lat), Number(lon));
      const risingNameEn = astro?.rising?.sign?.name;
      const risingTr = SIGNS_TR[risingNameEn] || risingNameEn || "Bilinmiyor";
      const degree = astro?.rising?.degree;
      const accurate = astro?.rising?.accurate;

      setResult({
        risingTr,
        risingNameEn,
        degree,
        accurate,
        slug: SLUG_MAP[risingNameEn],
      });
    } catch (e) {
      setErr("Hesaplama sırasında hata oluştu. Bilgileri kontrol et.");
    }
  }

  return (
    <div className="space-y-6">
      <Seo
        title="Yükselen Burç Hesaplama"
        description="Doğum tarihi, saati ve doğum yerine göre yükselen burcunuzu hesaplayın. Şehir araması ile lat/lon otomatik doldurulur."
        jsonLdId="rising-faq"
        jsonLd={faqJsonLd}
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
        <h1 className="text-2xl font-semibold">Yükselen Burç Hesaplama</h1>
        <p className="mt-2 text-zinc-400">
          Doğum yerini yazıp seç; koordinatları bilmen gerekmiyor.
        </p>

        <div className="mt-3">
          <Link className="underline text-sm text-zinc-200" to="/dogum-saatini-bilmiyorum">
            Doğum saatini bilmiyorum → Ne yapmalıyım?
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <div className="text-sm text-zinc-300">Doğum tarihi</div>
            <input
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              type="date"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 outline-none"
            />
          </label>

          <label className="space-y-2">
            <div className="text-sm text-zinc-300">Doğum saati</div>
            <input
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              type="time"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 outline-none"
            />
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <div className="text-sm text-zinc-300">UTC offset (doğduğun anki)</div>
            <input
              value={tzOffset}
              onChange={(e) => setTzOffset(e.target.value)}
              placeholder="Örn: 3"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 outline-none"
            />
            <div className="text-xs text-zinc-500">{tzHelp}</div>
          </label>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
            <div className="text-sm text-zinc-300">Hızlı ipucu</div>
            <div className="mt-2 text-xs text-zinc-500 leading-relaxed">
              Türkiye genelde <b>UTC+3</b>. Almanya kışın <b>UTC+1</b>, yazın <b>UTC+2</b>.
              Doğduğun tarihte yaz saati varsa offset farklı olabilir.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4 space-y-3">
          <div className="text-sm font-semibold text-zinc-200">Doğum yeri (şehir/ülke) ile bul</div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              value={placeQuery}
              onChange={(e) => setPlaceQuery(e.target.value)}
              placeholder="Örn: Antalya, Turkey  veya  Juist, Germany"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 outline-none"
            />
            <button
              onClick={searchPlace}
              type="button"
              className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 transition"
            >
              {placeLoading ? "Aranıyor..." : "Ara"}
            </button>
            <button
              onClick={fillMyLocation}
              type="button"
              className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900"
            >
              Konumumu kullan
            </button>
          </div>

          {placeResults.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs text-zinc-500">Sonuçlardan birini seç:</div>
              <div className="grid gap-2">
                {placeResults.map((p) => (
                  <button
                    key={`${p.lat}-${p.lon}-${p.displayName}`}
                    onClick={() => choosePlace(p)}
                    className="text-left rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 hover:bg-zinc-900 transition"
                    type="button"
                  >
                    <div className="text-sm text-zinc-200">{p.displayName}</div>
                    <div className="mt-1 text-xs text-zinc-500">
                      lat: {Number(p.lat).toFixed(6)} • lon: {Number(p.lon).toFixed(6)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="text-xs text-zinc-500 leading-relaxed">
            Not: Sonuç çıkmıyorsa daha net yaz: “İzmir, Turkey” gibi.
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <div className="text-sm text-zinc-300">Enlem (Latitude)</div>
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Otomatik dolar"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 outline-none"
            />
          </label>

          <label className="space-y-2">
            <div className="text-sm text-zinc-300">Boylam (Longitude)</div>
            <input
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="Otomatik dolar"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 outline-none"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={calc}
            type="button"
            className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 transition"
          >
            Yükseleni hesapla
          </button>
        </div>

        {err ? (
          <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-200">
            {err}
          </div>
        ) : null}

        {result ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="text-sm text-zinc-400">Sonuç</div>
            <div className="mt-2 text-2xl font-semibold">Yükselen: {result.risingTr}</div>

            <div className="mt-2 text-sm text-zinc-400">
              {result.degree ? (
                <>
                  Derece: <span className="text-zinc-200">{result.degree}</span> •{" "}
                </>
              ) : null}
              Doğruluk:{" "}
              <span className="text-zinc-200">
                {result.accurate ? "Konumla hesaplandı" : "Konum eksik/şüpheli"}
              </span>
            </div>

            {result.slug ? (
              <div className="mt-4">
                <Link className="underline text-sm" to={`/${result.slug}/gunluk`}>
                  {result.risingTr} burcu yorumlarını oku →
                </Link>
              </div>
            ) : null}

            <div className="mt-4 text-xs text-zinc-500 leading-relaxed">
              Not: Yükselen burç doğum saati ve doğum yeri bilgisine çok duyarlıdır.
              Saatte küçük sapmalar sonucu değiştirebilir.
            </div>
          </div>
        ) : null}

        <div className="pt-2 text-sm text-zinc-400 leading-relaxed">
          <h2 className="text-zinc-200 font-semibold">Yükselen burç nedir?</h2>
          <p className="mt-2">
            Yükselen burç, doğum anında doğu ufkunda yükselen burçtur. Kişinin dış dünyaya
            verdiği ilk izlenim ve davranış tarzı ile ilişkilendirilir.
          </p>
          <p className="mt-2">
            Bu yüzden doğum yeri önemlidir. Şehir adını yazıp seçtiğinde enlem/boylam
            otomatik dolur ve hesaplama daha doğru olur.
          </p>
        </div>
      </div>

      <AdSlot />
    </div>
  );
}
