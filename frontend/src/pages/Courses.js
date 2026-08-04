import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FaArrowLeft, FaCheck, FaClock, FaTag } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/ui/PageHero";
import AnimatedSection from "../components/ui/AnimatedSection";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    key: "software-engineering",
    name: "Software Engineering",
    short: "Build scalable systems from frontend to backend — end to end.",
    duration3: "3 Months",
    duration6: "6 Months",
    commitment: "15 hrs/week",
    languages: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "Bash"],
    tools: ["Git & GitHub", "VS Code", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Postman", "Linux CLI", "Jest"],
    curriculum3: [
      "Programming Fundamentals (Python & JS)",
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Version Control with Git & GitHub",
      "Backend Development with Node.js",
      "Databases: SQL & PostgreSQL",
      "RESTful API Design & Development",
      "Authentication & Security Basics",
      "Testing: Unit & Integration Tests",
      "Introduction to Deployment (Heroku/Render)",
    ],
    curriculum6: [
      "All 3-Month content",
      "Advanced TypeScript & Type Safety",
      "System Design & Architecture",
      "Microservices & Distributed Systems",
      "NoSQL Databases (MongoDB)",
      "Containerisation with Docker",
      "CI/CD Pipelines (GitHub Actions)",
      "Cloud Deployment (AWS / GCP basics)",
      "Agile & Scrum Methodologies",
      "Capstone: Full-Stack App from Scratch",
      "Code Reviews & Team Collaboration",
      "Career Prep & Portfolio Building",
    ],
    image: require("../assets/Courses/software.jpg"),
  },
  {
    id: 2,
    key: "front-end",
    name: "Front-End Development",
    short: "Craft pixel-perfect, performant, and accessible web interfaces.",
    duration3: "3 Months",
    duration6: "6 Months",
    commitment: "12 hrs/week",
    languages: ["HTML5", "CSS3", "JavaScript", "TypeScript", "JSX"],
    tools: ["React", "Tailwind CSS", "Figma", "Git & GitHub", "Webpack / Vite", "npm / yarn", "Chrome DevTools", "Axios", "Vercel / Netlify"],
    curriculum3: [
      "HTML5 — Semantic Markup & Structure",
      "CSS3 — Flexbox, Grid & Layouts",
      "Responsive Design & Mobile-First",
      "JavaScript Fundamentals (ES6+)",
      "DOM Manipulation & Events",
      "Fetch API & Working with REST APIs",
      "Version Control with Git & GitHub",
      "Intro to React — Components & Props",
      "React State & Lifecycle",
      "Deploying to Vercel / Netlify",
    ],
    curriculum6: [
      "All 3-Month content",
      "Advanced React — Hooks & Context API",
      "TypeScript in React Projects",
      "State Management (Redux / Zustand)",
      "Tailwind CSS — Advanced Styling",
      "Animations & Micro-interactions",
      "Web Accessibility (WCAG 2.1)",
      "Performance Optimisation & Core Web Vitals",
      "Testing with React Testing Library",
      "Figma to Code — Design Handoff",
      "Next.js — SSR & Static Generation",
      "Capstone: Production-Ready Web App",
    ],
    image: require("../assets/Courses/front-end.jpg"),
  },
  {
    id: 3,
    key: "devops",
    name: "DevOps Engineering",
    short: "Bridge development and operations — automate, scale, and ship faster.",
    duration3: "3 Months",
    duration6: "6 Months",
    commitment: "15 hrs/week",
    languages: ["Bash / Shell", "Python", "YAML", "HCL (Terraform)", "SQL"],
    tools: ["Docker", "Kubernetes", "Terraform", "Ansible", "GitHub Actions", "AWS", "Prometheus", "Grafana", "Nginx", "Helm", "Linux"],
    curriculum3: [
      "Linux Fundamentals & Shell Scripting",
      "Version Control & Git Workflows (GitOps)",
      "Containerisation with Docker",
      "Docker Compose — Multi-container Apps",
      "CI/CD Concepts & Pipelines",
      "GitHub Actions — Workflow Automation",
      "Cloud Computing Fundamentals (AWS)",
      "Infrastructure as Code — Terraform Intro",
      "Configuration Management with Ansible",
      "Monitoring Basics — Prometheus & Grafana",
    ],
    curriculum6: [
      "All 3-Month content",
      "Kubernetes — Orchestration & Scaling",
      "Helm Charts & K8s Package Management",
      "Advanced Terraform & State Management",
      "Multi-Cloud Deployments (AWS + Azure)",
      "Security in DevOps (DevSecOps)",
      "Secrets Management (Vault / AWS Secrets)",
      "SRE Principles & SLOs / SLAs / SLIs",
      "Log Aggregation (ELK Stack)",
      "Capstone: Full DevOps Pipeline Project",
    ],
    image: require("../assets/Courses/devops.png"),
  },
  {
    id: 4,
    key: "python",
    name: "Python Development",
    short: "From scripting and automation to APIs and ML foundations.",
    duration3: "3 Months",
    duration6: "6 Months",
    commitment: "15 hrs/week",
    languages: ["Python", "SQL", "HTML", "Bash", "JSON / YAML"],
    tools: ["FastAPI", "Django", "Flask", "PostgreSQL", "SQLAlchemy", "Pandas", "NumPy", "Celery", "Redis", "Docker", "Pytest", "Jupyter Notebook"],
    curriculum3: [
      "Python Fundamentals & Data Types",
      "Control Flow, Functions & Modules",
      "Object-Oriented Programming in Python",
      "File I/O & Error Handling",
      "Working with APIs (Requests library)",
      "Databases with SQLAlchemy & PostgreSQL",
      "Web Development with Flask",
      "Automation & Scripting Projects",
      "Introduction to FastAPI",
      "Testing with Pytest",
    ],
    curriculum6: [
      "All 3-Month content",
      "Advanced Django — Full Web Framework",
      "Django REST Framework (DRF)",
      "Authentication — JWT & OAuth2",
      "Task Queues with Celery & Redis",
      "Data Analysis with Pandas & NumPy",
      "Intro to Machine Learning (scikit-learn)",
      "Containerising Python Apps with Docker",
      "Web Scraping (BeautifulSoup / Scrapy)",
      "Deployment on AWS / Railway / Fly.io",
      "Capstone: Full Python Application",
    ],
    image: require("../assets/Courses/software.jpg"),
  },
  {
    id: 5,
    key: "data-science",
    name: "Data Science",
    short: "Extract insight from data — analyse, visualise, model, and communicate.",
    duration3: "3 Months",
    duration6: "6 Months",
    commitment: "15 hrs/week",
    languages: ["Python", "SQL", "R (overview)", "Markdown"],
    tools: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "scikit-learn", "Jupyter Notebook", "PostgreSQL", "Tableau / Power BI", "Google Colab"],
    curriculum3: [
      "Python for Data Science (Pandas & NumPy)",
      "Data Cleaning & Preprocessing",
      "Exploratory Data Analysis (EDA)",
      "SQL for Data Analysts",
      "Statistics — Descriptive & Inferential",
      "Data Visualisation (Matplotlib, Seaborn)",
      "Introduction to Machine Learning",
      "Regression Models (Linear & Logistic)",
      "Working with Real Datasets",
      "Presenting Data Insights",
    ],
    curriculum6: [
      "All 3-Month content",
      "Classification & Clustering Algorithms",
      "Decision Trees, Random Forests & XGBoost",
      "Model Evaluation & Hyperparameter Tuning",
      "Natural Language Processing (NLP) Intro",
      "Time Series Analysis & Forecasting",
      "Feature Engineering & Selection",
      "Interactive Dashboards (Plotly / Tableau)",
      "Big Data Concepts (Spark intro)",
      "Capstone: End-to-End Data Science Project",
    ],
    image: require("../assets/Courses/data.png"),
  },
  {
    id: 6,
    key: "cloud",
    name: "Cloud Fundamentals",
    short: "Understand, deploy, and manage resources across leading cloud platforms.",
    duration3: "3 Months",
    duration6: "6 Months",
    commitment: "12 hrs/week",
    languages: ["Bash / Shell", "YAML", "JSON", "HCL (Terraform basics)"],
    tools: ["AWS (EC2, S3, RDS, Lambda)", "Azure Portal", "Terraform", "Linux CLI", "CloudWatch", "IAM", "GitHub"],
    curriculum3: [
      "What is Cloud Computing? (IaaS/PaaS/SaaS)",
      "AWS Core Services — EC2, S3, IAM",
      "Networking in the Cloud — VPC, Subnets",
      "Cloud Storage Solutions",
      "Managed Databases in the Cloud (RDS)",
      "Identity & Access Management (IAM)",
      "Introduction to Serverless (Lambda)",
      "Billing, Pricing & Cost Management",
      "Security Best Practices in Cloud",
      "AWS Cloud Practitioner Exam Prep",
    ],
    curriculum6: [
      "All 3-Month content",
      "Microsoft Azure Fundamentals",
      "Multi-Cloud Strategy & Architecture",
      "Infrastructure as Code with Terraform",
      "Load Balancing & Auto Scaling",
      "Cloud Monitoring & Alerting (CloudWatch)",
      "Containers in the Cloud (ECS / AKS)",
      "Cloud Migration Strategies",
      "Disaster Recovery & High Availability",
      "Capstone: Cloud Architecture Project",
    ],
    image: require("../assets/Courses/cloud-engineering.jpg"),
  },
  {
    id: 7,
    key: "system-admin",
    name: "System Administration",
    short: "Manage, configure, and secure Linux and Windows environments like a pro.",
    duration3: "3 Months",
    duration6: "6 Months",
    commitment: "12 hrs/week",
    languages: ["Bash / Shell", "PowerShell"],
    tools: ["Linux (Ubuntu / CentOS / RHEL)", "Ansible", "rsync", "Windows Server 2019/2022", "Samba", "Active Directory", "OpenSSH", "Nagios / Zabbix", "VMware / VirtualBox", "Wireshark"],
    curriculum3: [
      "Linux Fundamentals — File System & CLI",
      "User & Group Management (Linux)",
      "File Permissions & Ownership",
      "Package Management (apt / yum / dnf)",
      "Networking — IP, DNS, DHCP, Routing",
      "Windows Server Installation & Setup",
      "Active Directory — Users, Groups & OUs",
      "Group Policy Objects (GPO) Basics",
      "Storage Management — Disks, LVM & RAID",
      "Shell Scripting for Automation",
      "Remote Access — SSH & RDP",
      "Backup & Recovery Strategies",
    ],
    curriculum6: [
      "All 3-Month content",
      "Advanced Active Directory & LDAP",
      "PowerShell Scripting & Automation",
      "Virtualisation (VMware / Hyper-V)",
      "Linux Hardening & Security Policies",
      "Windows Security & Patch Management",
      "Monitoring & Alerting (Nagios / Zabbix)",
      "Samba — Linux-Windows File Sharing",
      "Infrastructure Automation with Ansible",
      "Capstone: Full IT Environment Build-out",
    ],
    image: require("../assets/Courses/Linux.jpg"),
  },
  {
    id: 8,
    key: "ai-ml",
    name: "AI & Machine Learning",
    short: "Build intelligent systems — from classical ML to deep learning and generative AI.",
    duration3: "3 Months",
    duration6: "6 Months",
    commitment: "20 hrs/week",
    languages: ["Python", "SQL", "R (overview)", "Markdown", "YAML"],
    tools: ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "Hugging Face", "OpenAI API", "LangChain", "Jupyter Notebook", "Pandas & NumPy", "FastAPI", "Docker"],
    curriculum3: [
      "Python for AI & Data Handling",
      "Mathematics for ML — Linear Algebra & Stats",
      "Supervised Learning — Regression & Classification",
      "Unsupervised Learning — Clustering & PCA",
      "Model Evaluation, Tuning & Validation",
      "Introduction to Neural Networks",
      "Deep Learning with TensorFlow / Keras",
      "Natural Language Processing (NLP) Basics",
      "Computer Vision — Image Classification",
      "Intro to Generative AI & Large Language Models",
    ],
    curriculum6: [
      "All 3-Month content",
      "Advanced Deep Learning — CNNs, RNNs, Transformers",
      "Fine-Tuning & Transfer Learning",
      "Large Language Models (LLMs) & Prompt Engineering",
      "Building AI Applications with LangChain",
      "OpenAI API & Custom GPT Integrations",
      "Retrieval-Augmented Generation (RAG)",
      "MLOps — Deploying & Monitoring Models",
      "Responsible AI — Ethics, Bias & Fairness",
      "Capstone: End-to-End AI Application",
    ],
    image: require("../assets/Courses/data.png"),
  },
  {
    id: 9,
    key: "cybersecurity",
    name: "Cybersecurity Fundamentals",
    short: "Intro to cybersecurity — build your foundation before specialising.",
    duration3: "3 Months",
    duration6: null,
    commitment: "15 hrs/week",
    languages: ["Python", "Bash / Shell", "PowerShell", "SQL", "YAML"],
    tools: ["Kali Linux", "Wireshark", "Nmap", "Nessus / OpenVAS", "Splunk (Intro)", "OWASP ZAP", "Metasploit (Intro)", "Burp Suite (Intro)"],
    curriculum3: [
      "Cybersecurity Fundamentals & Threat Landscape",
      "Networking & Protocol Security",
      "Operating System Security (Linux & Windows)",
      "Cryptography — Symmetric, Asymmetric, PKI",
      "Vulnerability Assessment & Scanning",
      "Introduction to Ethical Hacking",
      "Web Application Security (OWASP Top 10)",
      "SOC Basics — SIEM, Log Analysis & Triage",
      "Cloud Security Fundamentals",
      "Incident Response & Digital Forensics Basics",
    ],
    curriculum6: [],
    image: require("../assets/Courses/cyber1.png"),
  },
];

