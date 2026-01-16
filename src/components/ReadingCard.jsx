function Section({ title, text }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-200">{text}</p>
    </div>
  );
}

export default function ReadingCard({ title, dateLabel, sections }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold">{title || "Yorum"}</h2>
        <div className="text-xs text-zinc-400">{dateLabel}</div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Section title="Aşk" text={sections?.ask} />
        <Section title="Para" text={sections?.para} />
        <Section title="Kariyer" text={sections?.kariyer} />
        <Section title="Sağlık" text={sections?.saglik} />
      </div>
    </article>
  );
}
