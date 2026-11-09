/** Single source of truth for every business fact shown on the site. */

export const SITE = {
  name: "The Prime Step",
  tagline: "Academy of Computing & Professional IT Training",
  url: "https://www.theprimestep.com",
  phone: "+91-9479611441",
  phoneHref: "tel:+919479611441",
  phoneDisplay: "+91 94796 11441",
  phoneSecondary: "+91-9109183932",
  phoneSecondaryHref: "tel:+919109183932",
  phoneSecondaryDisplay: "+91 91091 83932",
  whatsappHref: "https://wa.me/919479611441",
  whatsappDisplay: "+91 94796 11441",
  email: "TheprimestepEdu@gmail.com",
  adminEmail: "webmaster@theprimestep.com",
  city: "Indore, Madhya Pradesh",
  established: "2019",
  rating: "4.9★",
  reviewCount: "2,390+",
  hours: "Mon – Sat: 8:00 AM – 8:00 PM (Labs 24/7 Access)",
  social: {
    instagram: "https://www.instagram.com/theprimestep/",
    linkedin: "https://in.linkedin.com/company/the-prime-step",
    youtube: "https://www.youtube.com/@theprimestepinfo",
    facebook: "https://www.facebook.com/theprimestep",
    whatsapp: "https://wa.me/919479611441",
  },
} as const;

export const SOCIAL_LINKS = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@theprimestep",
    href: "https://www.instagram.com/theprimestep/",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "the-prime-step",
    href: "https://in.linkedin.com/company/the-prime-step",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@theprimestepinfo",
    href: "https://www.youtube.com/@theprimestepinfo",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "theprimestep",
    href: "https://www.facebook.com/theprimestep",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+91 94796 11441",
    href: "https://wa.me/919479611441",
  },
] as const;

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
    tag: "Head Office & Main Hub",
    hours: "Mon – Sat: 8:00 AM – 8:00 PM",
    landmark: "Above Apna Sweets, Vijay Nagar Square",
    address:
      "123, 210 & 303, Shagun Tower, Above Apna Sweets, Vijay Nagar Square, AB Road, Indore, MP 452010",
    phone: "+91 94796 11441",
    phoneHref: "tel:+919479611441",
  },
  {
    name: "Bhawarkua",
    tag: "Student Tech Hub",
    hours: "Mon – Sat: 8:00 AM – 8:00 PM",
    landmark: "Near Holkar Science College & Indrapuri",
    address:
      "Bhawarkuan Main Road, Above Canara Bank, Indrapuri, Bhawarkua Square, Indore, MP 452001",
    phone: "+91 91091 83932",
    phoneHref: "tel:+919109183932",
  },
  {
    name: "Annapurna",
    tag: "Western Indore Campus",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    landmark: "Above Surbhi Sweets, Annapurna Mandir Road",
    address:
      "Office No. 6, Kalyan Tower, Above Surbhi Sweets, Annapurna Mandir Road, Indore, MP 452009",
    phone: "+91 94796 11441",
    phoneHref: "tel:+919479611441",
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
  plain: string;
  analogy: string;
  line: string;
  tags: string[];
}[] = [
  {
    id: "python",
    title: "Python",
    plain: "Teach computers to do the boring work for you.",
    analogy: "How Netflix suggests what you should watch next.",
    line: "Learned by writing it. The language behind automation, data and AI.",
    tags: ["Python", "SQL"],
  },
  {
    id: "java",
    title: "Java",
    plain: "Build the software that banks and big companies run on.",
    analogy: "The system working behind a train-ticket booking app.",
    line: "From core fundamentals to enterprise-grade application development.",
    tags: ["Core Java", "Advanced Java", "Java Full Stack"],
  },
  {
    id: "fullstack",
    title: "Full Stack",
    plain: "Learn to build a complete website or app, front to back.",
    analogy: "Everything you see on a website — and everything working behind it.",
    line: "Interfaces, servers and databases — built as one connected system.",
    tags: ["MERN", "MEAN", "Java Full Stack", "PHP", "Web Design"],
  },
  {
    id: "data",
    title: "Data & Analytics",
    plain: "Turn numbers into answers a business can act on.",
    analogy: "How a shop works out what sells best, and when.",
    line: "Turn raw numbers into decisions people can actually act on.",
    tags: ["Data Analytics", "Data Science", "Power BI", "Tableau"],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    plain: "Teach computers to learn from examples.",
    analogy: "How your phone recognises faces and guesses your next word.",
    line: "Understand how models learn — then put them to work.",
    tags: ["Artificial Intelligence", "Machine Learning"],
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    plain: "Make apps that live on people's phones.",
    analogy: "The kind of app you open ten times a day.",
    line: "Ship software that lives in people's pockets.",
    tags: ["Android App Development", "Dart & Flutter"],
  },
  {
    id: "foundations",
    title: "Core Programming",
    plain: "Learn how programmers think — the base of every tech job.",
    analogy: "How Google finds one result among billions of pages.",
    line: "The foundations every strong developer is built on.",
    tags: ["C", "C++", "Data Structures & Algorithms"],
  },
  {
    id: "office",
    title: "Business Skills",
    plain: "Skills almost every office job asks for.",
    analogy: "Spreadsheets, accounts, GST and confident English.",
    line: "Practical office, accounting and communication skills for the workplace.",
    tags: ["MS Office", "Advanced Excel", "Tally & GST", "Spoken English"],
  },
];