const CourseCard = ({ course, onLearnMore }) => (
  <article className="group h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover">
    <div className="relative h-48 overflow-hidden bg-slate-100 sm:h-56 lg:h-64">
      <img
        src={course.image}
        alt={course.name}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
      <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-900 shadow-sm">
        {course.duration3}
      </div>
    </div>
    <div className="space-y-3 p-4 sm:p-5">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">{course.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{course.short}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
          <FaClock className="text-sky-600" /> {course.commitment}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          <FaTag className="text-amber-600" /> Get in touch
        </span>
      </div>
      <button
        type="button"
        onClick={() => onLearnMore(course)}
        className="btn-primary !px-5 !py-2.5"
      >
        Learn more →
      </button>
    </div>
  </article>
);

CourseCard.propTypes = {
  course: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    short: PropTypes.string,
    duration3: PropTypes.string,
    commitment: PropTypes.string,
  }).isRequired,
  onLearnMore: PropTypes.func.isRequired,
};

const CourseDetail = ({ course, onBack, onApply }) => {
  const [activeTab, setActiveTab] = useState("3month");
  const curriculum = useMemo(
    () => (activeTab === "3month" ? course.curriculum3 : course.curriculum6),
    [activeTab, course]
  );

  return (
    <AnimatedSection className="bg-surface py-12">
      <div className="section-container px-0 sm:px-4 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          <FaArrowLeft /> Back to programmes
        </button>

        <div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-navy-950 via-navy-900 to-primary-800 text-white shadow-card-hover w-full max-w-full">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-5 p-3 sm:p-5 lg:p-12">
              <p className="text-xs uppercase tracking-[0.35em] text-blue-200">Programme detail</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">Master {course.name}</h1>
              <p className="max-w-full text-sm leading-6 text-slate-200">{course.short}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-blue-200">Duration</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {course.duration3}
                    {course.duration6 ? ` / ${course.duration6}` : ""}
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-blue-200">Commitment</p>
                  <p className="mt-2 text-lg font-semibold text-white">{course.commitment}</p>
                </div>
              </div>
              <p className="text-sm text-slate-200">
                Get in touch to explore a solution tailored to your needs.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden sm:h-72 lg:h-80">
              <img
                src={course.image}
                alt={course.name}
                className="h-full w-full object-cover object-center opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.8fr_1fr]">
          <div className="premium-card !p-3 sm:!p-5">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Course overview</h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-6">
                  This programme is designed to take you from foundational concepts all the way to job-ready proficiency. You will build real projects, work with industry-standard tools, and graduate with a portfolio that speaks for itself.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Languages</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {course.languages.map((language) => (
                    <span key={language} className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Tools & platforms</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {course.tools.map((tool) => (
                    <span key={tool} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Curriculum</h3>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {activeTab === "3month" ? "3-Month Intensive" : "6-Month Advanced"}
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("3month")}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === "3month" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    3-Month Intensive
                  </button>
                  {course.curriculum6 && course.curriculum6.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveTab("6month")}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === "6month" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      6-Month Advanced
                    </button>
                  )}
                </div>
                <ul className="mt-6 space-y-3">
                  {curriculum.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      <span className="mt-0.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-slate-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-4 rounded-[24px] bg-navy-950 p-3 text-white shadow-card-hover sm:p-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-200">What you get</p>
              <h3 className="mt-4 text-2xl font-bold">Career-ready learning components</h3>
            </div>
            <div className="space-y-3">
              {[
                "Industry-standard tools & frameworks",
                "Hands-on projects for your portfolio",
                "Certificate of completion",
                "Career support & mentorship",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-3xl bg-white/5 p-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-200">
                    <FaCheck />
                  </span>
                  <p className="text-sm leading-6 text-slate-100">{item}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-2.5">
              <p className="text-sm text-blue-200">Ready to start?</p>
              <p className="mt-3 text-lg font-semibold text-white">Apply today and speak with our admissions team.</p>
            </div>

            <button type="button" onClick={onApply} className="btn-accent w-full">
              Apply / Enrol Now
            </button>
          </aside>
        </div>
      </div>
    </AnimatedSection>
  );
};

CourseDetail.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    short: PropTypes.string,
    image: PropTypes.string,
    duration3: PropTypes.string,
    duration6: PropTypes.string,
    commitment: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    tools: PropTypes.arrayOf(PropTypes.string),
    curriculum3: PropTypes.arrayOf(PropTypes.string),
    curriculum6: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          course.name.toLowerCase().includes(search.toLowerCase()) ||
          course.short.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const handleLearnMore = (course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedCourse(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApply = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-shell">
      <Navbar />

      <AnimatedSection className="overflow-hidden">
        <PageHero
          label="Execute Tech Programmes"
          title="Career-focused courses for modern tech teams"
          subtitle="Explore expert-led programmes that combine practical hands-on learning with industry-ready outcomes."
        />
      </AnimatedSection>

      <main className={`section-container pb-16 pt-6 sm:pt-10 ${selectedCourse ? 'px-2 sm:px-4' : ''}`}>
        {!selectedCourse ? (
          <AnimatedSection className="space-y-10">
            <div className="premium-card !p-4 sm:!p-6 md:!p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Browse our course catalogue</h2>
                  <p className="mt-2 text-sm text-slate-600">Search by programme type, duration, or learning outcomes.</p>
                </div>
                <div className="w-full max-w-md">
                  <label htmlFor="course-search" className="sr-only">Search courses</label>
                  <div className="relative">
                    <input
                      id="course-search"
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search courses…"
                      className="input-field !rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-[28px] bg-navy-950 p-4 text-white shadow-card-hover sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">Need guidance?</p>
                <h3 className="mt-4 font-display text-2xl font-bold">Talk to our admissions team</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  We help you choose the right track, plan your schedule, and tailor the programme for your career goals.
                </p>
                <button type="button" onClick={handleApply} className="btn-accent mt-6">
                  Contact admissions
                </button>
              </div>
              <div className="premium-card !p-3 sm:!p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Featured</p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <p>High-impact curriculum updated for current technology trends, hiring standards, and remote collaboration.</p>
                  <p>Flexible learning tracks for beginners, career switchers, and upskillers.</p>
                </div>
              </div>
            </div>

            {filteredCourses.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} onLearnMore={handleLearnMore} />
                ))}
              </div>
            ) : (
              <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-sm">
                No courses matched your search. Try another keyword or clear the form.
              </div>
            )}
          </AnimatedSection>
        ) : (
          <AnimatedSection className="overflow-hidden">
            <CourseDetail course={selectedCourse} onBack={handleBack} onApply={handleApply} />
          </AnimatedSection>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
