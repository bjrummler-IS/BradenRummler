import { motion } from "motion/react";
import { methodologies } from "../data";

export default function Awards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-16"
    >
      {/* Title block */}
      <header className="space-y-3 text-center md:text-left">
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-[#002b5a] tracking-tight">
          Awards &amp; Achievements
        </h1>
        <p className="font-serif text-lg md:text-xl text-ink-medium max-w-2xl leading-relaxed">
          A record of leadership, athletic, and academic achievements built through discipline and service.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Eagle Scout — Full width banner */}
        <div className="md:col-span-12 bg-white custom-shadow p-6 sm:p-8 rounded-xl border border-outline-variant/20 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
          <div className="space-y-4 pl-2">
            <span className="inline-block px-3.5 py-1 bg-sky-tint text-primary font-sans font-bold text-xs rounded-full uppercase tracking-wider">
              Boy Scouts of America
            </span>
            <h2 className="font-sans text-3xl font-extrabold text-primary tracking-tight">
              Eagle Scout
            </h2>
            <p className="font-serif text-base text-ink-medium leading-relaxed max-w-3xl">
              Attained the highest rank in the Boy Scouts of America through years of leadership, service, and merit achievement.
            </p>
            <ul className="space-y-2.5 pt-1">
              <li className="flex items-center gap-3 font-sans text-sm font-bold text-primary">
                <span className="w-2 h-2 bg-[#006398] rounded-sm shrink-0"></span>
                Led a team of 15+ volunteers to restore Silver Lake Trail — removing dangerous shortcuts and improving overall trail safety and cleanliness
              </li>
              <li className="flex items-center gap-3 font-sans text-sm font-bold text-primary">
                <span className="w-2 h-2 bg-[#006398] rounded-sm shrink-0"></span>
                Completed rigorous merit badge requirements across leadership, first aid, and community service disciplines
              </li>
            </ul>
          </div>
        </div>

        {/* Cross Country & Track */}
        <div className="md:col-span-8 bg-white custom-shadow p-6 sm:p-8 rounded-xl border border-outline-variant/20 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
          <div className="space-y-4 pl-2">
            <span className="inline-block px-3.5 py-1 bg-sky-tint text-primary font-sans font-bold text-xs rounded-full uppercase tracking-wider">
              Lone Peak High School
            </span>
            <h2 className="font-sans text-2xl font-extrabold text-primary tracking-tight">
              Cross Country &amp; Track and Field Captain
            </h2>
            <p className="font-serif text-base text-ink-medium leading-relaxed">
              Served as captain of the Lone Peak High School Cross Country and Track &amp; Field teams, motivating and leading 100+ runners over one full academic year.
            </p>
            <ul className="space-y-2.5 pt-1">
              <li className="flex items-center gap-3 font-sans text-sm font-bold text-primary">
                <span className="w-2 h-2 bg-[#006398] rounded-sm shrink-0"></span>
                Academic All-State Track &amp; Field — 2020, 2021, 2022
              </li>
              <li className="flex items-center gap-3 font-sans text-sm font-bold text-primary">
                <span className="w-2 h-2 bg-[#006398] rounded-sm shrink-0"></span>
                Academic All-State Cross Country — 2020, 2021, 2022
              </li>
            </ul>
          </div>
        </div>

        {/* St. George Marathon */}
        <div className="md:col-span-4 bg-[#F1F5F9] p-6 rounded-xl custom-shadow border-l-4 border-secondary flex flex-col justify-between">
          <div className="space-y-4">
            <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              directions_run
            </span>
            <h3 className="font-sans text-xl font-bold tracking-tight text-primary">St. George Marathon</h3>
            <p className="font-serif text-sm text-ink-medium leading-relaxed">
              Official Finisher — 2022. Completed a full 26.2-mile marathon, demonstrating discipline, endurance, and commitment to long-term goals.
            </p>
          </div>
        </div>

        {/* Bass Lake Sprint Triathlon */}
        <div className="md:col-span-8 bg-[#F1F5F9] p-6 rounded-xl custom-shadow border-l-4 border-secondary flex flex-col justify-between">
          <div className="space-y-4">
            <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              pool
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-sans text-xl font-bold tracking-tight text-primary">Bass Lake Sprint Triathlon</h3>
              <span className="inline-block px-3 py-0.5 bg-secondary/10 text-secondary font-sans font-bold text-xs rounded-full uppercase tracking-wider">2nd Place · 20–24 Male · 2026</span>
            </div>
            <p className="font-serif text-sm text-ink-medium leading-relaxed">
              Finished 2nd in the 20–24 Male Division at the Bass Lake Sprint Triathlon, completing all three disciplines back-to-back without rest.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-primary bg-white/70 px-3 py-1.5 rounded border border-outline-variant/20">
                <span className="material-symbols-outlined text-sm text-secondary">pool</span>
                800M Swim
              </div>
              <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-primary bg-white/70 px-3 py-1.5 rounded border border-outline-variant/20">
                <span className="material-symbols-outlined text-sm text-secondary">directions_bike</span>
                20K Bike
              </div>
              <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-primary bg-white/70 px-3 py-1.5 rounded border border-outline-variant/20">
                <span className="material-symbols-outlined text-sm text-secondary">directions_run</span>
                5K Run
              </div>
            </div>
          </div>
        </div>

        {/* Portuguese Language */}
        <div className="md:col-span-4 bg-primary text-on-primary p-6 rounded-xl custom-shadow flex flex-col justify-between border border-transparent">
          <div className="space-y-4">
            <span className="material-symbols-outlined text-3xl text-sky-tint" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              language
            </span>
            <h3 className="font-sans text-xl font-bold tracking-tight">Linguistic Proficiency</h3>
            <p className="font-serif text-sm opacity-90 leading-relaxed">
              Professional proficiency in Portuguese (Reading, Writing, Speaking) gained through 2 years of daily immersion while living in Recife, Brazil.
            </p>
          </div>
        </div>

      </div>

      {/* Professional Methodology */}
      <section className="space-y-8 pt-4">
        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-primary text-center tracking-tight">
          Professional Methodology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methodologies.map((method) => (
            <div
              key={method.id}
              className="p-6 bg-white border border-outline-variant/20 rounded-xl text-center relative hover:shadow-md transition-shadow flex flex-col items-center"
            >
              <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-primary rounded-full"></div>
              <div className="w-11 h-11 bg-sky-tint/40 rounded-full flex items-center justify-center mb-4 border border-sky-tint/20">
                <span className="material-symbols-outlined text-primary text-xl">
                  {method.icon}
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-primary mb-2">
                {method.title}
              </h3>
              <p className="font-serif text-sm text-ink-medium leading-relaxed">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
