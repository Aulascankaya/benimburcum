import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold">
          benimburcum.com
        </Link>
        <div className="text-sm text-zinc-400">
          Günlük • Haftalık • Aylık
        </div>
      </div>
    </header>
  );
}
