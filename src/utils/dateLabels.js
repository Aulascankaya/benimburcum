export function getDateLabel(period) {
  const now = new Date();

  if (period === "gunluk") {
    return now.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (period === "haftalik") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + 1); // Pazartesi
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const s = start.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
    const e = end.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });

    return `${s} - ${e}`;
  }

  if (period === "aylik") {
    return now.toLocaleDateString("tr-TR", {
      month: "long",
      year: "numeric",
    });
  }

  return "";
}
