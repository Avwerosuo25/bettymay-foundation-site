import React, { useEffect } from "react";
import { ArrowRight, ImageIcon, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { c } from "../lib/theme";
import { scrollToId } from "../lib/scroll";

// Set a link to "#" to leave a platform unlinked. Update each with real
// profile URLs when available.
const SOCIAL_ICONS = [
  { key: "instagram", Icon: Instagram },
  { key: "twitter", Icon: Twitter },
  { key: "linkedin", Icon: Linkedin },
  { key: "facebook", Icon: Facebook },
];

// Set `photo` to an image path (e.g. "/team/elizabeth.jpg", placed in the
// `public` folder) once real headshots are ready. Leave it null to keep
// showing the placeholder.
const TEAM = [
  {
    name: "Barr. Elizabeth Akhigbe",
    role: "Matron",
    photo: "/team/team-3.jpeg",
    socials: { instagram: "#", twitter: "#", linkedin: "#", facebook: "#" },
    bio: [
      "Barr. Betty is an accomplished legal practitioner, nurse and philanthropist. She studied law at the prestigious University of Benin, Nigeria. Barr. Betty is the progenitor of the philosophy that guides the BettyMay Foundation.",
      "Early in her life, she was burdened with the systemic injustices and disadvantages that girls faced in society. She adopted a personal mandate to eradicate these barriers that limit the flourishing of the girl child — a mandate that would be passed down to her offspring.",
      "Barr. Betty spearheaded many independent projects that aided the education of young girls in Nigeria, as well as various welfare programs. She is an advocate of women's rights and a source of wisdom and inspiration for our organization.",
    ],
  },
  {
    name: "Dr Efe Izzi",
    role: "Founder / Director",
    photo: "/team/Izzi.jpeg",
    socials: { instagram: "https://www.instagram.com/drefeizzi/", twitter: "https://x.com/drefeizzi", linkedin: "https://www.linkedin.com/in/efe-izzi-5198b495/", facebook: "https://www.facebook.com/efe.izzi" },
    bio: [
      "Efe is a board certified dental practitioner with years of health, administrative and social care experience across various sectors. She graduated from Ternopil National Medical University, Ukraine in 2016 with honors, and has received multiple clinical and academic awards for her achievements in the field.",
      "Efe is a visionary with a passion for elevating the prospects of the girl child in Africa. She has received accolades and humanitarian awards for her independent investments in projects that have transformed the living standards and wellbeing of young girls across sub-Saharan Africa.",
      "She currently utilizes her skills and extensive experience at the directorship of the BettyMay Foundation.",
    ],
  },
  {
    name: "Dr Mabel Izzi",
    role: "Director",
    photo: "/team/team-1.jpeg",
    socials: { instagram: "#", twitter: "#", linkedin: "#", facebook: "#" },
    bio: [
      "Dr. Mabel is a Professor of Law at the Rivers State University. She is renowned for her academic contributions to the field of Gender law.",
      "Following in her matriarch's footsteps, Dr. Mabel sought to improve the situation of the girl child in Nigeria. Her approach was to make an impact on the societal as well as legal structures that affect the prospering of the girl child. She has made many scholastic publications on the subject and has proposed several structural reforms to lawmakers that would aid the changes she desires to achieve.",
      "Dr. Mabel currently functions as a director in the BettyMay Foundation, where she utilizes her skills and wealth of experience for the furtherance of its central objectives.",
    ],
  },
  {
    name: "Pharm Odia Enijehon",
    role: "Internal Strategist",
    photo: "/team/team-8.png",
    socials: { instagram: "#", twitter: "#", linkedin: "#", facebook: "#" },
    bio: [
      "Odia is a qualified pharmacist. He graduated from Ternopil National Medical University, Ukraine in 2017 with a Masters in Pharmacy (MPharm). ",
      "Odia is highly experienced in project management and strategic development. He formerly served as operations manager for a reputable non-governmental medical charity in Abuja, Nigeria, and has gone on to architect structured systems for effective altruism in other organizations.",
    ],
  },
  {
    name: "Dr Irunwo Ajinwo",
    role: "Secretary",
    photo: "/team/team-6.png",
    socials: { instagram: "#", twitter: "#", linkedin: "#", facebook: "#" },
    bio: [
      "Irunwo is a practicing medical doctor with training from Ternopil National Medical University, Ukraine.",
      "After completing her undergraduate degree in 2017, Irunwo sought to pursue her passion for business. She developed her competency for the field by completing several training programs in Paris, France and kyiv, Ukraine; after which she managed a network of small businesses in the city of Port harcourt, Nigeria.",
      "Her understanding of corporate structures and experience in administrative processes make her an important asset for the Bettymay foundation",
    ],
  },
  {
    name: "Osereme Akhigbe",
    role: "Outreach Coordinator",
    photo: "/team/team-7.png",
    socials: { instagram: "#", twitter: "#", linkedin: "#", facebook: "#" },
    bio: [
      "Ose is a graduate of accounting at the prestigious University of Benin, Nigeria. She is a philanthropist at heart with an insatiable drive for women empowerment.",
      "Ose has coordinated and participated in many educational and charitable campaigns all across the rural regions of Benin city,Nigeria.",
      "She is committed to making an impact in the field.",
    ],
  },
    {
    name: "Uwa Izzi",
    role: "Social Media Manager",
    photo: "/team/team-4.jpeg",
    socials: { instagram: "https://www.instagram.com/_zegzz/", twitter: "#", linkedin: "linkedin.com/in/uwa-izzi-733835253?originalSubdomain=uk", facebook: "#" },
    bio: [
      "Uwa holds a Masters degree in Pharmacy from the University of East Anglia, England.",
      "She is a young, creative entrepreneur with a talent for brand development across social spaces. She has played a vital role in the development and promotional marketing of various businesses and personal brands."
    ],
  },
    {
    name: "Kelvin Saduwa",
    role: "Web Developer",
    photo: "/team/team-9.png",
    socials: { instagram: "#", twitter: "https://x.com/saduwa_kelvin", linkedin: "www.linkedin.com/in/kelvinsaduwa", facebook: "#" },
    bio: [
      "Kelvin is an accountant by training. He completed his undergraduate program at the university of Port harcourt, Nigeria.",
      "Kelvin being a creative at heart with a keen interest in computer graphics sought to develop his skills in design and software development.",
      "He has completed technical courses from the Bluelime learning center in the United Kingdom, and has gone on to facilitate many successful web based projects in Nigeria.",
    ],
  },
];

export default function Team() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function goToContact(e) {
    e.preventDefault();
    navigate("/");
    setTimeout(() => scrollToId("contact"), 60);
  }

  return (
    <>
      {/* -------------------------------------------------------------- */}
      {/* Page header                                                     */}
      {/* -------------------------------------------------------------- */}
      <section className="pt-32 pb-16 px-5 sm:px-8" style={{ backgroundColor: c.plum }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-utility uppercase text-xs tracking-[0.25em]" style={{ color: c.gold }}>
            Our Team
          </p>
          <h1 className="font-display text-4xl sm:text-5xl mt-4" style={{ color: c.cream }}>
            The people behind the work.
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base leading-relaxed" style={{ color: "#E9D3E7" }}>
            The people guiding The BettyMay Foundation's work for the girl
            child, widows, orphans, and vulnerable communities across
            Nigeria.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Profiles                                                        */}
      {/* -------------------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8" style={{ backgroundColor: c.cream }}>
        <div className="max-w-5xl mx-auto space-y-16">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-8 md:gap-12 items-start`}
            >
              <div className="shrink-0 mx-auto md:mx-0">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center gap-2 border-2 border-dashed"
                    style={{ borderColor: c.plum, backgroundColor: c.plumTint, opacity: 0.85 }}
                  >
                    <ImageIcon size={26} color={c.plum} />
                    <span
                      className="font-utility text-[10px] uppercase tracking-wide text-center px-3"
                      style={{ color: c.plum }}
                    >
                      Photo coming soon
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center md:text-left">
                <h2 className="font-display text-2xl sm:text-3xl" style={{ color: c.plum }}>
                  {member.name}
                </h2>
                <p
                  className="font-utility uppercase text-xs tracking-[0.2em] mt-2 mb-5"
                  style={{ color: c.goldDeep }}
                >
                  {member.role}
                </p>
                <div className="space-y-4">
                  {member.bio.map((para, idx) => (
                    <p key={idx} className="text-sm sm:text-base leading-relaxed" style={{ color: c.inkSoft }}>
                      {para}
                    </p>
                  ))}
                </div>

                {member.socials && (
                  <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                    {SOCIAL_ICONS.map(({ key, Icon }) => (
                      <a
                        key={key}
                        href={member.socials[key] || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on ${key}`}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                        style={{ backgroundColor: c.plumTint }}
                      >
                        <Icon size={15} color={c.plum} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* CTA strip                                                       */}
      {/* -------------------------------------------------------------- */}
      <section className="py-16 px-5 sm:px-8" style={{ backgroundColor: c.plumTint }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <h2 className="font-display text-2xl sm:text-3xl" style={{ color: c.plum }}>
            Want to work alongside our team?
          </h2>
          <a
            href="/#contact"
            onClick={goToContact}
            className="font-utility text-sm font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: c.gold, color: c.plumDeep }}
          >
            Get In Touch <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
