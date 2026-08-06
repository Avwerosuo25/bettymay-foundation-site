import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import DonateModal from "./components/DonateModal";
import Home from "./pages/Home";
import Team from "./pages/Team";
import { c, fontImport } from "./lib/theme";
import { DonateModalProvider } from "./lib/DonateModalContext";

export default function App() {
  return (
    <DonateModalProvider>
      <div className="font-body" style={{ backgroundColor: c.cream, color: c.ink }}>
        <style>{fontImport}</style>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
        <Footer />
        <DonateModal />
      </div>
    </DonateModalProvider>
  );
}
