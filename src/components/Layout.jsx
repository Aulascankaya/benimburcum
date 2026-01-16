import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
