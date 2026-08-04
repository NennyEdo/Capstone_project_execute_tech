import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const faqData = [
  { cat: "About Us", question: "What is Execute Tech Academy?", answer: "Execute Tech Academy is a people-first technology school built to bridge the gap between ambition and opportunity. We don't just teach code, we build careers. Through mentorship-driven cohorts, hands-on projects, and real industry partnerships, we transform complete beginners into confident, job-ready tech professionals." },
  { cat: "Programs", question: "What courses do you offer?", answer: "We offer six career-track programs: Software Development, UI/UX Design, Data Analytics, Cybersecurity, DevOps Engineering, and Product Management. Each is crafted with input from hiring managers and updated every semester to reflect what employers actually want." },
  { cat: "Admissions", question: "Do I need prior experience to enroll?", answer: "Not at all. Every program starts from zero. Whether you've never written a line of code or just need to level up your skills, we meet you where you are. Our adaptive curriculum and weekly one-on-one mentoring sessions make sure no one gets left behind." },
  { cat: "Outcomes", question: "What do I get when I graduate?", answer: "You'll earn an industry-recognized certificate, a portfolio of real-world projects, and access to our career support team, including resume reviews, mock interviews, and direct introductions to our hiring partner network." },
  { cat: "Pricing", question: "How does pricing work?", answer: "We believe financial barriers shouldn't block great talent. Tuition is structured with flexible monthly installment plans, income-share options, and need-based scholarships. Book a free 30-minute advising call and we'll find the payment plan that works for your situation, with no pressure." },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),transparent_40%)] py-16 sm:py-20 lg:py-24"
    >
      <div className="section-container relative">
        <div className="absolute -left-16 top-[10%] h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute right-0 top-20 h-44 w-44 rounded-full bg-slate-200/30 blur-3xl" />

        <div className="relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
              FAQs
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Clear answers to the most common questions about our programs, admissions, and outcomes.
            </p>
          </div>

          <div className="grid gap-4">
            {faqData.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${
                    isOpen
                      ? "border-sky-200 bg-sky-50 shadow-[0_16px_34px_rgba(37,99,235,0.10)]"
                      : "border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="w-full px-4 py-5 text-left sm:px-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-base font-semibold leading-7 text-slate-900 sm:text-[17px]">
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                          isOpen
                            ? "border-sky-500 bg-sky-500 text-white"
                            : "border-slate-200 bg-white text-slate-500"
                        }`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-[max-height] duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="border-t border-slate-200/80 px-5 py-5 text-sm leading-7 text-slate-600 sm:text-[15px]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-[28px] bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white shadow-[0_18px_38px_rgba(37,99,235,0.20)] sm:p-8">
            <p className="text-sm text-sky-100">Still have questions? We usually reply within a couple of hours.</p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-slate-100 sm:w-auto"
              >
                Book a free call
              </button>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="w-full rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 sm:w-auto"
              >
                Browse programs →
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection;