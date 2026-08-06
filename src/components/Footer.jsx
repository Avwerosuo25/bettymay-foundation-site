import React, { useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logomark from "./Logomark";
import { c, NAV_LINKS } from "../lib/theme";
import { scrollToId } from "../lib/scroll";

const PROGRAM_TITLES = [
  "Girl-Child Education & Advocacy",
  "Widow Empowerment Program",
  "Orphan Care & Support",
  "Community Relief",
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubscribe(e) {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  }

  function goToSection(e, id) {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id), 60);
    }
  }

  return (
    <footer style={{ backgroundColor: c.plumDeep }} className="pt-16 pb-8 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div
            className="mb-4 inline-block rounded-xl px-4 py-3"
            style={{ backgroundColor: c.cream }}
          >
            <Logomark size={40} />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#E3C7E0" }}>
            The BettyMay foundation is a non-profit organisation that advocates for the protection of the rights of the girl child 
            and provides support to women and children.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media link"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#71006F" }}
              >
                <Icon size={16} color={c.cream} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-utility uppercase text-xs tracking-wide mb-4" style={{ color: c.gold }}>
            Quick Links
          </h4>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.route ? (
                  <Link to={link.route} className="text-sm" style={{ color: "#E3C7E0" }}>
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={`/#${link.id}`}
                    onClick={(e) => goToSection(e, link.id)}
                    className="text-sm"
                    style={{ color: "#E3C7E0" }}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-utility uppercase text-xs tracking-wide mb-4" style={{ color: c.gold }}>
            Programs
          </h4>
          <ul className="space-y-3">
            {PROGRAM_TITLES.map((title) => (
              <li key={title}>
                <a
                  href="/#outreach"
                  onClick={(e) => goToSection(e, "outreach")}
                  className="text-sm"
                  style={{ color: "#E3C7E0" }}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-utility uppercase text-xs tracking-wide mb-4" style={{ color: c.gold }}>
            Stay Updated
          </h4>
          {subscribed ? (
            <p className="text-sm" style={{ color: "#E3C7E0" }}>
              Thanks — you're subscribed.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                aria-label="Email for newsletter"
                className="px-4 py-3 rounded-xl text-sm"
                style={{ backgroundColor: "#71006F", color: c.cream }}
              />
              <button
                type="submit"
                className="font-utility text-xs font-semibold uppercase tracking-wide px-4 py-3 rounded-xl"
                style={{ backgroundColor: c.gold, color: c.plumDeep }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3"
        style={{ borderTop: "1px solid #71006F" }}
      >
        <p className="text-xs" style={{ color: "#C795C4" }}>
          © 2026 The BettyMay Foundation. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: "#C795C4" }}>
          Designed by ArkensTech.
        </p>
      </div>
    </footer>
  );
}
