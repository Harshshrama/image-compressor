import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Left Section */}

        <div className="mb-6 md:mb-0 text-center md:text-left">
          <div className="flex items-center gap-2 z-50 relative mb-5">
            <Link href="/">
              <Image
                src="/quotients-footer-logo.svg"
                alt="Logo"
                width={300}
                height={200}
                className="object-contain rounded cursor-pointer"
              />
            </Link>
          </div>

          <p className="text-gray-400 text-sm">
            All your image tools in one place. Compress, resize, convert, and more.
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            © {new Date().getFullYear()} ImageTools. All rights reserved.
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
          <div>
            <h3 className="font-semibold mb-2 text-white">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-white">Support</h3>
            <ul>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Right Section - Social Icons */}
        <div className="mt-6 md:mt-0 flex gap-4">
          <a href="#" className="hover:text-white transition-colors">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
