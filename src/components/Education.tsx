import { motion } from "motion/react";
import { educationData, caseCompetitions, scholarships, keyCompetencies } from "../data";
import byuCampusImage from "../assets/images/byu_campus_mountains_1779310943877.png";

export default function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-12"
    >
      {/* Header section matching exact copy */}
      <header className="space-y-3">
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-[#002b5a] tracking-tight">
          Academic Background
        </h1>
        <p className="font-serif text-lg md:text-xl text-ink-medium max-w-2xl leading-relaxed">
          Combining rigorous business preparation with healthcare leadership to drive innovation at the intersection of management and medicine.
        </p>
      </header>

      {/* Grid Layout matching mockup desktop-to-mobile proportions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left main content column (BYU and case competitions) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* BYU Academic Card with vertical accent block */}
          {educationData.map((edu) => (
            <section 
              key={edu.id}
              className="bg-white academic-card-shadow p-6 sm:p-8 rounded-xl relative overflow-hidden border border-outline-variant/30 flex gap-6"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                  <div className="flex items-start gap-4">
                    {edu.logo && (
                      <div className="w-14 h-14 bg-white rounded-lg border border-outline-variant/30 flex items-center justify-center shrink-0 p-1.5 shadow-sm overflow-hidden select-none">
                        <img 
                          src={edu.logo} 
                          alt={`${edu.institution} logo`} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="font-sans text-2xl font-bold text-primary">{edu.institution}</h2>
                      <p className="font-sans text-base sm:text-lg text-secondary font-medium mt-0.5">{edu.degree}</p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <span className="font-sans text-sm font-bold text-primary">{edu.period}</span>
                    <p className="font-sans text-[10px] text-ink-medium uppercase tracking-widest mt-1">
                      {edu.location}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {edu.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-[21px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                        check_circle
                      </span>
                      {/* Bold GPA / Test stats according to mockup style */}
                      <p className="font-serif text-base text-on-surface">
                        {bullet.includes("3.64 Cumulative GPA") ? (
                          <>
                            Maintains a <span className="font-bold">3.64 Cumulative GPA</span> while balancing healthcare leadership coursework.
                          </>
                        ) : bullet.includes("30 on the ACT") ? (
                          <>
                            Achieved a score of <span className="font-bold">30 on the ACT</span>, demonstrating strong quantitative and analytical aptitude.
                          </>
                        ) : (
                          bullet
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          {/* Case Competitions Category Header */}
          <div className="pt-2">
            <h3 className="font-sans text-xs font-bold text-primary uppercase tracking-widest">
              CASE COMPETITIONS &amp; EXCELLENCE
            </h3>
          </div>

          {/* Walmart and Sunoco Case Competitions */}
          <div className="space-y-6">
            {caseCompetitions.map((comp) => (
              <section 
                key={comp.id}
                className="bg-white academic-card-shadow p-6 sm:p-8 rounded-xl relative overflow-hidden border border-outline-variant/30 flex gap-6"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div className="flex items-start gap-4">
                      {comp.logo && (
                        <div className="w-14 h-14 bg-white rounded-lg border border-outline-variant/30 flex items-center justify-center shrink-0 p-1.5 shadow-sm overflow-hidden select-none">
                          <img 
                            src={comp.logo} 
                            alt={`${comp.name} logo`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-sans text-xl sm:text-2xl font-bold text-primary">{comp.name}</h4>
                        <p className="font-sans text-base sm:text-md text-secondary mt-0.5">{comp.role}</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-sans text-sm font-bold text-primary leading-none">{comp.year}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {comp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-[21px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                          {comp.icon}
                        </span>
                        <p className="font-serif text-base text-on-surface leading-normal">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Scholarships Banner Card */}
          <div className="bg-primary text-on-primary p-6 sm:p-8 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -top-8 opacity-10">
              <span className="material-symbols-outlined text-[110px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                workspace_premium
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold mb-6 relative z-10">Scholarships</h3>
            <div className="space-y-6 relative z-10">
              {scholarships.map((sch) => (
                <div key={sch.id} className="group">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/15 p-2 rounded shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {sch.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-bold text-white mb-1 leading-snug">
                        {sch.name}
                      </p>
                      <p className="font-serif text-[13px] text-white/80 leading-snug">
                        {sch.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Architecture Image */}
          <div className="rounded-xl overflow-hidden h-64 shadow-md border border-outline-variant/30 bg-muted/20">
            <img 
              alt="Brigham Young University Campus nestled in the Mountains" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-[1.03] transition-all duration-500 bg-[#E2E8F0]" 
              src={byuCampusImage}
            />
          </div>

          {/* Competencies Checklist */}
          <div className="bg-white p-6 sm:p-8 rounded-xl academic-card-shadow border border-outline-variant/20 space-y-4">
            <h3 className="font-sans text-xs font-bold text-primary uppercase tracking-wider">
              Key Competencies
            </h3>
            <div className="flex flex-wrap gap-2 text-on-surface">
              {keyCompetencies.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="bg-sky-tint text-primary px-3.5 py-1 rounded-full font-sans font-medium text-xs border border-transparent hover:border-primary/20 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
