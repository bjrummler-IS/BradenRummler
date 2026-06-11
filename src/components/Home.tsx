import { motion } from "motion/react";
import headshot from "../assets/images/Rummiheadshot.png";

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-16"
    >
      {/* Hero Profile Intro Section */}
      <section className="py-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Left: Text content */}
          <div className="flex-1 text-center md:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-xs sm:text-sm text-secondary font-bold uppercase tracking-widest bg-sky-tint/40 px-3.5 py-1 rounded-full"
            >
              Aspiring Financial Analyst and Healthcare Administrator
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#002b5a] mt-4 mb-6 leading-[1.1] tracking-tight"
            >
              <span className="text-[#002b5a] font-extrabold font-sans tracking-tight">Braden Rummler</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="font-serif text-lg md:text-xl text-ink-medium leading-relaxed"
            >
              Welcome. I am Braden Rummler, a Pre-Business &amp; Healthcare Leadership student at Brigham Young University. I am passionate about learning and developing my human capital to make a positive impact in the world. I have a strong background in healthcare operations, finance, accounting, Excel, and leadership, and I am eager to apply my skills and knowledge to help organizations achieve their goals. Please explore my portfolio to learn more about my education, experience, awards, and service.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <button
                onClick={() => onNavigate("Experience")}
                className="bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-lg font-sans font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                Explore Professional History
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary/20 hover:border-primary text-primary px-6 py-3 rounded-lg font-sans font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 bg-white/40 hover:bg-white/90 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">description</span>
                View Resume
              </a>
              <a
                href="https://www.linkedin.com/in/braden-rummler/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary/20 hover:border-primary text-primary px-6 py-3 rounded-lg font-sans font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 bg-white/40 hover:bg-white/90 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right: Headshot with blue square frame */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="relative shrink-0"
          >
            {/* Offset navy square behind the image */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#002b5a] rounded-2xl"></div>
            {/* Accent corner dots */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-sky-tint/60 rounded-full z-20"></div>
            <div className="absolute -top-2 -right-6 w-2.5 h-2.5 bg-[#006398]/40 rounded-full z-20"></div>
            {/* Image */}
            <div className="relative z-10 w-56 h-56 md:w-68 md:h-68 lg:w-72 lg:h-72 rounded-2xl overflow-hidden ring-4 ring-[#002b5a] shadow-2xl">
              <img
                src={headshot}
                alt="Braden Rummler"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4-Bento Highlights Spotlight Navigator */}
      <section className="space-y-8">
        <div>
          <h2 className="font-sans text-2xl font-bold text-primary mb-2">Portfolio Overview</h2>
          <p className="font-serif text-sm md:text-base text-ink-medium">Click on any module below to dive deep into its verified records.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spotlight 1: BYU Education & Competitions */}
          <div 
            onClick={() => onNavigate("Education")}
            className="bg-white rounded-xl custom-shadow p-6 border border-outline-variant/20 hover:border-primary/30 transition-all hover:shadow-xl group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-sky-tint/50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <span className="font-sans text-xs font-bold text-secondary flex items-center gap-1 group-hover:text-primary transition-colors">
                  View Education
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
              <h3 className="font-sans text-xl font-bold text-primary group-hover:text-secondary transition-colors mb-2">Education &amp; Strategy</h3>
              <p className="font-serif text-sm text-ink-medium">
                Review academic credentials at BYU, scholarships, and Walmart and Sunoco Case Competitions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-sky-tint text-primary text-[10px] font-sans rounded">Marriott School</span>
              <span className="px-2.5 py-0.5 bg-sky-tint text-primary text-[10px] font-sans rounded">Case Analysis</span>
            </div>
          </div>

          {/* Spotlight 2: Professional Experience */}
          <div 
            onClick={() => onNavigate("Experience")}
            className="bg-white rounded-xl custom-shadow p-6 border border-outline-variant/20 hover:border-primary/30 transition-all hover:shadow-xl group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-sky-tint/50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">work</span>
                </div>
                <span className="font-sans text-xs font-bold text-secondary flex items-center gap-1 group-hover:text-primary transition-colors">
                  View Experience
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
              <h3 className="font-sans text-xl font-bold text-primary group-hover:text-secondary transition-colors mb-2">Professional Experience</h3>
              <p className="font-serif text-sm text-ink-medium">
                Explore operational contributions at Intermountain Healthcare (Six Sigma dashboards), BYU Life Science accounting support, management, and other work experience.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-sky-tint text-primary text-[10px] font-sans rounded">Intermountain Healthcare</span>
              <span className="px-2.5 py-0.5 bg-sky-tint text-primary text-[10px] font-sans rounded">Continuous Improvement</span>
            </div>
          </div>

          {/* Spotlight 3: Awards & Skills */}
          <div 
            onClick={() => onNavigate("Awards")}
            className="bg-white rounded-xl custom-shadow p-6 border border-outline-variant/20 hover:border-primary/30 transition-all hover:shadow-xl group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-sky-tint/50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <span className="font-sans text-xs font-bold text-secondary flex items-center gap-1 group-hover:text-primary transition-colors">
                  View Awards
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
              <h3 className="font-sans text-xl font-bold text-primary group-hover:text-secondary transition-colors mb-2">Awards &amp; Expertise</h3>
              <p className="font-serif text-sm text-ink-medium">
                View leadership certifications like Boy Scouts Eagle Scout, native Portuguese language fluency, St. George Marathon and Bass Lake Triathlon endurance achievements.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-sky-tint text-primary text-[10px] font-sans rounded">Eagle Scout</span>
              <span className="px-2.5 py-0.5 bg-sky-tint text-primary text-[10px] font-sans rounded">Portuguese Fluency</span>
            </div>
          </div>

          {/* Spotlight 4: Service & Mission */}
          <div 
            onClick={() => onNavigate("Service")}
            className="bg-white rounded-xl custom-shadow p-6 border border-[#a8c7ff]/30 hover:border-primary/30 transition-all hover:shadow-xl group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-sky-tint/50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">diversity_3</span>
                </div>
                <span className="font-sans text-xs font-bold text-secondary flex items-center gap-1 group-hover:text-primary transition-colors">
                  View Service
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
              <h3 className="font-sans text-xl font-bold text-primary group-hover:text-secondary transition-colors mb-2">Leadership &amp; Philanthropy</h3>
              <p className="font-serif text-sm text-ink-medium">
                Explore dedicated service across South America (Recife, Brazil) to participating in local civic leadership (Alpine City Youth Council).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-sky-tint text-primary text-[10px] font-sans rounded">Recife, Brazil</span>
              <span className="px-2.5 py-0.5 bg-sky-tint text-primary text-[10px] font-sans rounded">Municipal Leadership</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
