import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedSection from "../components/ui/AnimatedSection";

const Privacy = () => {
  return (
    <div className="page-shell">
      <Navbar />
      <section className="py-16">
        <div className="section-container">
          <AnimatedSection className="premium-card mx-auto max-w-4xl prose-edutech space-y-8">
            <p className="section-label text-center">Legal</p>
            <h1 className="!mt-4 text-center font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="text-center text-sm text-slate-500">
              <strong>Execute Tech Academy</strong>
            </p>

          <h2 className="!text-xl">Our Commitment to Your Privacy</h2>
          <p className="mb-4">
            At Execute Tech Academy, we understand that trust is fundamental to effective learning.
            This Privacy Policy explains how we handle your personal information when you use our
            online learning platform and services.
          </p>

          <h2 className="!text-xl">What Information We Collect</h2>

          <h3>Information You Provide Directly</h3>
          <ul>
            <li>Account Information: name, email, phone number, password</li>
            <li>Course Enrollment: enrolled courses, progress, certificates</li>
            <li>Payment Details: billing info via third-party processors</li>
            <li>Communication Records: feedback, support messages</li>
            <li>Profile Content: extra profile details you add</li>
          </ul>

          <h3>Information We Collect Automatically</h3>
          <ul>
            <li>Usage Patterns: course navigation, time spent, feature use</li>
            <li>Technical Info: IP address, browser, device, OS</li>
            <li>Course Performance: quizzes, assignments, learning analytics</li>
          </ul>

          <h3>Information from Third Parties</h3>
          <ul>
            <li>Social Media: if you connect your account</li>
            <li>Payment Processors: transaction confirmations</li>
            <li>Marketing Partners: referrals through affiliates</li>
          </ul>

          <h2 className="!text-xl">How We Use Your Information</h2>
          <ul>
            <li>Deliver courses, track progress, issue certificates</li>
            <li>Manage your account and process payments</li>
            <li>Improve platform features and course quality</li>
            <li>Send updates, recommendations, and educational content (with your consent)</li>
          </ul>

          <h2 className="!text-xl">Information Sharing and Disclosure</h2>
          <p>We may share information with:</p>
          <ul>
            <li>Service Providers: hosting, payments, support</li>
            <li>Legal Authorities: if legally required</li>
            <li>Business Transfers: if the company is sold or merged</li>
          </ul>

          <h2 className="!text-xl">Data Security and Protection</h2>
          <ul>
            <li>Encryption of sensitive data</li>
            <li>Strict access controls</li>
            <li>Continuous monitoring</li>
            <li>Secure and updated infrastructure</li>
          </ul>

          <h2 className="!text-xl">Your Privacy Rights and Choices</h2>
          <ul>
            <li>Update or delete your account</li>
            <li>Download your course records</li>
            <li>Control communication preferences</li>
            <li>Request data transfer or deletion</li>
          </ul>

          <h2 className="!text-xl">International Students</h2>
          <p className="mb-4">
            If you&apos;re outside Nigeria, your data may be processed in Nigeria. We comply with international data transfer regulations.
          </p>

          <h2 className="!text-xl">Policy Updates</h2>
          <p className="mb-4">
            We may update this policy periodically. We&apos;ll post updates on our website and notify active users of significant changes.
          </p>

          <h2 className="!text-xl">Contact Information</h2>
          <p>
            <strong>Execute Tech Academy</strong><br />
            Lagos, Nigeria<br />
            Email: info@executetechacademy.com<br />
            Phone: +234 815 517 7987<br />
            WhatsApp: +234 815 517 7987
          </p>

          <h2 className="!text-xl">For Parents and Guardians</h2>
          <p className="mb-4">
            If you&apos;re under 18, please have a parent or guardian review this policy. Parents can contact us to access or delete their child&apos;s data.
          </p>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Privacy;
