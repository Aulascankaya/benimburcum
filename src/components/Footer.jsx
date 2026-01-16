import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-6">
      <div className="mx-auto max-w-5xl px-4 space-y-3">
        <div className="text-sm text-zinc-500">
          © {new Date().getFullYear()} benimburcum.com • Burç yorumları eğlence ve
          genel bilgilendirme amaçlıdır.
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
          <Link className="underline hover:text-zinc-200" to="/hakkimizda">
            Hakkımızda
          </Link>
          <Link
            className="underline hover:text-zinc-200"
            to="/gizlilik-politikasi"
          >
            Gizlilik
          </Link>
          <Link className="underline hover:text-zinc-200" to="/cerez-politikasi">
            Çerezler
          </Link>
          <Link className="underline hover:text-zinc-200" to="/iletisim">
            İletişim
          </Link>
        </div>
      </div>
    </footer>
  );
}
