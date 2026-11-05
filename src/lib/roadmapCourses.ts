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
  description: string;
  steps: RoadmapStep[];
  techStack: {
    name: string;
    items: string;
  }[];
}

export const ROADMAP_COURSES: Record<string, RoadmapCourse> = {
  mern: {
    id: "mern",
    title: "Full Stack (MERN)",
    subtitle: "Web Architecture & App Engineering",
    description:
      "A complete journey engineered to take you from fundamentals to a confident full stack engineer. Build real web applications, design REST APIs, model databases, and deploy production systems with modern tools.",
    steps: [
      {
        stepId: "01",
        title: "FOUNDATION & LOGIC",
        heading: "Bedrock Web Fundamentals",
        desc: "Master modern JavaScript (ES6+), DOM operations, git branching workflows, and problem-solving patterns that professional engineering teams rely on.",
        techFocus: "Modern JavaScript, Git & GitHub, Terminal & Node.js Basics",
        project: {
          name: "Interactive Task & File Automation CLI",
          desc: "A custom Node.js CLI tool that automates project scaffolding and git staging workflows.",
          features: ["Node CLI", "Git API", "Async Filesystem", "Modular Architecture"],
        },
      },
      {
        stepId: "02",
        title: "INTERFACE ARCHITECTURE",
        heading: "Craft Modern Responsive UIs",
        desc: "Learn HTML5 semantics, modern CSS with Flexbox & Grid, mobile-first responsive architecture, and Tailwind CSS design systems.",
        techFocus: "HTML5, CSS3, Tailwind CSS, Responsive Design, Accessibility",
        project: {
          name: "Editorial Brand Landing Platform",
          desc: "A high-performance responsive site with custom themes and smooth scroll microinteractions.",
          features: ["Tailwind CSS", "Semantic HTML", "Mobile First", "Core Web Vitals"],
        },
      },
      {
        stepId: "03",
        title: "REACT COMPONENT SYSTEMS",
        heading: "Build Reactive Frontends",
        desc: "Master React component trees, custom hooks, state management, client routing, and asynchronous API consumption.",
        techFocus: "React 19, Custom Hooks, Context API, REST API Integration",
        project: {
          name: "Real-Time Collaboration Board",
          desc: "A kanban board featuring drag-and-drop, filter parameters, and persistent state management.",
          features: ["React State", "Component Modularity", "REST Client", "Local Cache"],
        },
      },
      {
        stepId: "04",
        title: "SERVER & REST APIS",
        heading: "Engineer the Backend Engine",
        desc: "Design scalable RESTful endpoints, implement JWT token authentication, route validation, error handling middleware, and secure request pipelines using Node.js & Express.",
        techFocus: "Node.js, Express.js, JWT Authentication, API Security, Schema Validation",
        project: {
          name: "Secure Auth & Access Gateway",
          desc: "An enterprise API gateway with role-based access control, token rotation, and rate limiting.",
          features: ["Express.js", "JWT & Bcrypt", "Middleware Pipelines", "API Validation"],
        },
      },
      {
        stepId: "05",
        title: "DATABASE & DATA MODELING",
        heading: "Architect Scalable Schemas",
        desc: "Design document databases with MongoDB and Mongoose. Build aggregation pipelines, index structures, relational references, and query optimization for high performance.",
        techFocus: "MongoDB, Mongoose ORM, Aggregations, Indexing, Data Modeling",
        project: {
          name: "Multi-Tenant E-Commerce Database",
          desc: "A scalable MongoDB schema supporting product variants, cart states, and sales analytics pipelines.",
          features: ["MongoDB Atlas", "Mongoose Schemas", "Aggregation Pipelines", "Index Tuning"],
        },
      },
      {
        stepId: "06",
        title: "FULL STACK CAPSTONE & LAUNCH",
        heading: "Ship Production Products",
        desc: "Connect frontend and backend into deployable cloud systems. Master production builds, environment configuration, CI/CD pipelines, and cloud hosting.",
        techFocus: "Vercel, Render, Cloud Databases, Docker, Production Monitoring",
        project: {
          name: "DevStream SaaS Video & Learning Hub",
          desc: "A complete full-stack subscription platform featuring user dashboards, authenticated video feeds, and payment webhooks.",
          features: ["Full Stack Integration", "Stripe Webhooks", "Cloud Deployment", "Lighthouse 100"],
        },
      },
      {
        stepId: "07",
        title: "PLACEMENT READINESS",
        heading: "From Classroom to Career",
        desc: "Polish your GitHub portfolio, prepare for technical & coding interviews, refine your resume, and conduct mock rounds with industry mentors.",
        techFocus: "Technical Interviews, DSA Fundamentals, Resume Architecture, Mock Rounds",
        project: {
          name: "Verified Engineer Portfolio",
          desc: "Deploy your curated project showcase with live demos, API documentation, and case studies.",
          features: ["Production Portfolio", "Live Demos", "Interview Prep", "Mentor Review"],
        },
      },
    ],
    techStack: [
      { name: "Frontend", items: "React, Next.js, Tailwind CSS, TypeScript" },
      { name: "Backend", items: "Node.js, Express.js, RESTful Architecture" },
      { name: "Database", items: "MongoDB, Mongoose ORM, Atlas Cloud" },
      { name: "Tools", items: "Git, Postman, Vercel, Docker" },
    ],
  },

  python: {
    id: "python",
    title: "Python & Data Science",
    subtitle: "Python, Django & Machine Learning",
    description:
      "A complete roadmap through Python — from fundamental logic to modern backend architectures (Django/FastAPI) and machine learning workflows.",
    steps: [
      {
        stepId: "01",
        title: "PYTHON CORE",
        heading: "Master Clean Pythonic Code",
        desc: "Build rock-solid fundamentals in Python 3: data types, object-oriented patterns, modular design, and standard library tools.",
        techFocus: "Python 3, OOP Principles, Standard Library, Data Structures",
        project: {
          name: "In-Memory Database Engine",
          desc: "A lightweight key-value storage engine supporting transaction rollbacks and search algorithms.",
          features: ["Python OOP", "Serialization", "Unit Testing", "File I/O"],
        },
      },
      {
        stepId: "02",
        title: "DATABASE & SQL",
        heading: "Relational Data Mastery",
        desc: "Master PostgreSQL and SQL syntax. Learn complex joins, indexing, database normalisation, and query performance tuning.",
        techFocus: "PostgreSQL, Advanced SQL, Schema Architecture, Relational Design",
        project: {
          name: "Sales Analytics SQL Pipeline",
          desc: "A relational database schema with custom triggers, view aggregations, and performance indexes.",
          features: ["PostgreSQL", "Complex Joins", "DB Triggers", "Query Tuning"],
        },
      },
      {
        stepId: "03",
        title: "BACKEND & APIS",
        heading: "Build Fast Server Systems",
        desc: "Create scalable RESTful APIs with Django and FastAPI. Learn ORM design, serialization, authentication, and background jobs.",
        techFocus: "Django, FastAPI, Django REST Framework, JWT Auth",
        project: {
          name: "Enterprise CRM Backend",
          desc: "A robust backend API supporting dynamic filtering, JWT Auth, and automated Swagger documentation.",
          features: ["FastAPI", "DRF", "JWT Auth", "Swagger OpenAPI"],
        },
      },
      {
        stepId: "04",
        title: "DATA & ANALYTICS",
        heading: "Extract Actionable Insights",
        desc: "Use Pandas and NumPy for deep data cleaning, transformation, and statistical analysis on large datasets.",
        techFocus: "Pandas, NumPy, Matplotlib, Data Wrangling",
        project: {
          name: "Automated Data Ingestion Pipeline",
          desc: "A data pipeline handling messy inputs, outliers, and automated statistical summary generation.",
          features: ["Pandas", "NumPy", "Data Cleansing", "Visualization"],
        },
      },
      {
        stepId: "05",
        title: "MACHINE LEARNING",
        heading: "Train Predictive Models",
        desc: "Understand classification, regression, and model evaluation metrics with Scikit-Learn. Learn how to train, tune, and evaluate real models.",
        techFocus: "Scikit-Learn, Supervised Learning, Model Evaluation, Feature Engineering",
        project: {
          name: "Predictive Churn Classifier",
          desc: "A machine learning pipeline evaluating classification models to predict customer churn.",
          features: ["Scikit-Learn", "Cross Validation", "Hyperparameter Tuning", "Pipelines"],
        },
      },
      {
        stepId: "06",
        title: "PRODUCTION LAUNCH",
        heading: "Deploy to Cloud Infrastructure",
        desc: "Containerize Python apps with Docker and deploy them on cloud servers with CI/CD automation.",
        techFocus: "Docker, AWS / Cloud Deployments, Nginx, CI/CD",
        project: {
          name: "Containerized Inference Service",
          desc: "Deploy a containerized FastAPI model service behind an Nginx reverse proxy.",
          features: ["Docker", "Cloud VM", "Nginx", "CI/CD Actions"],
        },
      },
    ],
    techStack: [
      { name: "Languages", items: "Python 3, SQL" },
      { name: "Frameworks", items: "Django, FastAPI, Scikit-Learn" },
      { name: "Data", items: "Pandas, NumPy, PostgreSQL" },
      { name: "DevOps", items: "Docker, Git, AWS / Cloud" },
    ],
  },

  java: {
    id: "java",
    title: "Java Full Stack",
    subtitle: "Enterprise Engineering & Spring Boot",
    description:
      "Java powers banking, enterprise backends, and large-scale distributed systems. This roadmap turns you into a full stack Java engineer with Spring Boot, JPA/Hibernate, and modern frontends.",
    steps: [
      {
        stepId: "01",
        title: "CORE JAVA",
        heading: "Strong Typed Engineering Discipline",
        desc: "Master Java 17+, OOP paradigms, the Collections framework, multithreading basics, and memory management.",
        techFocus: "Java 17+, OOP, Collections API, JVM Fundamentals",
        project: {
          name: "Double-Entry Ledger Engine",
          desc: "A banking-style command-line ledger implementing transaction validation and concurrent processing.",
          features: ["Java Core", "Collections API", "Concurrency", "Data Integrity"],
        },
      },
      {
        stepId: "02",
        title: "DATA & PERSISTENCE",
        heading: "Hibernate & JPA Mastery",
        desc: "Map objects to relational databases cleanly with Hibernate ORM, JPA annotations, transaction boundaries, and MySQL.",
        techFocus: "MySQL, Hibernate ORM, JPA, Relational Data Modeling",
        project: {
          name: "Inventory Persistence Service",
          desc: "A persistent data layer configuring complex entity relationships, lazy loading, and second-level cache.",
          features: ["Hibernate", "JPA Annotations", "MySQL", "Connection Pooling"],
        },
      },
      {
        stepId: "03",
        title: "SPRING BOOT MICROSERVICES",
        heading: "Enterprise Backend Architecture",
        desc: "Build production microservices with Spring Boot: Spring Security, JWT authentication, RESTful controllers, and dependency injection.",
        techFocus: "Spring Boot, Spring Security, REST APIs, Microservices",
        project: {
          name: "Microservice Gateway & Auth Service",
          desc: "A decoupled backend with Spring Cloud Gateway and JWT security for microservice nodes.",
          features: ["Spring Boot", "Spring Security", "JWT", "REST Controllers"],
        },
      },
      {
        stepId: "04",
        title: "FULL STACK INTEGRATION",
        heading: "Connect Modern Frontend & Backend",
        desc: "Integrate Spring Boot backends with modern React frontends, handling authenticated sessions, CORS, and reactive state.",
        techFocus: "React, REST Integration, State Management, Full Stack Architecture",
        project: {
          name: "Hospital ERP Management Dashboard",
          desc: "A full-stack administration portal displaying analytics, patient schedulers, and billing records.",
          features: ["React UI", "REST APIs", "CORS Configuration", "Redux Toolkit"],
        },
      },
      {
        stepId: "05",
        title: "CLOUD & DEPLOYMENT",
        heading: "Enterprise Delivery & Placement",
        desc: "Deploy enterprise Java applications with Docker, Maven packaging, and cloud environments, backed by comprehensive mock interviews.",
        techFocus: "Maven, Docker, Cloud Deployment, Mock Technical Rounds",
        project: {
          name: "Production-Packaged Enterprise Stack",
          desc: "Containerize and deploy the full Java application with health checks and metrics.",
          features: ["Docker", "Maven", "Actuator Metrics", "CI/CD"],
        },
      },
    ],
    techStack: [
      { name: "Frontend", items: "React, HTML5, Tailwind CSS" },
      { name: "Backend", items: "Java 17+, Spring Boot, Spring Security" },
      { name: "Database", items: "MySQL, Hibernate ORM, JPA" },
      { name: "Tools", items: "Maven, Git, Docker, Postman" },
    ],
  },
};
