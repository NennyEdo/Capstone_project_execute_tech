import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import SectionHeading from "../components/ui/SectionHeading";
import PageHero from "../components/ui/PageHero";
import AnimatedSection from "../components/ui/AnimatedSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faSuitcase,
  faRocket,
  faGraduationCap,
  faUsers,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

import user1 from "../assets/Students/Kudirat.jpg";
import user2 from "../assets/Students/Lilian.jpg";
import user3 from "../assets/Students/Lukman.jpg";
import user4 from "../assets/Students/Rachel.jpg";
import HeroBg from "../assets/Images/execcutetechherobg.jpg";
import img from "../assets/img.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";

const offerItems = [
  {
    icon: faLightbulb,
    title: "Innovative Learning Approach",
    text: "Our immersive, project-based learning model keeps you engaged and moving forward.",
  },
  {
    icon: faSuitcase,
    title: "Real-World, Real Impact",
    text: "Every module and project prepares you to solve real-world problems with cutting-edge solutions.",
  },
  {
    icon: faRocket,
    title: "Future-Ready Skills",
    text: "Gain the skills and confidence to shape the future with hands-on projects and expert guidance.",
  },
];

const stats = [
  { icon: faBookOpen, value: "9+", label: "Career programmes" },
  { icon: faUsers, value: "500+", label: "Active learners" },
  { icon: faGraduationCap, value: "Live", label: "Expert-led classes" },
];

const features = [
  {
    img,
    imgAlt: "Interactive Learning Platform",
    reverse: false,
    title: "Interactive Learning Platform",
    body: "Our learning environment is built for participation, collaboration, and measurable progress.",
    points: [
      "Live classes and workshops with instructors who encourage questions.",
      "Gamified challenges and rewards that keep you motivated.",
      "Peer collaboration on projects that mirror real tech teams.",
    ],
  },
  {
    img: img1,
    imgAlt: "Industry-Ready Courses",
    reverse: true,
    title: "Industry-Ready Courses",
    body: "Courses are designed around practical skills, modern tools, and employer expectations.",
    points: [
      "Master industry-relevant tools and techniques.",
      "Build projects that reflect real-world challenges.",
      "Stay ahead with skills top employers demand.",
      "Gain confidence to thrive in any tech role.",
    ],
  },
  {
    img: img2,
    imgAlt: "Personalized Learning Paths",
    reverse: false,
    title: "Personalized Learning Paths",
    body: "Your ambitions are unique, so your learning path is customized to your goals.",
    points: [
      "Tailored courses matched to your career aspirations.",
      "Real-world projects aligned with your objectives.",
      "Dedicated mentorship to support your growth.",
      "A dynamic roadmap that evolves with your progress.",
    ],
  },
];

