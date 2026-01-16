import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Reading from "../pages/Reading";
import NotFound from "../pages/NotFound";

import About from "../pages/About";
import Privacy from "../pages/Privacy";
import Cookies from "../pages/Cookies";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Burç sayfaları: /koc/gunluk gibi */}
        <Route path="/:sign/:period" element={<Reading />} />

        {/* Yasal / güven sayfaları */}
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/gizlilik-politikasi" element={<Privacy />} />
        <Route path="/cerez-politikasi" element={<Cookies />} />
        <Route path="/iletisim" element={<Contact />} />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
