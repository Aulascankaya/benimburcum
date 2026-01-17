import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const linkClass = ({ isActive }) =>
    [
      "text-sm",
      isActive ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200",
    ].join(" ");

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          benimburcum.com
        </Link>

        <nav className="flex items-center gap-4">
          <NavLink to="/yukselen-hesapla" className={linkClass}>
            Yükselen Hesapla
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
