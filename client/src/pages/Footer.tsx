import { useInView } from "./useInView";

export default function Footer() {
  const [footerRef, footerInView] = useInView();

  return (
    <footer
      ref={footerRef}
      className={`mt-10 pb-6 bg-blue-200 text-white text-sm ${
        footerInView ? "reveal-show" : "reveal-hidden"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 items-start">
        {/* Column 1 - Center */}
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-start">
            <h2 className="font-semibold mb-2">Center</h2>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Code Ninjas Aurora
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2 - Company */}
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-start">
            <h2 className="font-semibold mb-2">Company</h2>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contacts
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3 - Legal */}
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-start">
            <h2 className="font-semibold mb-2">Legal</h2>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 4 - Follow Us */}
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-start">
            <h2 className="font-semibold mb-2">Follow Us</h2>
            <div className="space-y-1">
              <a href="#" className="hover:opacity-75 mr-1">
                FB
              </a>
              <a href="#" className="hover:opacity-75 mr-1">
                IG
              </a>
              <a href="#" className="hover:opacity-75 mr-1">
                X
              </a>
              <a href="#" className="hover:opacity-75">
                LI
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}