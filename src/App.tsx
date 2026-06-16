import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Sub-screen imports
import Home from "./components/Home";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Awards from "./components/Awards";
import Service from "./components/Service";
import DailyLabel from "./components/DailyLabel";
import ContactModal from "./components/ContactModal";

type TabName = "Home" | "Education" | "Experience" | "Awards" | "Service" | "Macro Calculator";

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabName>("Home");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tab switching handler with automatic scrollToTop for optimal reading experience
  const handleTabChange = (tab: TabName) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render proper view depending on state
  const renderTabContent = () => {
    switch (currentTab) {
      case "Home":
        return <Home onNavigate={(tab) => handleTabChange(tab as TabName)} onOpenContact={() => setIsContactOpen(true)} />;
      case "Education":
        return <Education />;
      case "Experience":
        return <Experience />;
      case "Awards":
        return <Awards />;
      case "Service":
        return <Service />;
      case "Macro Calculator":
        return <DailyLabel />;
      default:
        return <Education />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-sky-tint selection:text-primary">
      {/* Top Navbar Header with Glassmorphism */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-outline-variant/20">
        <nav className="flex justify-between items-center h-16 px-6 max-w-[1140px] mx-auto w-full">
          {/* Logo Brand Title */}
          <div 
            onClick={() => handleTabChange("Home")}
            className="font-sans text-xl sm:text-2xl font-extrabold text-[#002b5a] hover:text-secondary transition-colors cursor-pointer"
          >
            Braden Rummler
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 pr-1">
            {(["Home", "Education", "Experience", "Awards", "Service", "Macro Calculator"] as TabName[]).map((tab) => {
              const isActive = currentTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`font-sans text-sm font-bold tracking-wider py-1.5 transition-all cursor-pointer ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-ink-medium hover:text-primary"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Contacts / Action CTA Trigger */}
          <div className="hidden md:flex">
            <button
              onClick={() => setIsContactOpen(true)}
              className="bg-primary text-on-primary hover:bg-primary-container font-sans font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded transition-all cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Mobile Screen Menu Burger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary p-1.5 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl font-semibold">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </nav>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-outline-variant/30 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {(["Home", "Education", "Experience", "Awards", "Service", "Macro Calculator"] as TabName[]).map((tab) => {
                  const isActive = currentTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`font-sans text-left text-sm font-bold py-2 border-l-2 pl-3 transition-colors cursor-pointer ${
                        isActive
                          ? "text-primary border-primary bg-sky-tint/20"
                          : "text-ink-medium border-transparent hover:text-primary"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="bg-primary text-on-primary font-sans font-bold text-xs text-center py-3 rounded uppercase mt-2 shadow-sm"
                >
                  Contact Info
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container Body */}
      <main className="flex-grow pt-28 pb-16 px-6 max-w-[1140px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Section matching mock specifications precisely */}
      <footer className="bg-[#f0f3f9] py-10 border-t border-outline-variant/30 mt-auto">
        <div className="max-w-[1140px] mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          {/* Brand/Legal label */}
          <div>
            <span 
              onClick={() => handleTabChange("Home")}
              className="font-sans text-lg font-bold text-[#002b5a] hover:text-secondary cursor-pointer"
            >
              Braden Rummler
            </span>
          </div>

          {/* Social Profiles Registry */}
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://www.linkedin.com/in/braden-rummler/"
              target="_blank" 
              rel="noopener noreferrer"
              className="font-sans text-sm font-bold text-ink-medium hover:text-secondary transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:bjrummler@gmail.com" 
              className="font-sans text-sm font-bold text-ink-medium hover:text-secondary transition-colors"
            >
              Email
            </a>
            <a 
              href="tel:7203820113" 
              className="font-sans text-sm font-bold text-ink-medium hover:text-secondary transition-colors"
            >
              720-382-0113
            </a>
          </div>

        </div>
      </footer>

      {/* Embedded Dynamic Consultation / Contact Overlay */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}
