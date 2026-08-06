import React, { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { c } from "../lib/theme";

export default function TestimonialCarousel({ testimonials, autoAdvanceMs = 7000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [paused, testimonials.length, autoAdvanceMs]);

  function goTo(i) {
    setIndex(((i % testimonials.length) + testimonials.length) % testimonials.length);
  }

  const current = testimonials[index];

  return (
    <div
      className="max-w-3xl mx-auto text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Quote size={32} color={c.gold} className="mx-auto mb-6" />

      <div key={index} className="testimonial-fade">
        <p
          className="font-display italic text-2xl sm:text-3xl leading-relaxed"
          style={{ color: c.cream }}
        >
          {current.quote}
        </p>
        <p className="font-utility text-xs uppercase tracking-wide mt-6" style={{ color: c.gold }}>
          — {current.name}{current.role ? `, ${current.role}` : ""}
        </p>
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-6 mt-9">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ border: `1px solid ${c.gold}` }}
          >
            <ChevronLeft size={18} color={c.gold} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className="rounded-full transition-all"
                style={{
                  width: i === index ? 22 : 8,
                  height: 8,
                  backgroundColor: i === index ? c.gold : "rgba(253,251,248,0.4)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ border: `1px solid ${c.gold}` }}
          >
            <ChevronRight size={18} color={c.gold} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes testimonialFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .testimonial-fade {
          animation: testimonialFadeIn 0.5s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-fade { animation: none; }
        }
      `}</style>
    </div>
  );
}
