import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  HeartHandshake,
  GraduationCap,
  Home as HomeIcon,
  ShieldCheck,
  Users,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Send,
  Clock,
} from "lucide-react";
import AdireUnderline from "../components/AdireUnderline";
import Wave from "../components/Wave";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { c, CONTACT_EMAIL, FORM_ENDPOINT } from "../lib/theme";
import { scrollToId } from "../lib/scroll";
import { useDonateModal } from "../lib/DonateModalContext";

const STATS = [
  { number: "100+", label: "Girls empowered in school" },
  { number: "50+", label: "Widows provided with support" },
  { number: "10", label: "Successful Outreach Programs" },
  { number: "1,500+", label: "Meals & relief packs distributed" },
];

// Replace the placeholder entries below with real quotes as they come in.
const TESTIMONIALS = [
  {
    quote:
      "The BettyMay Foundation's engagement with Brainy Child Int'l School has been transformative. Their support has opened doors for our students, providing them with educational opportunities they might have otherwise missed. Their passion for empowering young women and children is inspiring, and we are proud to partner with such a dedicated organization.",
    name: "Chidinma I.",
    role: "Guidance & Counsellor, The BettyMay Foundation",
  },
  {
    quote:
      "The BettyMay Foundation has been a blessing to Casian Royal Academy. Their commitment to uplifting the lives of vulnerable women and children has had a profound impact on our school community. Through their support, our students have gained access to essential resources, mentoring, and educational support, creating a brighter future for each child. We are grateful for their invaluable partnership.",
    name: "Uduak A.",
    role: "Principal, Casian Royal Academy",
  },
  {
    quote:
      "The BettyMay Foundation's dedication to the welfare of vulnerable women and children is remarkable. They have been a steadfast source of support for the children at Saviour Stars Orphanage Home. Their commitment to ensuring a safe and nurturing environment for these kids has been instrumental in improving their quality of life. We are thankful for The BettyMay Foundation's tireless efforts in making a difference in the lives of the less fortunate.",
    name: "Funmilayo O.",
    role: "Director, Saviour Stars Orphanage Home",
  },
  {
    quote:
      "The BettyMay Foundation has been a beacon of hope for the vulnerable children in our community. Their unwavering commitment to empowering young minds is truly commendable. We have witnessed firsthand the positive impact of their programs, which have improved the educational prospects and well-being of our students. We are grateful for their dedication to creating a brighter future for our children.",
    name: "Amina Y.",
    role: "Proprietress & Founder",
  },
];

const VALUES = [
  {
    icon: GraduationCap,
    title: "Education First",
    text: "We keep girls in classrooms with scholarships, school kits, and mentorship that follows them year after year.",
  },
  {
    icon: ShieldCheck,
    title: "Dignity, Always",
    text: "Every widow, orphan, and family we work with is met with respect. Support is given without conditions attached.",
  },
  {
    icon: Users,
    title: "Community Collaborations",
    text: "Through strategic partnerships with other NGOs, we organize medical outreaches that provide essential healthcare services to vulnerable communities.",
  },
  {
    icon: HeartHandshake,
    title: "Built to Last",
    text: "We favour skills, savings groups, and small enterprise over one-off handouts, so support outlives our visits.",
  },
];

const PROGRAMS = [
  {
    icon: GraduationCap,
    title: "Back to School Outreach",
    text: "Scholarships, school supplies, and safe-space mentorship circles that keep girls learning and speaking up for their futures.",
  },
  {
    icon: HeartHandshake,
    title: "Widow Empowerment Program",
    text: "Savings groups, vocational training, and small-business grants that help widows rebuild steady income for their households.",
  },
  {
    icon: HomeIcon,
    title: "Orphan Care & Support",
    text: "Foster-family placement support, school enrolment, healthcare access, and consistent check-ins for children without parental care.",
  },
  {
    icon: Users,
    title: "Community Relief",
    text: "Food packs, healthcare outreach, and emergency support for low-income households during floods, illness, and crisis periods.",
  },
];

