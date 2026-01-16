import { Link } from "react-router-dom";
import { ZODIACS } from "../data/zodiac";

export default function ZodiacGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {ZODIACS.map((z) => (
        <Link
          key={z.slug}
          to={`/${z.slug}/gunluk`}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:bg-zinc-900 transition"
        >
          <div className="text-base font-semibold">{z.name}</div>
          <div className="mt-1 text-xs text-zinc-400">{z.dates}</div>
          <div className="mt-3 inline-flex rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-200">
            Günlük yoruma git →
          </div>
        </Link>
      ))}
    </div>
  );
}
