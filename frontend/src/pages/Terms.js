import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedSection from "../components/ui/AnimatedSection";

const Terms = () => {
  return (
    <div className="page-shell">
      <Navbar />
      <section className="py-16">
        <div className="section-container">
          <AnimatedSection className="premium-card mx-auto max-w-4xl prose-edutech space-y-8">
            <p className="section-label text-center">Legal</p>
            <h1 className="!mt-4 text-center font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Terms and Conditions
            </h1>

            <p>
              These terms and conditions outline the rules and regulations for the use of Execute Tech Academy&apos;s website.
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use the website
              if you do not agree to all of the terms and conditions stated on this page.
            </p>

            <h2 className="!text-xl">1. Use of the Platform</h2>
            <ul>
              <li>You must be at least 16 years old to use this website or access any of our tech courses.</li>
              <li>
                By using our platform, you warrant that:
                <ul>
                  <li>You are legally capable of entering a binding agreement.</li>
                  <li>All information you provide is accurate and up to date.</li>
                  <li>You will use the platform only for lawful purposes.</li>
                </ul>
              </li>
            </ul>

            <h2 className="!text-xl">2. Account Registration</h2>
            <ul>
              <li>To access our courses and community, you may be required to create an account.</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You agree not to share your account details or allow others to access your account.</li>
              <li>We reserve the right to suspend or terminate your account if any suspicious or unauthorised activity is detected.</li>
            </ul>

            <h2 className="!text-xl">3. Course Access and Usage</h2>
            <ul>
              <li>Upon payment, you will be granted access to the course materials for the specified duration.</li>
              <li>All materials, including videos, slides, and assignments, are for personal, non-commercial use only.</li>
              <li>Redistribution, resale, or public sharing of course content is strictly prohibited.</li>
            </ul>

            <h2 className="!text-xl">4. Payments and Refunds</h2>
            <ul>
              <li>All course fees are stated in Naira (₦) and must be paid in full before access is granted.</li>
              <li>We may offer discounts or promo codes at our discretion.</li>
              <li>Due to the digital nature of our products, all sales are final, and refunds will not be issued once access has been granted.</li>
            </ul>

            <h2 className="!text-xl">5. Third-Party Services</h2>
            <p>
              Our platform may contain links or integrations with third-party tools or platforms (e.g., Zoom, Google Classroom).
              We are not responsible for the policies, practices, or content of these external services.
            </p>

            <h2 className="!text-xl">6. Privacy Policy</h2>
            <p>
              Your use of our platform is also governed by our{" "}
              <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-700">
                Privacy Policy
              </Link>
              , which outlines how we collect, use, and protect your personal information.
            </p>

            <h2 className="!text-xl">7. Modifications</h2>
            <p>
              We reserve the right to update or modify these Terms at any time. Changes will be effective once posted on this page.
              Continued use of the platform after changes indicates your acceptance.
            </p>

            <h2 className="!text-xl">8. Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms, kindly reach out to us via email at:{" "}
              <a href="mailto:info@executetechacademy.com" className="font-medium text-primary-600 hover:text-primary-700">
                info@executetechacademy.com
              </a>
            </p>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Terms;