const reviews = [
  {
    name: "Kudirat",
    title: "Student",
    avatar: user1,
    rating: 4,
    comment:
      "Joining Execute Tech, I had one mission: get grounded in fundamentals. That was achieved with the academy's rigour, mentorship, and live classes.",
  },
  {
    name: "Lilian",
    title: "Student",
    avatar: user2,
    rating: 5,
    comment:
      "I'm thrilled to be a part of this team. I believe the higher we go, the more impactful it's going to be.",
  },
  {
    name: "Lukman",
    title: "Student",
    avatar: user3,
    rating: 4,
    comment:
      "I'm enjoying the DevOps program. The lessons are practical, engaging, and easy to follow. I'm gaining valuable hands-on experience.",
  },
  {
    name: "Rachel",
    title: "Student",
    avatar: user4,
    rating: 5,
    comment:
      "My confidence has improved greatly after the system administration class. The support and structure are excellent.",
  },
];

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <Navbar />

      <PageHero
        label="Career-defining tech education"
        title="Transform your tech journey with premium hands-on training."
        subtitle="Learn from practitioners, master the latest tools, and launch the next phase of your career with confidence."
        backgroundImage={HeroBg}
        backgroundOverlayClassName="bg-navy-950/80"
      >
        <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => navigate("/about")}
            className="btn-ghost-light w-full sm:w-auto"
          >
            Learn more
          </button>
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="btn-accent w-full sm:w-auto"
          >
            Explore courses
          </button>
        </div>
      </PageHero>

      {/* Stats bar */}
      <AnimatedSection className="relative z-10 -mt-8 pb-4">
        <div className="section-container">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(({ icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-slate-300/90 bg-white/80 p-5 shadow-card backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-sm text-slate-600">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* What we offer */}
      <AnimatedSection className="relative overflow-hidden bg-white py-24">
        <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary-500/8 blur-[120px]" />
        <div className="section-container relative">
          <SectionHeading
            label="What we offer"
            title="Designed for real career transformation"
            subtitle="Structured learning paths, mentorship, and real-world projects that prepare you for the tech industry."
            className="mb-16"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {offerItems.map(({ icon, title, text }, index) => (
              <AnimatedSection
                key={title}
                delay={index * 0.08}
                className="group premium-card cursor-default hover:-translate-y-1"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/20">
                  <FontAwesomeIcon icon={icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full" />
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button type="button" onClick={() => navigate("/courses")} className="btn-primary">
              Explore learning paths
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="relative overflow-hidden bg-surface py-24">
        <div className="absolute inset-0 bg-mesh-light" />
        <div className="section-container relative">
          <SectionHeading
            label="Features"
            title="What makes us stand out"
            subtitle="A structured, modern learning experience designed to build real-world skills and confidence."
            className="mb-16"
          />

          <div className="space-y-20">
            {features.map(({ img: featureImg, imgAlt, reverse, title, body, points }) => (
              <div key={title} className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className={reverse ? "lg:order-last" : ""}>
                  <div className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card">
                    <img
                      src={featureImg}
                      alt={imgAlt}
                      className="min-h-[320px] w-full object-cover transition duration-500 group-hover:scale-[1.03] lg:min-h-[380px]"
                    />
                  </div>
                </div>

                <div className="premium-card">
                  <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-600">{body}</p>
                  <ul className="mt-6 space-y-3">
                    {points.map((point) => (
                      <li key={point} className="flex gap-3 text-slate-600">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                        <span className="text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => navigate("/courses")}
                    className="btn-secondary mt-8 !px-5 !py-2.5"
                  >
                    Explore this path
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_40%,rgba(255,255,255,0.08))]" />
        <div className="section-container relative">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-primary-100">
                Why learners choose us
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl">
                A modern academy built for ambitious careers.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-50 sm:text-lg">
                We blend expert mentorship, practical projects, and a supportive learning experience so you can grow with confidence and step into the tech industry fully prepared.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => navigate("/courses")} className="btn-accent">
                  Explore learning paths
                </button>
                <button type="button" onClick={() => navigate("/contact")} className="btn-ghost-light">
                  Talk to admissions
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/20 bg-white/10 p-6 shadow-glow backdrop-blur-xl">
              <div className="space-y-4">
                {[
                  {
                    title: "Hands-on projects",
                    text: "Build portfolio-ready work that reflects real industry problems.",
                  },
                  {
                    title: "Expert-led support",
                    text: "Learn with mentors who guide you from first lesson to final project.",
                  },
                  {
                    title: "Career-focused growth",
                    text: "Gain the confidence and skills to move into your next opportunity.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary-50">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Reviews reviews={reviews} />
      <FAQSection />

      {/* CTA */}
      {/* <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_50%,rgba(255,255,255,0.08))]" />
        <div className="section-container relative text-center">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur">
            Start your journey
          </div>
          <SectionHeading
            label="Start today"
            title="Ready to launch your tech career?"
            subtitle="Join Execute Tech Academy and learn with expert mentors, live classes, and real-world projects."
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={() => navigate("/signup")} className="btn-accent">
              Create free account
            </button>
            <button type="button" onClick={() => navigate("/contact")} className="btn-ghost-light">
              Talk to admissions
            </button>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default Homepage;
