import type { ObjectId } from "mongodb";

export const CAMPUS_OPTIONS = [
  "Vijay Nagar",
  "Bhawarkua",
  "Annapurna",
] as const;

export type CampusName = (typeof CAMPUS_OPTIONS)[number];

export const LEAD_STATUSES = [
  "new",
  "called",
  "demo_attended",
  "enrolled",
  "closed",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_META: Record<
  LeadStatus,
  { label: string; badgeClass: string }
> = {
  new: {
    label: "New",
    badgeClass: "bg-brand-primary/10 text-brand-primary border-brand-primary/25",
  },
  called: {
    label: "Called",
    badgeClass: "bg-amber-500/10 text-amber-700 border-amber-500/25",
  },
  demo_attended: {
    label: "Demo Attended",
    badgeClass: "bg-sky-500/10 text-sky-700 border-sky-500/25",
  },
  enrolled: {
    label: "Enrolled",
    badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25",
  },
  closed: {
    label: "Not Interested",
    badgeClass: "bg-ink/5 text-ink-muted border-hairline",
  },
};

export const COURSE_CATALOG_OPTIONS = [
  { slug: "java-full-stack-developer", title: "Java Full Stack Developer" },
  { slug: "mern-stack-developer-course", title: "MERN Stack Developer" },
  { slug: "python-programming-classes", title: "Python & Django Development" },
  { slug: "data-analytics-course-in-indore", title: "Data Analytics & Power BI" },
  { slug: "data-science-and-analytics-courses-in-indore", title: "Data Science & Analytics" },
  { slug: "artificial-intelligence-and-machine-learning-course", title: "AI & Machine Learning" },
  { slug: "devops-and-cloud-computing-course", title: "DevOps & AWS Cloud" },
  { slug: "digital-marketing-course-in-indore", title: "Digital Marketing" },
  { slug: "tally-gst-mastery-course", title: "Tally Prime + GST" },
  { slug: "ms-office-and-excel-course-in-indore", title: "MS Office & Advanced Excel" },
  { slug: "c-and-cpp-programming-classes", title: "C & C++ Programming" },
  { slug: "english-courses", title: "Spoken English & Communication" },
] as const;

export interface LeadUtm {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface LeadDoc {
  _id?: ObjectId;
  leadId: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  campus: string;
  background: string;
  message: string;
  page: string;
  utm: LeadUtm;
  status: LeadStatus;
  notes: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminLeadItem {
  id: string;
  leadId: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  campus: string;
  background: string;
  message: string;
  page: string;
  utm: LeadUtm;
  status: LeadStatus;
  notes: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewDoc {
  _id?: ObjectId;
  studentName: string;
  campus: CampusName;
  course: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  approved: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminReviewItem {
  id: string;
  studentName: string;
  campus: CampusName;
  course: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  approved: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const BLOG_CATEGORIES = [
  "Career Guide",
  "Career Roadmap",
  "Programming & Code",
  "Data & AI",
  "Cloud & DevOps",
  "Office & Analytics",
  "Digital Marketing",
  "Indore Tech News",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogPostDoc {
  _id?: ObjectId;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  author: string;
  readingTime: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminBlogPostItem {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  author: string;
  readingTime: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
