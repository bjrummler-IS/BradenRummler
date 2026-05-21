import { motion } from "motion/react";
import { serviceRecife, serviceAlpine, serviceStudentCouncil } from "../data";

export default function Service() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-12"
    >
      {/* Title & Headline Header section */}
      <header className="space-y-3 max-w-3xl">
        <span className="font-sans text-xs font-bold text-secondary uppercase tracking-widest block">
          Leadership &amp; Philanthropy
        </span>
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-[#002b5a] tracking-tight">
          Built on a Foundation of Service.
        </h1>
        <p className="font-serif text-lg md:text-xl text-ink-medium leading-relaxed">
          Leadership is more than management; it is a commitment to community advancement. From leading large-scale volunteer organizations in Brazil to representing youth in municipal governance, my professional journey is rooted in dedicated service and social responsibility.
        </p>
      </header>

      {/* Main Services bento columns */}
      <div className="flex flex-col gap-8">
        
        {/* Card 1: Recife, Brazil volunteer mission */}
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-6 sm:p-8 relative overflow-hidden group">
          {/* Decorative thick left bar */}
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex items-start gap-5">
                {(serviceRecife as any).logo && (
                  <div className="w-16 h-16 bg-white rounded-lg border border-outline-variant/30 flex items-center justify-center shrink-0 p-1 bg-white shadow-sm overflow-hidden select-none">
                    <img 
                      src={(serviceRecife as any).logo} 
                      alt={`${serviceRecife.organization} logo`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <h2 className="font-sans text-3xl font-extrabold text-primary tracking-tight">
                    {serviceRecife.location}
                  </h2>
                  <p className="font-sans text-base font-bold text-secondary mt-0.5">
                    {serviceRecife.role}
                  </p>
                  <p className="font-sans text-xs font-medium text-outline mt-1.5 bg-[#F1F5F9] inline-block px-3 py-1 rounded">
                    {serviceRecife.period}
                  </p>
                </div>
              </div>
              
              <div className="inline-block px-4 py-1.5 bg-sky-tint text-primary font-sans font-bold text-xs rounded-full border border-sky-tint/10 self-start text-center max-w-[240px]">
                {serviceRecife.organization}
              </div>
            </div>

            {/* Split Section: Bullets and Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
              {/* Strategic Leadership sub column */}
              <div className="space-y-3">
                <h3 className="font-sans text-[11px] font-extrabold text-[#0c4687] uppercase tracking-widest">
                  Strategic Leadership
                </h3>
                <ul className="space-y-3.5">
                  {serviceRecife.strategicBulletPoints.map((bullet, idx) => (
                    <li key={idx} className="flex items-start">
                      {/* Square custom blue bullet point replicators */}
                      <span className="w-1.5 h-1.5 bg-[#006398] rounded-xs shrink-0 mt-2.5 mr-3.5"></span>
                      <p className="font-serif text-base text-on-surface leading-relaxed">
                        {bullet.includes("160+ full-time volunteers") ? (
                          <>
                            Directed and mentored a diverse organization of <span className="font-semibold">160+ full-time volunteers</span> across the Recife Metropolitan Area.
                          </>
                        ) : bullet.includes("500+ hours") ? (
                          <>
                            Orchestrated <span className="font-semibold">500+ hours</span> of community service including disaster relief and language instruction.
                          </>
                        ) : (
                          bullet
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fluency & Impact cards sub column */}
              <div className="space-y-4">
                <div className="bg-[#F8FAFC] border border-outline-variant/20 p-5 rounded-xl">
                  <h4 className="font-sans text-sm font-bold text-primary mb-1.5">
                    Portuguese Fluency
                  </h4>
                  <p className="font-serif text-sm text-ink-medium italic leading-relaxed">
                    {serviceRecife.portugueseFluency}
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-outline-variant/20 p-5 rounded-xl">
                  <h4 className="font-sans text-sm font-bold text-primary mb-1.5">
                    Social Impact
                  </h4>
                  <p className="font-serif text-sm text-ink-medium italic leading-relaxed">
                    {serviceRecife.socialImpact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Alpine City Youth Council */}
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-6 sm:p-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
              <div>
                <h2 className="font-sans text-2xl font-bold text-primary">
                  {serviceAlpine.organization}
                </h2>
                <p className="font-sans text-sm font-semibold text-secondary mt-0.5">
                  {serviceAlpine.role}
                </p>
                <p className="font-sans text-xs font-medium text-outline mt-1.5 bg-[#F1F5F9] inline-block px-3 py-1 rounded">
                  {serviceAlpine.period}
                </p>
              </div>
              <div className="text-right">
                <div className="px-3.5 py-1 bg-[#e2e2e8]/60 text-on-surface-variant font-sans font-bold text-xs rounded-full self-start">
                  {serviceAlpine.type}
                </div>
                <p className="font-sans text-xs text-ink-medium mt-1">{(serviceAlpine as any).location}</p>
              </div>
            </div>

            <p className="font-serif text-base text-on-surface-variant max-w-3xl leading-relaxed">
              {serviceAlpine.description}
            </p>

          </div>
        </div>

        {/* Card 3: Student Council */}
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-6 sm:p-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
              <div>
                <h2 className="font-sans text-2xl font-bold text-primary">
                  {serviceStudentCouncil.organization}
                </h2>
                <p className="font-sans text-sm font-semibold text-secondary mt-0.5">
                  {serviceStudentCouncil.role}
                </p>
                <p className="font-sans text-xs font-medium text-outline mt-1.5 bg-[#F1F5F9] inline-block px-3 py-1 rounded">
                  {serviceStudentCouncil.period}
                </p>
              </div>
              <div className="text-right">
                <div className="px-3.5 py-1 bg-[#e2e2e8]/60 text-on-surface-variant font-sans font-bold text-xs rounded-full self-start">
                  {serviceStudentCouncil.type}
                </div>
                <p className="font-sans text-xs text-ink-medium mt-1">{serviceStudentCouncil.location}</p>
              </div>
            </div>

            <p className="font-serif text-base text-on-surface-variant max-w-3xl leading-relaxed">
              {serviceStudentCouncil.description}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