export default function Home() {
  const location = useLocation();
  const { openDonateModal } = useDonateModal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  // Scroll to a section hash on load/navigation, otherwise scroll to top.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollToId(id), 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openMailtoFallback() {
    const subject = encodeURIComponent(
      `New message from ${form.name} — BettyMay Foundation website`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Formspree hasn't been configured yet (see FORM_ENDPOINT in theme.js)
    // — fall back to the visitor's email client rather than fail silently.
    if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
      openMailtoFallback();
      setSent(true);
      return;
    }

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* -------------------------------------------------------------- */}
      {/* Hero                                                            */}
      {/* -------------------------------------------------------------- */}
      <section id="home" className="pt-32 pb-16 px-5 sm:px-8" style={{ backgroundColor: c.cream }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p
              className="font-utility uppercase text-xs tracking-[0.25em] mb-5"
              style={{ color: c.rose }}
            >
              Girl-Child Advocacy · Community Care · Nigeria
            </p>
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08]"
              style={{ color: c.plum }}
            >
              Every girl deserves
              <br />a{" "}
              <span className="relative inline-block">
                voice
                <span className="absolute left-0 -bottom-2">
                  <AdireUnderline />
                </span>
              </span>
              .
              <br />
              <span className="italic font-light">Every family a chance.</span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed max-w-lg" style={{ color: c.inkSoft }}>
              The BettyMay Foundation works alongside girls, widows,
              orphans, and low-income households across Nigeria — building
              the education, income, and support networks that let them
              shape their own futures.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openDonateModal}
                className="font-utility text-sm font-semibold px-7 py-4 rounded-full inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: c.gold, color: c.plumDeep }}
              >
                Donate Now <ArrowRight size={16} />
              </button>
              <Link
                to="/team"
                className="font-utility text-sm font-semibold px-7 py-4 rounded-full inline-flex items-center gap-2 border transition-colors hover:bg-white"
                style={{ borderColor: c.plum, color: c.plum }}
              >
                Meet Our Team
              </Link>
            </div>
          </div>

          <div className="relative h-[420px] sm:h-[460px] hidden sm:block">
            <div
              className="absolute top-0 right-0 w-[62%] h-[68%] rounded-[2rem]"
              style={{ backgroundColor: c.plum }}
            />
            <div
              className="absolute bottom-0 left-0 w-[55%] h-[52%] rounded-[2rem]"
              style={{ backgroundColor: c.gold }}
            />
            <div
              className="absolute bottom-6 right-4 w-[38%] h-[34%] rounded-[1.5rem]"
              style={{ backgroundColor: c.rose }}
            />
            <svg className="absolute inset-0" viewBox="0 0 400 420" fill="none" aria-hidden="true">
              <path
                d="M40 380C90 340 90 300 40 260C-10 220 -10 180 40 140"
                stroke={c.cream}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.5"
              />
              <path
                d="M260 40C300 80 340 80 370 40"
                stroke={c.cream}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
            <div
              className="absolute top-8 left-0 rounded-2xl px-6 py-5 shadow-xl"
              style={{ backgroundColor: c.cream, maxWidth: "210px" }}
            >
              <p className="font-display text-3xl" style={{ color: c.plum }}>
                100+
              </p>
              <p className="font-utility text-xs uppercase tracking-wide mt-1" style={{ color: c.inkSoft }}>
                Girls supported this year
              </p>
            </div>
          </div>
        </div>
      </section>

      <Wave fill={c.plum} />

      {/* -------------------------------------------------------------- */}
      {/* Impact stats                                                    */}
      {/* -------------------------------------------------------------- */}
      <section style={{ backgroundColor: c.plum }} className="py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl sm:text-4xl" style={{ color: c.gold }}>
                {s.number}
              </p>
              <p className="font-utility text-xs uppercase tracking-wide mt-2" style={{ color: c.cream }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Wave fill={c.cream} flip />

      {/* -------------------------------------------------------------- */}
      {/* About                                                           */}
      {/* -------------------------------------------------------------- */}
      <section id="about" className="py-20 px-5 sm:px-8" style={{ backgroundColor: c.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="font-utility uppercase text-xs tracking-[0.25em]" style={{ color: c.rose }}>
              Our Story
            </p>
            <h2 className="font-display text-3xl sm:text-4xl mt-4" style={{ color: c.plum }}>
              A Legacy of Compassion, A Future of Hope.
            </h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: c.inkSoft }}>
              What began as a family legacy of compassion became a mission for change. 
              Founded in 2023 by Dr. Efe Izzi in Port Harcourt, 
              BettyMay Foundation exists to uplift vulnerable women and children, 
              protect the rights of every girl child, and build stronger communities through education, healthcare, and advocacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-7 rounded-2xl flex gap-5" style={{ backgroundColor: c.plumTint }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: c.plum }}
                  >
                    <Icon size={20} color={c.gold} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg" style={{ color: c.plum }}>
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: c.inkSoft }}>
                      {v.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Outreach / Programs                                             */}
      {/* -------------------------------------------------------------- */}
      <section id="outreach" className="py-20 px-5 sm:px-8" style={{ backgroundColor: c.plumTint }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="font-utility uppercase text-xs tracking-[0.25em]" style={{ color: c.rose }}>
              Outreach
            </p>
            <h2 className="font-display text-3xl sm:text-4xl mt-4" style={{ color: c.plum }}>
              Where we show up.
            </h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: c.inkSoft }}>
              Four programs, one thread running through them: every family
              we work with keeps its dignity, its income, and its voice.
            </p>
          </div>

          <div className="relative">
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full"
              viewBox="0 0 1000 420"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M120 90 C 350 90, 350 210, 500 210 S 650 330, 880 330"
                stroke={c.gold}
                strokeWidth="2.5"
                strokeDasharray="1 10"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8">
              {PROGRAMS.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="p-8 rounded-2xl" style={{ backgroundColor: c.cream, border: `1px solid ${c.creamDeep}` }}>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                      style={{ backgroundColor: c.rose }}
                    >
                      <Icon size={20} color={c.cream} />
                    </div>
                    <h3 className="font-display text-xl" style={{ color: c.plum }}>
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: c.inkSoft }}>
                      {p.text}
                    </p>
                    <a
                        href="https://www.instagram.com/thebettymayfoundation/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 font-utility text-xs uppercase tracking-wide inline-flex items-center gap-1"
                        style={{ color: c.goldDeep }}
                      >
                        Learn more <ArrowUpRight size={14} />
                      </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Testimonials                                                    */}
      {/* -------------------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8" style={{ backgroundColor: c.plum }}>
        <TestimonialCarousel testimonials={TESTIMONIALS} />
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Donate strip                                                    */}
      {/* -------------------------------------------------------------- */}
      <section id="donate" className="py-16 px-5 sm:px-8" style={{ backgroundColor: c.gold }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <h2 className="font-display text-2xl sm:text-3xl" style={{ color: c.plumDeep }}>
            Your gift keeps a girl in school this term.
          </h2>
          <button
            type="button"
            onClick={openDonateModal}
            className="font-utility text-sm font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: c.plum, color: c.cream }}
          >
            Donate Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Contact                                                         */}
      {/* -------------------------------------------------------------- */}
      <section id="contact" className="py-20 px-5 sm:px-8" style={{ backgroundColor: c.cream }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <p className="font-utility uppercase text-xs tracking-[0.25em]" style={{ color: c.rose }}>
              Contact
            </p>
            <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-8" style={{ color: c.plum }}>
              Talk to us about giving or volunteering.
            </h2>

            {sent ? (
              <div className="p-6 rounded-2xl" style={{ backgroundColor: c.plumTint, color: c.plum }}>
                <p className="font-display text-lg">Message received — thank you.</p>
                <p className="text-sm mt-2" style={{ color: c.inkSoft }}>
                  A member of our team will reply within two working days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="font-utility text-xs uppercase tracking-wide block mb-2" style={{ color: c.inkSoft }}>
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border text-sm"
                      style={{ borderColor: c.creamDeep, backgroundColor: "white" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-utility text-xs uppercase tracking-wide block mb-2" style={{ color: c.inkSoft }}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border text-sm"
                      style={{ borderColor: c.creamDeep, backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="font-utility text-xs uppercase tracking-wide block mb-2" style={{ color: c.inkSoft }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border text-sm"
                    style={{ borderColor: c.creamDeep, backgroundColor: "white" }}
                  />
                </div>
                {sendError && (
                  <p className="text-sm" style={{ color: "#B23A3A" }}>
                    Something went wrong sending your message. Please try
                    again, or email us directly at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: c.plum }}>
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="font-utility text-sm font-semibold px-7 py-4 rounded-full inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  style={{ backgroundColor: c.plum, color: c.cream }}
                >
                  {sending ? "Sending…" : "Send Message"} <Send size={15} />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-2xl" style={{ backgroundColor: c.plum }}>
              <div className="flex items-start gap-4 mb-5">
                <MapPin size={20} color={c.gold} className="mt-0.5 shrink-0" />
                <p className="text-sm" style={{ color: c.cream }}>
                  Plot 12 Delta Palm Avenue
                  <br />
                  Port Harcourt, Rivers
                  <br />
                  Nigeria
                </p>
              </div>
              <div className="flex items-start gap-4 mb-5">
                <Phone size={20} color={c.gold} className="mt-0.5 shrink-0" />
                <p className="text-sm" style={{ color: c.cream }}>
                  +234 (0)80 5908 4256
                </p>
              </div>
              <div className="flex items-start gap-4 mb-5">
                <Mail size={20} color={c.gold} className="mt-0.5 shrink-0" />
                <p className="text-sm" style={{ color: c.cream }}>
                  {CONTACT_EMAIL}
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={20} color={c.gold} className="mt-0.5 shrink-0" />
                <p className="text-sm" style={{ color: c.cream }}>
                  Mon – Fri, 9:00am – 5:00pm WAT
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d127227.04947853173!2d7.036766136698693!3d4.796595592455562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1soil%20mill!5e0!3m2!1sen!2sng!4v1786010139575!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="The BettyMay Foundation location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
