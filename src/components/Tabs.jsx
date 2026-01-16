import { Link } from "react-router-dom";

const items = [
  { key: "gunluk", label: "Günlük" },
  { key: "haftalik", label: "Haftalık" },
  { key: "aylik", label: "Aylık" },
];

export default function Tabs({ sign, active }) {
  return (
    <div className="flex gap-2">
      {items.map((it) => {
        const isActive = it.key === active;
        return (
          <Link
            key={it.key}
            to={`/${sign}/${it.key}`}
            className={[
              "rounded-full px-4 py-2 text-sm border transition",
              isActive
                ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                : "bg-zinc-900/30 text-zinc-200 border-zinc-800 hover:bg-zinc-900",
            ].join(" ")}
          >
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}
