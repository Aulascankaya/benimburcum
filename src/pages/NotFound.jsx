import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
      <h1 className="text-2xl font-semibold">404 – Sayfa bulunamadı</h1>
      <Link to="/" className="mt-4 inline-block underline text-sm">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
