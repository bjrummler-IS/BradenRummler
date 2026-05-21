import { useState } from "react";
import { motion } from "motion/react";
import { experienceData } from "../data";

export default function Experience() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-12 relative"
    >
      {/* Decorative gradient blur in background as referenced in experience markup */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-sky-tint/10 to-transparent pointer-events-none"></div>

      {/* Hero Title and Description block */}
      <header className="space-y-3">
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-[#002b5a] tracking-tight">
          Professional Experience
        </h1>
        <p className="font-serif text-lg md:text-xl text-ink-medium max-w-2xl leading-relaxed">
          A history of strategic growth, financial precision, and operational excellence through data-driven decision making and leadership.
        </p>
      </header>

      {/* Experience Timeline Grid */}
      <div className="grid grid-cols-1 gap-6">
        {experienceData.map((item) => {
          const isCurrent = item.isCurrent;
          const isHighlighted = isCurrent || hoveredId === item.id;

          return (
            <article 
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="experience-card bg-white p-6 sm:p-8 rounded-xl flex gap-5 border border-outline-variant/20 shadow-sm relative overflow-hidden"
            >
              {/* Dynamic decorative left accent bar */}
              <div 
                className={`w-1 self-stretch rounded-full transition-all duration-300 shrink-0 ${
                  isHighlighted ? "bg-primary opacity-100" : "bg-primary opacity-30"
                }`}
              ></div>

              {/* Main Job details column */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex items-start gap-4">
                    {item.logo && (
                      <div className="w-14 h-14 bg-white rounded-lg border border-outline-variant/30 flex items-center justify-center shrink-0 p-1.5 shadow-sm overflow-hidden select-none">
                        <img 
                          src={item.logo} 
                          alt={`${item.organization} logo`} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="font-sans text-2xl font-bold text-primary tracking-tight">
                        {item.organization}
                      </h2>
                      <p className="font-sans text-sm font-bold text-secondary uppercase tracking-wider mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <span className="font-sans text-xs font-semibold text-ink-medium bg-[#F1F5F9] px-3.5 py-1.5 rounded items-center self-start whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                {/* Sub descriptions checklist */}
                <ul className="space-y-3">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="custom-bullet font-serif text-base text-on-surface leading-relaxed">
                      {/* Emphasize stats and specific targets within strings for better scannability */}
                      {bullet.includes("12% reduction") ? (
                        <>
                          Analyzed operational workflows across 3 major clinical departments, identifying bottlenecks that resulted in a <span className="font-semibold">12% reduction</span> in patient wait times.
                        </>
                      ) : bullet.includes("99.8% audit accuracy") ? (
                        <>
                          Managed $1.2M annual budget reconciliation for multiple research labs with <span className="font-semibold">99.8% audit accuracy</span>.
                        </>
                      ) : bullet.includes("30%") ? (
                        <>
                          Streamlined procurement processes by implementing a digital tracking system, reducing invoice processing time by <span className="font-semibold">30%</span>.
                        </>
                      ) : bullet.includes("15%") ? (
                        <>
                          Engineered a ROI tracking model for multi-channel marketing campaigns, improving lead conversion by <span className="font-semibold">15%</span>.
                        </>
                      ) : bullet.includes("40%") ? (
                        <>
                          Implemented a new SKU organization system that decreased picking errors by <span className="font-semibold">40%</span> and improved shipping turnaround times.
                        </>
                      ) : (
                        bullet
                      )}
                    </li>
                  ))}
                </ul>

                {/* Bottom skill chips */}
                {item.skills && item.skills.length > 0 && (
                  <div className="pt-3 flex flex-wrap gap-2">
                    {item.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="px-3.5 py-1 bg-sky-tint text-primary font-sans font-bold text-xs rounded-full border border-transparent transition-all hover:bg-[#CCE4F1]/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </motion.div>
  );
}
