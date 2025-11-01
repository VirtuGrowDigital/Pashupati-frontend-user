import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TaglineStrip from "./components/TaglineStrip";
import ExperienceSection from "./components/ExperienceSection";
import QualitySection from "./components/QualitySection";
import bgImage from "./assets/unsplash_PvwdlXqo85k.png";
import ProductSection from "./components/ProductSection";
import VideoSection from "./components/VideoSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AboutUs from "./components/About";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import DiwaliBanner from "./components/DiwaliBanner";
import FireworksOverlay from "./components/FireworksOverlay";
import SignPage from "./components/SignPage";
import AddToCart from './components/AddTOcart';
import CheckOutPage from "./components/CheckOutPage";
import BulkOrderPage from "./components/BulkOrderPage";

// ✅ Scroll handler for Bulk Order + Contact
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToBulk) {
      const section = document.getElementById("bulk-order");
      if (section) {
        const yOffset = -120;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        setTimeout(() => {
          window.scrollTo({ top: y, behavior: "smooth" });
          window.history.replaceState({}, document.title);
        }, 300);
      }
    }

    if (location.state?.scrollToContact) {
      const section = document.getElementById("contact");
      if (section) {
        const yOffset = -80;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        setTimeout(() => {
          window.scrollTo({ top: y, behavior: "smooth" });
          window.history.replaceState({}, document.title);
        }, 300);
      }
    }
  }, [location]);

  return null;
};

const Layout = ({ children }) => {
  const location = useLocation();

  const isSignPage = location.pathname === "/Signin";

  return (
    <>
      {!isSignPage && <Navbar />}
      <ScrollHandler />
      {children}
      {!isSignPage && <Footer />}
      {!isSignPage && <WhatsAppButton />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-[#5E7141]">
                {/* Hero Section with BG */}
                <div
                  className="relative w-full h-[960px] bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: `url(${bgImage})` }}
                >
                  <div className="container mx-auto px-6 pt-6">
                    <Hero />
                  </div>

                  {/* Floating tagline */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                    <TaglineStrip />
                  </div>
                </div>

                {/* Rest of Homepage */}
                <div className="bg-[#5E7141] w-full min-h-screen pt-32">
                  <ExperienceSection />
                  <QualitySection />
                  <ProductSection />
                  <VideoSection />
                  <WhyChooseUs />
                  <Testimonials />
                </div>
              </div>
            }
          />

          {/* About Page */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/Signin" element={<SignPage />} />
          <Route path="/add" element={<AddToCart />} />
          <Route path="/bulk" element={<BulkOrderPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
