import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "../assets/Images/footerlogo.png";
import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { label: "Courses", path: "/courses" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
  ],
  company: [
    { label: "Contact us", path: "/contact" },
  ],
  resources: [
    { label: "FAQ", path: "/#faq" },
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_35%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative section-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <img
              src={Logo}
              alt="Execute Tech Academy"
              className="h-14 w-auto sm:h-16 lg:h-20"
            />

            <p className="max-w-xl text-sm leading-relaxed text-blue-100/90 sm:text-[15px]">
              At Execute Tech Academy, we redefine the way technology is learned. Step
              into a world where passion meets purpose, fostering a dynamic environment
              that inspires curiosity, promotes learning, and guides you toward the right
              career path through critical thinking and a harmonious blend of traditional
              and modern educational approaches.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {[
                { href: "#", icon: FaXTwitter, label: "X (Twitter)" },
                { href: "https://web.facebook.com/executetechacademy", icon: FaFacebook, label: "Facebook" },
                { href: "https://www.instagram.com/_execute_tech_academy_/", icon: FaInstagram, label: "Instagram" },
                { href: "https://www.linkedin.com/company/executetechacademy/", icon: FaLinkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/10 text-blue-100 transition-colors duration-200 hover:border-white/30 hover:bg-white/20 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 sm:p-5">
              <h3 className="font-display text-lg font-semibold">Stay in the loop</h3>
              <p className="mt-2 text-sm text-blue-100/80">
                Get updates on new courses, cohorts, and career resources.
              </p>

              <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter email address"
                  className="input-field w-full flex-1 !border-white/10 !bg-white/5 !text-white placeholder:!text-slate-500 focus:!border-primary-400 focus:!ring-primary-500/20"
                />
                <button type="submit" className="btn-primary w-full shrink-0 !bg-white !text-primary-600 hover:!bg-slate-100 sm:w-auto">
                  Subscribe
                </button>
              </form>
              <p className="mt-2 text-xs text-blue-100/70">
                I consent to receiving communication from Execute Tech Academy.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Object.entries(footerLinks).map(([section, links]) => (
                <div key={section} className="rounded-[22px] border border-white/10 bg-white/10 p-4 shadow-sm backdrop-blur-sm sm:p-5">
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">
                    {section}
                  </h4>
                  <ul className="space-y-2.5">
                    {links.map(({ label, path }) => (
                      <li key={label}>
                        <Link
                          to={path}
                          className="flex items-center justify-between rounded-xl px-2 py-2 text-sm text-blue-100/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                        >
                          <span>{label}</span>
                          <span className="text-base text-blue-200/80">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 border-t border-white/10 pt-8 text-left sm:flex-row sm:items-center sm:justify-between sm:text-center">
          <p className="text-xs text-blue-100/70">
            &copy; {new Date().getFullYear()} Execute Tech Academy. All rights reserved.
          </p>
          <p className="text-xs text-blue-100/70">
            Premium tech education · Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
