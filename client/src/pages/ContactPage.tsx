import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import EditProfileModal from "./EditProfileModal";

const ContactPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      <Header />

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mt-8">Contacts</h1>

      {/* Main container with rounded corners */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto mt-8 mb-16 rounded-lg overflow-hidden shadow-lg">
        {/* Left side: Contact info */}
        <div className="md:w-1/2 bg-cyan-100 text-gray-700 p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Contact Information
          </h2>
          <p className="text-gray-500 mb-8">
            Have a question? Reach out to us using the contact information below.
          </p>

          {/* Contact details */}
          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <span role="img" aria-label="phone">☎</span>
              <span className="text-lg">+1 (647) 619-4115</span>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <span role="img" aria-label="email">✉</span>
              <span className="text-lg">auroraonca@codeninjas.com</span>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-3">
              <span role="img" aria-label="location">📍</span>
              <span className="text-lg leading-snug">
                115 First Commerce Dr #4<br />
                Aurora, ON L4G0G2<br />
                Canada
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-10"> {/* Changed to flex row with gap */}
              <a href="https://www.facebook.com/codeninjasauroraon/" className="hover:opacity-75">
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 320 512">
                    <path
                      d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </span>
              </a>
              <a href="https://www.instagram.com/codeninjasaurora/" className="hover:opacity-75">
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512">
                    <path
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </span>
              </a>
              <a href="https://www.tiktok.com/@codeninjasaurora" className="hover:opacity-75">
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512">
                    <path
                      d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                  </svg>
                </span>
              </a>

            </div>
        </div>

        {/* Right side: Map */}
        <div className="md:w-1/2 h-96 md:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.3114611518504!2d-79.41733392362448!3d44.01495787108714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ad3a0f2bcf347%3A0x7db6c3c593ea32c3!2sCode%20Ninjas%20Aurora!5e0!3m2!1sen!2sca!4v1740516456159!5m2!1sen!2sca"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Code Ninjas Aurora"
          />
        </div>
      </div>

      <Footer />
      <EditProfileModal />
    </div>
  );
};

export default ContactPage;
