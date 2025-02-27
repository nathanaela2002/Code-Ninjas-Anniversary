import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useInView } from "./useInView";

const PrivacyPage: React.FC = () => {
  // Using IntersectionObserver hooks for reveal animations
  const [introRef, introInView] = useInView();
  const [infoRef, infoInView] = useInView();
  const [dataRef, dataInView] = useInView();
  const [contactRef, contactInView] = useInView();

  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      {/* HEADER (NAV) */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* INTRO SECTION */}
        <section
          ref={introRef}
          className={`mb-12 ${introInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>Effective Date:</strong> February 18, 2025
          </p>
          <p className="text-gray-700 leading-relaxed">
            Thank you for participating in our 2nd Year Anniversary Challenge, which
            includes web-based registration, event websites, and email. We respect your privacy and are committed to
            safeguarding your personal data. This Privacy Policy explains how we
            collect, use, share, and protect your information.
          </p>
        </section>

        {/* INFORMATION COLLECTION SECTION */}
        <section
          ref={infoRef}
          className={`mb-12 ${infoInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>Information You Provide Directly:</strong> We may collect
            personal information (such as your name, email address, phone
            number, or other details) when you register for the Event, request
            information, or otherwise communicate with us. We may also collect
            information about your child or children if they are participants
            and you provide it to us as part of the Event registration or
            participation process.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>Automatic Data Collection:</strong> When you access our
            Services, we automatically collect certain data about your visit,
            such as your IP address, browser type, device identifiers, pages you
            view, and times you access our Services. We use cookies and other
            tracking technologies to improve your user experience and analyze
            how our Services are used.
          </p>
        </section>

        {/* HOW WE USE INFORMATION SECTION */}
        <section
          ref={dataRef}
          className={`mb-12 ${dataInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We use the information we collect for purposes such as:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 leading-relaxed">
            <li>Facilitating your registration and participation in the Event.</li>
            <li>
              Communicating with you about Event updates, schedule changes, or
              technical issues.
            </li>
            <li>Providing customer support and responding to inquiries.</li>
            <li>
              Analyzing usage trends to improve our Services and create a better
              user experience.
            </li>
            <li>Sending marketing and promotional materials, where permitted by law.</li>
            <li>Complying with legal obligations and enforcing our Terms.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We only process your data for the purposes outlined in this Privacy
            Policy, and we will not use your information for any other purpose
            without first seeking your consent.
          </p>
        </section>

        {/* CONTACT / FINAL SECTION */}
        <section
          ref={contactRef}
          className={`mb-12 ${contactInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <h2 className="text-2xl font-semibold mb-3">3. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions, concerns, or requests about this Privacy
            Policy or our data practices, please email us at{" "}
            <strong>privacy@exampleevent.com</strong>. By continuing to
            participate in our Event or use our Services, you acknowledge that
            you have read, understood, and agreed to this Privacy Policy. We
            appreciate your trust and are committed to maintaining the integrity
            and confidentiality of your data.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PrivacyPage;
