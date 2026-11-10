export interface RoadmapStep {
  stepId: string;
  title: string;
  heading: string;
  desc: string;
  techFocus: string;
  project?: {
    name: string;
    desc: string;
    features: string[];
  };
}

export interface RoadmapCourse {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  seoHref: string;
  description: string;
  steps: RoadmapStep[];
  techStack: {
    name: string;
    items: string;
  }[];
}

export const ROADMAP_COURSES: Record<string, RoadmapCourse> = {
  java: {
    id: "java",
    title: "Java Full Stack Developer",
    subtitle: "Core Java, Spring Boot, Microservices & React",
    duration: "5 – 6 Months",
    level: "Beginner to Advanced",
    seoHref: "/java-full-stack-developer",
    description:
      "Drive through our complete Java Full Stack journey — from Core Java OOP fundamentals and Spring Boot microservices to 1-on-1 personal lab training and IT placement readiness.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Core Java & OOP Foundations",
        desc: "Start from zero in our Indore computer labs. Master Java 17+ syntax, Object-Oriented Programming (OOP), Exception Handling, Multithreading, and the Collections Framework.",
        techFocus: "Java 17+, OOP Principles, Collections API, JVM Memory, Git",
        project: {
          name: "Banking Ledger & Transaction Engine",
          desc: "Build a modular Java banking ledger with account hierarchies, concurrent transactions, and audit logs.",
          features: ["Core Java OOP", "Collections API", "Exception Safety", "File I/O"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "SQL, JDBC, Hibernate & JPA",
        desc: "Design relational databases in MySQL and PostgreSQL. Map Java entities cleanly using Hibernate ORM, JPA annotations, connection pooling, and optimized SQL joins.",
        techFocus: "MySQL, JDBC, Hibernate ORM, Spring Data JPA, Schema Design",
        project: {
          name: "Enterprise Inventory Persistence Layer",
          desc: "Relational database and ORM data layer handling multi-warehouse stock, orders, and supplier records.",
          features: ["Hibernate ORM", "JPA Relations", "MySQL Indexing", "Transactions"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Spring Boot & Microservices",
        desc: "Engineer production REST APIs with Spring Boot, Spring Security, JWT authentication, role-based access control, and distributed microservice communication.",
        techFocus: "Spring Boot 3, Spring Security, JWT, Microservices, Postman",
        project: {
          name: "FinTech Payment & Auth Microservice",
          desc: "Secured Spring Boot microservice architecture with API Gateway, JWT token rotation, and Swagger docs.",
          features: ["Spring Boot", "Spring Security", "JWT Auth", "REST APIs"],
        },
      },
      {
        stepId: "04",
        title: "SYLLABUS · PHASE 4",
        heading: "React Frontend & Full Stack Integration",
        desc: "Build modern responsive user interfaces with HTML5, Tailwind CSS, JavaScript ES6+, and React. Connect your frontend to Spring Boot APIs and deploy to the cloud.",
        techFocus: "React 19, TypeScript/JS, Tailwind CSS, REST Integration, Docker",
        project: {
          name: "Hospital & Clinic ERP Full Stack Portal",
          desc: "End-to-end Java + React web application with role dashboards, appointment scheduling, and billing.",
          features: ["React Frontend", "Spring Boot API", "MySQL Cloud", "Docker"],
        },
      },
      {
        stepId: "05",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Lab Mentorship & Code Reviews",
        desc: "Every day in our Vijay Nagar, Bhawarkua, and Annapurna labs, senior trainers sit beside your screen to clear doubts 1-on-1, debug logic errors, and review your project architecture.",
        techFocus: "1-on-1 Doubt Clearing, Live Debugging, Code Reviews, Personal Guidance",
        project: {
          name: "Guided Capstone Architecture Review",
          desc: "Personal mentor walkthrough of your codebase, refactoring for clean code, security, and performance.",
          features: ["1-on-1 Mentorship", "Live Debugging", "Clean Architecture", "Git Workflow"],
        },
      },
      {
        stepId: "06",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Mock Interviews, Portfolio & Referrals",
        desc: "Dedicated placement preparation: DSA coding rounds, Java technical & HR mock interviews, GitHub & LinkedIn optimization, and direct recruiter referrals.",
        techFocus: "DSA Interview Prep, Mock Technical Rounds, Resume & LinkedIn, Job Referrals",
        project: {
          name: "Placement-Ready Engineer Portfolio",
          desc: "4 deployed Java Full Stack projects on GitHub with live links, API docs, and verified resume profile.",
          features: ["Mock Interviews", "GitHub Portfolio", "ATS Resume", "Placement Cell"],
        },
      },
    ],
    techStack: [
      { name: "Backend", items: "Core Java 17+, Spring Boot, Microservices" },
      { name: "Database", items: "MySQL, Hibernate ORM, Spring Data JPA" },
      { name: "Frontend", items: "React, JavaScript ES6+, Tailwind CSS" },
      { name: "Career", items: "1-on-1 Lab Mentorship, Mock Interviews, Placement" },
    ],
  },

  mern: {
    id: "mern",
    title: "MERN Stack Developer",
    subtitle: "MongoDB, Express.js, React 19, Node.js & Next.js",
    duration: "5 – 6 Months",
    level: "Beginner to Advanced",
    seoHref: "/mern-stack-developer-course",
    description:
      "A complete 3D journey from bedrock web fundamentals to full stack JavaScript engineering, backed by 1-on-1 personal mentor training and dedicated placement support.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Responsive Web & Modern JavaScript",
        desc: "Master HTML5 semantics, CSS3 Flexbox/Grid, Tailwind CSS, and deep JavaScript (ES6+, async/await, closures, DOM manipulation, and Git workflows).",
        techFocus: "HTML5, CSS3, Tailwind CSS, Modern JavaScript (ES6+), Git & GitHub",
        project: {
          name: "Interactive E-Commerce Storefront UI",
          desc: "A fast, mobile-first web storefront with dynamic filtering, cart state, and smooth animations.",
          features: ["Tailwind CSS", "JavaScript ES6+", "Responsive Grid", "Git"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "React 19 & Next.js Frontend Architecture",
        desc: "Build scalable component systems with React 19 hooks, state management, routing, and Next.js App Router for SEO-ready production web applications.",
        techFocus: "React 19, Next.js App Router, TypeScript, Custom Hooks, Context/Redux",
        project: {
          name: "Real-Time Project Management Dashboard",
          desc: "A multi-workspace kanban & analytics web app with drag-and-drop and live API state sync.",
          features: ["React 19", "Next.js", "State Management", "REST Client"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Node.js, Express.js & MongoDB Backend",
        desc: "Engineer secure REST APIs with Node.js and Express. Design MongoDB schemas with Mongoose, aggregation pipelines, JWT authentication, and role-based security.",
        techFocus: "Node.js, Express.js, MongoDB Atlas, Mongoose ORM, JWT & Bcrypt",
        project: {
          name: "Multi-Vendor Marketplace API & Database",
          desc: "Scalable Node + MongoDB backend supporting seller dashboards, order pipelines, and payment webhooks.",
          features: ["Node & Express", "MongoDB Atlas", "JWT Security", "Payment Webhooks"],
        },
      },
      {
        stepId: "04",
        title: "SYLLABUS · PHASE 4",
        heading: "Full Stack Capstone & Cloud Deployment",
        desc: "Connect React/Next.js frontends with Node/Express backends, configure environment variables, CI/CD pipelines, and deploy live on Vercel, Render, and AWS.",
        techFocus: "Full Stack Integration, Vercel, Render, Docker, CI/CD Pipelines",
        project: {
          name: "SaaS Learning & Video Streaming Platform",
          desc: "Complete deployed MERN application with user authentication, course player, and admin analytics.",
          features: ["Full MERN Stack", "Cloud Hosting", "CI/CD", "Lighthouse 95+"],
        },
      },
      {
        stepId: "05",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Lab Mentorship & Doubt Clearing",
        desc: "Learn by building inside our Indore computer labs. Mentors stay beside you to debug React state, fix API bugs, and guide your personal coding speed.",
        techFocus: "1-on-1 Screen Debugging, Daily Lab Practice, Personal Code Reviews",
        project: {
          name: "Mentor-Reviewed Production Codebase",
          desc: "Line-by-line mentor review of your full stack folder structure, API error handling, and UI polish.",
          features: ["Personal Guidance", "1-on-1 Doubt Clearing", "Code Quality", "Best Practices"],
        },
      },
      {
        stepId: "06",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Portfolio, Mock Interviews & Job Referrals",
        desc: "Graduate with a live GitHub portfolio, ATS-optimized resume, JavaScript/React machine-coding mock rounds, and direct placement referrals.",
        techFocus: "Machine Coding Rounds, Technical & HR Mock Interviews, Placement Cell",
        project: {
          name: "Deployed Full Stack Developer Portfolio",
          desc: "Custom developer portfolio showcasing 4 live MERN apps, GitHub commits, and case studies.",
          features: ["Live Portfolio", "Mock Interviews", "Resume & LinkedIn", "Job Referrals"],
        },
      },
    ],
    techStack: [
      { name: "Frontend", items: "React 19, Next.js, Tailwind CSS, TypeScript" },
      { name: "Backend", items: "Node.js, Express.js, REST APIs, JWT Auth" },
      { name: "Database", items: "MongoDB, Mongoose ORM, Atlas Cloud" },
      { name: "Career", items: "1-on-1 Personal Training, Mock Rounds, Placement" },
    ],
  },

  python: {
    id: "python",
    title: "Python Programming & Full Stack",
    subtitle: "Python 3, Django, FastAPI, SQL & Automation",
    duration: "3 – 5 Months",
    level: "Beginner to Advanced",
    seoHref: "/python-programming-classes",
    description:
      "Master Python from your very first line of code to Django/FastAPI web backends and automation — supported by 1-on-1 personal training and placement preparation.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Core Python 3 & Logical Thinking",
        desc: "Build rock-solid logic from scratch: variables, loops, functions, data structures (lists, dicts, sets), file handling, and Object-Oriented Programming in Python.",
        techFocus: "Python 3.12+, OOP, Data Structures, File Handling, Exception Management",
        project: {
          name: "Automated Expense & File Organizer CLI",
          desc: "Python command-line utility that parses CSV/JSON records, automates file workflows, and generates reports.",
          features: ["Core Python", "OOP Design", "File Automation", "Modular Code"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "SQL Databases & Data Processing",
        desc: "Design relational databases with PostgreSQL & MySQL. Write complex SQL queries, joins, and connect Python scripts to databases and Pandas workflows.",
        techFocus: "PostgreSQL, MySQL, SQL Joins, Python DB-API, Pandas Basics",
        project: {
          name: "Retail Inventory & Billing Database System",
          desc: "Python + SQL application managing product stock, customer invoices, and automated daily summaries.",
          features: ["PostgreSQL/MySQL", "SQL Queries", "Python DB Connector", "Reporting"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Django & FastAPI Web Engineering",
        desc: "Build production web applications and RESTful APIs using Django, Django REST Framework (DRF), and FastAPI with JWT authentication and ORM models.",
        techFocus: "Django 5, FastAPI, Django REST Framework, ORM, JWT Auth, Swagger",
        project: {
          name: "Full Stack CRM & Booking Web Platform",
          desc: "Django + FastAPI web application with admin dashboard, customer portal, and REST API endpoints.",
          features: ["Django & FastAPI", "REST APIs", "Admin Dashboard", "Authentication"],
        },
      },
      {
        stepId: "04",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Mentor Guidance in Lab",
        desc: "Whether you are from B.Tech, BCA, commerce, or 12th pass, our faculty sits with you in the computer lab to build your logic step by step and clear every doubt.",
        techFocus: "Personal Logic Building, 1-on-1 Doubt Sessions, Daily Coding Practice",
        project: {
          name: "Guided Live Project Deployment",
          desc: "Deploy your Python web app to cloud hosting with personal mentor code review and optimization.",
          features: ["1-on-1 Training", "Cloud Deployment", "Code Review", "Git & GitHub"],
        },
      },
      {
        stepId: "05",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Coding Interviews, Resume & Placement",
        desc: "Prepare for campus and off-campus Python developer roles with coding assessments, technical + HR mock interviews, and direct company referrals.",
        techFocus: "Python Coding Rounds, Technical Mock Interviews, Resume & Referrals",
        project: {
          name: "Verified Python Developer Portfolio",
          desc: "Complete GitHub portfolio with deployed Django/FastAPI applications and interview readiness.",
          features: ["GitHub Portfolio", "Mock Interviews", "LinkedIn Profile", "Placement Support"],
        },
      },
    ],
    techStack: [
      { name: "Core", items: "Python 3, OOP, Data Structures, Automation" },
      { name: "Web & API", items: "Django, FastAPI, REST APIs, HTML/CSS/JS" },
      { name: "Database", items: "PostgreSQL, MySQL, Django ORM" },
      { name: "Career", items: "1-on-1 Lab Guidance, Mock Interviews, Placement" },
    ],
  },

  "data-science": {
    id: "data-science",
    title: "Data Science & Applied AI",
    subtitle: "Python, Pandas, SQL, Machine Learning & GenAI",
    duration: "5 – 6 Months",
    level: "Beginner to Advanced Career Track",
    seoHref: "/data-science-and-analytics-courses-in-indore",
    description:
      "Turn raw datasets into predictive machine learning models and business insights — with hands-on syllabus milestones, 1-on-1 personal training, and placement support.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Python for Data Science & SQL Mastery",
        desc: "Learn Python programming, NumPy array computing, Pandas data wrangling, and advanced analytical SQL (CTEs, window functions, and joins).",
        techFocus: "Python, NumPy, Pandas, PostgreSQL, Analytical SQL",
        project: {
          name: "End-to-End E-Commerce Data Wrangling Pipeline",
          desc: "Clean 500k+ raw transaction rows, handle missing data, and extract SQL cohort metrics.",
          features: ["Pandas & NumPy", "Analytical SQL", "Data Cleaning", "EDA"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "Statistics, EDA & BI Visualization",
        desc: "Master probability, hypothesis testing, A/B testing, and visual storytelling using Matplotlib, Seaborn, and interactive Power BI dashboards.",
        techFocus: "Applied Statistics, Hypothesis Testing, Matplotlib, Seaborn, Power BI",
        project: {
          name: "Executive Revenue & Retention Intelligence Suite",
          desc: "Statistical analysis and interactive BI dashboard uncovering customer churn drivers.",
          features: ["Statistical Testing", "Seaborn Visuals", "Power BI", "KPI Storytelling"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Machine Learning & Predictive Modeling",
        desc: "Train, tune, and evaluate supervised and unsupervised ML models: Regression, Random Forests, XGBoost, Clustering, and feature engineering with Scikit-Learn.",
        techFocus: "Scikit-Learn, XGBoost, Feature Engineering, Model Tuning",
        project: {
          name: "Credit Risk & Customer Churn Predictor",
          desc: "Production ML pipeline with cross-validation, SHAP explainability, and REST API scoring.",
          features: ["Scikit-Learn", "XGBoost", "Hyperparameter Tuning", "FastAPI"],
        },
      },
      {
        stepId: "04",
        title: "SYLLABUS · PHASE 4",
        heading: "Deep Learning, NLP & Applied GenAI",
        desc: "Build neural networks, text analytics pipelines, and Retrieval-Augmented Generation (RAG) assistants over enterprise documents.",
        techFocus: "Deep Learning Basics, NLP, LLMs, Vector Databases, Streamlit",
        project: {
          name: "AI Business Document Q&A Assistant",
          desc: "Interactive Streamlit + RAG app that answers business questions from PDF reports and CSV data.",
          features: ["Applied AI / RAG", "NLP", "Streamlit App", "Cloud Deployment"],
        },
      },
      {
        stepId: "05",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Lab Mentorship on Real Datasets",
        desc: "Our mentors work beside you in the lab to explain math and ML intuition in plain language, debug your notebooks, and guide your capstone models.",
        techFocus: "1-on-1 Math & Code Guidance, Live Notebook Reviews, Personal Doubt Clearing",
        project: {
          name: "Mentor-Guided Industry Capstone",
          desc: "Build a domain-specific data science capstone (FinTech, Healthcare, or Retail) with 1-on-1 guidance.",
          features: ["1-on-1 Mentorship", "Real Datasets", "Model Review", "Business Pitch"],
        },
      },
      {
        stepId: "06",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Data Case Studies, Mock Interviews & Placement",
        desc: "Prepare for Data Scientist and Data Analyst interviews with SQL/Python tests, ML case-study rounds, GitHub/Kaggle portfolio review, and placement referrals.",
        techFocus: "SQL & ML Interview Prep, Case Study Rounds, Portfolio & Referrals",
        project: {
          name: "Verified Data Science Portfolio",
          desc: "Published GitHub notebooks, interactive dashboards, and ATS resume tailored for analytics & AI roles.",
          features: ["Case Study Prep", "Mock Interviews", "GitHub Portfolio", "Placement Cell"],
        },
      },
    ],
    techStack: [
      { name: "Programming", items: "Python, SQL, NumPy, Pandas" },
      { name: "Machine Learning", items: "Scikit-Learn, XGBoost, Statistics" },
      { name: "AI & BI", items: "Deep Learning, NLP, GenAI, Power BI" },
      { name: "Career", items: "1-on-1 Lab Guidance, Case Prep, Placement" },
    ],
  },

  "data-analytics": {
    id: "data-analytics",
    title: "Data Analytics, Power BI & Tableau",
    subtitle: "Advanced Excel, SQL, Python Pandas, Power BI & Tableau",
    duration: "3 – 4 Months",
    level: "Beginner Friendly (IT & Non-IT)",
    seoHref: "/data-analytics-course-in-indore",
    description:
      "Ideal for both IT and non-IT students: master Excel, SQL, Power BI, Tableau, and Python analytics with 1-on-1 personal lab training and placement support.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Advanced Excel & MIS Reporting",
        desc: "Master XLOOKUP, Index-Match, dynamic arrays, Pivot Tables, conditional formatting, data validation, and automated MIS business dashboards.",
        techFocus: "Advanced Excel, XLOOKUP, Pivot Tables, Power Pivot, MIS Automation",
        project: {
          name: "Automated Monthly Finance & Sales MIS Tracker",
          desc: "Dynamic Excel workbook automating multi-branch KPI reporting and variance tracking.",
          features: ["Advanced Formulas", "Pivot Dashboards", "Data Validation", "MIS Reports"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "SQL for Business & Data Analysis",
        desc: "Query real relational databases using PostgreSQL and MySQL: complex joins, aggregations, CTEs, subqueries, and window functions for business reporting.",
        techFocus: "SQL, PostgreSQL, MySQL, Joins, Window Functions, CTEs",
        project: {
          name: "Customer Retention & Cohort SQL Analysis",
          desc: "Write 35+ analytical SQL queries to uncover top-performing products, churn rates, and regional growth.",
          features: ["Complex Joins", "Window Functions", "Cohort Analysis", "SQL KPIs"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Power BI, DAX & Tableau Dashboards",
        desc: "Clean data with Power Query ETL, model Star Schemas, write DAX measures, and design interactive executive dashboards in Microsoft Power BI and Tableau.",
        techFocus: "Power BI, Power Query, DAX Formulas, Star Schema, Tableau",
        project: {
          name: "360° Executive Business Intelligence Suite",
          desc: "Interactive Power BI & Tableau dashboards tracking P&L, supply chain, and regional sales drill-downs.",
          features: ["Power BI & DAX", "Tableau Stories", "Star Schema", "Executive KPIs"],
        },
      },
      {
        stepId: "04",
        title: "SYLLABUS · PHASE 4",
        heading: "Python Pandas & Automated Analytics",
        desc: "Use Python, Pandas, and Matplotlib/Seaborn to clean large CSV/Excel datasets, automate repetitive reporting, and run exploratory data analysis.",
        techFocus: "Python, Pandas, NumPy, Exploratory Data Analysis (EDA)",
        project: {
          name: "Automated Retail & Marketing Analytics Pipeline",
          desc: "Python notebook that ingests multi-channel campaign data and outputs executive performance summaries.",
          features: ["Python Pandas", "Data Cleaning", "Visual Insights", "Automation"],
        },
      },
      {
        stepId: "05",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Non-IT Friendly Lab Mentorship",
        desc: "Coming from B.Com, BBA, BA, or B.Sc? Our trainers sit beside you in the lab to teach every formula, SQL query, and DAX measure step by step.",
        techFocus: "1-on-1 Doubt Clearing, Non-IT Friendly Guidance, Daily Lab Assignments",
        project: {
          name: "Personal Domain Dashboard Review",
          desc: "1-on-1 mentor review of your BI dashboards for visual clarity, DAX accuracy, and business storytelling.",
          features: ["1-on-1 Guidance", "Step-by-Step Pacing", "Live Doubt Support", "Dashboard Polish"],
        },
      },
      {
        stepId: "06",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "BI Portfolio, SQL Rounds & Job Placement",
        desc: "Publish your Power BI/Tableau portfolio, practice live SQL and business guesstimate interview rounds, and connect with hiring companies through our placement cell.",
        techFocus: "SQL Interview Prep, Business Case Rounds, Portfolio & Referrals",
        project: {
          name: "Published Data Analyst Portfolio",
          desc: "4 interactive dashboards + SQL case studies ready to demonstrate in recruiter interviews.",
          features: ["BI Portfolio", "Mock Interviews", "Resume & LinkedIn", "Placement Support"],
        },
      },
    ],
    techStack: [
      { name: "BI Tools", items: "Microsoft Power BI, DAX, Tableau" },
      { name: "Query & Spreadsheets", items: "SQL (PostgreSQL/MySQL), Advanced Excel" },
      { name: "Python Analytics", items: "Python, Pandas, NumPy, EDA" },
      { name: "Career", items: "1-on-1 Personal Guidance, Mock Rounds, Placement" },
    ],
  },

  "ai-ml": {
    id: "ai-ml",
    title: "AI & Machine Learning",
    subtitle: "Machine Learning, Deep Learning, NLP, Computer Vision & GenAI",
    duration: "5 – 6 Months",
    level: "Beginner to Applied AI Engineer",
    seoHref: "/artificial-intelligence-and-machine-learning-course",
    description:
      "Master modern Artificial Intelligence — from Python & Classical ML to Deep Learning, Computer Vision, and LLM RAG applications, with 1-on-1 mentorship and placement support.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Python, Data Engineering & Math Intuition",
        desc: "Build strong foundations in Python, NumPy vectorization, Pandas pipelines, linear algebra, probability, and statistical modeling for AI.",
        techFocus: "Python 3, NumPy, Pandas, Linear Algebra, Probability & Statistics",
        project: {
          name: "Feature Engineering & Data Pipeline",
          desc: "Automated preprocessing pipeline transforming raw tabular and text datasets into ML-ready tensors.",
          features: ["Python & NumPy", "Feature Scaling", "Data Pipelines", "Statistical Analysis"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "Supervised & Unsupervised Machine Learning",
        desc: "Train, cross-validate, and tune regression, classification, ensemble models (Random Forest, XGBoost, LightGBM), and clustering algorithms.",
        techFocus: "Scikit-Learn, XGBoost, LightGBM, Model Evaluation, SHAP",
        project: {
          name: "Real-Time Fraud & Anomaly Detection Engine",
          desc: "High-precision gradient boosted classifier detecting fraudulent financial transactions.",
          features: ["XGBoost", "SMOTE Balancing", "ROC-AUC Tuning", "SHAP Explainability"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Deep Learning, Computer Vision & NLP",
        desc: "Architect neural networks, Convolutional Neural Networks (CNNs) for image recognition, and Transformer pipelines for Natural Language Processing.",
        techFocus: "PyTorch / TensorFlow, CNNs, Transfer Learning, OpenCV, HuggingFace NLP",
        project: {
          name: "Automated Visual Quality & Document Inspector",
          desc: "Computer vision and OCR system classifying defects and extracting structured text.",
          features: ["PyTorch/TensorFlow", "OpenCV", "Transfer Learning", "NLP"],
        },
      },
      {
        stepId: "04",
        title: "SYLLABUS · PHASE 4",
        heading: "Generative AI, LLMs, RAG & FastAPI Deployment",
        desc: "Build modern Generative AI applications using prompt engineering, embeddings, vector databases, RAG pipelines, and deploy AI microservices with FastAPI & Docker.",
        techFocus: "LLMs, LangChain/LlamaIndex, Vector DBs, FastAPI, Docker",
        project: {
          name: "Enterprise Knowledge Base RAG Copilot",
          desc: "Full-stack AI assistant answering cited questions over company PDFs and databases via FastAPI.",
          features: ["RAG Architecture", "Vector Search", "FastAPI Service", "Docker"],
        },
      },
      {
        stepId: "05",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 AI Lab Mentorship & Model Debugging",
        desc: "Trainers sit beside you in our Indore labs to help you tune hyperparameters, fix tensor shape errors, and turn complex AI theory into working code.",
        techFocus: "1-on-1 Model Debugging, Personal Code Reviews, Guided AI Labs",
        project: {
          name: "Guided End-to-End AI Capstone",
          desc: "Personal mentor supervision from dataset curation and model training to cloud API deployment.",
          features: ["1-on-1 Mentorship", "Live Debugging", "Architecture Review", "Cloud Deploy"],
        },
      },
      {
        stepId: "06",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "AI Portfolio, Mock Interviews & Placement",
        desc: "Showcase deployed AI apps on GitHub/HuggingFace, practice ML system design and coding interviews, and access placement opportunities.",
        techFocus: "ML System Design, Coding Interviews, GitHub/HuggingFace Portfolio, Placement",
        project: {
          name: "Deployed AI Engineer Portfolio",
          desc: "Live AI web demos, documented GitHub repositories, and interview-ready resume.",
          features: ["Live AI Demos", "Mock Interviews", "ATS Resume", "Placement Referrals"],
        },
      },
    ],
    techStack: [
      { name: "Core ML", items: "Python, Scikit-Learn, XGBoost, Pandas" },
      { name: "Deep Learning", items: "PyTorch, TensorFlow, OpenCV, NLP" },
      { name: "GenAI & Deploy", items: "LLMs, RAG, Vector DBs, FastAPI, Docker" },
      { name: "Career", items: "1-on-1 Lab Guidance, Mock Rounds, Placement" },
    ],
  },

  "power-bi": {
    id: "power-bi",
    title: "Power BI & Business Intelligence",
    subtitle: "Power Query ETL, Star Schema, DAX & Executive Dashboards",
    duration: "6 – 8 Weeks",
    level: "Beginner to Advanced BI",
    seoHref: "/power-bi-course-in-indore",
    description:
      "Fast-track mastery in Microsoft Power BI — from Power Query data transformation and Star Schema modeling to advanced DAX, 1-on-1 personal training, and BI placement.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Data Connectors & Power Query ETL",
        desc: "Connect Power BI to Excel, SQL databases, CSV folders, and web APIs. Clean messy data, unpivot columns, merge queries, and automate ETL refreshes.",
        techFocus: "Power BI Desktop, Power Query (M), Multi-Source ETL, Data Cleaning",
        project: {
          name: "Automated Multi-Source ETL Pipeline",
          desc: "Clean and consolidate regional sales files and SQL tables into a single refreshable pipeline.",
          features: ["Power Query ETL", "Data Cleansing", "Query Merging", "Auto Refresh"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "Dimensional Modeling & DAX Mastery",
        desc: "Design high-performance Star Schemas and master DAX: CALCULATE, filter contexts, time intelligence (YTD, YoY, MoM), and dynamic KPI measures.",
        techFocus: "Star Schema Modeling, DAX Measures, Time Intelligence, CALCULATE",
        project: {
          name: "CFO Financial & P&L Analytics Model",
          desc: "Star-schema financial model with 30+ DAX measures tracking revenue, margins, and YoY growth.",
          features: ["Star Schema", "Advanced DAX", "Time Intelligence", "KPI Cards"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Interactive Dashboards & Power BI Service",
        desc: "Design executive UX layouts with drill-throughs, bookmarks, custom tooltips, Row-Level Security (RLS), and publish to Power BI Cloud Service.",
        techFocus: "Dashboard UX, Bookmarks, Drill-Through, Row-Level Security (RLS)",
        project: {
          name: "Enterprise Supply Chain & Sales Command Center",
          desc: "Published interactive BI portal with role-based security and mobile-optimized executive views.",
          features: ["Interactive UX", "Row-Level Security", "Drill-Throughs", "Cloud Publish"],
        },
      },
      {
        stepId: "04",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 DAX & Dashboard Coaching",
        desc: "Mentors sit beside you in the computer lab to help you debug complex DAX filter contexts and refine your dashboard layouts on real business data.",
        techFocus: "1-on-1 DAX Debugging, Personal Dashboard Review, PL-300 Guidance",
        project: {
          name: "Mentor-Reviewed BI Capstone",
          desc: "Personal mentor feedback on your data model efficiency, DAX formulas, and executive storytelling.",
          features: ["1-on-1 Training", "DAX Optimization", "PL-300 Prep", "Visual Polish"],
        },
      },
      {
        stepId: "05",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "BI Portfolio, Mock Interviews & Placement",
        desc: "Build a live Power BI portfolio, prepare for BI Developer & MIS Analyst interviews, and get connected with hiring employers.",
        techFocus: "BI Interview Prep, Portfolio Showcase, Resume & Placement Support",
        project: {
          name: "Executive Power BI Portfolio",
          desc: "3 industry-grade dashboards ready to walk through live during technical and business interviews.",
          features: ["Live Dashboards", "Mock Interviews", "Resume & LinkedIn", "Placement Cell"],
        },
      },
    ],
    techStack: [
      { name: "ETL & Modeling", items: "Power Query (M), Star Schema, Data Modeling" },
      { name: "Formulas", items: "DAX, Time Intelligence, Calculated Measures" },
      { name: "Publishing", items: "Power BI Service, Row-Level Security, SQL" },
      { name: "Career", items: "1-on-1 Personal Guidance, PL-300 Prep, Placement" },
    ],
  },

  "cpp-dsa": {
    id: "cpp-dsa",
    title: "C, C++ & Data Structures (DSA)",
    subtitle: "C Programming, C++ OOP, STL & Algorithmic Problem Solving",
    duration: "2.5 – 4 Months",
    level: "Foundational & Placement Prep",
    seoHref: "/c-and-cpp-programming-classes",
    description:
      "Build the rock-solid programming logic every top tech company tests — from C memory & pointers to C++ OOP, Data Structures & Algorithms, 1-on-1 lab training, and placement prep.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "C Programming, Logic & Memory Pointers",
        desc: "Start from zero: control flow, pattern building, functions, recursion, arrays, strings, pointers, dynamic memory allocation, and structures in C.",
        techFocus: "C Language, Loops & Patterns, Pointers, Dynamic Memory, Recursion",
        project: {
          name: "Memory-Safe Student & Library Record Engine",
          desc: "Fast C command-line system using pointers, structs, and binary file persistence.",
          features: ["C Pointers", "Dynamic Memory", "File I/O", "Modular C"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "Modern C++ Object-Oriented Programming & STL",
        desc: "Master classes, encapsulation, inheritance, polymorphism, operator overloading, templates, and the C++ Standard Template Library (vectors, maps, sets).",
        techFocus: "C++17/20, OOP Pillars, Virtual Functions, Templates, C++ STL",
        project: {
          name: "Object-Oriented Banking & ATM Simulator",
          desc: "Complete C++ OOP application modeling account types, transaction logs, and PIN security.",
          features: ["C++ OOP", "Polymorphism", "STL Containers", "Exception Handling"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Linear & Non-Linear Data Structures",
        desc: "Implement and analyze Linked Lists, Stacks, Queues, Hash Maps, Binary Trees, BSTs, Heaps, and Graphs with Big-O time and space complexity mastery.",
        techFocus: "Linked Lists, Stacks & Queues, Trees & BST, Heaps, Graphs, Big-O",
        project: {
          name: "Route & Shortest-Path Navigator (Graphs & Heaps)",
          desc: "Algorithmic C++ engine computing optimal paths across city nodes using Dijkstra's & BFS/DFS.",
          features: ["Graph Algorithms", "Priority Queues", "Shortest Path", "Big-O Optimal"],
        },
      },
      {
        stepId: "04",
        title: "SYLLABUS · PHASE 4",
        heading: "Algorithms & 150+ Coding Interview Problems",
        desc: "Master Two Pointers, Sliding Window, Binary Search, Backtracking, Greedy Algorithms, and Dynamic Programming across 150+ curated interview problems.",
        techFocus: "Sorting & Searching, Sliding Window, Backtracking, Dynamic Programming",
        project: {
          name: "150+ Solved DSA Problem Repository",
          desc: "Structured GitHub & LeetCode/GFG profile covering top product and service company patterns.",
          features: ["150+ Problems", "Dynamic Programming", "Time Optimization", "Clean Code"],
        },
      },
      {
        stepId: "05",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Dry-Run & Logic Building in Lab",
        desc: "Struggling with recursion, pointers, or trees? Our mentors sit beside you with pen, paper, and code editor to dry-run every step until your logic clicks.",
        techFocus: "1-on-1 Dry Runs, Personal Logic Coaching, Daily Lab Problem Solving",
        project: {
          name: "Personal Algorithmic Dry-Run Mastery",
          desc: "1-on-1 mentor evaluation of your problem-solving approach, edge-case handling, and speed.",
          features: ["1-on-1 Coaching", "Pen-and-Paper Dry Run", "Doubt Clearing", "Speed Building"],
        },
      },
      {
        stepId: "06",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Campus & Off-Campus Coding Round Readiness",
        desc: "Timed coding tests, whiteboard technical mock interviews, resume structuring for college students & freshers, and placement drive preparation.",
        techFocus: "Timed Coding Tests, Technical Mock Interviews, Campus Placement Prep",
        project: {
          name: "Placement-Ready Coding Profile",
          desc: "Verified GitHub + coding platform profile ready for TCS, Infosys, Accenture, and product startups.",
          features: ["Mock Coding Rounds", "Technical Interviews", "Resume Prep", "Placement Support"],
        },
      },
    ],
    techStack: [
      { name: "Foundations", items: "C Programming, Pointers, Memory Management" },
      { name: "OOP & STL", items: "Modern C++, Classes, Polymorphism, STL" },
      { name: "DSA", items: "Arrays, Trees, Graphs, Dynamic Programming" },
      { name: "Career", items: "1-on-1 Logic Dry-Runs, Coding Tests, Placement" },
    ],
  },

  "flutter-android": {
    id: "flutter-android",
    title: "Android & Flutter Mobile Apps",
    subtitle: "Dart, Flutter, Native Android, Firebase & Play Store Launch",
    duration: "4 – 5 Months",
    level: "Beginner to App Publisher",
    seoHref: "/android-app-development",
    description:
      "Build and ship real iOS and Android mobile apps from a single codebase — covering Dart, Flutter UI, Firebase, REST APIs, 1-on-1 lab training, and placement support.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Dart Programming & Mobile OOP Foundations",
        desc: "Master Dart syntax, null safety, object-oriented programming, asynchronous Futures & Streams, and mobile app architecture fundamentals.",
        techFocus: "Dart 3, Null Safety, OOP, Async Futures & Streams, Git",
        project: {
          name: "Async Weather & Currency CLI Engine",
          desc: "Dart application consuming live JSON endpoints with asynchronous error handling.",
          features: ["Dart 3", "Async Streams", "JSON Parsing", "Modular OOP"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "Pixel-Perfect Flutter UI & Animations",
        desc: "Build responsive iOS & Android interfaces using Material 3 and Cupertino widgets, custom layouts, multi-screen navigation, themes, and smooth animations.",
        techFocus: "Flutter SDK, Material 3 & Cupertino, Custom Widgets, GoRouter, Animations",
        project: {
          name: "FinTech Expense & Wallet Mobile UI",
          desc: "Multi-screen mobile app featuring dark/light themes, interactive charts, and hero transitions.",
          features: ["Flutter UI", "Dark/Light Mode", "Custom Animations", "Responsive Screens"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "State Management, REST APIs & Firebase",
        desc: "Manage complex app state with Provider/Riverpod/BLoC, integrate REST APIs with Dio, and wire Firebase Auth, Cloud Firestore, and Push Notifications.",
        techFocus: "Riverpod / Provider, REST APIs, Firebase Auth, Cloud Firestore, FCM",
        project: {
          name: "Real-Time Food & Hyperlocal Delivery App",
          desc: "Full-stack Flutter + Firebase app with live order status, cart management, and Google Maps.",
          features: ["Firebase Realtime", "State Management", "Google Maps", "Push Notifications"],
        },
      },
      {
        stepId: "04",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Device Debugging & Play Store Prep",
        desc: "Test your apps on real phones in our Indore computer labs. Mentors sit beside you to fix layout overflows, state bugs, and Gradle/Xcode build issues.",
        techFocus: "1-on-1 Device Testing, Live Bug Fixing, App Signing & Play Store Guide",
        project: {
          name: "Signed Production APK / AAB Release",
          desc: "Package, optimize, and sign your flagship mobile application ready for Google Play Store.",
          features: ["1-on-1 Guidance", "Real Device Testing", "App Signing", "Store Listing"],
        },
      },
      {
        stepId: "05",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Mobile App Portfolio, Mock Interviews & Placement",
        desc: "Showcase installable apps on your phone during interviews, practice Flutter technical rounds, and connect with mobile app companies through our placement cell.",
        techFocus: "Flutter Interview Prep, Live App Portfolio, Resume & Job Referrals",
        project: {
          name: "Published Mobile Developer Portfolio",
          desc: "3 complete Android/iOS apps with GitHub source code and live APK demos for recruiters.",
          features: ["Installable Apps", "Mock Interviews", "GitHub Portfolio", "Placement Support"],
        },
      },
    ],
    techStack: [
      { name: "Language & SDK", items: "Dart 3, Flutter SDK, Android Studio" },
      { name: "State & API", items: "Riverpod, Provider, REST APIs, Dio" },
      { name: "Backend & Cloud", items: "Firebase Auth, Firestore, Push Notifications" },
      { name: "Career", items: "1-on-1 Lab Guidance, Play Store Launch, Placement" },
    ],
  },

  "web-php": {
    id: "web-php",
    title: "Web Design, MEAN & PHP Full Stack",
    subtitle: "HTML5, CSS3, Tailwind, JavaScript, Angular, PHP 8 & Laravel",
    duration: "4 – 5 Months",
    level: "Beginner to Intermediate",
    seoHref: "/web-design-and-php-full-stack-course",
    description:
      "Learn complete responsive web design and full stack web development with JavaScript, Angular, PHP 8, Laravel, and MySQL — plus 1-on-1 personal training and placement.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Modern Responsive Web Designing",
        desc: "Design pixel-perfect websites from scratch with HTML5, CSS3 Flexbox & Grid, Bootstrap 5, Tailwind CSS, and UI/UX layout fundamentals.",
        techFocus: "HTML5, CSS3, Tailwind CSS, Bootstrap 5, Responsive Web Design",
        project: {
          name: "Multi-Page Corporate & Portfolio Website",
          desc: "Fully responsive, SEO-friendly business website with interactive galleries and contact forms.",
          features: ["HTML5 & CSS3", "Tailwind / Bootstrap", "Mobile First", "Fast Loading"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "JavaScript ES6+ & Frontend Interactivity",
        desc: "Add rich interactivity with JavaScript DOM manipulation, form validation, Fetch API, asynchronous JSON handling, and Angular/SPA fundamentals.",
        techFocus: "JavaScript ES6+, DOM Events, Fetch API, JSON, Angular Fundamentals",
        project: {
          name: "Dynamic Property & Classifieds Portal UI",
          desc: "Interactive web application with instant search filtering, modal previews, and API data binding.",
          features: ["JavaScript ES6+", "Dynamic Filters", "REST Fetch", "Interactive UI"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "PHP 8, Laravel MVC & MySQL Backend",
        desc: "Build secure server-side web applications with PHP 8, Laravel MVC framework, Eloquent ORM, MySQL databases, session authentication, and admin panels.",
        techFocus: "PHP 8, Laravel Framework, MySQL, Authentication, Admin Dashboards",
        project: {
          name: "Complete E-Commerce & CMS Platform",
          desc: "Full-stack Laravel + MySQL store with product catalog, shopping cart, order checkout, and admin panel.",
          features: ["Laravel MVC", "MySQL Database", "Admin Panel", "Payment Integration"],
        },
      },
      {
        stepId: "04",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Practical Lab Training & Hosting",
        desc: "Our mentors sit beside you in the computer lab to help you fix CSS layouts, debug PHP/MySQL queries, and deploy your websites on live cPanel/cloud hosting.",
        techFocus: "1-on-1 Lab Mentorship, Live Server Hosting, Personal Code Review",
        project: {
          name: "Live Domain & cPanel / Cloud Deployment",
          desc: "Deploy your full-stack web projects to a live URL with SSL and database backup configuration.",
          features: ["1-on-1 Guidance", "Live Hosting", "Database Setup", "SSL & SEO"],
        },
      },
      {
        stepId: "05",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Web Portfolio, Mock Interviews & Placement",
        desc: "Graduate with a live web designer & full-stack developer portfolio, mock technical interviews, and placement referrals to IT agencies and software companies in Indore.",
        techFocus: "Live Web Portfolio, Technical Interviews, Freelance & Job Placement",
        project: {
          name: "Verified Web Developer Portfolio",
          desc: "4 live hosted websites and web apps ready to showcase to IT recruiters and clients.",
          features: ["Live Websites", "Mock Interviews", "ATS Resume", "Placement Support"],
        },
      },
    ],
    techStack: [
      { name: "Web Design", items: "HTML5, CSS3, Tailwind CSS, Bootstrap 5" },
      { name: "Frontend", items: "JavaScript ES6+, DOM, Angular Basics" },
      { name: "Backend", items: "PHP 8, Laravel MVC, MySQL, REST APIs" },
      { name: "Career", items: "1-on-1 Lab Guidance, Live Hosting, Placement" },
    ],
  },

  "devops-cloud": {
    id: "devops-cloud",
    title: "Cloud Computing (AWS) & DevOps",
    subtitle: "Linux, AWS Cloud, Docker, Kubernetes, CI/CD & Terraform",
    duration: "4 – 5 Months",
    level: "Beginner to Cloud Engineer",
    seoHref: "/devops-and-cloud-computing-course",
    description:
      "Master modern Cloud & DevOps engineering — from Linux administration and AWS architecture to Docker, Kubernetes, Terraform, 1-on-1 lab training, and placement.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Linux Administration, Networking & Bash Scripting",
        desc: "Master Linux CLI, file permissions, systemd services, SSH security, DNS/HTTP networking, Git workflows, and automated Bash shell scripts.",
        techFocus: "Linux (Ubuntu/RHEL), Bash Scripting, Networking, SSH, Git",
        project: {
          name: "Automated Linux Server Hardening & Backup Suite",
          desc: "Bash automation scripts for user provisioning, firewall setup, health alerts, and cron backups.",
          features: ["Linux Admin", "Bash Scripting", "SSH & Firewall", "Cron Automation"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "Amazon Web Services (AWS) Cloud Architecture",
        desc: "Provision and secure cloud infrastructure on AWS: IAM, EC2, VPC networking, S3, RDS, Application Load Balancers, Auto Scaling, and CloudWatch.",
        techFocus: "AWS EC2, VPC, IAM, S3, RDS, ALB, Auto Scaling, CloudWatch",
        project: {
          name: "Highly Available Multi-AZ AWS Web Architecture",
          desc: "Production VPC with public/private subnets, Auto-Scaled EC2 fleet, ALB, and Multi-AZ RDS.",
          features: ["AWS VPC", "Auto Scaling", "Load Balancer", "IAM Security"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Docker, Kubernetes & CI/CD Automation",
        desc: "Containerize microservices with Docker, orchestrate clusters with Kubernetes (EKS/K8s), and build zero-downtime CI/CD pipelines using GitHub Actions & Jenkins.",
        techFocus: "Docker, Kubernetes (K8s), GitHub Actions, Jenkins, CI/CD",
        project: {
          name: "Automated Microservices CI/CD & K8s Pipeline",
          desc: "End-to-end pipeline that tests, builds Docker images, and deploys rolling updates to Kubernetes.",
          features: ["Docker & K8s", "GitHub Actions", "Jenkins", "Zero-Downtime"],
        },
      },
      {
        stepId: "04",
        title: "SYLLABUS · PHASE 4",
        heading: "Terraform Infrastructure as Code & Monitoring",
        desc: "Automate cloud provisioning with Terraform (IaC) and monitor production cluster health using Prometheus and Grafana dashboards.",
        techFocus: "Terraform (IaC), Prometheus, Grafana, Cloud Observability",
        project: {
          name: "One-Click Terraform Cloud & Grafana Stack",
          desc: "Reusable Terraform modules provisioning AWS infrastructure with live Prometheus/Grafana metrics.",
          features: ["Terraform IaC", "Prometheus", "Grafana Dashboards", "Alerting"],
        },
      },
      {
        stepId: "05",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Live Cloud Lab & Troubleshooting",
        desc: "Practice on real cloud consoles and Linux terminals in our Indore labs. Mentors sit beside you to troubleshoot IAM policies, K8s pods, and pipeline YAML.",
        techFocus: "1-on-1 Cloud Lab Coaching, Live Troubleshooting, AWS Certification Guide",
        project: {
          name: "Guided Production Outage & Recovery Drill",
          desc: "Hands-on mentor-guided debugging of broken containers, network ACLs, and CI/CD pipelines.",
          features: ["1-on-1 Mentorship", "Live Troubleshooting", "AWS Exam Prep", "Best Practices"],
        },
      },
      {
        stepId: "06",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "DevOps Portfolio, Mock Interviews & Placement",
        desc: "Publish your architecture diagrams and IaC repos on GitHub, practice scenario-based DevOps interviews, and connect with cloud hiring teams.",
        techFocus: "Scenario Mock Interviews, Cloud Architecture Portfolio, Placement Cell",
        project: {
          name: "Verified Cloud & DevOps Engineer Portfolio",
          desc: "Documented GitHub repos with Terraform, Docker, and CI/CD pipelines ready for interviews.",
          features: ["Architecture Docs", "Mock Interviews", "ATS Resume", "Placement Support"],
        },
      },
    ],
    techStack: [
      { name: "Cloud & OS", items: "AWS (EC2, VPC, S3, RDS, IAM), Linux, Bash" },
      { name: "Containers", items: "Docker, Docker Compose, Kubernetes (EKS)" },
      { name: "Automation", items: "GitHub Actions, Jenkins, Terraform, Grafana" },
      { name: "Career", items: "1-on-1 Lab Guidance, AWS Prep, Placement" },
    ],
  },

  "digital-marketing": {
    id: "digital-marketing",
    title: "Digital Marketing, SEO & Ads",
    subtitle: "Technical SEO, Google Ads, Meta Ads, GA4 & AI Content Workflows",
    duration: "3 – 4 Months",
    level: "Beginner to Growth Marketer",
    seoHref: "/digital-marketing-course-in-indore",
    description:
      "Learn practical, ROI-driven Digital Marketing — from Technical & Local SEO to Google Search/Display Ads, Meta Ads, GA4 analytics, 1-on-1 lab training, and placement.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "WordPress Landing Pages, Keyword Research & On-Page SEO",
        desc: "Build high-converting landing pages, conduct competitor keyword gap analysis, and optimize meta tags, internal linking, and content hierarchy.",
        techFocus: "WordPress, Keyword Research, On-Page SEO, Search Intent, Copywriting",
        project: {
          name: "SEO-Optimized Lead Generation Website",
          desc: "Build and optimize a live niche website structured around high-intent search keywords.",
          features: ["WordPress UI", "Keyword Mapping", "On-Page SEO", "Conversion Copy"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "Technical SEO, Local SEO (GMB) & Link Authority",
        desc: "Audit site crawlability with Google Search Console & Screaming Frog, add Schema.org JSON-LD, and rank local businesses on Google Business Profile.",
        techFocus: "Google Search Console, Screaming Frog, Schema Markup, Local SEO (GMB)",
        project: {
          name: "Complete Technical & Local SEO Audit Report",
          desc: "Full 40-point SEO audit fixing indexing bottlenecks, Core Web Vitals, and local map pack rankings.",
          features: ["Technical Audit", "GSC & Sitemaps", "Local GMB SEO", "Schema JSON-LD"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Google Ads (PPC) & Meta / Instagram Performance Ads",
        desc: "Structure profitable paid campaigns: Google Search, Display, YouTube, and Meta Ads Manager with custom audiences, retargeting pixels, and ROAS optimization.",
        techFocus: "Google Ads (Search/Display/Video), Meta Ads Manager, Retargeting, ROAS",
        project: {
          name: "Full-Funnel Paid Acquisition Blueprint",
          desc: "Multi-stage Google + Meta ad campaign with A/B ad creatives, conversion tracking, and budget bidding.",
          features: ["Google Search Ads", "Meta Retargeting", "Ad Copy & Canva", "ROAS Optimization"],
        },
      },
      {
        stepId: "04",
        title: "SYLLABUS · PHASE 4",
        heading: "GA4 Analytics, Google Tag Manager & AI Marketing",
        desc: "Track custom conversion events with Google Tag Manager (GTM), build Looker Studio client reports, and accelerate content using AI marketing workflows.",
        techFocus: "Google Analytics 4 (GA4), Google Tag Manager, Looker Studio, AI Tools",
        project: {
          name: "Automated GA4 & Looker Studio Client Dashboard",
          desc: "Live marketing attribution dashboard tracking traffic, cost-per-lead, and conversion funnels.",
          features: ["GA4 & GTM Events", "Looker Studio", "Funnel Tracking", "AI Workflows"],
        },
      },
      {
        stepId: "05",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Live Campaign & Ad Account Coaching",
        desc: "Practice inside real ad managers and analytics consoles in our Indore labs. Mentors sit beside you to review your keyword lists, ad targeting, and SEO audits.",
        techFocus: "1-on-1 Campaign Review, Live Ad Manager Practice, Google/Meta Certifications",
        project: {
          name: "Mentor-Reviewed Growth Marketing Portfolio",
          desc: "Personal mentor review of your SEO audit, ad campaign structure, and analytics dashboard.",
          features: ["1-on-1 Guidance", "Live Tools Practice", "Google Certifications", "Case Studies"],
        },
      },
      {
        stepId: "06",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Agency & Brand Placement, Freelancing & Interviews",
        desc: "Prepare for Digital Marketing Executive, SEO Specialist, and Performance Marketer interviews with live portfolio pitches and agency/company referrals.",
        techFocus: "Marketing Case Pitches, Mock Interviews, Resume & Agency Referrals",
        project: {
          name: "Verified Digital Marketer Portfolio",
          desc: "Published SEO & Ad campaign case studies ready for agencies, startups, and freelance clients.",
          features: ["Campaign Portfolio", "Mock Interviews", "LinkedIn Branding", "Placement Cell"],
        },
      },
    ],
    techStack: [
      { name: "SEO", items: "Technical SEO, Local GMB, Search Console, Schema" },
      { name: "Paid Ads", items: "Google Ads (PPC), Meta & Instagram Ads, YouTube" },
      { name: "Analytics", items: "GA4, Google Tag Manager, Looker Studio" },
      { name: "Career", items: "1-on-1 Live Tool Guidance, Certifications, Placement" },
    ],
  },

  "tally-excel": {
    id: "tally-excel",
    title: "Tally Prime with GST & Advanced Excel",
    subtitle: "Computerized Accounting, GST Returns, Payroll & MS Office MIS",
    duration: "2 – 3 Months",
    level: "Beginner Friendly",
    seoHref: "/tally-gst-mastery-course",
    description:
      "Practical office, accounting, taxation, and MIS automation training in Tally Prime with GST, Advanced Excel, and MS Office — with 1-on-1 lab guidance and placement.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Accounting Fundamentals & Tally Prime Vouchers",
        desc: "Master golden rules of accounting, company creation, ledger setup, cost centers, and daily voucher entries (Contra, Payment, Receipt, Sales, Purchase) in Tally Prime.",
        techFocus: "Tally Prime, Ledger & Group Creation, Day Book, Trial Balance",
        project: {
          name: "Full-Year Trading Company Books of Accounts",
          desc: "Record 250+ real-world business transactions from opening balances to finalized P&L and Balance Sheet.",
          features: ["Tally Prime", "Voucher Mastery", "Bank Reconciliation", "Balance Sheet"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "GST Accounting, e-Invoicing, TDS & Payroll",
        desc: "Configure CGST/SGST/IGST, HSN/SAC codes, Input Tax Credit (ITC), GSTR-1, GSTR-2B reconciliation, GSTR-3B return computation, e-Way Bills, TDS, and Payroll.",
        techFocus: "GST Returns (GSTR-1/2B/3B), e-Invoice, e-Way Bill, TDS, Payroll",
        project: {
          name: "Quarterly GST Compliance & Tax Filing Simulation",
          desc: "Complete GST invoice lifecycle, ITC reconciliation, and return export ready for portal filing.",
          features: ["GSTR-1 & 3B", "ITC Reconciliation", "e-Invoicing", "TDS & Payroll"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Advanced Excel & Corporate MIS Dashboards",
        desc: "Master VLOOKUP, XLOOKUP, Index-Match, IF/IFS, SUMIFS, Pivot Tables, charts, conditional formatting, and MS Word/PowerPoint business documentation.",
        techFocus: "Advanced Excel, XLOOKUP, Pivot Tables, MIS Reporting, MS Office",
        project: {
          name: "Automated Accounts Receivable & Inventory MIS",
          desc: "Interactive Excel MIS workbook tracking aging debtors, stock reorder alerts, and monthly cashflow.",
          features: ["XLOOKUP & SUMIFS", "Pivot Dashboards", "Aging Analysis", "MIS Automation"],
        },
      },
      {
        stepId: "04",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Practical Voucher & Formula Coaching",
        desc: "Even if you are a beginner or from a non-commerce background, our trainers sit beside your system in our Indore labs to guide every voucher and Excel formula.",
        techFocus: "1-on-1 Lab Practice, Real Invoice Datasets, Personal Doubt Clearing",
        project: {
          name: "Mentor-Audited Accounting & MIS Portfolio",
          desc: "1-on-1 verification of your Tally company books, GST computations, and Excel MIS templates.",
          features: ["1-on-1 Training", "Practical Invoices", "Speed Shortcuts", "Error Auditing"],
        },
      },
      {
        stepId: "05",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "Accountant & MIS Executive Placement Support",
        desc: "Prepare for Accounts Executive, GST Practitioner, Back-Office, and MIS Analyst interviews with practical machine tests and local company referrals.",
        techFocus: "Practical Tally/Excel Tests, Interview Prep, Resume & Job Referrals",
        project: {
          name: "Job-Ready Accounting & MIS Profile",
          desc: "Verified practical proficiency for CA firms, corporate accounts departments, and commercial enterprises.",
          features: ["Machine Test Prep", "Mock Interviews", "Resume Building", "Placement Support"],
        },
      },
    ],
    techStack: [
      { name: "Accounting", items: "Tally Prime, Vouchers, Inventory, BRS, P&L" },
      { name: "Taxation", items: "GST (GSTR-1, 2B, 3B), e-Invoice, TDS, Payroll" },
      { name: "Spreadsheets", items: "Advanced Excel, XLOOKUP, Pivot Tables, MIS" },
      { name: "Career", items: "1-on-1 Practical Lab Guidance, Tests, Placement" },
    ],
  },

  "spoken-english": {
    id: "spoken-english",
    title: "Spoken English & Personality Development",
    subtitle: "Fluent Speaking, Business Communication, GD & Interview Mastery",
    duration: "2 – 4 Months",
    level: "All Levels (Beginner to Corporate)",
    seoHref: "/english-courses",
    description:
      "Build natural English speaking fluency, stage confidence, corporate communication, and HR interview presence through daily interactive practice and 1-on-1 guidance.",
    steps: [
      {
        stepId: "01",
        title: "SYLLABUS · PHASE 1",
        heading: "Functional Grammar, Vocabulary & Sentence Fluency",
        desc: "Stop translating in your head. Learn practical tenses, conversational sentence structures, workplace vocabulary, and pronunciation without memorizing dry rules.",
        techFocus: "Conversational Grammar, Active Vocabulary, Pronunciation, Daily Speaking",
        project: {
          name: "Daily 1-on-1 & Situational Conversation Drills",
          desc: "Speak confidently across 30+ everyday and professional scenarios from day one.",
          features: ["Zero Hesitation", "Natural Framing", "Pronunciation", "Daily Practice"],
        },
      },
      {
        stepId: "02",
        title: "SYLLABUS · PHASE 2",
        heading: "Public Speaking, Stage Confidence & Body Language",
        desc: "Overcome stage fear through podium talks, extempore speaking, storytelling, voice modulation, eye contact, and confident professional body language.",
        techFocus: "Public Speaking, Voice Modulation, Body Language, Confidence Building",
        project: {
          name: "Recorded Podium Presentation & Feedback",
          desc: "Deliver structured 5-minute talks with personalized mentor feedback on posture, tone, and clarity.",
          features: ["Stage Confidence", "Body Language", "Voice Clarity", "Video Review"],
        },
      },
      {
        stepId: "03",
        title: "SYLLABUS · PHASE 3",
        heading: "Group Discussions (GD), Corporate Email & Presentation",
        desc: "Lead campus and corporate Group Discussions (GD), write crisp professional emails, conduct client meetings, and deliver slide presentations.",
        techFocus: "Group Discussions (GD), Business Emails, Corporate Etiquette, LinkedIn",
        project: {
          name: "Simulated Corporate Boardroom & GD Arena",
          desc: "Participate in moderated Group Discussions on current affairs, business, and technology topics.",
          features: ["GD Leadership", "Business Writing", "Meeting Etiquette", "Active Listening"],
        },
      },
      {
        stepId: "04",
        title: "PERSONAL TRAINING & GUIDANCE",
        heading: "1-on-1 Personal Speech Coaching & Hesitation Removal",
        desc: "Every learner gets personal attention in small batches at our Indore campuses — trainers correct your phrasing gently and coach your individual speaking style.",
        techFocus: "1-on-1 Fluency Coaching, Personal Accent & Grammar Feedback, Small Batches",
        project: {
          name: "Personal Fluency & Confidence Transformation Plan",
          desc: "Customized feedback tracker measuring your speaking speed, vocabulary depth, and confidence.",
          features: ["1-on-1 Coaching", "Supportive Environment", "Personal Feedback", "Fluency Growth"],
        },
      },
      {
        stepId: "05",
        title: "PLACEMENT & CAREER LAUNCH",
        heading: "HR & Personal Interview (PI) Mastery",
        desc: "Practice structured mock HR and Personal Interviews ('Tell me about yourself', salary negotiation, behavioral STAR answers) and polish your resume & LinkedIn.",
        techFocus: "Mock HR Interviews, STAR Method Answers, Resume & LinkedIn Polish",
        project: {
          name: "Placement-Ready Interview & Communication Kit",
          desc: "Complete mock interview clearance, polished self-introduction, and ATS-ready resume.",
          features: ["HR Mock Interviews", "Self-Introduction", "LinkedIn Profile", "Career Readiness"],
        },
      },
    ],
    techStack: [
      { name: "Fluency", items: "Conversational English, Grammar, Pronunciation" },
      { name: "Confidence", items: "Public Speaking, Body Language, Extempore" },
      { name: "Corporate", items: "Group Discussions (GD), Business Emails, Etiquette" },
      { name: "Career", items: "1-on-1 Personal Coaching, HR Mock Interviews" },
    ],
  },
};
