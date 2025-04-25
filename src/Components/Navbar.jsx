import React, { useState } from "react";
import logo from "../assets/android-chrome-192x192.png";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // <-- Correct import

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

const options = ["None","Account No.", "Phone No.", "Mac Id"];

export default function Navbar({ searchType, setSearchType, searchValue, setSearchValue }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full p-3 bg-gray-900 shadow-2xl z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ rotateY: 20, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-3 text-white font-bold no-underline"
        >
          <Link to="/" className="flex items-center gap-3 text-white font-bold" style={{ textDecoration: "none" }}>
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full shadow-lg object-cover"
            />
            <span className="text-3xl font-bold text-white drop-shadow-lg">OBRM</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.2, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link
                to={item.link}
                className="text-lg text-white font-semibold hover:text-gray-400 transition-all no-underline"
                style={{ textDecoration: "none" }}>
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* Dropdown + Search Combined */}
          <div className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-inner">
            <select className="px-2 py-1 rounded-lg bg-white text-black focus:outline-none"value={searchType}
    onChange={e => setSearchType(e.target.value)} >
              {options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-3 pr-10 py-1 rounded-lg bg-white text-black focus:ring-2 focus:ring-gray-400"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}  />
              <button className="absolute right-2 top-1">
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {menuOpen ? <X className="h-8 w-8 text-white" /> : <Menu className="h-8 w-8 text-white" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden md:hidden mt-4 flex flex-col items-center gap-6 bg-white rounded-xl shadow-lg p-6"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to={item.link}
                  onClick={toggleMenu}
                  className="text-lg font-semibold text-black hover:text-gray-600 no-underline" style={{ textDecoration: "none" }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <div className="flex items-center gap-2 w-full bg-white p-2 rounded-lg shadow-inner">
              <select className="flex-1 px-2 py-1 rounded-lg bg-white text-black focus:outline-none">
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-3 pr-10 py-1 w-full rounded-lg bg-white text-black focus:ring-2 focus:ring-gray-400"
                />
                <button className="absolute right-2 top-1">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path d="M10 2a8 8 0 015.292 13.708l5 5-1.414 1.414-5-5A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
    </svg>
  );
}