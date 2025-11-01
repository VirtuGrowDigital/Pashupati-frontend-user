
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaRegUser } from "react-icons/fa6";
import { SlBag } from "react-icons/sl";
import AddToCart from "./AddTOcart";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isCartOpen, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, cartItems, } = useCart();
  const closeCart = () => setIsCartOpen(false);
  // console.log(cartItems.length);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll Handlers
  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const scrollToSection = (id, offset = -120) => {
    const section = document.getElementById(id);
    if (section) {
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleBulkOrderClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToBulk: true } });
    } else {
      scrollToSection("bulk-order");
    }
  };

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToContact: true } });
    } else {
      scrollToSection("contact", -80);
    }
  };

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 w-full max-w-6xl z-50 transition-all duration-500 px-4 sm:px-6 lg:px-8 
      ${scrolled ? "top-6" : "top-16"}`}
    >
      <nav
        className={`rounded-full shadow-lg flex items-center justify-between px-6 sm:px-10 py-3 bg-gradient-to-b from-yellow-400 to-yellow-700 transition-all duration-500 ${scrolled ? "opacity-80 backdrop-blur-sm" : "opacity-100"
          }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer">
          <img src={logo} alt="Logo" className="h-10 sm:h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div
          className="hidden md:flex text-sm flex-1 justify-center space-x-8 text-white font-bold tracking-wide"
          style={{ fontFamily: "AdelleSansDevanagari, sans-serif" }}
        >
          <button
            onClick={handleHomeClick}
            className="hover:text-gray-200 focus:outline-none cursor-pointer"
          >
            HOME
          </button>
          <button
            onClick={handleBulkOrderClick}
            className="hover:text-gray-200 focus:outline-none cursor-pointer"
          >
            BULK ORDER
          </button>
          <Link to="/about" className="hover:text-gray-200 cursor-pointer">
            ABOUT US
          </Link>
          <button
            onClick={handleContactClick}
            className="hover:text-gray-200 focus:outline-none cursor-pointer"
          >
            CONTACT US
          </button>
        </div>

        {/* Right Section */}
        <div className="gap-5 items-center hidden md:flex">
          {/* ✅ Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative me-1 text-white hover:text-gray-200 cursor-pointer"
          >
            {cartItems.length > 0 && (
              <sup className="absolute -top-2 -right-2 bg-red-600 text-white text-[12px] font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cartItems.length}
              </sup>
            )}
            <SlBag size={25} />
          </button>

          {/* Profile Icon */}
          <Link
            to="/Signin"
            className="hover:text-gray-200 text-white focus:outline-none cursor-pointer text-xl font-bold"
          >
            <FaRegUser size={25} />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white cursor-pointer"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-b from-yellow-400 to-yellow-700 bg-opacity-95 rounded-b-2xl shadow-md py-6 flex flex-col items-center space-y-6 z-40 transition-all duration-300">
          <button
            onClick={handleHomeClick}
            className="text-lg text-white font-semibold cursor-pointer"
          >
            HOME
          </button>
          <button
            onClick={handleBulkOrderClick}
            className="text-lg text-white font-semibold cursor-pointer"
          >
            BULK ORDER
          </button>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="text-lg text-white font-semibold cursor-pointer"
          >
            ABOUT US
          </Link>
          <button
            onClick={handleContactClick}
            className="text-lg text-white font-semibold cursor-pointer"
          >
            CONTACT US
          </button>

          {/* ✅ Mobile Cart Button */}
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsOpen(false);
            }}
            className="hover:text-gray-400 text-white font-semibold focus:outline-none cursor-pointer"
          >
            CART <sup className="text-black text-[15px] ms-1">{totalItems}</sup>
          </button>

          <Link
            to="/Signin"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-400 text-white focus:outline-none cursor-pointer font-semibold"
          >
            PROFILE
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
