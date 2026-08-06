import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logomark from "./Logomark";
import { c, NAV_LINKS } from "../lib/theme";
import { scrollToId } from "../lib/scroll";
import { useDonateModal } from "../lib/DonateModalContext";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openDonateModal } = useDonateModal();

  function goToSection(e, id) {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      // Navigate home first, then scroll once the section exists in the DOM
      navigate("/");
      setTimeout(() => scrollToId(id), 60);
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: c.cream, borderBottom: `1px solid ${c.creamDeep}` }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20">
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              scrollToId("home");
            }
          }}
          className="flex items-center"
        >
          <Logomark size={56} />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) =>
            link.route ? (
              <Link
                key={link.label}
                to={link.route}
                onClick={() => setMenuOpen(false)}
                className="font-utility text-sm tracking-wide hover:opacity-70 transition-opacity"
                style={{ color: c.ink }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={`/#${link.id}`}
                onClick={(e) => goToSection(e, link.id)}
                className="font-utility text-sm tracking-wide hover:opacity-70 transition-opacity"
                style={{ color: c.ink }}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={openDonateModal}
            className="font-utility text-sm font-semibold px-6 py-3 rounded-full inline-block transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: c.gold, color: c.plumDeep }}
          >
            Donate
          </button>
        </div>

        <button
          className="lg:hidden p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} color={c.ink} /> : <Menu size={26} color={c.ink} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-5 pb-6 flex flex-col gap-4" style={{ backgroundColor: c.cream }}>
          {NAV_LINKS.map((link) =>
            link.route ? (
              <Link
                key={link.label}
                to={link.route}
                onClick={() => setMenuOpen(false)}
                className="font-utility text-base py-1"
                style={{ color: c.ink }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={`/#${link.id}`}
                onClick={(e) => goToSection(e, link.id)}
                className="font-utility text-base py-1"
                style={{ color: c.ink }}
              >
                {link.label}
              </a>
            )
          )}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openDonateModal();
            }}
            className="font-utility text-sm font-semibold px-6 py-3 rounded-full text-center"
            style={{ backgroundColor: c.gold, color: c.plumDeep }}
          >
            Donate
          </button>
        </div>
      )}
    </header>
  );
}