export const BUILD_STEPS = [
  {
    n: "01",
    title: "Learn the basics",
    text: "Every idea is taught by doing it, with practice in every topic.",
    code: ["<!-- Step 1: your first page -->", "<h1>Hello, I'm Your Name</h1>", "<p>Aspiring developer</p>"],
  },
  {
    n: "02",
    title: "Build real projects",
    text: "Hands-on project work turns theory into something you can show.",
    code: ["<Navbar />", "<Hero title=\"My Portfolio\" />", "<Project name=\"Weather App\" />", "<Project name=\"Quiz Game\" />"],
  },
  {
    n: "03",
    title: "Put it online",
    text: "Your projects go into a portfolio employers can open.",
    code: ["$ git push origin main", "✓ Published: yourname.dev"],
  },
  {
    n: "04",
    title: "Practise the interview",
    text: "Mock technical and HR rounds before the real ones.",
    code: ["> interview.practise()", "✓ Ready for the next step"],
  },
];

/** Roles these skills commonly lead to — general career context, not placement claims. */
export const ROLES = [
  {
    role: "Web Developer",
    what: "Builds the websites and web apps you use every day.",
    day: "Turns a design into a working page, fixes bugs, adds a new feature.",
    from: "Full Stack · MERN / MEAN · PHP",
  },
  {
    role: "Software Developer",
    what: "Writes the logic behind apps and business systems.",
    day: "Builds features, tests them, and works with a team to improve them.",
    from: "Java · Python · Core Programming",
  },
  {
    role: "Data Analyst",
    what: "Finds patterns in numbers to help a business decide.",
    day: "Cleans data, builds a dashboard, explains what it means in plain words.",
    from: "Data Analytics · SQL · Power BI · Excel",
  },
  {
    role: "AI / ML Engineer",
    what: "Builds systems that learn from data.",
    day: "Prepares data, trains a model, checks how well it performs.",
    from: "Python · AI · Machine Learning",
  },
  {
    role: "Mobile App Developer",
    what: "Creates apps people install on their phones.",
    day: "Designs screens, connects them to data, tests on a real phone.",
    from: "Android · Dart & Flutter",
  },
];

export type PersonaId = "student" | "switcher" | "professional" | "parent";

