import { EducationItem, CaseCompetition, Scholarship, ExperienceItem, Methodology } from "./types";
import intermountainLogo from "./assets/images/intermountain_logo_1779308551200.png";
import ldsChurchLogo from "./assets/images/lds_church_logo_1779308564641.png";
import castleSportsLogo from "./assets/images/castle_sports_logo_1779308578750.png";
import trustEdgeLogo from "./assets/images/trust_edge_logo_1779309617010.png";
import byuLogo from "./assets/images/byu_logo_1779309633394.png";
import stemLogo from "./assets/images/Stem.jpg";
import walmartLogo from "./assets/images/walmart_logo_1779310805890.png";
import sunocoLogo from "./assets/images/sunoco_logo_1779310825847.png";

export const educationData: EducationItem[] = [
  {
    id: "byu",
    institution: "Brigham Young University",
    degree: "Pre-Business & Healthcare Leadership",
    period: "2022 — Present",
    location: "Provo, UT",
    logo: byuLogo,
    bullets: [
      "Cumulative GPA: 3.64/4.00 | Major GPA: 3.94/4.00.",
      "Relevant Coursework Includes: Accounting 110, Finance 201, Economics 110, Marketing 201, Information Systems 110/201.",
      "Achieved a score of 30 on the ACT, demonstrating strong quantitative and analytical aptitude."
    ]
  }
];

export const caseCompetitions: CaseCompetition[] = [
  {
    id: "sunoco",
    name: "Sunoco Case Competition — 1st Place",
    role: "Financial Analyst",
    year: 2026,
    icon: "analytics",
    logo: sunocoLogo,
    bullets: [
      "Developed and presented to the COO a new market entry strategy for Sunoco LP in a university case competition.",
      "Modeled a 10%+ DCF and 5-year payback using risk-adjusted EBITDA forecasts and acquisition valuation model."
    ]
  },
  {
    id: "walmart",
    name: "Walmart Case Competition",
    role: "Financial Analyst",
    year: 2026,
    icon: "campaign",
    logo: walmartLogo,
    bullets: [
      "Developed and presented a new market entry strategy to Walmart industry professionals in a university case competition.",
      "Pitched a data-driven approach to increase operating income without increasing overall sales."
    ]
  }
];

export const scholarships: Scholarship[] = [
  {
    id: "fbi",
    name: "Society of Former Special Agents of the FBI Scholarship",
    description: "Prestigious award recognizing exceptional character and academic merit.",
    icon: "shield_person"
  },
  {
    id: "byu-scholarship",
    name: "BYU Half-Tuition Scholarship",
    description: "Academic merit-based award granted for high-tier entrance performance.",
    icon: "account_balance"
  }
];

export const keyCompetencies = [
  "Financial Modeling",
  "Leadership",
  "Case Analysis",
  "Excel",
  "Coding",
  "Accounting"
];

