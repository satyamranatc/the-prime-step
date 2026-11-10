import { SITE } from "./content";

export interface CourseModule {
  number: string;
  title: string;
  duration: string;
  summary: string;
  topics: string[];
  deliverable: string;
}

export interface CourseProject {
  title: string;
  stack: string;
  description: string;
  outcomes: string[];
}

export interface CoursePageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  duration: string;
  level: string;
  format: string;
  projectsCount: string;
  roadmapId: string;
  overviewHeadline: string;
  overviewBody: string[];
  highlights: { label: string; value: string; detail: string }[];
  techCategories: { category: string; items: string[] }[];
  modules: CourseModule[];
  projects: CourseProject[];
  careerRoles: { role: string; skills: string; description: string }[];
  faqs: { q: string; a: string }[];
}

export const COURSE_PAGES: Record<string, CoursePageData> = {
  "java-full-stack-developer": {
    slug: "java-full-stack-developer",
    title: "Java Full Stack Developer",
    metaTitle: "Java Full Stack Developer Course in Indore — Spring Boot, React & Microservices",
    metaDescription:
      "Master Core & Advanced Java, Spring Boot, Hibernate, Microservices, React, and SQL at The Prime Step Indore. 100% practical training with live enterprise projects and placement assistance at Vijay Nagar, Bhawarkua & Annapurna campuses.",
    keywords: [
      "Java Full Stack Developer course in Indore",
      "Java classes in Indore",
      "Core and Advanced Java training Indore",
      "Spring Boot Microservices course Indore",
      "Java training institute Vijay Nagar Indore",
      "Java placement course Bhawarkua",
    ],
    eyebrow: "Enterprise Software Engineering Track",
    heroTitle: "Java Full Stack Developer.",
    heroSubtitle:
      "From Core Java fundamentals and OOP discipline to production Spring Boot microservices, Hibernate ORM, and modern React frontends — engineered for banking, fintech, and enterprise software roles.",
    duration: "5 – 6 Months",
    level: "Beginner to Advanced",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "4 Deployed Enterprise Projects",
    roadmapId: "java",
    overviewHeadline: "The backbone of global enterprise software, taught step by step.",
    overviewBody: [
      "Java powers the core banking systems, financial platforms, e-commerce backends, and high-throughput distributed architectures of the world's largest technology companies. At The Prime Step in Indore, our Java Full Stack Developer program is designed to take you from writing your very first Java class to architecting complete full-stack applications.",
      "Rather than memorizing theory, you spend every session in our computer labs writing code alongside mentors. You will master strong object-oriented programming, relational database persistence with MySQL and JPA/Hibernate, RESTful microservices with Spring Boot and Spring Security, and reactive user interfaces with React.",
    ],
    highlights: [
      {
        label: "Core + Enterprise",
        value: "Java 17+ & Spring",
        detail: "Complete coverage from JVM internals to Spring Boot 3 & Microservices",
      },
      {
        label: "Database Mastery",
        value: "MySQL & Hibernate",
        detail: "Relational schema design, JPA entity mapping, and query optimization",
      },
      {
        label: "Frontend Stack",
        value: "React & TypeScript",
        detail: "Modern component architecture integrated with secure Java REST APIs",
      },
      {
        label: "Placement Prep",
        value: "DSA + Mock Rounds",
        detail: "Dedicated Java coding interview preparation and GitHub portfolio review",
      },
    ],
    techCategories: [
      {
        category: "Core & Advanced Java",
        items: ["Java 17+", "OOP Principles", "Collections Framework", "Multithreading", "Exception Handling", "Streams & Lambdas", "JDBC", "Servlets & JSP"],
      },
      {
        category: "Enterprise Backend",
        items: ["Spring Core", "Spring Boot 3", "Spring MVC", "Spring Security & JWT", "Spring Data JPA", "Hibernate ORM", "Microservices", "RESTful APIs"],
      },
      {
        category: "Frontend & UI",
        items: ["HTML5 & CSS3", "Modern JavaScript (ES6+)", "React.js", "Tailwind CSS", "Redux Toolkit", "Axios & REST Integration"],
      },
      {
        category: "Database & DevOps Tools",
        items: ["MySQL", "PostgreSQL", "Maven", "Git & GitHub", "Postman", "Docker Basics", "JUnit Testing"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Core Java & Object-Oriented Engineering",
        duration: "Weeks 1 – 5",
        summary: "Build rock-solid programming logic, memory discipline, and object-oriented design patterns.",
        topics: [
          "JVM architecture, JDK setup, data types, operators, and control flow",
          "Classes, objects, constructors, inheritance, polymorphism, abstraction, and encapsulation",
          "Exception handling, custom exceptions, and defensive coding practices",
          "Java Collections Framework (List, Set, Map, Queue) and generics",
          "Java 8–17 features: Lambda expressions, Stream API, Optional, and functional interfaces",
          "Multithreading, synchronization, and file I/O streams",
        ],
        deliverable: "CLI Double-Entry Banking Ledger with Concurrent Transaction Processing",
      },
      {
        number: "02",
        title: "Relational Databases, SQL & JDBC/Hibernate",
        duration: "Weeks 6 – 9",
        summary: "Connect Java applications to production relational databases with clean ORM mapping.",
        topics: [
          "Relational schema design, normalization, primary/foreign keys, and indexing in MySQL",
          "Complex SQL queries, joins, subqueries, views, and stored procedures",
          "JDBC connectivity, PreparedStatements, connection pooling, and transaction management",
          "Hibernate ORM & JPA annotations, entity lifecycle, and One-to-Many / Many-to-Many mappings",
          "HQL, Criteria API, pagination, and caching strategies",
        ],
        deliverable: "Multi-Warehouse Inventory & Order Persistence Engine",
      },
      {
        number: "03",
        title: "Spring Boot, REST APIs & Microservices",
        duration: "Weeks 10 – 15",
        summary: "Architect scalable enterprise backends with Spring Boot, Spring Security, and microservice patterns.",
        topics: [
          "Inversion of Control (IoC), Dependency Injection, and Spring Bean lifecycle",
          "Spring Boot auto-configuration, starters, profiles, and Actuator monitoring",
          "Building RESTful APIs: Controllers, DTOs, validation, and global exception handling",
          "Spring Security 6: Role-based access control (RBAC), JWT authentication, and password hashing",
          "Microservices architecture: service discovery, API Gateway, and inter-service communication",
        ],
        deliverable: "Secure Fintech Payment & Account Microservice API",
      },
      {
        number: "04",
        title: "Modern Frontend with React.js",
        duration: "Weeks 16 – 19",
        summary: "Design responsive, interactive web interfaces that consume your Spring Boot APIs.",
        topics: [
          "Semantic HTML5, modern CSS Grid/Flexbox, and responsive Tailwind CSS layouts",
          "JavaScript ES6+ fundamentals: promises, async/await, destructuring, and modules",
          "React components, props, state, hooks (useState, useEffect, useMemo, custom hooks)",
          "Client-side routing with React Router, protected routes, and JWT session persistence",
          "Connecting React frontends to Spring Boot backends with CORS and Axios interceptors",
        ],
        deliverable: "Interactive Enterprise Admin & Analytics Portal",
      },
      {
        number: "05",
        title: "Full Stack Capstone, Deployment & Interview Prep",
        duration: "Weeks 20 – 24",
        summary: "Ship your complete full-stack system to the cloud and prepare for technical interviews.",
        topics: [
          "End-to-end capstone architecture: requirement analysis, schema design, API contract, and UI build",
          "Unit testing with JUnit, Maven build lifecycles, and Docker containerization",
          "Data Structures & Algorithms (DSA) in Java for technical coding rounds",
          "Resume engineering, GitHub portfolio curation, and 1-on-1 mock technical + HR interviews",
        ],
        deliverable: "Deployed Full-Stack Hospital / ERP Management System + GitHub Portfolio",
      },
    ],
    projects: [
      {
        title: "FinCore Banking & Wallet Microservice",
        stack: "Java 17 · Spring Boot · Spring Security · MySQL · JWT",
        description:
          "An enterprise account management and fund-transfer system featuring ACID-compliant ledger transactions, role-based access, and audit logging.",
        outcomes: ["JWT Authentication", "Transactional Integrity", "REST API Documentation", "Role-Based Security"],
      },
      {
        title: "MediCare Hospital ERP Full Stack Suite",
        stack: "Spring Boot · Hibernate JPA · React · Tailwind CSS",
        description:
          "A multi-role portal for doctors, receptionists, and administrators managing appointments, patient histories, billing, and real-time bed availability.",
        outcomes: ["Full Stack Integration", "Complex JPA Relationships", "Role Dashboards", "PDF Invoice Generation"],
      },
      {
        title: "HireFlow Applicant Tracking System",
        stack: "Spring Boot · React · MySQL · Docker",
        description:
          "A recruitment pipeline platform allowing HR teams to post jobs, filter candidates, schedule interview rounds, and track hiring metrics.",
        outcomes: ["Pagination & Filtering", "RESTful CRUD", "Responsive UI", "Docker Packaging"],
      },
    ],
    careerRoles: [
      {
        role: "Java Full Stack Developer",
        skills: "Java · Spring Boot · React · SQL",
        description: "Build complete end-to-end enterprise web applications across frontend interfaces and backend services.",
      },
      {
        role: "Java Backend Engineer",
        skills: "Core Java · Spring Boot · Microservices · Hibernate",
        description: "Design high-performance APIs, database layers, and distributed backend systems for enterprise clients.",
      },
      {
        role: "Associate Software Engineer",
        skills: "OOP · DSA in Java · SQL · Git",
        description: "Join product and IT service companies with strong problem-solving, debugging, and software engineering fundamentals.",
      },
    ],
    faqs: [
      {
        q: "Can a beginner or non-IT student learn Java Full Stack at The Prime Step?",
        a: "Yes. We start from Core Java basics — variables, loops, and object-oriented thinking — before progressing to Advanced Java, Spring Boot, and React. Our mentors sit with you in the lab to ensure every concept is clear.",
      },
      {
        q: "What is the difference between Core Java and Java Full Stack?",
        a: "Core Java teaches programming fundamentals and OOP in Java. Java Full Stack covers Core Java plus database persistence (MySQL, JDBC, Hibernate), enterprise backend frameworks (Spring Boot, Microservices), and modern frontend development (HTML, CSS, JavaScript, React) so you can build complete web applications.",
      },
      {
        q: "Will I build live projects during the Java Full Stack course?",
        a: "Yes. Every module concludes with a practical lab project, culminating in a full-stack enterprise capstone application deployed online and pushed to your GitHub portfolio.",
      },
      {
        q: "Which Indore campuses offer the Java Full Stack Developer course?",
        a: "The course is available across all three Indore campuses: Vijay Nagar (Shagun Tower), Bhawarkua (Indrapuri), and Annapurna Road, with flexible morning, afternoon, and evening batches.",
      },
    ],
  },

  "mern-stack-developer-course": {
    slug: "mern-stack-developer-course",
    title: "MERN Stack Developer Course",
    metaTitle: "MERN Stack Developer Course in Indore — MongoDB, Express, React & Node.js",
    metaDescription:
      "Learn Full Stack Web Development with MongoDB, Express.js, React, Node.js, Next.js & TypeScript at The Prime Step Indore. Build and deploy real SaaS web apps with 100% hands-on lab mentorship and placement support.",
    keywords: [
      "MERN Stack Developer course in Indore",
      "Full stack web development course Indore",
      "React and Node.js classes Indore",
      "Web development institute Vijay Nagar Indore",
      "MERN stack training Bhawarkua Indore",
      "JavaScript full stack course Indore",
    ],
    eyebrow: "Modern Web & SaaS Engineering Track",
    heroTitle: "MERN Stack Developer Course.",
    heroSubtitle:
      "Master modern JavaScript and TypeScript across the entire web stack — crafting fast React & Next.js interfaces, scalable Node.js & Express APIs, and cloud MongoDB architectures.",
    duration: "5 – 6 Months",
    level: "Beginner to Production Ready",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "5 Live Deployed Web Apps",
    roadmapId: "mern",
    overviewHeadline: "One language across the entire stack. Built by shipping real products.",
    overviewBody: [
      "The MERN stack (MongoDB, Express.js, React, Node.js) is the most in-demand architecture for startups, SaaS products, and modern digital platforms. Because it uses JavaScript and TypeScript from the browser all the way to the database, you can build and ship complete web applications with extraordinary speed.",
      "At The Prime Step in Indore, you learn the MERN stack by building real software from day one. You will master responsive UI engineering with Tailwind CSS, component systems in React 19 and Next.js, REST API design and JWT security in Node.js & Express, and schema modeling in MongoDB Atlas — deploying every project live to the cloud.",
    ],
    highlights: [
      {
        label: "Frontend Mastery",
        value: "React 19 & Next.js",
        detail: "Component architecture, custom hooks, state management, and Tailwind CSS",
      },
      {
        label: "Backend Engine",
        value: "Node.js & Express",
        detail: "RESTful APIs, JWT auth, middleware pipelines, and real-time webhooks",
      },
      {
        label: "Cloud Database",
        value: "MongoDB & Mongoose",
        detail: "Document modeling, aggregation pipelines, indexing, and Atlas cloud setup",
      },
      {
        label: "Live Portfolio",
        value: "5 Deployed Apps",
        detail: "Graduate with live production URLs and clean GitHub repositories",
      },
    ],
    techCategories: [
      {
        category: "Web Foundations & Styling",
        items: ["HTML5 Semantics", "CSS3 Flexbox & Grid", "Tailwind CSS", "Responsive Design", "JavaScript ES6+", "TypeScript Basics", "DOM Manipulation"],
      },
      {
        category: "Frontend Engineering",
        items: ["React 19", "Custom Hooks", "Context API", "Redux Toolkit", "React Router", "Next.js App Router", "API Integration"],
      },
      {
        category: "Backend & APIs",
        items: ["Node.js Runtime", "Express.js", "REST API Architecture", "JWT & Bcrypt Auth", "Role-Based Access", "File Uploads (Cloudinary)", "Zod Validation"],
      },
      {
        category: "Database & Deployment",
        items: ["MongoDB Atlas", "Mongoose ORM", "Aggregation Pipelines", "Git & GitHub", "Postman", "Vercel & Render", "CI/CD Workflows"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Web Foundations, Responsive UI & Modern JavaScript",
        duration: "Weeks 1 – 5",
        summary: "Build pixel-accurate responsive interfaces and master asynchronous JavaScript.",
        topics: [
          "Semantic HTML5 structure, accessibility foundations, and SEO-friendly markup",
          "Modern CSS3 architecture: Flexbox, Grid, responsive breakpoints, and Tailwind CSS",
          "JavaScript (ES6+): closures, array methods, destructuring, modules, and DOM events",
          "Asynchronous JS: Event loop, Promises, async/await, and Fetch API",
          "Git version control and collaborative GitHub branching workflows",
        ],
        deliverable: "Responsive Brand Platform + Interactive Weather & Finance Dashboard",
      },
      {
        number: "02",
        title: "React.js Component Architecture & State Management",
        duration: "Weeks 6 – 10",
        summary: "Engineer fast, modular single-page applications with React and modern state patterns.",
        topics: [
          "JSX, component composition, props, and unidirectional data flow",
          "React Hooks deep dive: useState, useEffect, useRef, useMemo, useCallback, and custom hooks",
          "Multi-page routing with React Router, dynamic URL params, and protected layouts",
          "Global state management with Context API and Redux Toolkit",
          "Form handling, client-side validation, optimistic UI updates, and error boundaries",
        ],
        deliverable: "Real-Time Collaborative Kanban & Project Tracker App",
      },
      {
        number: "03",
        title: "Node.js & Express.js Backend Engineering",
        duration: "Weeks 11 – 15",
        summary: "Build secure, production-grade REST APIs and authentication gateways.",
        topics: [
          "Node.js runtime architecture, event-driven I/O, streams, and NPM ecosystem",
          "Express.js routing, controller-service separation, and custom middleware pipelines",
          "Authentication & security: JWT access/refresh tokens, bcrypt hashing, cookies, and CORS",
          "Input validation with Zod, centralized error handling, and rate limiting",
          "File uploads, email notifications, and third-party API integrations",
        ],
        deliverable: "Secure Multi-Role Authentication & REST API Gateway",
      },
      {
        number: "04",
        title: "MongoDB, Mongoose ORM & Data Modeling",
        duration: "Weeks 16 – 19",
        summary: "Design scalable NoSQL document schemas and high-speed aggregation queries.",
        topics: [
          "Document database concepts, collections, BSON types, and MongoDB Atlas cloud setup",
          "Mongoose schemas, models, virtuals, pre/post hooks, and schema validation",
          "Relational references (populate) vs embedded documents for read/write performance",
          "MongoDB Aggregation Framework: $match, $group, $lookup, $project, and analytics pipelines",
          "Compound indexing, pagination, and query performance optimization",
        ],
        deliverable: "Multi-Vendor E-Commerce Backend with Analytics Aggregations",
      },
      {
        number: "05",
        title: "Next.js, Cloud Deployment & Placement Readiness",
        duration: "Weeks 20 – 24",
        summary: "Assemble full-stack SaaS applications, deploy to production, and ace technical interviews.",
        topics: [
          "Introduction to Next.js App Router, Server Components, and SEO optimization",
          "Connecting React frontends with Node/Express + MongoDB backends in production",
          "Environment configuration, cloud deployment on Vercel/Render, and custom domains",
          "JavaScript/React interview prep, live code reviews, and mock technical + HR rounds",
        ],
        deliverable: "Full-Stack SaaS Platform Deployed Live + Verified Developer Portfolio",
      },
    ],
    projects: [
      {
        title: "CartCraft Full-Stack E-Commerce Storefront",
        stack: "MongoDB · Express · React · Node.js · Tailwind CSS",
        description:
          "A complete online store featuring product search and filtering, persistent cart, JWT user accounts, order tracking, and an admin inventory dashboard.",
        outcomes: ["Full CRUD API", "Cart & Checkout Flow", "Admin Analytics", "Cloud Image Uploads"],
      },
      {
        title: "WorkSync Team Project & Issue Tracker",
        stack: "React · Redux Toolkit · Node.js · Express · MongoDB",
        description:
          "A workspace collaboration tool with role-based permissions, drag-and-drop task boards, sprint filters, and activity logs.",
        outcomes: ["Protected Routes", "Complex State Sync", "RESTful Architecture", "Responsive UI"],
      },
      {
        title: "PulseHire Job Board & Candidate Portal",
        stack: "MERN Stack · JWT Auth · Cloudinary · Vercel",
        description:
          "A dual-sided portal where companies post openings and candidates apply with resumes, track application status, and bookmark roles.",
        outcomes: ["Multi-Role Auth", "Search & Pagination", "Resume Upload", "Live Cloud Hosting"],
      },
    ],
    careerRoles: [
      {
        role: "MERN Stack Developer",
        skills: "MongoDB · Express · React · Node.js",
        description: "Build complete full-stack web applications and SaaS platforms from database to user interface.",
      },
      {
        role: "Frontend React Engineer",
        skills: "React · Next.js · TypeScript · Tailwind CSS",
        description: "Craft fast, accessible, and responsive web interfaces for modern product companies.",
      },
      {
        role: "Node.js Backend Developer",
        skills: "Node.js · Express · MongoDB · REST APIs",
        description: "Architect scalable server APIs, authentication systems, and database pipelines.",
      },
    ],
    faqs: [
      {
        q: "Do I need to know HTML, CSS, or JavaScript before joining the MERN Stack course?",
        a: "No prior coding knowledge is required. Module 01 starts from HTML5, CSS3, Tailwind CSS, and modern JavaScript fundamentals before moving into React, Node.js, Express, and MongoDB.",
      },
      {
        q: "Why is the MERN Stack so popular with hiring companies in Indore and across India?",
        a: "MERN allows companies to build both the frontend and backend using a single language (JavaScript/TypeScript). Startups, IT agencies, and product companies in Indore, Pune, and Bangalore actively hire MERN developers who can ship features across the full stack.",
      },
      {
        q: "Will my MERN projects be hosted online for recruiters to see?",
        a: "Yes. We guide you through deploying your frontend and backend applications on cloud platforms like Vercel, Render, and MongoDB Atlas so employers can click and test your live work.",
      },
      {
        q: "Can I attend a free demo class for the MERN Stack course?",
        a: "Absolutely. You can book a free 2-day demo session at our Vijay Nagar, Bhawarkua, or Annapurna campus to experience our hands-on lab teaching firsthand.",
      },
    ],
  },

  "python-programming-classes": {
    slug: "python-programming-classes",
    title: "Python Programming Classes",
    metaTitle: "Python Programming Classes in Indore — Core Python, Django, FastAPI & SQL",
    metaDescription:
      "Join Indore's premier Python Programming Classes at The Prime Step. Learn Core & Advanced Python, OOP, SQL, Django, FastAPI & Automation with live lab projects and placement assistance.",
    keywords: [
      "Python programming classes in Indore",
      "Python course in Indore",
      "Best Python training institute Vijay Nagar Indore",
      "Python Django full stack course Indore",
      "Python coaching Bhawarkua Indore",
    ],
    eyebrow: "Python, Backend & Automation Engineering Track",
    heroTitle: "Python Programming Classes.",
    heroSubtitle:
      "Master the world's most versatile programming language — from clean Pythonic fundamentals and OOP to Django/FastAPI web backends, SQL databases, and workflow automation.",
    duration: "3 – 5 Months",
    level: "Absolute Beginner to Advanced",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "4+ Real-World Python Projects",
    roadmapId: "python",
    overviewHeadline: "Clear syntax. Unmatched power across web, automation, and backend systems.",
    overviewBody: [
      "Python is the #1 language for beginners and the primary engine behind modern backend web development, workflow automation, Data Science, and Artificial Intelligence. Its clean, readable syntax allows you to focus on solving real problems rather than fighting complex boilerplate.",
      "At The Prime Step's Python Programming Classes in Indore, you learn Python by writing code in our guided computer labs every day. Whether your goal is to master Core Python for college placements, automate business workflows, or build scalable web APIs with Django and FastAPI, our curriculum takes you step by step.",
    ],
    highlights: [
      {
        label: "Bedrock Logic",
        value: "Python 3.12+ & OOP",
        detail: "Data structures, functions, modules, file handling, and object-oriented programming",
      },
      {
        label: "Web & APIs",
        value: "Django & FastAPI",
        detail: "Production backend frameworks, ORM models, REST APIs, and JWT authentication",
      },
      {
        label: "Database Mastery",
        value: "PostgreSQL & MySQL",
        detail: "Relational schema design, complex joins, indexing, and SQLAlchemy / Django ORM",
      },
      {
        label: "Automation",
        value: "Scripting & CLI Tools",
        detail: "Automate file processing, web scraping, API integrations, and reporting",
      },
    ],
    techCategories: [
      {
        category: "Core & Advanced Python",
        items: ["Python 3.12+", "Data Structures", "Functions & Modules", "OOP in Python", "File & CSV/JSON I/O", "Exception Handling", "Decorators & Generators", "Automation Scripting"],
      },
      {
        category: "Database & SQL",
        items: ["PostgreSQL", "MySQL", "SQL Joins & Aggregations", "Database Normalization", "Python DB-API", "SQLAlchemy / Django ORM"],
      },
      {
        category: "Backend Web Frameworks",
        items: ["Django", "Django REST Framework", "FastAPI", "JWT Authentication", "Pydantic Validation", "Swagger / OpenAPI"],
      },
      {
        category: "Testing & Deployment",
        items: ["Pytest & Unittest", "Git & GitHub", "Virtual Environments", "Postman", "Docker Basics", "Cloud Deployment"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Core Python Programming & Problem Solving",
        duration: "Weeks 1 – 4",
        summary: "Write clean, idiomatic Python from scratch and build strong algorithmic thinking.",
        topics: [
          "Python environment setup, variables, data types, string manipulation, and conditional logic",
          "Loops, pattern building, list comprehensions, and functional programming tools",
          "Built-in data structures: Lists, Tuples, Sets, and Dictionaries in depth",
          "Modular functions, recursion, scope, packages, and virtual environments",
          "File handling (TXT, CSV, JSON), exception handling, and automation scripts",
        ],
        deliverable: "Automated File Organizer & CLI Expense/Inventory Engine",
      },
      {
        number: "02",
        title: "Object-Oriented Python & Relational SQL",
        duration: "Weeks 5 – 8",
        summary: "Structure large Python programs using OOP and connect them to SQL databases.",
        topics: [
          "Classes, objects, inheritance, polymorphism, encapsulation, and magic/dunder methods",
          "Iterators, generators, decorators, and regular expressions",
          "Relational database design with PostgreSQL and MySQL",
          "Writing complex SQL queries: joins, group by, subqueries, indexes, and transactions",
          "Connecting Python applications to SQL databases with parameterized queries",
        ],
        deliverable: "SQL-Backed Library & Student Records Management System",
      },
      {
        number: "03",
        title: "Backend Web Development with Django",
        duration: "Weeks 9 – 13",
        summary: "Build secure full-stack web applications and admin portals using Django.",
        topics: [
          "HTTP protocol, REST architecture, and MVT pattern in Django",
          "Django ORM models, migrations, admin customization, and template/API views",
          "User authentication, session management, permissions, and form validation",
          "Building RESTful endpoints with Django REST Framework (DRF) and serializers",
        ],
        deliverable: "Multi-User E-Commerce & Blog CMS Backend in Django",
      },
      {
        number: "04",
        title: "High-Performance APIs with FastAPI & Deployment",
        duration: "Weeks 14 – 18",
        summary: "Create modern async microservices with FastAPI, Docker, and cloud hosting.",
        topics: [
          "Async Python programming and FastAPI routing architecture",
          "Pydantic schema validation, JWT authentication, and role permissions",
          "Automated API documentation with Swagger UI and unit testing with Pytest",
          "Containerizing Python services with Docker and preparing your GitHub portfolio",
        ],
        deliverable: "Deployed Enterprise CRM & Billing FastAPI Service",
      },
    ],
    projects: [
      {
        title: "SwiftAPI Enterprise CRM & Billing Backend",
        stack: "Python · FastAPI · PostgreSQL · JWT · Swagger",
        description:
          "A high-performance REST backend for managing client leads, invoices, role-based access, and automated reporting.",
        outcomes: ["FastAPI & Pydantic", "SQL ORM", "JWT Security", "OpenAPI Docs"],
      },
      {
        title: "DjangoShop Multi-Vendor Inventory & Order System",
        stack: "Python · Django · Django REST Framework · MySQL",
        description:
          "A complete backend platform featuring product catalogs, customer authentication, order workflows, and customized Django admin dashboards.",
        outcomes: ["Django ORM", "DRF Serializers", "Role Permissions", "Relational Schema"],
      },
      {
        title: "AutoOps Python Workflow & Report Automator",
        stack: "Python 3 · CSV/JSON Pipelines · REST Clients · CLI",
        description:
          "A command-line automation suite that parses daily spreadsheets, validates records, syncs with external APIs, and emails formatted summaries.",
        outcomes: ["File I/O", "Error Recovery", "Modular OOP", "Automated Scheduling"],
      },
    ],
    careerRoles: [
      {
        role: "Python Backend Developer",
        skills: "Python · Django · FastAPI · SQL",
        description: "Build backend web services, REST APIs, and scalable server systems for software teams.",
      },
      {
        role: "Software & Automation Engineer",
        skills: "Core Python · OOP · Scripting · Git",
        description: "Automate testing, data pipelines, and internal engineering workflows.",
      },
      {
        role: "Full Stack Python Engineer",
        skills: "Django · REST APIs · JavaScript/React · PostgreSQL",
        description: "Deliver end-to-end web products backed by Python server architectures.",
      },
    ],
    faqs: [
      {
        q: "Is Python the best first programming language for absolute beginners?",
        a: "Yes. Python reads almost like plain English, which lets beginners grasp core programming logic (loops, conditions, functions, and data structures) quickly without getting stuck on complex syntax.",
      },
      {
        q: "Can I take only Core Python or the full Python + Django/FastAPI track?",
        a: "Yes! We offer both a focused Core & Advanced Python track (ideal for college students and foundational coding) and the complete Python Full Stack & Backend career track.",
      },
      {
        q: "How are doubts resolved during the Python classes?",
        a: "Every class includes hands-on lab coding at our Vijay Nagar, Bhawarkua, or Annapurna campus. Our faculty sit right beside you in the lab to help debug your code line by line.",
      },
      {
        q: "Do you provide placement assistance after completing Python training?",
        a: "Yes. We assist with GitHub project portfolios, resume building, mock technical interviews, and placement referrals for Python and Software Development roles.",
      },
    ],
  },

  "data-science-and-analytics-courses-in-indore": {
    slug: "data-science-and-analytics-courses-in-indore",
    title: "Data Science and Analytics Courses in Indore",
    metaTitle: "Data Science Course in Indore — Python, Machine Learning, SQL & Applied AI",
    metaDescription:
      "Master Data Science, Python, Pandas, NumPy, SQL, Statistical Modeling, Scikit-Learn & Machine Learning at The Prime Step Indore. 100% practical project training across Vijay Nagar, Bhawarkua & Annapurna campuses.",
    keywords: [
      "Data Science course in Indore",
      "Data Science and Analytics courses in Indore",
      "Machine Learning course Indore",
      "Python for Data Science Indore",
      "Best Data Science institute Vijay Nagar Indore",
    ],
    eyebrow: "Data Science, Predictive Modeling & AI Track",
    heroTitle: "Data Science & Applied AI.",
    heroSubtitle:
      "Turn raw datasets into predictive models and intelligent systems using Python, SQL, Pandas, Statistical Analysis, Scikit-Learn, and Machine Learning pipelines.",
    duration: "5 – 6 Months",
    level: "Beginner to Advanced Career Track",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "5 End-to-End Data & ML Capstones",
    roadmapId: "data-science",
    overviewHeadline: "From raw numbers to predictive intelligence — taught with real datasets.",
    overviewBody: [
      "Every modern organization—from fintech and e-commerce to healthcare and retail—relies on Data Scientists to uncover patterns and predict future outcomes. At The Prime Step in Indore, our Data Science & Applied AI program takes you step by step from Python and SQL foundations to training, evaluating, and deploying real Machine Learning models.",
      "You work hands-on with messy, real-world datasets in our computer labs: cleaning anomalies with Pandas, running statistical hypothesis tests, visualizing trends with Seaborn/Power BI, and building regression, classification, and clustering pipelines with Scikit-Learn.",
    ],
    highlights: [
      {
        label: "Data Wrangling",
        value: "Python, Pandas & SQL",
        detail: "Clean, join, and transform million-row datasets with precision",
      },
      {
        label: "Mathematics & Stats",
        value: "Applied Statistics",
        detail: "Probability, distributions, hypothesis testing, and A/B experimentation",
      },
      {
        label: "Machine Learning",
        value: "Scikit-Learn & XGBoost",
        detail: "Feature engineering, supervised/unsupervised models, and hyperparameter tuning",
      },
      {
        label: "Model Deployment",
        value: "FastAPI & Cloud",
        detail: "Package trained ML models into live web APIs that businesses can use",
      },
    ],
    techCategories: [
      {
        category: "Programming & Databases",
        items: ["Python 3", "Advanced SQL", "PostgreSQL", "Jupyter Notebooks", "Git & GitHub"],
      },
      {
        category: "Data Analysis & Visualization",
        items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Plotly", "Power BI", "Exploratory Data Analysis (EDA)"],
      },
      {
        category: "Statistics & Machine Learning",
        items: ["Descriptive & Inferential Stats", "Linear & Logistic Regression", "Decision Trees & Random Forest", "XGBoost", "K-Means Clustering", "PCA", "Time-Series Forecasting"],
      },
      {
        category: "Deep Learning & Deployment",
        items: ["Neural Network Basics", "NLP Text Classification", "FastAPI Model Serving", "Streamlit Dashboards", "Docker Basics"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Python for Data Science & Analytical SQL",
        duration: "Weeks 1 – 5",
        summary: "Master Python programming structures and write complex analytical SQL queries.",
        topics: [
          "Python fundamentals, functions, list/dict comprehensions, and OOP for data pipelines",
          "Relational database querying with PostgreSQL: joins, window functions, CTEs, and aggregations",
          "Importing data from CSV, Excel, JSON, SQL databases, and REST APIs",
        ],
        deliverable: "Multi-Source SQL & Python Sales Ingestion Pipeline",
      },
      {
        number: "02",
        title: "Data Wrangling, EDA & Applied Statistics",
        duration: "Weeks 6 – 10",
        summary: "Clean messy data, run statistical tests, and uncover business insights.",
        topics: [
          "NumPy arrays, vectorization, and linear algebra foundations",
          "Pandas DataFrames: missing value imputation, outlier treatment, merging, and pivot tables",
          "Descriptive statistics, probability distributions, correlation, and hypothesis testing",
          "Visual storytelling with Matplotlib, Seaborn, and interactive Plotly charts",
        ],
        deliverable: "Comprehensive Exploratory Data Analysis (EDA) Report on FinTech Credit Risk",
      },
      {
        number: "03",
        title: "Supervised & Unsupervised Machine Learning",
        duration: "Weeks 11 – 17",
        summary: "Train, validate, and tune predictive models using Scikit-Learn.",
        topics: [
          "Feature engineering: encoding, scaling, feature selection, and train/validation/test splits",
          "Regression models: Linear, Ridge, Lasso, and Polynomial regression with RMSE/R² evaluation",
          "Classification models: Logistic Regression, KNN, SVM, Decision Trees, Random Forest, and XGBoost",
          "Precision, Recall, F1-Score, ROC-AUC curves, and handling imbalanced datasets (SMOTE)",
          "Unsupervised learning: K-Means clustering, hierarchical clustering, and PCA dimensionality reduction",
        ],
        deliverable: "Customer Churn & Credit Default Prediction Engine",
      },
      {
        number: "04",
        title: "Time-Series, NLP Basics & Model Deployment",
        duration: "Weeks 18 – 24",
        summary: "Forecast trends, analyze text data, and deploy ML models as interactive web apps.",
        topics: [
          "Time-series analysis, moving averages, seasonality, and demand forecasting",
          "Natural Language Processing (NLP) foundations: TF-IDF, sentiment analysis, and text classification",
          "Deploying trained models with Streamlit dashboards and FastAPI endpoints",
          "Data Science portfolio curation, case-study presentation, and mock technical interviews",
        ],
        deliverable: "Live Deployed ML Prediction Web App + GitHub Case-Study Portfolio",
      },
    ],
    projects: [
      {
        title: "FinGuard Credit Risk & Loan Default Predictor",
        stack: "Python · Pandas · Scikit-Learn · XGBoost · Streamlit",
        description:
          "An end-to-end classification pipeline that analyzes borrower histories, engineers risk features, and predicts default probability via an interactive web dashboard.",
        outcomes: ["Feature Engineering", "Imbalanced Data Handling", "ROC-AUC Tuning", "Streamlit UI"],
      },
      {
        title: "DemandPulse Retail Forecasting Engine",
        stack: "Python · SQL · Time-Series · Plotly",
        description:
          "A multi-store inventory demand forecasting model helping retail teams optimize stock levels across seasonal peaks.",
        outcomes: ["SQL Window Functions", "Time-Series Modeling", "KPI Visualization", "Business Recommendations"],
      },
      {
        title: "ChurnShield Telecom Retention System",
        stack: "Python · Random Forest · FastAPI · Docker",
        description:
          "A production ML microservice that scores customer churn likelihood in real time and highlights top retention drivers.",
        outcomes: ["Model Serialization", "FastAPI Endpoint", "SHAP Explainability", "Cloud Hosting"],
      },
    ],
    careerRoles: [
      {
        role: "Data Scientist",
        skills: "Python · Machine Learning · Statistics · SQL",
        description: "Build predictive models, experiments, and data-driven algorithms to solve complex business problems.",
      },
      {
        role: "Data Analyst / BI Analyst",
        skills: "SQL · Python Pandas · Power BI · Statistics",
        description: "Analyze business performance, uncover revenue opportunities, and present executive insights.",
      },
      {
        role: "Machine Learning Engineer",
        skills: "Python · Scikit-Learn · FastAPI · MLOps Basics",
        description: "Train, optimize, and deploy machine learning models into production software environments.",
      },
    ],
    faqs: [
      {
        q: "Can someone from a non-coding or commerce/mathematics background learn Data Science?",
        a: "Yes. We teach Python and SQL from the ground up in Module 01, and we explain statistical concepts visually using real datasets rather than dry textbook formulas.",
      },
      {
        q: "What is the difference between the Data Analytics course and the Data Science course?",
        a: "Data Analytics focuses on querying past and current data using SQL, Excel, Power BI, Tableau, and Python EDA to answer 'What happened and why?'. Data Science includes those skills plus Statistical Modeling and Machine Learning to predict 'What will happen next?'.",
      },
      {
        q: "Will I build a portfolio of real data projects?",
        a: "Yes. You will complete 5 domain case studies (Finance, Retail, Healthcare, Telecom, E-Commerce) published on GitHub with live interactive dashboards.",
      },
      {
        q: "Are free demo classes available in Indore?",
        a: "Yes! Visit our Vijay Nagar, Bhawarkua, or Annapurna campus for a 2-day free demo session with our Data Science faculty.",
      },
    ],
  },

  "data-analytics-course-in-indore": {
    slug: "data-analytics-course-in-indore",
    title: "Data Analytics Course in Indore",
    metaTitle: "Data Analytics Course in Indore — SQL, Power BI, Tableau, Excel & Python",
    metaDescription:
      "Become a job-ready Data Analyst in Indore at The Prime Step. Master Advanced Excel, SQL, Power BI, Tableau & Python Pandas with real business dashboards and placement support.",
    keywords: [
      "Data Analytics course in Indore",
      "Data Analyst training Vijay Nagar Indore",
      "SQL Power BI Tableau course Indore",
      "Business Analytics classes Bhawarkua Indore",
      "Data Analytics for non-IT students Indore",
    ],
    eyebrow: "Business Intelligence & Data Analytics Track",
    heroTitle: "Data Analytics, SQL & BI.",
    heroSubtitle:
      "Turn raw spreadsheets and database tables into executive dashboards and business decisions using Advanced Excel, SQL, Power BI, Tableau, and Python Pandas.",
    duration: "3 – 4 Months",
    level: "Beginner Friendly (IT & Non-IT)",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "5 Interactive Executive Dashboards",
    roadmapId: "data-analytics",
    overviewHeadline: "The highest-demand career path for both IT and non-technical graduates.",
    overviewBody: [
      "Every company collects data, but very few people know how to clean it, query it, and explain what it means in plain business language. Data Analytics is one of the fastest-growing and most accessible tech careers for graduates from B.Com, BBA, MBA, B.Sc, BCA, and B.Tech backgrounds alike.",
      "At The Prime Step in Indore, you learn the complete modern analyst toolkit: Advanced Excel for rapid modeling, PostgreSQL/MySQL for querying relational databases, Power BI and Tableau for interactive executive dashboards, and Python (Pandas) for automating large-scale data cleaning.",
    ],
    highlights: [
      {
        label: "Spreadsheet Mastery",
        value: "Advanced Excel & MIS",
        detail: "XLOOKUP, Pivot Tables, Power Query, conditional modeling, and KPI tracking",
      },
      {
        label: "Database Querying",
        value: "PostgreSQL & MySQL",
        detail: "Complex joins, subqueries, CTEs, window functions, and business reporting",
      },
      {
        label: "BI Dashboards",
        value: "Power BI & Tableau",
        detail: "DAX calculations, star-schema data modeling, and interactive drill-down visuals",
      },
      {
        label: "Python for Analysts",
        value: "Pandas & Automation",
        detail: "Clean and analyze large CSV/SQL datasets that exceed spreadsheet limits",
      },
    ],
    techCategories: [
      {
        category: "Spreadsheets & MIS",
        items: ["Advanced Excel", "XLOOKUP & Index-Match", "Pivot Tables & Slicers", "Power Query ETL", "MIS Automation"],
      },
      {
        category: "SQL & Relational Databases",
        items: ["PostgreSQL", "MySQL", "Joins & Aggregations", "Window Functions", "CTEs & Views", "Schema Analysis"],
      },
      {
        category: "Business Intelligence Tools",
        items: ["Microsoft Power BI", "DAX Formulas", "Star Schema Modeling", "Tableau Public & Desktop", "Executive Storytelling"],
      },
      {
        category: "Python & Statistical Analysis",
        items: ["Python Fundamentals", "Pandas DataFrames", "NumPy", "Matplotlib & Seaborn", "Business KPI Metrics"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Advanced Excel, Power Query & MIS Reporting",
        duration: "Weeks 1 – 3",
        summary: "Build dynamic financial and operational models in Microsoft Excel.",
        topics: [
          "Data cleaning functions, text/date manipulation, and dynamic array formulas",
          "VLOOKUP, XLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS, and logical modeling",
          "Pivot Tables, calculated fields, slicers, and automated Power Query data transformations",
          "Designing clean, interactive MIS executive summary dashboards",
        ],
        deliverable: "Automated Monthly Operations & Revenue MIS Dashboard",
      },
      {
        number: "02",
        title: "SQL Mastery for Business & Data Analysts",
        duration: "Weeks 4 – 7",
        summary: "Extract and aggregate answers directly from company relational databases.",
        topics: [
          "Relational database concepts, tables, primary/foreign keys, and ER diagrams",
          "Filtering, sorting, GROUP BY, HAVING, and multi-table INNER/LEFT/FULL JOINs",
          "Subqueries, Common Table Expressions (CTEs), and CASE statements",
          "Analytical Window Functions: ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and running totals",
        ],
        deliverable: "E-Commerce Cohort Retention & Revenue SQL Case Study",
      },
      {
        number: "03",
        title: "Microsoft Power BI & Tableau Visualization",
        duration: "Weeks 8 – 12",
        summary: "Design interactive, boardroom-ready Business Intelligence dashboards.",
        topics: [
          "Connecting Power BI to SQL databases, Excel workbooks, and web APIs via Power Query",
          "Data modeling: Star and Snowflake schemas, cardinality, and cross-filter direction",
          "DAX mastery: Calculated columns, measures, CALCULATE, Time Intelligence (YoY, MoM, YTD)",
          "Tableau fundamentals: calculated fields, parameters, story points, and interactive filters",
        ],
        deliverable: "Multi-Page Executive Sales, Supply Chain & HR Power BI Suite",
      },
      {
        number: "04",
        title: "Python (Pandas) for Data Analysis & Interview Prep",
        duration: "Weeks 13 – 16",
        summary: "Automate large-scale data wrangling with Python and prepare for analyst interviews.",
        topics: [
          "Python basics for analysts: lists, dictionaries, loops, and functions",
          "Pandas for data cleaning, handling missing values, merging datasets, and statistical summaries",
          "Visualizing trends with Seaborn/Matplotlib and presenting actionable business recommendations",
          "SQL + BI case-study interviews, resume optimization, and mock placement rounds",
        ],
        deliverable: "Published 5-Project Data Analyst Portfolio + Live BI Links",
      },
    ],
    projects: [
      {
        title: "OmniRetail 360° Revenue & Margin Power BI Dashboard",
        stack: "Power BI · DAX · Power Query · SQL",
        description:
          "An interactive executive dashboard tracking regional sales, product profitability, YoY growth, and salesperson targets.",
        outcomes: ["Star Schema", "Time Intelligence DAX", "Drill-Through Pages", "KPI Cards"],
      },
      {
        title: "Swiggy/Zomato Delivery Operations SQL Analysis",
        stack: "PostgreSQL · Window Functions · CTEs",
        description:
          "Deep-dive SQL analysis of delivery times, peak ordering hours, customer repeat rates, and restaurant ratings.",
        outcomes: ["Complex Joins", "Cohort Analysis", "Window Ranking", "Executive Deck"],
      },
      {
        title: "PeopleMetrics HR Attrition & Payroll Analytics",
        stack: "Tableau · Advanced Excel · Python Pandas",
        description:
          "Workforce analytics dashboard identifying department-level attrition drivers, salary bands, and hiring velocity.",
        outcomes: ["Data Cleaning", "Tableau Storytelling", "Statistical Insights", "HR KPIs"],
      },
    ],
    careerRoles: [
      {
        role: "Data Analyst",
        skills: "SQL · Power BI · Excel · Python",
        description: "Query company databases, clean datasets, and build dashboards that guide business decisions.",
      },
      {
        role: "Business Intelligence (BI) Developer",
        skills: "Power BI · DAX · Tableau · Data Modeling",
        description: "Design and maintain automated reporting pipelines and enterprise BI dashboards.",
      },
      {
        role: "MIS & Operations Analyst",
        skills: "Advanced Excel · Power Query · SQL",
        description: "Manage operational metrics, financial reporting, and performance tracking for enterprises.",
      },
    ],
    faqs: [
      {
        q: "Is Data Analytics suitable for B.Com, BBA, MBA, or Arts graduates?",
        a: "Yes! Data Analytics is the most popular transition path for non-IT graduates because it values business understanding, logical thinking, and visual communication over heavy software coding.",
      },
      {
        q: "How much coding is required in the Data Analytics course?",
        a: "Roughly 70% of the work uses SQL, Excel, Power BI, and Tableau (which are declarative and visual), and 30% uses straightforward Python (Pandas) commands for data cleaning.",
      },
      {
        q: "Will I publish live dashboards I can share on LinkedIn and my resume?",
        a: "Yes. Every student builds 5 complete domain dashboards (Sales, Finance, HR, Supply Chain, Healthcare) that recruiters can view and interact with.",
      },
      {
        q: "Can I attend a 2-day free demo class at The Prime Step?",
        a: "Yes, free demo sessions run weekly at our Vijay Nagar, Bhawarkua, and Annapurna campuses.",
      },
    ],
  },

  "power-bi-course-in-indore": {
    slug: "power-bi-course-in-indore",
    title: "Power BI Course in Indore",
    metaTitle: "Power BI Course in Indore — DAX, Data Modeling, Power Query & SQL",
    metaDescription:
      "Learn Microsoft Power BI, DAX, Power Query ETL, Star Schema Modeling & SQL at The Prime Step Indore. Build interactive corporate BI dashboards with 100% hands-on lab training.",
    keywords: [
      "Power BI course in Indore",
      "Microsoft Power BI training Vijay Nagar Indore",
      "DAX and Power Query classes Indore",
      "Business Intelligence course Bhawarkua Indore",
      "PL-300 Power BI certification prep Indore",
    ],
    eyebrow: "Executive Reporting & Business Intelligence Track",
    heroTitle: "Power BI & BI Mastery.",
    heroSubtitle:
      "Master Microsoft Power BI from raw data connectors and Power Query ETL to Star Schema modeling, advanced DAX formulas, and automated cloud workspace publishing.",
    duration: "6 – 8 Weeks",
    level: "Beginner to Advanced BI",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "4 Corporate BI Dashboards",
    roadmapId: "power-bi",
    overviewHeadline: "Transform static spreadsheets into live, interactive decision engines.",
    overviewBody: [
      "Microsoft Power BI is the #1 Business Intelligence platform used by Fortune 500 enterprises, consulting firms, and fast-growing Indian businesses. Knowing how to connect multi-source data, model clean relationships, and write accurate DAX measures makes you indispensable to any analytics, finance, or operations team.",
      "At The Prime Step in Indore, our focused Power BI Mastery program teaches you far more than dragging charts onto a canvas. You will master Power Query (M) data transformation, dimensional Star Schema modeling, complex Time-Intelligence DAX, Row-Level Security (RLS), and Microsoft PL-300 exam concepts.",
    ],
    highlights: [
      {
        label: "Data ETL",
        value: "Power Query",
        detail: "Clean, unpivot, merge, and automate messy data from Excel, SQL, and APIs",
      },
      {
        label: "Data Modeling",
        value: "Star Schema",
        detail: "Fact and dimension tables, active/inactive relationships, and performance tuning",
      },
      {
        label: "Formula Engine",
        value: "Advanced DAX",
        detail: "CALCULATE, filter context, iterators (SUMX), and Time Intelligence (YoY/MTD)",
      },
      {
        label: "Cloud Sharing",
        value: "Power BI Service",
        detail: "Workspaces, scheduled refresh gateways, bookmarks, and Row-Level Security",
      },
    ],
    techCategories: [
      {
        category: "Data Ingestion & ETL",
        items: ["Power Query Editor", "M Language Basics", "SQL & CSV Connectors", "Web & API Data", "Data Profiling", "Unpivot & Merge"],
      },
      {
        category: "Dimensional Modeling",
        items: ["Star & Snowflake Schemas", "Fact vs Dimension Tables", "1-to-Many Cardinality", "Date/Calendar Tables", "Cross-Filter Optimization"],
      },
      {
        category: "DAX (Data Analysis Expressions)",
        items: ["Measures vs Columns", "Row & Filter Context", "CALCULATE & FILTER", "SUMX / AVERAGEX", "Time Intelligence (YTD, YoY)", "ALL & ALLEXCEPT"],
      },
      {
        category: "Visual Design & Governance",
        items: ["Interactive Bookmarks", "Drill-Through & Tooltips", "Custom KPI Visuals", "Row-Level Security (RLS)", "Power BI Service", "PL-300 Prep"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Power Query ETL & Multi-Source Data Cleaning",
        duration: "Weeks 1 – 2",
        summary: "Connect to databases, spreadsheets, and folders and automate data preparation.",
        topics: [
          "Connecting Power BI Desktop to Excel, CSV folders, SQL Server/PostgreSQL, and web sources",
          "Power Query transformations: splitting, unpivoting, conditional columns, and data type governance",
          "Merging and appending queries without duplicating rows",
          "Handling errors, parameters, and query folding for fast refreshes",
        ],
        deliverable: "Automated Multi-Region Folder Consolidation ETL Pipeline",
      },
      {
        number: "02",
        title: "Dimensional Data Modeling & Star Schema Architecture",
        duration: "Weeks 3 – 4",
        summary: "Structure high-performance data models that calculate accurately at scale.",
        topics: [
          "Why flat tables fail: designing clean Fact and Dimension tables",
          "Building a dedicated dynamic Calendar/Date table for time-based reporting",
          "Managing 1-to-Many relationships, bi-directional filtering pitfalls, and role-playing dimensions",
          "Hiding technical keys, creating hierarchies, and organizing measure tables",
        ],
        deliverable: "Enterprise E-Commerce & Inventory Star Schema Model",
      },
      {
        number: "03",
        title: "DAX Mastery: Context, Iterators & Time Intelligence",
        duration: "Weeks 5 – 6",
        summary: "Write powerful DAX formulas for financial, sales, and operational KPIs.",
        topics: [
          "Calculated Columns vs Measures: memory footprint and evaluation context",
          "Mastering CALCULATE, FILTER, ALL, ALLEXCEPT, and context transition",
          "Iterator functions: SUMX, AVERAGEX, RANKX, and dynamic top-N analysis",
          "Time Intelligence: YTD, QTD, MTD, SamePeriodLastYear, Rolling Averages, and customer retention",
        ],
        deliverable: "CFO Financial P&L and YoY Variance Calculation Engine",
      },
      {
        number: "04",
        title: "Executive Dashboard Design, RLS & Cloud Publishing",
        duration: "Weeks 7 – 8",
        summary: "Craft intuitive executive interfaces and publish securely to Power BI Service.",
        topics: [
          "Visual hierarchy, color restraint, custom report-page tooltips, and drill-through navigation",
          "Interactive bookmarks, dynamic titles, field parameters, and What-If scenario sliders",
          "Configuring static and dynamic Row-Level Security (RLS) by region or manager",
          "Publishing to Power BI Service, workspaces, apps, and PL-300 certification readiness",
        ],
        deliverable: "4-Dashboard Executive BI Portfolio + Mock Interview Review",
      },
    ],
    projects: [
      {
        title: "CFO Financial Performance & P&L Variance Suite",
        stack: "Power BI · Advanced DAX · Star Schema · RLS",
        description:
          "An executive financial cockpit tracking revenue, COGS, net margin, budget vs actuals, and YoY growth with regional Row-Level Security.",
        outcomes: ["Time Intelligence", "What-If Parameters", "Row-Level Security", "Executive UX"],
      },
      {
        title: "SupplyChain Pro Logistics & Inventory Tracker",
        stack: "Power BI · Power Query · SQL Server",
        description:
          "Tracks warehouse stockouts, vendor lead times, shipping SLA compliance, and reorder alerts across 40+ SKUs.",
        outcomes: ["Multi-Table ETL", "Custom Tooltips", "SLA Metrics", "Drill-Through"],
      },
    ],
    careerRoles: [
      {
        role: "Power BI Developer",
        skills: "Power BI · DAX · Power Query · SQL",
        description: "Design, optimize, and maintain enterprise reporting models and interactive dashboards.",
      },
      {
        role: "MIS & Financial Analyst",
        skills: "Power BI · Advanced Excel · Financial Modeling",
        description: "Automate monthly management reporting, revenue forecasting, and KPI tracking.",
      },
      {
        role: "Business Analyst",
        skills: "BI Visualization · SQL · Stakeholder Reporting",
        description: "Bridge business teams and technical data warehouses with actionable visual insights.",
      },
    ],
    faqs: [
      {
        q: "Do I need coding experience to learn Microsoft Power BI?",
        a: "No prior coding is required. Power BI is designed for both business professionals (B.Com, MBA, Finance, HR) and technical learners. We teach DAX and SQL step by step from the beginning.",
      },
      {
        q: "Does this course help with the Microsoft PL-300 certification?",
        a: "Yes. Our 4 modules directly cover the 4 official domains of the Microsoft PL-300 (Power BI Data Analyst Associate) exam: Prepare the Data, Model the Data, Visualize and Analyze the Data, and Deploy and Maintain Assets.",
      },
    ],
  },

  "artificial-intelligence-and-machine-learning-course": {
    slug: "artificial-intelligence-and-machine-learning-course",
    title: "Artificial Intelligence and Machine Learning Course",
    metaTitle: "AI & Machine Learning Course in Indore — Deep Learning, NLP & Generative AI",
    metaDescription:
      "Learn Artificial Intelligence, Machine Learning, Deep Learning, NLP, Computer Vision & Generative AI (LLMs/RAG) with Python at The Prime Step Indore. Hands-on AI engineering labs.",
    keywords: [
      "Artificial Intelligence course in Indore",
      "Machine Learning classes in Indore",
      "AI and ML training institute Vijay Nagar Indore",
      "Generative AI and LLM course Indore",
      "Deep Learning Python course Indore",
    ],
    eyebrow: "Applied AI, Deep Learning & Generative AI Track",
    heroTitle: "Artificial Intelligence & ML.",
    heroSubtitle:
      "Understand how intelligent models learn from data — then build and deploy real Machine Learning, Deep Learning, NLP, and Generative AI (LLM & RAG) applications.",
    duration: "5 – 6 Months",
    level: "Beginner to Applied AI Engineer",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "4 Deployed AI & LLM Systems",
    roadmapId: "ai-ml",
    overviewHeadline: "Go beyond using AI tools — learn how to engineer and integrate them.",
    overviewBody: [
      "Artificial Intelligence is transforming how every software product is built. Companies today need engineers who not only understand classical Machine Learning (regression, classification, tree ensembles) but can also work with neural networks, computer vision, Natural Language Processing, and modern Large Language Model (LLM) APIs.",
      "At The Prime Step in Indore, our AI & Machine Learning program builds your foundation in Python, linear algebra intuition, and Scikit-Learn before guiding you into Deep Learning (TensorFlow/PyTorch fundamentals), vector embeddings, Retrieval-Augmented Generation (RAG), and FastAPI deployment.",
    ],
    highlights: [
      {
        label: "Classical ML",
        value: "Scikit-Learn & XGBoost",
        detail: "Predictive modeling, feature engineering, cross-validation, and ensemble methods",
      },
      {
        label: "Deep Learning",
        value: "Neural Networks",
        detail: "ANNs, CNNs for image recognition, and sequence models for text",
      },
      {
        label: "Modern GenAI",
        value: "LLMs & RAG Pipelines",
        detail: "Prompt engineering, vector databases, embeddings, and document Q&A agents",
      },
      {
        label: "AI Engineering",
        value: "FastAPI & Docker",
        detail: "Ship AI models as production REST endpoints and interactive web apps",
      },
    ],
    techCategories: [
      {
        category: "Python & Data Stack",
        items: ["Python 3.12+", "NumPy", "Pandas", "Matplotlib & Seaborn", "SQL", "Jupyter & Colab"],
      },
      {
        category: "Machine Learning",
        items: ["Scikit-Learn", "Supervised Learning", "Unsupervised Clustering", "Random Forest & XGBoost", "Feature Engineering", "Model Evaluation"],
      },
      {
        category: "Deep Learning & Vision/NLP",
        items: ["TensorFlow / Keras", "PyTorch Basics", "CNNs (Image Classification)", "NLP & Tokenization", "Sentiment & Text Models"],
      },
      {
        category: "Generative AI & Production",
        items: ["LLM APIs", "Vector Embeddings", "RAG Architecture", "FastAPI", "Streamlit", "Docker"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Python, Data Engineering & Mathematical Intuition",
        duration: "Weeks 1 – 5",
        summary: "Master Python programming, NumPy vector operations, and data preparation.",
        topics: [
          "Core & Object-Oriented Python for modular machine learning pipelines",
          "Vectorized computing with NumPy and dataset wrangling with Pandas",
          "Practical probability, distributions, gradients, and statistical evaluation metrics",
        ],
        deliverable: "Automated Feature Preprocessing & EDA Library",
      },
      {
        number: "02",
        title: "Supervised & Unsupervised Machine Learning",
        duration: "Weeks 6 – 12",
        summary: "Train and optimize production-grade predictive models with Scikit-Learn.",
        topics: [
          "Linear & Logistic Regression, Decision Trees, Random Forests, and Gradient Boosting (XGBoost)",
          "Hyperparameter optimization, k-fold cross-validation, and preventing overfitting",
          "Clustering (K-Means, DBSCAN), anomaly detection, and PCA dimensionality reduction",
        ],
        deliverable: "Real-Time Fraud Detection & Customer Segmentation Engine",
      },
      {
        number: "03",
        title: "Deep Learning, Computer Vision & NLP",
        duration: "Weeks 13 – 18",
        summary: "Build neural networks for images, sequences, and human language.",
        topics: [
          "Artificial Neural Networks (ANN): activation functions, backpropagation, and optimizers",
          "Convolutional Neural Networks (CNNs) for image classification and transfer learning",
          "Natural Language Processing: tokenization, word embeddings, and text classification",
        ],
        deliverable: "Medical/Defect Image Classifier & Sentiment Analysis API",
      },
      {
        number: "04",
        title: "Generative AI, RAG Systems & Cloud Deployment",
        duration: "Weeks 19 – 24",
        summary: "Build custom LLM applications with Retrieval-Augmented Generation and deploy to cloud.",
        topics: [
          "Working with LLM APIs, structured outputs, function calling, and embeddings",
          "Building Retrieval-Augmented Generation (RAG) systems over custom PDFs and SQL data",
          "Serving ML and GenAI pipelines through FastAPI and Docker containers",
        ],
        deliverable: "Deployed Enterprise Document AI Assistant + GitHub Portfolio",
      },
    ],
    projects: [
      {
        title: "DocuMind Enterprise RAG Knowledge Assistant",
        stack: "Python · Embeddings · Vector Search · FastAPI",
        description:
          "An AI assistant that ingests company PDFs and manuals, retrieves relevant context via vector similarity, and answers queries with citations.",
        outcomes: ["RAG Pipeline", "Vector Embeddings", "Citation Grounding", "FastAPI Backend"],
      },
      {
        title: "VisionInspect Automated Quality Classifier",
        stack: "Python · TensorFlow/Keras · CNN · Streamlit",
        description:
          "A computer vision web application using transfer learning to classify product defects from uploaded camera images.",
        outcomes: ["CNN Transfer Learning", "Image Augmentation", "Precision/Recall", "Live Web Demo"],
      },
      {
        title: "FraudShield Transaction Anomaly Detector",
        stack: "Python · Scikit-Learn · XGBoost · Docker",
        description:
          "A high-precision machine learning service detecting fraudulent payment patterns in highly imbalanced financial datasets.",
        outcomes: ["SMOTE Balancing", "XGBoost Tuning", "REST Inference", "Docker Container"],
      },
    ],
    careerRoles: [
      {
        role: "AI / Machine Learning Engineer",
        skills: "Python · Scikit-Learn · Deep Learning · FastAPI",
        description: "Design, train, and deploy predictive and generative AI models into production software.",
      },
      {
        role: "Generative AI / LLM Developer",
        skills: "Python · RAG · Vector DBs · API Integration",
        description: "Build intelligent copilots, document automation workflows, and AI-powered SaaS features.",
      },
      {
        role: "Junior Data Scientist",
        skills: "Python · Pandas · ML Modeling · SQL",
        description: "Analyze complex datasets and build predictive algorithms for business teams.",
      },
    ],
    faqs: [
      {
        q: "Do I need to know Python before joining the AI & Machine Learning course?",
        a: "No. Module 01 covers Python programming, NumPy, and Pandas from the ground up before moving into Machine Learning and Deep Learning.",
      },
      {
        q: "Does the course cover modern Generative AI and LLMs?",
        a: "Yes! In addition to classical Machine Learning and Deep Learning, Module 04 teaches you how to build real Retrieval-Augmented Generation (RAG) and LLM-powered applications.",
      },
    ],
  },

  "c-and-cpp-programming-classes": {
    slug: "c-and-cpp-programming-classes",
    title: "C and C++ Programming Classes",
    metaTitle: "C, C++ & Data Structures (DSA) Classes in Indore | The Prime Step",
    metaDescription:
      "Build unshakeable programming foundations with C, Object-Oriented C++ & Data Structures and Algorithms (DSA) at The Prime Step Indore. Ideal for B.Tech, BCA, MCA, and 12th pass students.",
    keywords: [
      "C and C++ programming classes in Indore",
      "Data Structures and Algorithms course Indore",
      "DSA coaching Vijay Nagar Bhawarkua Indore",
      "Coding classes for B.Tech BCA 1st year Indore",
      "C++ OOP training Indore",
    ],
    eyebrow: "Core Computer Science & Campus Placement Track",
    heroTitle: "C, C++ & Data Structures.",
    heroSubtitle:
      "Learn how computers actually work under the hood — mastering memory, pointers, Object-Oriented C++, STL, and Data Structures & Algorithms to crack technical coding interviews.",
    duration: "2.5 – 4 Months",
    level: "Absolute Beginner to Interview Ready",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "150+ Solved Coding Problems + 3 Systems Projects",
    roadmapId: "cpp-dsa",
    overviewHeadline: "The bedrock of every great software engineer.",
    overviewBody: [
      "Frameworks change every few years, but core programming logic, memory architecture, Object-Oriented design, and Data Structures & Algorithms (DSA) remain the permanent foundation of computer science. Product companies and campus recruiters test these exact fundamentals in their very first coding round.",
      "At The Prime Step in Indore, our C, C++ & DSA classes take you from writing your first loop and understanding how pointers work in memory to mastering Object-Oriented C++, the Standard Template Library (STL), and solving 150+ curated algorithmic problems across arrays, linked lists, trees, graphs, and dynamic programming.",
    ],
    highlights: [
      {
        label: "Hardware Logic",
        value: "C & Memory Pointers",
        detail: "Control flow, arrays, strings, structures, dynamic memory, and file handling",
      },
      {
        label: "OOP Discipline",
        value: "Modern C++ & STL",
        detail: "Classes, inheritance, polymorphism, templates, vectors, maps, and sets",
      },
      {
        label: "Algorithmic Core",
        value: "DSA Problem Solving",
        detail: "Time/space complexity (Big-O), recursion, sorting, trees, graphs, and DP",
      },
      {
        label: "Campus Prep",
        value: "150+ Lab Problems",
        detail: "Hands-on dry runs and whiteboard logic building for technical rounds",
      },
    ],
    techCategories: [
      {
        category: "C Programming Foundations",
        items: ["Control Structures", "Functions & Recursion", "Arrays & Strings", "Pointers & Memory", "Structures & Unions", "Dynamic Allocation (malloc/free)", "File Handling"],
      },
      {
        category: "Object-Oriented C++",
        items: ["Classes & Objects", "Constructors & Destructors", "Inheritance & Polymorphism", "Operator Overloading", "Virtual Functions", "Templates & Exception Handling"],
      },
      {
        category: "C++ STL & Linear DSA",
        items: ["STL Vectors, Maps, Sets", "Time & Space Complexity", "Two Pointers & Sliding Window", "Searching & Sorting", "Singly/Doubly Linked Lists", "Stacks & Queues"],
      },
      {
        category: "Non-Linear DSA & Algorithms",
        items: ["Binary Trees & BST", "Heaps & Priority Queues", "Hashing", "Graphs (BFS / DFS)", "Greedy Algorithms", "Dynamic Programming Basics"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "C Programming: Logic, Arrays & Memory Pointers",
        duration: "Weeks 1 – 4",
        summary: "Develop sharp algorithmic thinking and understand how variables live in memory.",
        topics: [
          "Data types, operators, conditional branching, nested loops, and pattern dry-runs",
          "Modular functions, call-by-value vs call-by-reference, and recursion trace trees",
          "1D & 2D matrices, string manipulation without built-in shortcuts, and structs",
          "Pointers demystified: pointer arithmetic, dynamic memory allocation, and file I/O",
        ],
        deliverable: "File-Backed Student Gradebook & Matrix Computation Engine in C",
      },
      {
        number: "02",
        title: "Object-Oriented Programming with C++ & STL",
        duration: "Weeks 5 – 8",
        summary: "Transition from procedural code to modular Object-Oriented C++ systems.",
        topics: [
          "Classes, encapsulation, constructors, destructors, and the 'this' pointer",
          "Inheritance hierarchies, runtime polymorphism, virtual functions, and abstract classes",
          "Generic programming with C++ Templates and the Standard Template Library (STL)",
          "Mastering vector, string, unordered_map, set, stack, queue, and priority_queue",
        ],
        deliverable: "Object-Oriented Banking & ATM Simulation System in C++",
      },
      {
        number: "03",
        title: "Linear Data Structures & Algorithmic Patterns",
        duration: "Weeks 9 – 12",
        summary: "Analyze Big-O complexity and master arrays, linked lists, stacks, and queues.",
        topics: [
          "Asymptotic analysis (Big-O, Omega, Theta) and space-time trade-offs",
          "Array techniques: prefix sums, two pointers, sliding window, and binary search on answer",
          "Sorting algorithms: Merge Sort, Quick Sort, and custom comparators",
          "Linked Lists, Stacks, and Queues implemented from scratch and applied to interview problems",
        ],
        deliverable: "Custom Undo/Redo Text Buffer & Expression Evaluator",
      },
      {
        number: "04",
        title: "Trees, Graphs, Dynamic Programming & Placement Coding",
        duration: "Weeks 13 – 16",
        summary: "Conquer non-linear data structures and timed technical coding tests.",
        topics: [
          "Binary Trees and Binary Search Trees (BST): traversals, height, diameter, and LCA",
          "Heaps, Priority Queues, and Hash Table collision handling",
          "Graph representations, Breadth-First Search (BFS), Depth-First Search (DFS), and shortest paths",
          "Introduction to Greedy strategies and Memoization / Tabulation in Dynamic Programming",
        ],
        deliverable: "Shortest-Path Campus Route Finder + 150 Solved DSA Problem Profile",
      },
    ],
    projects: [
      {
        title: "RouteOptima Graph Navigation Engine",
        stack: "C++ · STL · Graphs · Dijkstra's Algorithm",
        description:
          "A command-line pathfinding engine that models city intersections as weighted graphs and computes optimal travel routes.",
        outcomes: ["Graph Adjacency Lists", "Priority Queues", "Big-O Optimization", "Clean OOP"],
      },
      {
        title: "VaultCore C++ Banking & Ledger System",
        stack: "C++ · OOP · File Persistence · Exception Handling",
        description:
          "A multi-account banking terminal supporting account creation, interest computation, transaction history, and binary file storage.",
        outcomes: ["Polymorphism", "File Streams", "Memory Safety", "Modular Classes"],
      },
    ],
    careerRoles: [
      {
        role: "Campus Placement & Coding Round Readiness",
        skills: "DSA · C++ STL · Problem Solving · Big-O",
        description: "Crack online coding assessments and technical interviews for product and service companies.",
      },
      {
        role: "Software Development Engineer (SDE) Foundation",
        skills: "C · C++ · OOP · Memory Architecture",
        description: "Build the core computer science foundation to master any full-stack or backend technology effortlessly.",
      },
    ],
    faqs: [
      {
        q: "Should a 1st-year college student or 12th pass student start with C and C++?",
        a: "Yes. Starting with C and C++ gives you a crystal-clear understanding of loops, pointers, memory, and Object-Oriented Programming, making Java, Python, or Web Development 3x easier to learn afterward.",
      },
      {
        q: "Can I enroll only for C, only C++, or the complete C + C++ + DSA track?",
        a: "Yes, we offer both individual language modules (C or C++) and the complete integrated C + C++ + Data Structures & Algorithms track.",
      },
    ],
  },

  "android-app-development": {
    slug: "android-app-development",
    title: "Android App Development",
    metaTitle: "Android & Flutter App Development Course in Indore | The Prime Step",
    metaDescription:
      "Learn Mobile App Development with Dart, Flutter, Android, Firebase & REST APIs at The Prime Step Indore. Build and publish cross-platform iOS & Android apps in our practical labs.",
    keywords: [
      "Android app development course in Indore",
      "Flutter course in Indore",
      "Mobile app development classes Vijay Nagar Indore",
      "Dart and Flutter training Bhawarkua Indore",
    ],
    eyebrow: "Cross-Platform Mobile Engineering Track",
    heroTitle: "Android & Flutter App Dev.",
    heroSubtitle:
      "Design, build, and ship native-speed mobile applications for both Android and iOS from a single codebase using Dart, Flutter, Firebase, and RESTful APIs.",
    duration: "4 – 5 Months",
    level: "Beginner to App Publisher",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "4 Complete Mobile Apps",
    roadmapId: "flutter-android",
    overviewHeadline: "Build the apps that live in people's pockets.",
    overviewBody: [
      "Mobile apps are the primary touchpoint for e-commerce, fintech, food delivery, and consumer startups. With Google's Flutter framework and Dart language, developers can build smooth, 60/120fps Android and iOS apps simultaneously without maintaining two separate codebases.",
      "At The Prime Step in Indore, you test your code on real mobile devices in every lab session. You will learn Dart programming, responsive Flutter widget trees, state management (Provider/Riverpod/Bloc), Firebase authentication and real-time cloud databases, Google Maps/Camera hardware integration, and Play Store publishing.",
    ],
    highlights: [
      {
        label: "Language & SDK",
        value: "Dart & Flutter 3",
        detail: "Object-oriented async Dart and declarative Material/Cupertino UI widgets",
      },
      {
        label: "State & APIs",
        value: "Provider, Riverpod & REST",
        detail: "Clean architecture, JSON serialization, and reactive app state",
      },
      {
        label: "Cloud Backend",
        value: "Firebase & Firestore",
        detail: "Phone/Google Auth, real-time databases, push notifications, and storage",
      },
      {
        label: "Device Native",
        value: "Maps, Camera & Play Store",
        detail: "GPS geolocation, local SQLite/Hive storage, and APK/AAB release builds",
      },
    ],
    techCategories: [
      {
        category: "Dart Programming",
        items: ["Dart Syntax & Null Safety", "OOP & Mixins", "Futures, Async/Await & Streams", "Collections & Generics", "JSON Parsing"],
      },
      {
        category: "Flutter UI & Animations",
        items: ["Stateless & Stateful Widgets", "Flex, Stack & CustomScrollView", "Material 3 & Cupertino", "Responsive Screen Adaptation", "Hero & Implicit Animations"],
      },
      {
        category: "State Management & APIs",
        items: ["Provider & Riverpod", "REST API Integration (Dio/HTTP)", "JWT Token Storage", "Offline Caching (Hive / SQLite)", "Clean Architecture"],
      },
      {
        category: "Firebase & App Publishing",
        items: ["Firebase Auth", "Cloud Firestore", "Firebase Cloud Messaging (FCM)", "Google Maps SDK", "Android Studio & APK/Bundle Signing"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Dart Programming & Asynchronous Foundations",
        duration: "Weeks 1 – 3",
        summary: "Master null-safe Dart, object-oriented patterns, and async streams.",
        topics: [
          "Dart variables, null safety, functions, named parameters, and collections",
          "Object-oriented Dart: classes, constructors, inheritance, mixins, and abstract interfaces",
          "Asynchronous programming with Futures, async/await, and real-time Streams",
        ],
        deliverable: "CLI Weather & Currency API Fetcher in Dart",
      },
      {
        number: "02",
        title: "Flutter UI Architecture, Navigation & Animations",
        duration: "Weeks 4 – 8",
        summary: "Craft pixel-accurate, responsive mobile screens and smooth transitions.",
        topics: [
          "Widget tree lifecycle, Stateless vs Stateful widgets, and layout constraints",
          "Scrollable lists, grids, custom forms, validation, and theme management (Dark/Light mode)",
          "Multi-screen navigation, named routes, bottom tabs, drawers, and Hero transitions",
        ],
        deliverable: "Multi-Screen FinTech Expense & Budget Tracker UI",
      },
      {
        number: "03",
        title: "State Management, REST APIs & Local Persistence",
        duration: "Weeks 9 – 13",
        summary: "Connect mobile apps to live backends with scalable state management.",
        topics: [
          "Reactive state management using Provider and Riverpod",
          "Consuming REST APIs with HTTP/Dio, interceptors, loading skeletons, and error handling",
          "Offline-first storage on device using SharedPreferences, Hive, and SQLite",
        ],
        deliverable: "Live News, Crypto & E-Commerce Catalog Mobile App",
      },
      {
        number: "04",
        title: "Firebase Cloud, Device Sensors & Play Store Release",
        duration: "Weeks 14 – 18",
        summary: "Build real-time cloud apps with GPS/camera features and package for release.",
        topics: [
          "Firebase Authentication (Email, Google Sign-In, OTP) and Cloud Firestore real-time sync",
          "Push notifications (FCM), camera/gallery uploads, and Google Maps geolocation",
          "Performance profiling, app icons, keystore signing, and Google Play Store release workflow",
        ],
        deliverable: "Real-Time Food Delivery / Hyperlocal Service App + Signed Release APK",
      },
    ],
    projects: [
      {
        title: "QuickBite Hyperlocal Food Ordering App",
        stack: "Flutter · Dart · Firebase Firestore · Google Maps",
        description:
          "A complete mobile ordering app with restaurant discovery, live cart, Firebase user auth, and real-time order status tracking.",
        outcomes: ["Real-Time Firestore", "State Management", "Location Services", "Custom Animations"],
      },
      {
        title: "PocketLedger Personal Finance & Split-Bill App",
        stack: "Flutter · Riverpod · Hive Offline DB · Charts",
        description:
          "An offline-capable expense manager featuring category budgets, visual spending charts, and instant receipt photo attachments.",
        outcomes: ["Offline Persistence", "Interactive Charts", "Camera Integration", "Dark Mode"],
      },
    ],
    careerRoles: [
      {
        role: "Flutter Mobile App Developer",
        skills: "Flutter · Dart · REST APIs · Firebase",
        description: "Build cross-platform iOS and Android applications for startups and product companies.",
      },
      {
        role: "Android Application Engineer",
        skills: "Mobile UI · State Management · Play Store Deployment",
        description: "Develop, test, and maintain consumer and enterprise mobile apps.",
      },
    ],
    faqs: [
      {
        q: "Does Flutter build apps for both Android and iPhone (iOS)?",
        a: "Yes. Flutter compiles a single Dart codebase into native ARM code for both Android and iOS devices, making it one of the most sought-after skills in mobile development.",
      },
      {
        q: "Can I test the apps on my own phone during the classes?",
        a: "Yes! From the second week of class, you will connect your own smartphone in our Indore computer labs and run the apps you build directly on your device.",
      },
    ],
  },

  "web-design-and-php-full-stack-course": {
    slug: "web-design-and-php-full-stack-course",
    title: "Web Design and PHP Full Stack Course",
    metaTitle: "Web Designing & Full Stack PHP / MEAN Course in Indore | The Prime Step",
    metaDescription:
      "Learn Responsive Web Designing (HTML5, CSS3, Tailwind, JavaScript, Bootstrap) and Full Stack PHP / Laravel / MySQL or Angular (MEAN) at The Prime Step Indore.",
    keywords: [
      "Web designing course in Indore",
      "PHP and MySQL training in Indore",
      "MEAN stack course Indore",
      "Frontend web design classes Vijay Nagar Indore",
      "HTML CSS JavaScript Bootstrap course Indore",
    ],
    eyebrow: "Frontend Design & Full Stack Web Track",
    heroTitle: "Web Design & Full Stack PHP / MEAN.",
    heroSubtitle:
      "Master modern responsive Web Designing (HTML5, CSS3, Tailwind, JavaScript) paired with robust server-side engineering in PHP/Laravel, MySQL, and Angular.",
    duration: "4 – 5 Months",
    level: "Beginner to Full Stack Web Developer",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "4 Live Websites & Web Apps",
    roadmapId: "web-php",
    overviewHeadline: "Design beautiful interfaces and power them with dynamic databases.",
    overviewBody: [
      "Over 75% of the web—including content platforms, e-commerce stores, and enterprise portals—relies on rock-solid HTML/CSS/JavaScript frontends paired with PHP/MySQL or Angular (MEAN) backends. Mastering both responsive UI design and server-side database logic opens doors to web agencies, IT firms, and freelance careers alike.",
      "At The Prime Step in Indore, you start by crafting responsive, mobile-first websites using HTML5, CSS3, Bootstrap, Tailwind CSS, and JavaScript, then connect them to relational MySQL databases and server backends.",
    ],
    highlights: [
      {
        label: "UI & Responsive Design",
        value: "HTML5, CSS3 & Tailwind",
        detail: "Flexbox, CSS Grid, Bootstrap 5, Tailwind CSS, and mobile-first layouts",
      },
      {
        label: "Interactive Frontend",
        value: "JavaScript & Angular",
        detail: "DOM manipulation, ES6+, TypeScript basics, and single-page web apps",
      },
      {
        label: "Server & CMS",
        value: "PHP 8 & Laravel",
        detail: "Server-side scripting, MVC architecture, authentication, and REST APIs",
      },
      {
        label: "Database & Hosting",
        value: "MySQL & cPanel/Cloud",
        detail: "Relational schemas, CRUD operations, domain setup, and live web hosting",
      },
    ],
    techCategories: [
      {
        category: "Frontend Web Design",
        items: ["HTML5 Semantics", "CSS3 Flexbox & Grid", "Bootstrap 5", "Tailwind CSS", "Responsive Media Queries", "UI/UX Layout Principles"],
      },
      {
        category: "JavaScript & MEAN",
        items: ["JavaScript ES6+", "DOM & Events", "Fetch API & AJAX", "TypeScript Basics", "Angular Components", "RxJS Basics"],
      },
      {
        category: "PHP & Backend",
        items: ["Core PHP 8+", "OOP in PHP", "Laravel MVC Framework", "Session & Cookie Auth", "Form Security & Validation", "Payment Gateway Integration"],
      },
      {
        category: "Database & Deployment",
        items: ["MySQL & phpMyAdmin", "PDO Prepared Statements", "SQL Joins", "Git & GitHub", "Live Server & Domain Deployment"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Modern Web Designing: HTML5, CSS3, Bootstrap & Tailwind",
        duration: "Weeks 1 – 5",
        summary: "Convert any design concept into a fast, mobile-responsive website.",
        topics: [
          "HTML5 semantic tags, forms, multimedia, SEO meta structure, and web accessibility",
          "CSS3 layouts with Flexbox and Grid, custom animations, and responsive breakpoints",
          "Rapid responsive styling with Bootstrap 5 and utility-first Tailwind CSS",
        ],
        deliverable: "3 Multi-Page Responsive Business & Portfolio Websites",
      },
      {
        number: "02",
        title: "Interactive JavaScript, DOM & Angular Foundations",
        duration: "Weeks 6 – 10",
        summary: "Add dynamic interactivity, client-side validation, and API integration.",
        topics: [
          "JavaScript fundamentals, arrays, objects, DOM manipulation, and event listeners",
          "Asynchronous requests using Fetch API / AJAX for page updates without reloading",
          "Introduction to TypeScript and component-driven single-page apps with Angular",
        ],
        deliverable: "Dynamic Interactive Dashboard & Client-Side Booking App",
      },
      {
        number: "03",
        title: "Server-Side Engineering with PHP 8 & MySQL",
        duration: "Weeks 11 – 15",
        summary: "Build dynamic database-driven web applications and admin panels.",
        topics: [
          "Server-side execution, PHP syntax, forms, file uploads, and session authentication",
          "Designing relational MySQL databases, SQL queries, and secure PDO database connections",
          "Building complete CRUD admin panels with role-based login and security against SQL injection",
        ],
        deliverable: "Custom E-Commerce Store & Dynamic Content Management System",
      },
      {
        number: "04",
        title: "Laravel MVC Framework & Live Web Hosting",
        duration: "Weeks 16 – 20",
        summary: "Structure enterprise PHP apps with Laravel and deploy to live domains.",
        topics: [
          "Laravel MVC routing, Blade templates, Eloquent ORM, and database migrations",
          "REST API creation, middleware security, and Razorpay/Stripe checkout integration",
          "Deploying websites and databases to live cloud/cPanel hosting with SSL certificates",
        ],
        deliverable: "Live Hosted Full-Stack Web Portal + Developer Portfolio",
      },
    ],
    projects: [
      {
        title: "ShopSphere Dynamic E-Commerce & Admin CMS",
        stack: "PHP / Laravel · MySQL · Tailwind CSS · JavaScript",
        description:
          "A complete online store with category filters, shopping cart, customer orders, and a secure merchant dashboard.",
        outcomes: ["MySQL Schema", "Session Auth", "Admin CRUD", "Responsive UI"],
      },
      {
        title: "EstateVista Property Listing & Inquiry Portal",
        stack: "HTML5 · Tailwind CSS · JavaScript · PHP/MySQL",
        description:
          "A real-estate platform allowing users to search properties by city/budget, view photo galleries, and submit inquiries.",
        outcomes: ["Dynamic Search", "Image Uploads", "Mobile First", "Lead Management"],
      },
    ],
    careerRoles: [
      {
        role: "Frontend Web Designer / UI Developer",
        skills: "HTML5 · CSS3 · Tailwind · JavaScript",
        description: "Craft responsive, pixel-accurate websites and user interfaces for brands and tech companies.",
      },
      {
        role: "Full Stack PHP / Laravel Developer",
        skills: "PHP · Laravel · MySQL · JavaScript",
        description: "Build and maintain dynamic web portals, CMS platforms, and e-commerce applications.",
      },
    ],
    faqs: [
      {
        q: "Can I enroll only for Frontend Web Designing or the full Web Design + PHP/Full Stack course?",
        a: "Both options are available! You can take the focused 2-month Web Designing track (HTML, CSS, Tailwind, Bootstrap, JS) or the complete 4–5 month Full Stack track.",
      },
    ],
  },

  "tally-gst-mastery-course": {
    slug: "tally-gst-mastery-course",
    title: "Tally GST Mastery Course",
    metaTitle: "Tally Prime with GST & Advanced Excel Course in Indore | The Prime Step",
    metaDescription:
      "Learn practical Computerized Accounting in Tally Prime with GST, Payroll, Banking, MS Office & Advanced Excel MIS Reporting at The Prime Step Indore (Vijay Nagar, Bhawarkua & Annapurna).",
    keywords: [
      "Tally GST course in Indore",
      "Tally Prime classes Vijay Nagar Indore",
      "Advanced Excel and MIS training Indore",
      "Computer accounting course Bhawarkua Indore",
      "MS Office and Tally coaching Indore",
    ],
    eyebrow: "Accounting, Taxation & Corporate Office Mastery",
    heroTitle: "Tally Prime, GST & Advanced Excel.",
    heroSubtitle:
      "Master practical computerized accounting, GST return filing, inventory & payroll management, and Advanced Excel MIS reporting — the essential skills required by every business and finance office.",
    duration: "2 – 3 Months",
    level: "Beginner Friendly (Commerce & Non-Commerce)",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "Real Company Vouchers, GST Returns & MIS Workbooks",
    roadmapId: "tally-excel",
    overviewHeadline: "Practical accounting and office automation taught on real business data.",
    overviewBody: [
      "Every trading firm, manufacturing unit, CA practice, and corporate office in Indore requires professionals who can manage accounts accurately in Tally Prime, file GST returns without errors, and prepare crisp MIS reports in Microsoft Excel.",
      "At The Prime Step in Indore, you practice on realistic company books from day one: creating ledgers, recording purchase/sales vouchers, reconciling bank statements, managing multi-godown inventory, computing CGST/SGST/IGST, generating e-Way bills and e-Invoices, and automating Excel reports with VLOOKUP/XLOOKUP and Pivot Tables.",
    ],
    highlights: [
      {
        label: "Accounting Core",
        value: "Tally Prime Latest",
        detail: "Company creation, ledgers, voucher entry, BRS, cost centers, and balance sheets",
      },
      {
        label: "Taxation & Compliance",
        value: "GST, TDS & Payroll",
        detail: "GSTR-1, GSTR-2B reconciliation, GSTR-3B, e-Invoice, e-Way Bill, and TDS",
      },
      {
        label: "Spreadsheet Power",
        value: "Advanced Excel MIS",
        detail: "XLOOKUP, Pivot Tables, conditional formatting, data validation, and dashboards",
      },
      {
        label: "Workplace Suite",
        value: "MS Word & PowerPoint",
        detail: "Corporate documentation, mail merge, invoice templates, and presentations",
      },
    ],
    techCategories: [
      {
        category: "Tally Prime Accounting",
        items: ["Company & Ledger Setup", "Accounting Vouchers", "Inventory & Godown Management", "Bill-Wise Debtors/Creditors", "Bank Reconciliation (BRS)", "Balance Sheet & P&L"],
      },
      {
        category: "GST & Statutory Taxation",
        items: ["CGST / SGST / IGST Setup", "HSN & SAC Codes", "GSTR-1 & GSTR-3B", "GSTR-2A/2B Reconciliation", "e-Invoicing & e-Way Bill", "TDS & TCS Accounting", "Payroll & PF/ESI"],
      },
      {
        category: "Advanced Excel & MIS",
        items: ["VLOOKUP, XLOOKUP & HLOOKUP", "INDEX-MATCH", "SUMIFS & COUNTIFS", "Pivot Tables & Charts", "Data Validation & Protection", "Automated MIS Templates"],
      },
      {
        category: "MS Office Productivity",
        items: ["MS Word Formatting & Mail Merge", "Corporate Proposals", "MS PowerPoint Presentations", "PDF & Cloud Workflows"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "MS Office Foundations & Advanced Excel for MIS",
        duration: "Weeks 1 – 4",
        summary: "Master professional documentation and build automated Excel reporting sheets.",
        topics: [
          "MS Word & PowerPoint for business letters, mail merge, contracts, and executive slides",
          "Excel core to advanced: logical functions (IF, AND, OR), text/date formulas, and named ranges",
          "Lookup mastery: VLOOKUP, XLOOKUP, INDEX-MATCH, and multi-condition SUMIFS/COUNTIFS",
          "Interactive Pivot Tables, slicers, charts, and automated monthly MIS attendance/sales trackers",
        ],
        deliverable: "Automated Corporate Payroll, Attendance & Sales MIS Workbook",
      },
      {
        number: "02",
        title: "Computerized Accounting & Inventory in Tally Prime",
        duration: "Weeks 5 – 8",
        summary: "Manage end-to-end books of accounts, inventory godowns, and bank reconciliations.",
        topics: [
          "Golden rules of accounting, journal entries, company creation, and chart of accounts in Tally Prime",
          "Recording Contra, Payment, Receipt, Journal, Sales, Purchase, Debit Note, and Credit Note vouchers",
          "Stock groups, units of measure, batch-wise/expiry inventory, Purchase Orders (PO), and Sales Orders",
          "Cost centers, interest calculation, Bank Reconciliation Statement (BRS), and Trial Balance / Balance Sheet analysis",
        ],
        deliverable: "Full Financial-Year Books of Accounts for a Trading & Manufacturing Firm",
      },
      {
        number: "03",
        title: "GST Compliance, TDS, Payroll & Finalization of Accounts",
        duration: "Weeks 9 – 12",
        summary: "Configure GST taxation, generate e-Invoices/returns, and process employee payroll.",
        topics: [
          "Enabling GST in Tally Prime: intra-state (CGST+SGST) and inter-state (IGST) goods and services",
          "Reverse Charge Mechanism (RCM), composition vs regular dealers, e-Way Bill, and e-Invoicing",
          "Generating GSTR-1, reconciling GSTR-2B input tax credit (ITC), and preparing GSTR-3B",
          "TDS deduction/reporting, employee payroll (Basic, HRA, PF, ESI), and year-end account finalization",
        ],
        deliverable: "Complete GST Return Filing & Audited Balance Sheet Capstone",
      },
    ],
    projects: [
      {
        title: "Full-Year Trading & GST Compliance Simulation",
        stack: "Tally Prime · GST · BRS · Inventory",
        description:
          "Maintain 12 months of purchase, sales, banking, and inventory transactions for a wholesale distributor, culminating in GSTR-1/3B reports and a finalized Balance Sheet.",
        outcomes: ["Voucher Accuracy", "GST Reconciliation", "Bank Reconciliation", "Final Accounts"],
      },
      {
        title: "Executive MIS & Payroll Automation Suite",
        stack: "Advanced Excel · XLOOKUP · Pivot Dashboards",
        description:
          "An automated Excel system computing employee salaries, PF/ESI deductions, sales commissions, and regional revenue KPIs.",
        outcomes: ["XLOOKUP & SUMIFS", "Dynamic Pivot Charts", "Error-Free Formulas", "Print-Ready Reports"],
      },
    ],
    careerRoles: [
      {
        role: "Accountant & GST Executive",
        skills: "Tally Prime · GST Filing · TDS · Finalization",
        description: "Manage daily accounting vouchers, taxation compliance, and financial statements for businesses and CA firms.",
      },
      {
        role: "MIS Executive & Back-Office Coordinator",
        skills: "Advanced Excel · Pivot Tables · Reporting · MS Office",
        description: "Prepare daily/monthly operational reports, inventory trackers, and management dashboards.",
      },
    ],
    faqs: [
      {
        q: "Can a non-commerce student learn Tally Prime and GST?",
        a: "Yes! We teach the Golden Rules of Accounting and basic debit/credit concepts from scratch in simple language before moving into Tally Prime and GST.",
      },
      {
        q: "Can I enroll in Advanced Excel separately or combined with Tally & GST?",
        a: "You can enroll in either the standalone Advanced Excel & MS Office course or the complete combined Tally Prime + GST + Advanced Excel program.",
      },
    ],
  },

  "digital-marketing-course-in-indore": {
    slug: "digital-marketing-course-in-indore",
    title: "Digital Marketing Course in Indore",
    metaTitle: "Digital Marketing Course in Indore — SEO, Google Ads, Meta Ads & Analytics",
    metaDescription:
      "Master Practical Digital Marketing in Indore at The Prime Step. Learn Technical SEO, Google Ads (PPC), Meta/Instagram Ads, Social Media Marketing, GA4 Analytics & AI Content Strategy.",
    keywords: [
      "Digital Marketing course in Indore",
      "SEO and Google Ads training Vijay Nagar Indore",
      "Performance marketing classes Indore",
      "Social media marketing course Bhawarkua Indore",
    ],
    eyebrow: "Growth, Search Authority & Performance Marketing Track",
    heroTitle: "Digital Marketing & SEO.",
    heroSubtitle:
      "Master the science of organic search rankings and high-ROI paid acquisition — covering Technical SEO, Google Search/Display Ads, Meta & Instagram Ads, GA4 Analytics, and conversion funnels.",
    duration: "3 – 4 Months",
    level: "Beginner to Growth Marketer",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "Live Website SEO Audit & Ad Campaigns",
    roadmapId: "digital-marketing",
    overviewHeadline: "Learn digital marketing by ranking real pages and optimizing real campaigns.",
    overviewBody: [
      "Every business—from local Indore brands and real estate developers to global SaaS startups and e-commerce stores—needs skilled digital marketers who can generate qualified traffic, leads, and sales. Slides alone don't teach marketing; working inside Google Search Console, Google Ads Manager, Meta Business Suite, and GA4 does.",
      "At The Prime Step in Indore, you learn end-to-end digital growth: keyword intelligence, on-page and technical SEO, local Google Business Profile ranking, paid search and shopping campaigns, Meta/Instagram performance ads, and conversion rate optimization.",
    ],
    highlights: [
      {
        label: "Organic Search",
        value: "Technical & Local SEO",
        detail: "Keyword research, on-page optimization, schema markup, backlinks, and Search Console",
      },
      {
        label: "Paid Search (PPC)",
        value: "Google & YouTube Ads",
        detail: "Search, Display, Remarketing, bidding strategies, Quality Score, and ROAS",
      },
      {
        label: "Paid Social",
        value: "Meta & LinkedIn Ads",
        detail: "Audience targeting, Meta Pixel, lookalike funnels, and creative A/B testing",
      },
      {
        label: "Data & Funnels",
        value: "GA4 & Tag Manager",
        detail: "Conversion tracking, attribution modeling, landing page CRO, and reporting",
      },
    ],
    techCategories: [
      {
        category: "Search Engine Optimization (SEO)",
        items: ["Keyword Intent Research", "On-Page & Content SEO", "Technical SEO & Core Web Vitals", "Schema.org JSON-LD", "Google Search Console", "Local SEO (Google Business)"],
      },
      {
        category: "Performance Marketing (PPC)",
        items: ["Google Search Ads", "Display & YouTube Ads", "Keyword Match Types & Negative Lists", "Meta Business Suite", "Instagram & Facebook Ads", "Meta Pixel & Retargeting"],
      },
      {
        category: "Analytics & Tracking",
        items: ["Google Analytics 4 (GA4)", "Google Tag Manager (GTM)", "UTM Campaign Tracking", "Conversion Funnels", "Looker Studio Dashboards"],
      },
      {
        category: "Content, Email & Strategy",
        items: ["Landing Page Copywriting", "Canva & Ad Creatives", "LinkedIn B2B Growth", "Email Automation", "AI Marketing Workflows"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Website Architecture, Landing Pages & Complete SEO Mastery",
        duration: "Weeks 1 – 4",
        summary: "Rank websites on Google through keyword research, on-page, technical, and local SEO.",
        topics: [
          "How search engines crawl, index, and rank pages; mapping buyer-intent keywords",
          "On-page SEO: title tags, meta descriptions, H1–H3 hierarchy, internal linking, and structured data",
          "Technical SEO audits: sitemaps, robots.txt, canonicals, 301 redirects, and page speed",
          "Google Search Console mastery and Local SEO for dominating Google Maps packs",
        ],
        deliverable: "Full Technical & Content SEO Audit + Live Ranking Strategy",
      },
      {
        number: "02",
        title: "Google Ads (SEM / PPC) & High-Intent Lead Generation",
        duration: "Weeks 5 – 8",
        summary: "Structure profitable Google Search, Display, and YouTube ad campaigns.",
        topics: [
          "Campaign hierarchy, keyword match types (Exact, Phrase, Broad), and negative keyword lists",
          "Writing high-CTR responsive search ads, ad extensions/assets, and landing page alignment",
          "Bidding strategies (Maximize Conversions, Target CPA, ROAS) and Quality Score optimization",
        ],
        deliverable: "Complete Multi-Ad-Group Google Search & Remarketing Campaign Blueprint",
      },
      {
        number: "03",
        title: "Meta (Facebook & Instagram) Ads & Social Media Growth",
        duration: "Weeks 9 – 12",
        summary: "Build full-funnel paid social campaigns, custom audiences, and retargeting loops.",
        topics: [
          "Meta Business Manager setup, Meta Pixel events, and Conversions API fundamentals",
          "Audience architecture: Core, Custom (website visitors, video viewers), and Lookalike audiences",
          "Designing scroll-stopping ad hooks, carousel/reel creatives, and A/B split testing",
        ],
        deliverable: "Full-Funnel E-Commerce & Lead-Gen Meta Ads Campaign",
      },
      {
        number: "04",
        title: "GA4 Analytics, Tag Manager & Agency Portfolio",
        duration: "Weeks 13 – 16",
        summary: "Track every click and conversion with GA4/GTM and prepare for marketing roles.",
        topics: [
          "Setting up Google Tag Manager triggers (form submits, button clicks, WhatsApp clicks)",
          "Google Analytics 4 (GA4) custom events, conversion funnels, and ROI client reporting",
          "Preparing your digital marketing case-study portfolio and Google/HubSpot certifications",
        ],
        deliverable: "GA4 + Looker Studio Client Attribution Dashboard & Portfolio",
      },
    ],
    projects: [
      {
        title: "360° Technical & Local SEO Growth Audit",
        stack: "Google Search Console · Screaming Frog · Schema JSON-LD",
        description:
          "Perform a complete technical, on-page, and local SEO overhaul for a real business website to capture top-3 organic rankings.",
        outcomes: ["Keyword Mapping", "Technical Fixes", "Local Pack Ranking", "Search Console"],
      },
      {
        title: "High-ROAS Google & Meta Performance Funnel",
        stack: "Google Ads · Meta Ads Manager · GTM · GA4",
        description:
          "Architect a cross-channel paid acquisition funnel with retargeting audiences, conversion tracking, and CPA optimization.",
        outcomes: ["PPC Structuring", "Pixel Tracking", "Creative Testing", "ROAS Reporting"],
      },
    ],
    careerRoles: [
      {
        role: "Digital Marketing Executive / Strategist",
        skills: "SEO · Social Media · Content · Analytics",
        description: "Manage multi-channel digital presence, organic traffic growth, and lead generation.",
      },
      {
        role: "Performance Marketing / PPC Specialist",
        skills: "Google Ads · Meta Ads · GTM · ROAS Optimization",
        description: "Run and scale paid search and social ad budgets for brands and agencies.",
      },
      {
        role: "SEO Analyst",
        skills: "Technical SEO · On-Page · Search Console · Link Building",
        description: "Grow organic search rankings, site authority, and inbound search traffic.",
      },
    ],
    faqs: [
      {
        q: "Is Digital Marketing a good career for non-coding students, entrepreneurs, and freelancers?",
        a: "Yes! Digital Marketing requires zero software programming. It is ideal for BBA/MBA/B.Com graduates, career switchers, freelancers, and business owners who want to scale online sales.",
      },
    ],
  },

  "devops-and-cloud-computing-course": {
    slug: "devops-and-cloud-computing-course",
    title: "DevOps and Cloud Computing Course",
    metaTitle: "AWS Cloud & DevOps Course in Indore — Docker, Kubernetes, CI/CD & Linux",
    metaDescription:
      "Master AWS Cloud Computing & DevOps Engineering at The Prime Step Indore. Hands-on lab training in Linux, Git, Docker, Kubernetes, Jenkins/GitHub Actions CI/CD, Terraform & AWS.",
    keywords: [
      "DevOps course in Indore",
      "AWS Cloud computing classes in Indore",
      "Docker Kubernetes Terraform training Indore",
      "Cloud engineering institute Vijay Nagar Indore",
    ],
    eyebrow: "Cloud Infrastructure & DevOps Automation Track",
    heroTitle: "AWS Cloud & DevOps.",
    heroSubtitle:
      "Automate how modern software is built, containerized, deployed, and scaled — mastering Linux, AWS Cloud, Docker, Kubernetes, CI/CD pipelines, and Infrastructure as Code (Terraform).",
    duration: "4 – 5 Months",
    level: "Beginner to Cloud / DevOps Engineer",
    format: "In-Campus Practical Labs (Indore)",
    projectsCount: "4 Automated Cloud & CI/CD Pipelines",
    roadmapId: "devops-cloud",
    overviewHeadline: "Bridge code and cloud infrastructure with complete automation.",
    overviewBody: [
      "Modern software teams deploy code dozens of times a day. DevOps and Cloud Engineers build the automated pipelines, container clusters, and cloud infrastructure that keep applications fast, secure, and resilient at scale.",
      "At The Prime Step in Indore, you start with Linux administration, shell scripting, and networking fundamentals before diving deep into AWS core services (EC2, S3, IAM, VPC, RDS), containerization with Docker, orchestration with Kubernetes, CI/CD automation with GitHub Actions & Jenkins, and Terraform.",
    ],
    highlights: [
      {
        label: "OS & Scripting",
        value: "Linux & Bash",
        detail: "Linux permissions, systemd, networking, SSH, and automated shell scripts",
      },
      {
        label: "Cloud Platform",
        value: "Amazon Web Services",
        detail: "IAM, EC2, VPC, S3, RDS, Load Balancers, Auto Scaling, and CloudWatch",
      },
      {
        label: "Containers",
        value: "Docker & Kubernetes",
        detail: "Multi-stage Dockerfiles, Docker Compose, K8s Pods, Deployments, and Services",
      },
      {
        label: "CI/CD & IaC",
        value: "GitHub Actions & Terraform",
        detail: "Automated build/test/deploy pipelines and declarative cloud provisioning",
      },
    ],
    techCategories: [
      {
        category: "Linux, Networking & Git",
        items: ["Ubuntu / RHEL Linux", "Bash Shell Scripting", "SSH, DNS, HTTP/HTTPS & Firewalls", "Nginx Reverse Proxy", "Git & GitHub Workflows"],
      },
      {
        category: "AWS Cloud Infrastructure",
        items: ["IAM Security", "EC2 & Auto Scaling", "VPC, Subnets & Security Groups", "S3 & CloudFront", "RDS Databases", "Route 53 & ALB"],
      },
      {
        category: "Containers & Orchestration",
        items: ["Docker Engine", "Multi-Stage Dockerfiles", "Docker Compose", "Kubernetes (K8s) Architecture", "Pods, Services & Ingress", "Helm Basics"],
      },
      {
        category: "CI/CD, IaC & Monitoring",
        items: ["GitHub Actions", "Jenkins Pipelines", "Terraform (IaC)", "Prometheus & Grafana", "AWS CloudWatch"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Linux System Administration, Networking & Bash Scripting",
        duration: "Weeks 1 – 4",
        summary: "Master the command line, server security, and automated bash scripts.",
        topics: [
          "Linux file system hierarchy, users/groups, chmod/chown permissions, and package managers",
          "Process management, systemd services, cron jobs, SSH key authentication, and Nginx setup",
          "Networking fundamentals: IP addressing, CIDR, DNS, ports, load balancing, and SSL/TLS",
          "Writing Bash scripts for automated backups, log rotation, and server health checks",
        ],
        deliverable: "Automated Linux Server Hardening & Backup Script Suite",
      },
      {
        number: "02",
        title: "AWS Cloud Architecture & Core Services",
        duration: "Weeks 5 – 9",
        summary: "Design secure, highly available cloud infrastructure on Amazon Web Services.",
        topics: [
          "IAM users, roles, least-privilege policies, and multi-factor security",
          "Designing custom VPCs: public/private subnets, Internet Gateways, NAT, and Security Groups",
          "Compute & Storage: EC2 instances, AMIs, Application Load Balancers (ALB), Auto Scaling, S3, and RDS",
        ],
        deliverable: "Highly Available Multi-AZ Web Architecture on AWS VPC",
      },
      {
        number: "03",
        title: "Containerization with Docker & Kubernetes Orchestration",
        duration: "Weeks 10 – 14",
        summary: "Package microservices into lightweight containers and orchestrate them at scale.",
        topics: [
          "Docker architecture, writing optimized multi-stage Dockerfiles, volumes, and bridge networks",
          "Multi-container local stacks with Docker Compose (Frontend + Backend + DB + Redis)",
          "Kubernetes core: Cluster architecture, Pods, ReplicaSets, Deployments, Services, ConfigMaps, and Secrets",
        ],
        deliverable: "Containerized Microservices Cluster with Zero-Downtime Rolling Updates",
      },
      {
        number: "04",
        title: "CI/CD Pipelines, Terraform IaC & Observability",
        duration: "Weeks 15 – 18",
        summary: "Automate infrastructure provisioning and continuous deployment from Git push to production.",
        topics: [
          "Building automated CI/CD pipelines with GitHub Actions and Jenkins (lint, test, Docker build, deploy)",
          "Infrastructure as Code (IaC) with Terraform: providers, state management, modules, and AWS provisioning",
          "Monitoring and alerting with AWS CloudWatch, Prometheus, and Grafana dashboards",
        ],
        deliverable: "End-to-End Terraform + GitHub Actions CI/CD Production Pipeline",
      },
    ],
    projects: [
      {
        title: "Zero-Downtime CI/CD Microservice Pipeline",
        stack: "GitHub Actions · Docker · AWS EC2/ECR · Nginx",
        description:
          "An automated pipeline that tests code on every pull request, builds a Docker image, pushes to a registry, and deploys to AWS with zero downtime.",
        outcomes: ["Automated Testing", "Docker Registry", "Reverse Proxy", "Rollback Safety"],
      },
      {
        title: "Terraform Multi-Tier AWS Cloud Provisioner",
        stack: "Terraform · AWS VPC · ALB · RDS · S3",
        description:
          "Declarative Terraform modules that spin up a complete production VPC, load-balanced compute tier, and private RDS database in one command.",
        outcomes: ["Infrastructure as Code", "Private Subnets", "Auto Scaling", "State Locking"],
      },
    ],
    careerRoles: [
      {
        role: "DevOps Engineer",
        skills: "Docker · Kubernetes · CI/CD · Linux · Terraform",
        description: "Automate software delivery pipelines, container orchestration, and release reliability.",
      },
      {
        role: "AWS Cloud Engineer",
        skills: "AWS VPC · EC2 · IAM · S3 · CloudWatch",
        description: "Architect, secure, and manage scalable cloud infrastructure for enterprises.",
      },
    ],
    faqs: [
      {
        q: "Do I need prior cloud experience to join the AWS & DevOps course?",
        a: "No. Module 01 begins with Linux command-line basics, networking, and Git before introducing AWS, Docker, CI/CD, and Kubernetes.",
      },
    ],
  },

  "english-courses": {
    slug: "english-courses",
    title: "English Courses",
    metaTitle: "Spoken English Classes & Personality Development Course in Indore | The Prime Step",
    metaDescription:
      "Speak fluent, confident English for interviews, corporate jobs, and everyday life. Join Spoken English, Business Communication & Personality Development classes at The Prime Step Indore (Vijay Nagar, Bhawarkua & Annapurna).",
    keywords: [
      "Spoken English classes in Indore",
      "English speaking course Vijay Nagar Indore",
      "Personality development classes Indore",
      "Business communication and interview preparation Indore",
      "English courses Bhawarkua Indore",
      "Public speaking and GD PI classes Indore",
    ],
    eyebrow: "Communication, Fluency & Career Confidence",
    heroTitle: "English Courses & Spoken Fluency.",
    heroSubtitle:
      "Technical talent opens the door — confident communication wins the career. Master fluent Spoken English, workplace communication, group discussions, and interview presence in a supportive classroom.",
    duration: "2 – 4 Months",
    level: "Basic, Intermediate & Corporate Fluency",
    format: "Interactive Speaking Labs (Indore)",
    projectsCount: "Daily Live Speaking & GD/PI Sessions",
    roadmapId: "spoken-english",
    overviewHeadline: "Don't just learn grammar rules. Speak with clarity and confidence every single day.",
    overviewBody: [
      "Many talented students and working professionals in Indore know the right technical answer in their head, but hesitate when speaking in English during HR interviews, client meetings, or group discussions. Our English Courses are designed to eliminate hesitation through daily active speaking practice.",
      "In a friendly, judgment-free classroom across our Vijay Nagar, Bhawarkua, and Annapurna campuses, you will move from foundational sentence construction and vocabulary building to spontaneous public speaking, professional email etiquette, voice modulation, and mock HR interview rounds.",
    ],
    highlights: [
      {
        label: "Daily Practice",
        value: "100% Speaking Focus",
        detail: "Role-plays, debates, extempore speaking, and real-world conversation drills",
      },
      {
        label: "Career Readiness",
        value: "GD & HR Interviews",
        detail: "Structured preparation for campus placements, group discussions, and corporate HR rounds",
      },
      {
        label: "Workplace Polish",
        value: "Business English",
        detail: "Professional email writing, presentation skills, and corporate meeting etiquette",
      },
      {
        label: "Personal Attention",
        value: "Small Batch Sizes",
        detail: "Individual feedback on pronunciation, body language, and fluency",
      },
    ],
    techCategories: [
      {
        category: "Spoken English Foundations",
        items: ["Practical Grammar in Action", "Sentence Framing", "Tense Mastery without Memorization", "Everyday Vocabulary", "Removing Mother-Tongue Influence (MTI)", "Pronunciation & Phonetics"],
      },
      {
        category: "Fluency & Public Speaking",
        items: ["Spontaneous Thinking in English", "Extempore & Storytelling", "Stage Confidence", "Voice Modulation & Pace", "Active Listening", "Overcoming Hesitation"],
      },
      {
        category: "Corporate & Business Communication",
        items: ["Professional Email Writing", "Client & Team Call Etiquette", "Presentation Delivery", "LinkedIn & Resume Communication", "Workplace Vocabulary"],
      },
      {
        category: "Interview & Personality Development",
        items: ["HR Interview Q&A Mastery", "Group Discussion (GD) Strategies", "Body Language & Grooming", "Confidence Building", "1-on-1 Video Mock Interviews"],
      },
    ],
    modules: [
      {
        number: "01",
        title: "Foundational Fluency & Practical Sentence Framing",
        duration: "Weeks 1 – 3",
        summary: "Stop translating in your head and start forming natural English sentences effortlessly.",
        topics: [
          "Core sentence structures for everyday situations, college, and office conversations",
          "Practical tenses, modals, and connectors taught through speaking — not rote memorization",
          "Building active vocabulary: 500+ high-utility words, phrases, and idioms",
          "Daily 1-on-1 conversation warmups in a supportive, zero-judgment environment",
        ],
        deliverable: "5-Minute Unscripted Self-Introduction & Daily Situation Fluency",
      },
      {
        number: "02",
        title: "Pronunciation, Voice Clarity & Hesitation Removal",
        duration: "Weeks 4 – 6",
        summary: "Refine your pronunciation, neutral accent, and speaking rhythm.",
        topics: [
          "Correcting common pronunciation errors and reducing Mother-Tongue Influence (MTI)",
          "Word stress, intonation, voice projection, and pacing for clear communication",
          "Interactive role-plays, situational dialogues, and impromptu storytelling sessions",
          "Thinking directly in English under time pressure",
        ],
        deliverable: "Live Extempore & Moderated Debate Showcase",
      },
      {
        number: "03",
        title: "Business Communication & Workplace Etiquette",
        duration: "Weeks 7 – 9",
        summary: "Communicate like a seasoned professional in corporate offices, emails, and meetings.",
        topics: [
          "Writing crisp, professional emails, follow-ups, and workplace messages",
          "Speaking confidently in team standups, client calls, and online video meetings",
          "Structuring and delivering persuasive slide presentations",
          "Body language, posture, eye contact, and professional grooming",
        ],
        deliverable: "Executive Slide Presentation & Business Email Portfolio",
      },
      {
        number: "04",
        title: "Group Discussions (GD) & HR Interview Mastery",
        duration: "Weeks 10 – 12",
        summary: "Walk into any campus placement or corporate job interview with calm authority.",
        topics: [
          "Group Discussion frameworks: how to initiate, contribute with data, and summarize",
          "Mastering the top 35 HR & behavioral interview questions (STAR method)",
          "Handling salary negotiations, career gap explanations, and stress questions",
          "Recorded mock interviews with personalized trainer feedback",
        ],
        deliverable: "Full Panel Mock HR Interview & GD Certification",
      },
    ],
    projects: [
      {
        title: "Live Group Discussion (GD) Arena",
        stack: "Critical Thinking · Turn-Taking · Leadership Communication",
        description:
          "Participate in moderated group discussions on current industry, technology, and business topics with structured feedback on clarity and impact.",
        outcomes: ["Initiating GDs", "Structured Arguments", "Active Listening", "Body Language"],
      },
      {
        title: "Corporate Pitch & Presentation Showcase",
        stack: "Public Speaking · Slide Storytelling · Q&A Handling",
        description:
          "Prepare and deliver a 7-minute professional presentation in front of peers and mentors, followed by live audience Q&A.",
        outcomes: ["Stage Presence", "Voice Modulation", "Slide Narrative", "Confident Q&A"],
      },
      {
        title: "1-on-1 Mock HR & Placement Interview Lab",
        stack: "STAR Framework · Resume Pitch · Behavioral Fluency",
        description:
          "Simulated corporate interview rounds tailored to your target role (IT, Management, Banking, or Fresh Graduate).",
        outcomes: ["Self-Introduction Pitch", "Behavioral Answers", "Zero Hesitation", "Personalized Feedback"],
      },
    ],
    careerRoles: [
      {
        role: "Campus & IT Interview Readiness",
        skills: "HR Rounds · Group Discussions · Technical Explanations",
        description: "Explain your projects, logic, and background clearly to recruiters at top companies.",
      },
      {
        role: "Corporate & Client-Facing Roles",
        skills: "Business English · Presentations · Email Etiquette",
        description: "Excel in software teams, business analytics, management, BPO/KPO, and client communication.",
      },
      {
        role: "Everyday & Academic Confidence",
        skills: "Fluent Conversation · Public Speaking · Vocabulary",
        description: "Speak naturally in college seminars, social settings, and professional networking.",
      },
    ],
    faqs: [
      {
        q: "I understand English when reading, but I freeze when speaking. Will this course help?",
        a: "Yes — that is the exact challenge we solve. Most learners already know basic grammar passively; what they lack is active speaking practice in a safe environment. Over 75% of class time is dedicated to guided speaking activities.",
      },
      {
        q: "Can I combine Spoken English with a technical course like Java, Python, or MERN Stack?",
        a: "Yes! Many students combine our English & Personality Development classes with their IT course so they graduate with both strong coding skills and fluent interview communication.",
      },
      {
        q: "Are there separate batches for beginners and working professionals?",
        a: "Yes. We assess your current comfort level during your free counseling session and place you in the right batch, with convenient morning, afternoon, and evening timings across all 3 Indore branches.",
      },
      {
        q: "How soon will I see an improvement in my confidence?",
        a: "With daily participation in our speaking drills, role-plays, and extempore sessions, students noticeably reduce hesitation within the first 3 weeks.",
      },
    ],
  },
};

export interface CatalogCourseItem {
  title: string;
  category: "Full Stack & Web" | "Programming & Core" | "Data & AI" | "Mobile & Business";
  duration: string;
  level: string;
  description: string;
  tags: string[];
  href: string;
  roadmapId: string;
  featured?: boolean;
}

export const ALL_CATALOG_COURSES: CatalogCourseItem[] = [
  {
    title: "Java Full Stack Developer",
    category: "Full Stack & Web",
    duration: "5 – 6 Months",
    level: "Beginner to Advanced",
    description: "Complete enterprise stack covering Core & Advanced Java, Spring Boot, Microservices, Hibernate, MySQL, and React.",
    tags: ["Core Java", "Spring Boot", "Hibernate", "React", "MySQL"],
    href: "/java-full-stack-developer",
    roadmapId: "java",
    featured: true,
  },
  {
    title: "MERN Stack Developer Course",
    category: "Full Stack & Web",
    duration: "5 – 6 Months",
    level: "Beginner to Advanced",
    description: "End-to-end modern JavaScript web engineering with MongoDB, Express.js, React 19, Node.js, Next.js, and Tailwind CSS.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Next.js"],
    href: "/mern-stack-developer-course",
    roadmapId: "mern",
    featured: true,
  },
  {
    title: "Python Programming Classes",
    category: "Programming & Core",
    duration: "3 – 5 Months",
    level: "Beginner to Advanced",
    description: "Master Python 3 from bedrock syntax and OOP to Django, FastAPI, SQL, automation, and backend workflows.",
    tags: ["Python 3", "Django", "FastAPI", "SQL", "Automation"],
    href: "/python-programming-classes",
    roadmapId: "python",
    featured: true,
  },
  {
    title: "Data Science and Analytics Courses in Indore",
    category: "Data & AI",
    duration: "5 – 6 Months",
    level: "Beginner to Advanced Career Track",
    description: "Turn data into predictive models using Python, Pandas, NumPy, SQL, Statistical Analysis, Scikit-Learn, and Machine Learning.",
    tags: ["Python", "Pandas", "Machine Learning", "Statistics", "SQL"],
    href: "/data-science-and-analytics-courses-in-indore",
    roadmapId: "data-science",
    featured: true,
  },
  {
    title: "Data Analytics Course in Indore",
    category: "Data & AI",
    duration: "3 – 4 Months",
    level: "Beginner Friendly (IT & Non-IT)",
    description: "Clean datasets, write analytical SQL queries, and build executive business intelligence dashboards in Power BI, Tableau, and Excel.",
    tags: ["Power BI", "SQL", "Tableau", "Advanced Excel", "Python Pandas"],
    href: "/data-analytics-course-in-indore",
    roadmapId: "data-analytics",
    featured: true,
  },
  {
    title: "Artificial Intelligence and Machine Learning Course",
    category: "Data & AI",
    duration: "5 – 6 Months",
    level: "Beginner to Applied AI Engineer",
    description: "Build intelligent systems with Supervised/Unsupervised ML, Deep Learning Neural Networks, Computer Vision, NLP, and GenAI RAG.",
    tags: ["Machine Learning", "Deep Learning", "NLP", "LLMs & RAG", "FastAPI"],
    href: "/artificial-intelligence-and-machine-learning-course",
    roadmapId: "ai-ml",
    featured: true,
  },
  {
    title: "Power BI Course in Indore",
    category: "Data & AI",
    duration: "6 – 8 Weeks",
    level: "Beginner to Advanced BI",
    description: "Master Power Query ETL, dimensional Star Schema modeling, advanced DAX formulas, Row-Level Security, and executive reporting.",
    tags: ["Power BI", "DAX", "Power Query", "Star Schema", "PL-300 Prep"],
    href: "/power-bi-course-in-indore",
    roadmapId: "power-bi",
  },
  {
    title: "C and C++ Programming Classes",
    category: "Programming & Core",
    duration: "2.5 – 4 Months",
    level: "Foundational & Placement Prep",
    description: "Master pointers, memory management, object-oriented C++, STL, and 150+ Data Structures & Algorithms problems for interviews.",
    tags: ["C Programming", "C++ OOP", "STL", "Data Structures", "Algorithms"],
    href: "/c-and-cpp-programming-classes",
    roadmapId: "cpp-dsa",
  },
  {
    title: "Android App Development",
    category: "Mobile & Business",
    duration: "4 – 5 Months",
    level: "Beginner to App Publisher",
    description: "Build cross-platform iOS and Android mobile apps from a single codebase with Dart, Flutter, Firebase, and REST APIs.",
    tags: ["Dart", "Flutter", "Android & iOS", "Firebase", "Play Store"],
    href: "/android-app-development",
    roadmapId: "flutter-android",
  },
  {
    title: "Web Design and PHP Full Stack Course",
    category: "Full Stack & Web",
    duration: "4 – 5 Months",
    level: "Beginner to Intermediate",
    description: "Responsive web design (HTML5, CSS3, Tailwind, Bootstrap, JS) paired with Angular (MEAN), PHP 8, Laravel, and MySQL.",
    tags: ["HTML5/CSS3", "Tailwind", "JavaScript", "PHP & Laravel", "MySQL"],
    href: "/web-design-and-php-full-stack-course",
    roadmapId: "web-php",
  },
  {
    title: "DevOps and Cloud Computing Course",
    category: "Full Stack & Web",
    duration: "4 – 5 Months",
    level: "Beginner to Cloud Engineer",
    description: "Automate cloud infrastructure and deployments with Linux, AWS (EC2, VPC, S3, RDS), Docker, Kubernetes, CI/CD, and Terraform.",
    tags: ["AWS Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    href: "/devops-and-cloud-computing-course",
    roadmapId: "devops-cloud",
  },
  {
    title: "Digital Marketing Course in Indore",
    category: "Mobile & Business",
    duration: "3 – 4 Months",
    level: "Beginner to Growth Marketer",
    description: "Drive organic rankings and paid ROI with Technical SEO, Google Search/Display Ads, Meta/Instagram Ads, GA4, and GTM.",
    tags: ["Technical SEO", "Google Ads", "Meta Ads", "GA4 & GTM", "Local SEO"],
    href: "/digital-marketing-course-in-indore",
    roadmapId: "digital-marketing",
  },
  {
    title: "Tally GST Mastery Course",
    category: "Mobile & Business",
    duration: "2 – 3 Months",
    level: "Beginner Friendly",
    description: "Practical computerized accounting, GST return filing (GSTR-1/2B/3B), e-Invoicing, payroll, and Advanced Excel MIS automation.",
    tags: ["Tally Prime", "GST Filing", "Advanced Excel", "MS Office", "MIS"],
    href: "/tally-gst-mastery-course",
    roadmapId: "tally-excel",
  },
  {
    title: "English Courses",
    category: "Mobile & Business",
    duration: "2 – 4 Months",
    level: "All Levels",
    description: "Build fluent English speaking confidence, business communication, group discussion leadership, and HR interview presence.",
    tags: ["Spoken English", "GD & PI", "Business Communication", "Soft Skills"],
    href: "/english-courses",
    roadmapId: "spoken-english",
    featured: true,
  },
];

export const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/career-courses", label: "Career Courses" },
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "/english-courses", label: "English Courses" },
  { href: "/java-full-stack-developer", label: "Java Full Stack Developer" },
  { href: "/mern-stack-developer-course", label: "MERN Stack Developer Course" },
  { href: "/python-programming-classes", label: "Python Programming Classes" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
    })),
  };
}