export const PERSONAS: {
  id: PersonaId;
  label: string;
  hindi: string;
  headline: string;
  sub: string;
  recommended: string[];
  cta: string;
}[] = [
  {
    id: "student",
    label: "12th Pass / College Student",
    hindi: "B.Tech, BCA, B.Sc ya 12th ke baad",
    headline: "Start from zero. Graduate with real projects and job-ready confidence.",
    sub: "You don't need prior coding experience. We teach you step by step — from writing your first line of code to building apps and preparing for campus & off-campus interviews.",
    recommended: ["Python", "Full Stack (MERN / Java)", "Data Analytics", "Core Programming (C/C++ & DSA)"],
    cta: "Book a free demo class",
  },
  {
    id: "switcher",
    label: "Non-IT / Career Switcher",
    hindi: "Non-tech background se IT mein aana hai",
    headline: "No coding background? We start from the very first step.",
    sub: "Many of our students come from commerce, arts or non-technical jobs. We explain every concept in plain language, sit beside you to clear doubts, and help you build a portfolio that proves what you can do.",
    recommended: ["Data Analytics & Power BI", "Web Design & Full Stack", "Python", "Advanced Excel & Tally GST"],
    cta: "Talk to a career counselor",
  },
  {
    id: "professional",
    label: "Working Professional",
    hindi: "Job upgrade ya skill badhani hai",
    headline: "Upgrade your stack with practical, industry-focused training.",
    sub: "Move from support or manual roles into development, analytics or AI. Flexible batches and hands-on capstone projects designed around real workplace workflows.",
    recommended: ["Data Science & AI / ML", "MERN / Java Full Stack", "Power BI & SQL", "Flutter Mobile Apps"],
    cta: "Explore weekend & evening batches",
  },
  {
    id: "parent",
    label: "Parent",
    hindi: "Apne bacche ke सही career ke liye",
    headline: "A safe, practical classroom in Indore focused on real career skills.",
    sub: "We teach practical computer skills that companies actually hire for — with attentive faculty, small-group doubt clearing, flexible interest-free installment options, and dedicated placement assistance.",
    recommended: ["Full Stack Development", "Data Science & Analytics", "Java / Python Programming", "Spoken English & Soft Skills"],
    cta: "Visit our Indore branch or call us",
  },
];

export const CAREER_STAGES = [
  { n: "01", t: "Resume & LinkedIn profile" },
  { n: "02", t: "Portfolio & project work" },
  { n: "03", t: "Mock technical & HR interviews" },
  { n: "04", t: "Placement assistance with recruiters" },
];

/** Verified institute stats & credentials from public reviews */
export const INSTITUTE_STATS = [
  { value: "4.9★", label: "Google Review Rating", note: "2,390+ Verified Reviews" },
  { value: "8,500+", label: "Students Trained", note: "Across MP & Central India" },
  { value: "03", label: "Indore Campuses", note: "Vijay Nagar · Bhawarkua · Annapurna" },
  { value: "100%", label: "Hands-on Practical Labs", note: "3–5 Deployed Live Projects per Stack" },
] as const;

/** Frequently Asked Questions studied from prospective students in Indore */
export const FAQS = [
  {
    q: "Do I need a prior computer science or engineering background to join?",
    a: "No prior technical or coding experience is required. Courses start from absolute bedrock fundamentals (typing your first line of code, understanding logic step by step). Many of our most successful alumni switched from non-IT backgrounds like B.Com, B.Sc, BA, or 12th pass.",
  },
  {
    q: "Can I attend a free demo class before enrolling?",
    a: "Yes! The Prime Step offers 2-day free demo sessions at our Vijay Nagar (Shagun Tower) and Bhawarkua (Indrapuri) campuses. You can sit with the mentors, experience the practical lab teaching method, and then decide.",
  },
  {
    q: "Are interest-free monthly installment (EMI) options available?",
    a: "Yes. We provide 0% interest flexible installment options so students and families can comfortably pay fees across the course duration without financial stress.",
  },
  {
    q: "How does 1-on-1 doubt clearing work during lab sessions?",
    a: "Unlike large lecture halls where students get left behind, our trainers stay in the computer labs with you. If you get a bug, syntax error, or logical roadblock, mentors sit right beside your screen to debug and explain why the error happened.",
  },
  {
    q: "What batch timings are available for college students and working professionals?",
    a: "We offer flexible batch schedules across the day from 8:00 AM to 8:00 PM, including dedicated early morning batches, afternoon lab slots, and evening / weekend batches tailored for working professionals and college goers.",
  },
  {
    q: "How does placement assistance work after course completion?",
    a: "Placement readiness is integrated into the curriculum: building an industry-standard portfolio on GitHub, optimizing your LinkedIn profile, participating in mock technical & HR interview rounds, and direct referral connections with hiring tech firms across Indore (Crystal IT Park, Super Corridor), Pune, and Bangalore.",
  },
] as const;


