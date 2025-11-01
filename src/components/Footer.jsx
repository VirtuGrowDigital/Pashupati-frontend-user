import React from "react";
import waveTop from "../assets/bg elements.png"; // wave above footer
import logo from "../assets/logo.png"; // replace with your actual logo file

// 👇 Importing icons from react-icons
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact" className="relative w-full mt-20">
      {/* Wave Top */}
      <img src={waveTop} alt="wave design" className="w-full -mb-1" />

      {/* Main Footer with gradient */}
      <div className="w-full bg-gradient-to-b from-yellow-400 to-yellow-700 text-white">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div>
            <img src={logo} alt="Logo" className="w-20 mb-4" />
            <p className="text-sm md:text-base">
              परम्परा की ताकत, हर बूंद में सेहत
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/p/Pashupati-Food-Agro-61580472700293/">
                <FaFacebookF size={22} className="hover:text-blue-600" />
              </a>
              <a href="https://www.youtube.com/@PASHUPATIFOOD">
                <FaYoutube size={22} className="hover:text-red-500" />
              </a>
              <a href="https://www.instagram.com/pashupati_food_agro/">
                <FaInstagram size={22} className="hover:text-pink-500" />
              </a>
            </div>
          </div>

          {/* Middle Section */}
          <div className="space-y-4 text-sm md:text-base">
            <div className="flex items-center gap-3 font-light">
              <FaEnvelope /> <span>pashupatifood25@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 font-light">
           <a href="" className="flex items-center gap-3 font-light">
           <FaMapMarkerAlt />
              <span>
                SECTOR-1, CMS ROAD, GOMTI NAGAR VISTAR, <br />
                LUCKNOW, UTTAR PRADESH, 226010
              </span>
           </a>
            </div>
            <div className="flex items-center gap-3 font-light">
              <FaWhatsapp className="text-green-500" />
              <span>+91-9208468980</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-start font-light md:items-end space-y-3">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="/about" className="hover:underline">
              About Us
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/40 mt-6 pt-4 font-extralight text-center text-sm">
          Copyright © 2025 Pashupati Food
        </div>
      </div>
    </footer>
  );
};

export default Footer;
