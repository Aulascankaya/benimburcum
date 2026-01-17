import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { PERIODS, ZODIACS } from "../data/zodiac";
import Tabs from "../components/Tabs";
import ReadingCard from "../components/ReadingCard";
import Seo from "../components/Seo";
import AdSlot from "../components/AdSlot";
import { getDateLabel } from "../utils/dateLabels";

const loaders = {
  koc: () => import("../data/readings/koc.json"),
  boga: () => import("../data/readings/boga.json"),
  ikizler: () => import("../data/readings/ikizler.json"),
  yengec: () => import("../data/readings/yengec.json"),
  aslan: () => import("../data/readings/aslan.json"),
  basak: () => import("../data/readings/basak.json"),
  terazi: () => import("../data/readings/terazi.json"),
  akrep: () => import("../data/readings/akrep.json"),
  yay: () => import("../data/readings/yay.json"),
  oglak: () => import("../data/readings/oglak.json"),
  kova: () => import("../data/readings/kova.json"),
  balik: () => import("../data/readings/balik.json"),
};

export default function Reading() {
  const { sign, period } = useParams();

  const isValidSign = ZODIACS.some((z) => z.slug === sign);
  const isValidPeriod = PERIODS.includes(period);

  if (!isValidSign || !isValidPeriod) return <Navigate to="/404" replace />;

  const signInfo = useMemo(() => ZODIACS.find((z) => z.slug === sign), [sign]);

  const Loader = loaders[sign];

  if (!Loader) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
        <div className="text-lg font-semibold">
          {signInfo?.name} için içerik henüz eklenmedi.
        </div>
        <p className="mt-2 text-zinc-400">
          Bu burç için JSON içeriği henüz yok. Script ile üretip ekleyebilirsin.
        </p>
        <Link className="mt-4 inline-block text-sm underline" to="/">
          Ana sayfaya dön
        </Link>
      </div>
    );
  }

  return (
    <ReadingAsync
      sign={sign}
      period={period}
      signInfo={signInfo}
      Loader={Loader}
    />
  );
}

function ReadingAsync({ sign, period, signInfo, Loader }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    Loader().then((m) => {
      if (mounted) setData(m.default);
    });
    return () => (mounted = false);
  }, [Loader]);

  if (!data) return <div className="text-zinc-400">Yükleniyor…</div>;

  const content = data[period];
  const dynamicDateLabel = getDateLabel(period);

  const periodLabel =
    period === "gunluk"
      ? "Günlük"
      : period === "haftalik"
      ? "Haftalık"
      : "Aylık";

  const pageTitle = `${signInfo.name} ${periodLabel} Yorum`;
  const pageDesc = `${
    signInfo.name
  } burcu için ${periodLabel.toLowerCase()} burç yorumu. Aşk, para, kariyer ve sağlık yorumları.`;

  return (
    <div className="space-y-4">
      <Seo title={pageTitle} description={pageDesc} />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
        <div className="text-sm text-zinc-400">{signInfo.dates}</div>
        <h1 className="mt-1 text-2xl font-semibold">
          {signInfo.name} • {periodLabel}
        </h1>
      </div>

      <Tabs sign={sign} active={period} />

      <ReadingCard
        title={content?.title}
        dateLabel={dynamicDateLabel}
        sections={content?.sections}
      />

      <AdSlot />
    </div>
  );
}
