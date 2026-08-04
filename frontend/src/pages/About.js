import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/ui/PageHero";
import AnimatedSection from "../components/ui/AnimatedSection";
import SectionHeading from "../components/ui/SectionHeading";
import BgImage from "../assets/About.png";
import MissionImage from "../assets/MissionImage.png";
import VisionImage from "../assets/VisionImage.png";
import SamsonImg from "../assets/Founders/samson.png";
import LekanImg from "../assets/Founders/lekan.png";
import AdebukolaImg from "../assets/Founders/adebukola.png";

const values = [
  { title: "Innovation", desc: "We push boundaries and encourage creative thinking in every learner." },
  { title: "Curiosity", desc: "We believe learning starts with questions and exploration." },
  { title: "Integrity", desc: "We build trust through honesty and accountability." },
  { title: "Collaboration", desc: "Growth happens faster when we learn together." },
  { title: "Empowerment", desc: "We equip learners to take control of their future." },
  { title: "Excellence", desc: "We aim for the highest standards in everything we do." },
];

const management = [
  {
    name: "Samson Otifesan",
    img: SamsonImg,
    role: "Chief Executive Officer (CEO) & Co-Founder",
    description:
      "Samson Otifesan is the Chief Executive Officer and Co-Founder, responsible for setting the strategic direction and overall vision of the organization. As the driving force behind the company's growth, he leads the executive team in delivering innovative solutions, expanding business opportunities, and fostering strategic partnerships. His leadership philosophy is centered on excellence, integrity, and innovation. Through his commitment to empowering people and building impactful solutions, he continues to position the organization as a trusted leader within its industry.",
  },
  {
    name: "Lekan Oladipupo",
    img: LekanImg,
    role: "Chief Operating Officer (COO) & Co-Founder",
    description:
      "Lekan Oladipupo serves as the Chief Operating Officer and Co-Founder, providing strategic leadership across the organization's operations, growth initiatives, and business development. With a strong commitment to operational excellence, he oversees the implementation of systems and processes that drive efficiency, innovation, and sustainable growth. As a co-founder, Lekan has played a pivotal role in shaping the company's vision, building a culture of excellence, and ensuring the organization consistently delivers value to its clients and stakeholders.",
  },
  {
    name: "Adebukola Ogunbewon",
    img: AdebukolaImg,
    role: "Head of Operations",
    description:
      "Adebukola Ogunbewon leads the organization's day-to-day operational activities, ensuring seamless coordination across teams and maintaining high standards of service delivery. With a detail-oriented and results-driven approach, Adebukola oversees operational planning, process improvement, and the execution of key organizational initiatives. Committed to efficiency and continuous improvement, she plays a vital role in supporting the company's mission by ensuring operational excellence, enhancing customer satisfaction, and driving organizational performance.",
  },
];

const AboutUs = () => {
  return (
    <div className="page-shell">
      <Navbar />

      <PageHero
        label="About Execute Tech Academy"
        title="Transforming minds, shaping the next generation of tech leaders"
        subtitle="We are redefining tech education through hands-on learning, real-world projects and mentorship that turns beginners into confident builders."
        backgroundImage={BgImage}
        compact
      />

      <AnimatedSection className="py-12 sm:py-16">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              At Execute Tech Academy, we have moved beyond traditional learning. Instead of passive lessons,
              we build an environment where curiosity, creativity and execution come together.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="absolute -top-40 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary-500/8 blur-[120px]" />
        <div className="section-container relative">
          <SectionHeading
            label="Our Values"
            title="Principles that guide everything we do"
            className="mb-14"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val) => (
              <div key={val.title} className="group premium-card">
                <h3 className="font-display text-lg font-semibold text-slate-900">{val.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{val.desc}</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16 sm:py-20 lg:py-24">
        <div className="section-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-card">
              <img src={MissionImage} alt="Our Mission" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="section-label">Mission</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">
                Igniting passion, shaping future tech leaders
              </h2>
              <p className="mt-6 leading-relaxed text-slate-600">
                Our mission is to empower learners through immersive, practical tech education.
                We combine real-world projects, mentorship and modern tools to build confidence and capability.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                We do not just teach skills. We build thinkers, creators and problem solvers ready for the future.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-surface py-16 sm:py-20 lg:py-24">
        <div className="section-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <p className="section-label">Vision</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">
                Transforming passion into global impact
              </h2>
              <p className="mt-6 leading-relaxed text-slate-600">
                We envision a world where anyone, regardless of background, can become a world-class tech professional.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Our graduates do not just get jobs. They build careers, companies and innovations that shape the future.
              </p>
            </div>
            <div className="order-1 overflow-hidden rounded-[28px] border border-slate-200 shadow-card lg:order-2">
              <img src={VisionImage} alt="Our Vision" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="absolute -top-28 right-1/4 h-[260px] w-[260px] rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="section-container relative">
          <div className="mb-10">
            <SectionHeading
              label="Meet the Management"
              title="Leadership that empowers learners and drives operational excellence"
              className="mb-0"
            />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              At Execute Tech Academy, our leadership team is united by a shared vision to bridge the digital
              skills gap by providing world-class technology education that empowers individuals and transforms careers.
              With expertise in technology, business, and operations, our management team is committed to creating an
              innovative learning environment where students gain practical, industry-relevant skills that prepare them
              for success in the global digital economy.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {management.map((member) => (
              <div
                key={member.name}
                className="relative overflow-hidden rounded-[32px] border border-primary-200 p-8 shadow-card transition duration-200 hover:-translate-y-1"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.90), rgba(255,255,255,0.76)), url(${member.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/14 via-transparent to-accent-500/12" />
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-24 w-24 rounded-full border border-white/70 bg-white/80 bg-center bg-cover shadow-md backdrop-blur-sm"
                      style={{ backgroundImage: `url(${member.img})` }}
                      role="img"
                      aria-label={member.name}
                    />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-600">
                        {member.role}
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 leading-relaxed text-slate-600">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default AboutUs;
