import React from 'react';
import {
  Card,
} from "@/components/ui/Card"
import logo from "../assets/android-chrome-192x192.png"; // ShadCN component for UI enhancement
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import image from '../assets/picked-Broadband_16_What-is-Broadband_.jpg'; // Correct the image import

export default function About() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center mt-20 "
      style={{
        backgroundImage: `url(${image})`, // Fix background image
      }}
    >
      <div className="bg-white bg-opacity-80 w-full max-w-4xl rounded-lg shadow-lg p-8 md:p-12">
        <header className="flex justify-center mb-8">
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
              <span className="text-3xl font-bold text-black drop-shadow-lg">OBRM</span>
            </Link>
          </motion.div>
        </header>
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 md:text-3xl">Welcome to OBRM</h2>
          <p className="text-lg text-gray-600 md:text-xl">
            Oracle Billing and Revenue Management (OBRM) is a comprehensive platform designed to automate the billing, invoicing, and revenue recognition processes for businesses. OBRM enables companies to manage complex billing models and revenue flows efficiently across various industries, ensuring that operations run smoothly and compliance is maintained.
          </p>
          <p className="text-lg text-gray-600 md:text-xl">
            OBRM is built to handle the demands of large enterprises with high-volume billing, complex invoicing requirements, and the need for financial transparency and auditability. It is a flexible and scalable solution for both traditional and cloud-based businesses.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/contact" >
            <button className='button' >Contact Us</button>
            </Link>
          </div>
        </section>
        <section className="mt-8">
          <Card className="p-6 bg-indigo-50 rounded-lg shadow-md">
            <p className="text-xl text-gray-900 md:text-2xl">
              OBRM supports businesses in reducing operational costs, improving revenue recognition, and providing real-time visibility into financial performance. With OBRM, businesses can automate their billing lifecycle, improve accuracy, and ensure timely and compliant invoicing.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
