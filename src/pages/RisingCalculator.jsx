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

function toDecimalHour(timeStr) {
  // "HH:MM" -> 14.5 gibi
  if (!timeStr || !timeStr.includes(":")) return null;
  const [hStr, mStr] = timeStr.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h + m / 60;
}

function tzOffsetHoursFromMinutes(minutes) {
  // getTimezoneOffset(): Berlin kışın -60 döner (UTC+1)
  // UTC offset = -minutes/60
  return -minutes / 60;
}

export default function RisingCalculator() {
  const [birthDate, setBirthDate] = useState(""); // YYYY-MM-DD
  const [birthTime, setBirthTime] = useState(""); // HH:MM

  // Tarayıcıdan otomatik öneri (Almanya'daysan çoğunlukla +1/+2)
  const [tzOffset, setTzOffset] = useState(() =>
    String(tzOffsetHoursFromMinutes(new Date().getTimezoneOffset()))
  );

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  const tzHelp = useMemo(() => {
    const n = Number(tzOffset);
    if (!Number.isFinite(n)) return "Örn: Türkiye genelde +3, Almanya kışın +1 yazın +2";
    return `Seçtiğin UTC offset: ${n >= 0 ? "+" : ""}${n}`;
  }, [tzOffset]);

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

    // 1) Tarih kontrol
    if (!birthDate) return setErr("Doğum tarihini gir.");

    // 2) Saat kontrol
    const decHour = toDecimalHour(birthTime);
    if (decHour === null) return setErr("Doğum saatini HH:MM formatında gir (örn 14:30).");

    // 3) UTC offset kontrol
    const tz = Number(tzOffset);
    if (!Number.isFinite(tz)) return setErr("UTC offset sayısal olmalı. Örn: 3, 2, 1, -5");

    // 4) Konum kontrol
    const latitude = Number(lat);
    const longitude = Number(lon);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return setErr("Enlem (lat) ve boylam (lon) sayı olmalı. Örn: 36.8841, 30.7056");
    }

    try {
      // natalengine: calculateAstrology(birthDate, birthHourDecimal, timezoneUTCOffset, latitude, longitude)
      const astro = calculateAstrology(birthDate, decHour, tz, latitude, longitude);

      const risingNameEn = astro?.rising?.sign?.name;
      const risingTr = SIGNS_TR[risingNameEn] || risingNameEn || "Bilinmiyor";

      const accurate = astro?.rising?.accurate;
      const degree = astro?.rising?.degree;

      // Sonuç burcunun slug'ını üret (Koç -> koc gibi)
      const slug = Object.entries(SIGNS_TR).find(([, tr]) => tr === risingTr)?.[0];
      // İngilizce ad -> slug map (en temizi manuel map)
      const slugMap = {
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

      setResult({
        risingTr,
        risingNameEn,
        degree,
        accurate,
        slug: slugMap[risingNameEn],
      });
    } catch (e) {
      setErr("Hesaplama sırasında hata oluştu. Bilgileri kontrol et.");
    }
  }

  return (
    <div className="space-y-6">
      <Seo
        title="Yükselen Burç Hesaplama"
        description="Doğum tarihi, saati ve konuma göre yükselen burcunuzu hesaplayın."
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
        <h1 className="text-2xl font-semibold">Yükselen Burç Hesaplama</h1>
        <p className="mt-2 text-zinc-400">
          Yükselen burç için <span className="text-zinc-200">tarih + saat + doğum yeri</span> gerekir.
        </p>
      </div>

      {/* FORM */}
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
              Doğduğun yerde yaz saati uygulanıyorsa offset değişebilir.
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <div className="text-sm text-zinc-300">Enlem (Latitude)</div>
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Örn: 36.884100"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 outline-none"
            />
          </label>

          <label className="space-y-2">
            <div className="text-sm text-zinc-300">Boylam (Longitude)</div>
            <input
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="Örn: 30.705600"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 outline-none"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={fillMyLocation}
            type="button"
            className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900"
          >
            Konumumu kullan (lat/lon doldur)
          </button>

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

        {/* SONUÇ */}
        {result ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="text-sm text-zinc-400">Sonuç</div>
            <div className="mt-2 text-2xl font-semibold">
              Yükselen: {result.risingTr}
            </div>

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

            {/* SEO + CTR için iç link */}
            {result.slug ? (
              <div className="mt-4">
                <Link className="underline text-sm" to={`/${result.slug}/gunluk`}>
                  {result.risingTr} burcu yorumlarını oku →
                </Link>
              </div>
            ) : null}

            <div className="mt-4 text-xs text-zinc-500 leading-relaxed">
              Not: Yükselen burç doğum saati ve doğum yeri bilgisine çok duyarlıdır.
              Doğum saatindeki küçük sapmalar sonucu değiştirebilir.
            </div>
          </div>
        ) : null}

        {/* SEO için açıklama metni */}
        <div className="pt-2 text-sm text-zinc-400 leading-relaxed">
          <h2 className="text-zinc-200 font-semibold">Yükselen burç nedir?</h2>
          <p className="mt-2">
            Yükselen burç, doğum anında doğu ufkunda yükselen burçtur. Astrolojide
            kişinin dış dünyaya yansıttığı ilk izlenim, davranış stili ve “maskesi”
            ile ilişkilendirilir.
          </p>
          <p className="mt-2">
            Doğru hesaplama için doğum tarihi ve saati yeterli değildir; doğum yeri
            (enlem/boylam) ve doğduğun andaki UTC offset bilgisi de gerekir.
          </p>
        </div>
      </div>

      <AdSlot />
    </div>
  );
}
