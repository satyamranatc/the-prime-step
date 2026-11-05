/** Single source of truth for every business fact shown on the site. */

export const SITE = {
  name: "The Prime Step",
  url: "https://www.theprimestep.com",
  phone: "+91-9479611441",
  phoneHref: "tel:+919479611441",
  email: "TheprimestepEdu@gmail.com",
  city: "Indore, Madhya Pradesh",
} as const;

export const NAV = [
  { id: "programs", label: "Programs" },
  { id: "learning", label: "Experience" },
  { id: "build", label: "Projects" },
  { id: "careers", label: "Careers" },
  { id: "admission", label: "Admissions" },
] as const;

export const BRANCHES = [
  {
    name: "Vijay Nagar",
    tag: "Head office",
    address:
      "123, 210 & 303, 1st–3rd Floor, Shagun Tower, Above Apna Sweets, Vijay Nagar Square, Indore, MP 452010",
  },
  {
    name: "Bhawarkua",
    tag: "Branch",
    address:
      "Plot 3, Ground Floor, Indrapuri Main Road, Above Canara Bank, Bhawarkua, Indore, MP 452001",
  },
  {
    name: "Annapurna",
    tag: "Branch",
    address: "Annapurna Road, Indore, MP",
  },
] as const;

export const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `The Prime Step ${address}`,
  )}`;

export type GlyphId =
  | "python"
  | "java"
  | "fullstack"
  | "data"
  | "ai"
  | "mobile"
  | "foundations"
  | "office";

export const DISCIPLINES: {
  id: GlyphId;
  title: string;
  line: string;
  tags: string[];
}[] = [
  {
    id: "python",
    title: "Python",
    line: "Learned by writing it. The language behind automation, data and AI.",
    tags: ["Python", "SQL"],
  },
  {
    id: "java",
    title: "Java",
    line: "From core fundamentals to enterprise-grade application development.",
    tags: ["Core Java", "Advanced Java", "Java Full Stack"],
  },
  {
    id: "fullstack",
    title: "Full Stack",
    line: "Interfaces, servers and databases — built as one connected system.",
    tags: ["MERN", "MEAN", "Java Full Stack", "PHP", "Web Design"],
  },
  {
    id: "data",
    title: "Data & Analytics",
    line: "Turn raw numbers into decisions people can actually act on.",
    tags: ["Data Analytics", "Data Science", "Power BI", "Tableau"],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    line: "Understand how models learn — then put them to work.",
    tags: ["Artificial Intelligence", "Machine Learning"],
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    line: "Ship software that lives in people's pockets.",
    tags: ["Android App Development", "Dart & Flutter"],
  },
  {
    id: "foundations",
    title: "Core Programming",
    line: "The foundations every strong developer is built on.",
    tags: ["C", "C++", "Data Structures & Algorithms"],
  },
  {
    id: "office",
    title: "Business Skills",
    line: "Practical office, accounting and communication skills for the workplace.",
    tags: ["MS Office", "Advanced Excel", "Tally & GST", "Spoken English"],
  },
];

export const BUILD_STEPS = [
  {
    n: "01",
    title: "Learn the fundamentals",
    text: "Concepts are taught by applying them, with practical exercises in every topic.",
    lines: ["$ mkdir my-first-project", "$ cd my-first-project", "$ code ."],
  },
  {
    n: "02",
    title: "Build real projects",
    text: "Hands-on project work turns theory into something you can demonstrate.",
    lines: [
      "function enroll(student, course) {",
      "  return { ...student, course, status: 'building' };",
      "}",
    ],
  },
  {
    n: "03",
    title: "Ship your portfolio",
    text: "Projects become part of your resume, ready to show to employers.",
    lines: ["$ git add . && git commit -m \"portfolio v1\"", "$ git push origin main"],
  },
  {
    n: "04",
    title: "Practice the interview",
    text: "Mock technical and HR rounds before the real ones.",
    lines: ["> interview.prepare()", "✓ ready for the next step"],
  },
];

export const CAREER_STAGES = [
  { n: "01", t: "Resume & LinkedIn profile" },
  { n: "02", t: "Portfolio & project work" },
  { n: "03", t: "Mock technical & HR interviews" },
  { n: "04", t: "Placement assistance with recruiters" },
];

