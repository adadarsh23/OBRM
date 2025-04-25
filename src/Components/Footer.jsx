import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/android-chrome-192x192.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo and Tagline */}
        <div>
          <motion.div
            whileHover={{ rotateY: 20, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-3 mb-4"
          >
            <Link
              to="/"
              className="flex items-center gap-3 text-white font-bold no-underline"
              style={{ textDecoration: "none" }}
            >
              <img
                src={logo}
                alt="OBRM Logo"
                className="h-12 w-12 rounded-full shadow-lg object-cover"
              />
              <span className="text-3xl font-bold text-white drop-shadow-lg">OBRM</span>
            </Link>
          </motion.div>
          <p className="text-sm text-gray-400">
            Connecting communities with high-speed, reliable internet.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-white" style={{ textDecoration: "none" }}>Home</Link></li>
            <li><Link to="/about" className="hover:text-white " style={{ textDecoration: "none" }}>About</Link></li>
            <li><Link to="/contact" className="hover:text-white" style={{ textDecoration: "none" }}>Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={16} /> support@obrm.in</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> 123 Fiber Street, Mumbai</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500"><Facebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400"><Twitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500"><Instagram /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} OBRM Broadband. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
