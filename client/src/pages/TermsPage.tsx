import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const TermsPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Welcome to our Coding Riddle Challenge using MakeCode Arcade!
            Please review these Terms and Conditions carefully before
            participating. By joining this challenge, you acknowledge that you
            have read, understood, and agreed to abide by these rules.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>1. Event Eligibility:</strong> This event is open to all
            individuals, regardless of whether you are currently enrolled with
            us or not. There are no age restrictions; however, minors are
            advised to participate with parental or guardian supervision.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>2. Participation Requirements:</strong> Participants should
            have access to a compatible device and internet connection to use
            MakeCode Arcade. Familiarity with basic programming concepts is
            recommended, though not strictly required. Additional instructions
            or resources may be provided during the challenge.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>3. Registration Process:</strong> In order to participate,
            you must register through our official website or event portal by
            providing accurate and current information. Any false or misleading
            data may result in immediate disqualification. By registering, you
            grant the organizers permission to contact you with relevant
            updates regarding the event.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>4. Code of Conduct:</strong> All participants are expected
            to conduct themselves in a courteous and professional manner.
            Disruptive behavior, harassment, or any form of discrimination will
            not be tolerated and may lead to expulsion from the challenge. Please
            follow any instructions given by event officials to ensure a smooth
            and enjoyable experience for everyone.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>5. Collaboration vs. Answer Sharing:</strong> We encourage
            healthy discussion and collaboration regarding broad concepts and
            best practices. However, direct sharing of solutions or answers is
            strictly prohibited. If found sharing answers or code that gives
            undue advantage to other participants, you will face immediate
            expulsion from the challenge. Cheating or attempting to manipulate
            the outcome of the event in any way will also result in disqualification.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>6. Integrity and Fair Play:</strong> We value honesty and
            fairness. All submitted solutions must be your own original work.
            Any form of plagiarism or misrepresentation of your own effort
            will lead to disqualification. Our adjudicators reserve the right
            to investigate any suspicious submissions and take necessary
            actions as deemed appropriate.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>7. Privacy Policy:</strong> Any personal information
            collected during registration or throughout the event will be used
            solely for the purpose of administering and organizing the
            challenge. We are committed to safeguarding your data in accordance
            with applicable privacy laws and our own privacy policy. For more
            details, please refer to our official Privacy Policy documentation.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>8. Liability and Assumption of Risk:</strong> By
            participating in this challenge, you acknowledge that the organizers,
            sponsors, and affiliates are not liable for any potential losses,
            damages, or injuries that may occur as a result of your participation.
            You agree to assume any and all risks involved in or arising from
            this event.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>9. Modifications to the Challenge:</strong> The organizers
            reserve the right to modify, suspend, or cancel the challenge at
            any time for any reason. This may include changes to the schedule,
            rules, or requirements. We will make every effort to communicate
            such modifications in a timely and transparent manner.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>10. Acceptance of Terms:</strong> By continuing to
            participate in this challenge, you confirm that you have read and
            agree to these Terms and Conditions. If you do not agree with any
            part of these terms, you should refrain from participating in the
            challenge.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-yellow-400 text-white text-lg font-semibold px-6 py-2 rounded-md shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
          >
            Back to Home
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
