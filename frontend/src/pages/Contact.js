import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedSection from "../components/ui/AnimatedSection";
import PageHero from "../components/ui/PageHero";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCommentDots } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng });
L.Marker.prototype.options.icon = DefaultIcon;

const contactItems = [
  {
    icon: <FaPhoneAlt aria-hidden="true" />,
    label: "Phone",
    value: "+234 815 517 7987",
    href: "tel:+2348155177987",
  },
  {
    icon: <FaEnvelope aria-hidden="true" />,
    label: "Email",
    value: "info@executetechacademy.com",
    href: "mailto:info@executetechacademy.com",
  },
  {
    icon: <FaMapMarkerAlt aria-hidden="true" />,
    label: "Location",
    value: "Lagos, Nigeria",
    href: null,
  },
];

const Contact = () => {
  const position = [6.5244, 3.3792];


  return (
    <div className="page-shell">
      <Navbar />

      <PageHero
        label="Contact"
        title="Get in touch with us"
        subtitle="Need help getting started or have a question about our programs? We’re here to guide you every step of the way."
        compact
      />

      {/* Contact cards + form */}
      <AnimatedSection className="py-14 sm:py-16 lg:py-20">
        <div className="section-container">
          <div className="grid items-stretch gap-6 lg:grid-cols-3">

            {/* Left — info card */}
            <div className="flex flex-col justify-between rounded-3xl bg-blue-600 p-8 text-white shadow-xl">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                  Let’s talk
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-snug">
                  We&apos;re here to help
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-blue-100">
                  Whether you need guidance on a course, pricing, or your next step, our team is ready to support you.
                </p>

                <div className="mt-10 space-y-7">
                  {contactItems.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-0.5 block text-sm font-medium text-white transition-opacity hover:opacity-75"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm font-medium text-white">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2348155177987"
                target="_blank"
                rel="noreferrer"
                className="mt-10 flex items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-semibold text-blue-600 shadow-sm transition-opacity hover:opacity-90"
              >
                <FaCommentDots className="text-lg" />
                
              </a>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                      Send a message
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
                      How can we help?
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Share a few details and we&apos;ll get back to you shortly.
                    </p>

                    <form
                      className="mt-8 space-y-5"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
                          Full Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Enter your full name"
                          className="input-field mt-2"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="Enter your email"
                          className="input-field mt-2"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={5}
                          placeholder="Write your message..."
                          className="input-field mt-2 resize-none"
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full">
                        Send Message
                      </button>
                    </form>
                </>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Map section */}
      <AnimatedSection className="pb-16 sm:pb-20 lg:pb-24">
        <div className="section-container">
          <div className="mb-10 text-center">
            <p className="section-label">Location</p>
            <h3 className="mt-3 font-display text-3xl font-bold text-slate-900">
              Visit our academy
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              Based in Lagos, Nigeria — where great careers are built.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-slate-100 shadow-lg">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-[320px] w-full sm:h-[380px] lg:h-[420px]"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={position}>
                <Popup>Execute Tech Academy — Lagos, Nigeria</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Contact;