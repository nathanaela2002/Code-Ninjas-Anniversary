import { useInView } from "./useInView";

export default function Footer() {
  // Use your custom InView hook for reveal-on-scroll effects
  const [footerRef, footerInView] = useInView();

  return (
    <footer
    ref={footerRef}
    className={`mt-10 pb-6 bg-blue-200 text-white text-sm
        ${footerInView ? "reveal-show" : "reveal-hidden"}
    `}
    >
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-5 gap-4 text-gray-700">
            {/* Column 1 - Center */}
            <div>
            <h2 className="font-semibold mb-2">Center</h2>
            <ul className="space-y-1">
                <li>
                <a href="https://www.codeninjas.com/aurora-on-ca" className="hover:underline">
                    Code Ninjas Aurora
                </a>
                </li>
            </ul>
            </div>

            {/* Column 2 - Company */}
            <div>
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

            {/* Column 3 - Legal */}
            <div>
            <h2 className="font-semibold mb-2">Legal</h2>
                <ul className="space-y-1">
                    <li>
                    <a href="#" className="hover:underline">
                        Terms & Conditions
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:underline">
                        Privacy Policy
                    </a>
                    </li>
                </ul>
            </div>

            {/* Column 4 - Social Links */}
            <div>
            <h2 className="font-semibold mb-2">Follow Us</h2>
                <div className="flex space-x-4">
                    <a href="#" className="hover:opacity-75">
                    Facebook
                    </a>
                    <a href="#" className="hover:opacity-75">
                    Instagram
                    </a>
                    <a href="#" className="hover:opacity-75">
                    X
                    </a>
                    <a href="#" className="hover:opacity-75">
                    LinkedIn
                    </a>
                </div>
            </div>
        </div>
    </footer>
  );
}