export const experienceData: ExperienceItem[] = [
  {
    id: "intermountain",
    organization: "Intermountain Healthcare",
    role: "Continuous Improvement Intern",
    period: "Apr 2026 — Present",
    isCurrent: true,
    logo: intermountainLogo,
    bullets: [
      "Collaborate with consultants and lead improvement projects across all departments within IH's network.",
      "Applying tools and data analysis to reduce caregivers' administrative burden, enabling more time for patient care."
    ],
    skills: ["Six Sigma", "Data Visualization", "Process Mapping"]
  },
  {
    id: "byu-life-science",
    organization: "BYU Life Science Dept",
    role: "Accountant Clerk",
    period: "May 2026 — Present",
    isCurrent: true,
    logo: byuLogo,
    bullets: [
      "Prepare expense reports and track departmental wages and purchases for accurate budget reconciliation.",
      "Calculate and record depreciation schedules on capital equipment per university accounting standards."
    ],
    skills: ["Budgeting", "Financial Reporting", "ERP Systems"]
  },
  {
    id: "trust-edge",
    organization: "Trust Edge",
    role: "Finance/Marketing Intern",
    period: "Apr 2026 — Present",
    isCurrent: true,
    logo: trustEdgeLogo,
    bullets: [
      "Analyze financial projection models forecasting costs and revenue to guide startup strategy and investor decisions.",
      "Develop marketing materials and client outreach strategies to support early-stage company growth."
    ],
    skills: ["Finance Modeling", "Market Strategy"]
  },
  {
    id: "precoa",
    organization: "Precoa",
    role: "Appointment Coordinator",
    period: "Sep 2025 — Mar 2026",
    isCurrent: false,
    bullets: [
      "Executed 100–150 outbound calls per day.",
      "Built rapport with prospective clients within minutes to increase appointment engagement."
    ],
    skills: ["Client Relations", "Outbound Sales", "Communication"]
  },
  {
    id: "castle-sports",
    organization: "Castle Sports",
    role: "Warehouse Manager",
    period: "Apr 2021 — Aug 2023",
    isCurrent: false,
    logo: castleSportsLogo,
    bullets: [
      "Worked alongside CEO, engineers, and accountants to maximize efficiency and profitability.",
      "Managed 10+ workers; Outperformed productivity targets, meeting goals in over 90% of months."
    ],
    skills: ["Leadership", "Logistics"]
  },
  {
    id: "lawn-care",
    organization: "Lawn Care",
    role: "Owner",
    period: "Apr 2019 — Aug 2022",
    isCurrent: false,
    bullets: [
      "Founded and operated a lawn-care business, maintaining 6 recurring clients over 4 summers."
    ],
    skills: ["Sales", "Entrepreneurship", "Client Retention"]
  },
  {
    id: "personal-tutor",
    organization: "Personal Tutor",
    role: "Math, Science & History",
    period: "Oct 2021 — Apr 2022",
    isCurrent: false,
    logo: stemLogo,
    bullets: [
      "Tutored a high school student with learning disabilities, helping improve academic performance.",
      "Developed personalized learning strategies to increase engagement and confidence."
    ],
    skills: ["Teaching", "Adaptability", "Communication"]
  }
];

export const methodologies: Methodology[] = [
  {
    id: "thinking",
    title: "Critical Thinking",
    description: "Approaching complex problems with a data-driven mindset and strategic foresight.",
    icon: "psychology"
  },
  {
    id: "leadership",
    title: "Team Leadership",
    description: "Empowering cross-functional teams to achieve organizational milestones and KPIs.",
    icon: "groups"
  },
  {
    id: "growth",
    title: "Strategic Growth",
    description: "Identifying opportunities for operational efficiency and sustainable scaling.",
    icon: "trending_up"
  }
];

export const serviceRecife = {
  location: "Recife, Brazil",
  role: "Volunteer Representative",
  period: "Aug 2023 — Aug 2025",
  organization: "The Church of Jesus Christ of Latter-day Saints",
  logo: ldsChurchLogo,
  strategicBulletPoints: [
    "Conducted daily outreach and built relationships with individuals from diverse backgrounds.",
    "Oversaw and managed 160+ volunteers, mentored for 2 years by Davis Smith (Founder, Cotopaxi).",
    "Strengthened communities and families, improved behavioral habits, and taught English lessons."
  ],
  portugueseFluency: "Achieved professional proficiency in Portuguese through daily immersion and community integration.",
  socialImpact: "Orchestrated 100+ hours of service and language instruction."
};

export const serviceStudentCouncil = {
  organization: "Student Council — Lone Peak High School",
  role: "Senior Historian",
  type: "Student Leadership",
  location: "Alpine, Utah",
  period: "Aug 2021 — Apr 2022",
  description: "Worked closely with other council members and faculty advisers to plan and coordinate school events.",
  skills: []
};

export const serviceAlpine = {
  organization: "Alpine City Youth Council",
  role: "Member",
  type: "Municipal Leadership",
  location: "Alpine, Utah",
  period: "Aug 2021 — Apr 2022",
  description: "Planned and participated in 5+ community initiatives, service projects and city engagement programs.",
  skills: ["Policy Research", "Event Logistics", "Civic Engagement", "Stakeholder Relations"]
};
