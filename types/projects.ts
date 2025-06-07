export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: "Web" | "Mobile" | "Desktop" | "AI" | "Game" | "Other";
  status: "Completed" | "In Progress" | "Planned";
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  features: string[];
}

export interface ProjectCardProps {
  project: Project;
}

export interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const projects: Project[] = [
  {
    id: "proj-001",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description:
      "Full-stack e-commerce solution with modern UI and secure payment integration.",
    longDescription:
      "A comprehensive e-commerce platform built with Next.js and Node.js, featuring user authentication, product management, shopping cart, and integrated payment processing with Stripe.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Stripe",
    ],
    category: "Web",
    status: "Completed",
    startDate: "2023-06-01",
    endDate: "2023-09-15",
    githubUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    imageUrl: "/images/projects/ecommerce.jpg",
    features: [
      "User authentication and authorization",
      "Product catalog with search and filters",
      "Shopping cart and wishlist",
      "Secure payment processing",
      "Admin dashboard",
      "Order tracking",
    ],
  },
  {
    id: "proj-002",
    title: "Task Management App",
    slug: "task-management-app",
    description:
      "Collaborative task management application with real-time updates and team features.",
    longDescription:
      "A React-based task management application that allows teams to collaborate effectively with real-time updates, drag-and-drop functionality, and comprehensive project tracking.",
    technologies: [
      "React",
      "TypeScript",
      "Socket.io",
      "Express.js",
      "PostgreSQL",
      "Material-UI",
    ],
    category: "Web",
    status: "Completed",
    startDate: "2023-03-10",
    endDate: "2023-05-20",
    githubUrl: "https://github.com/username/task-manager",
    liveUrl: "https://taskmanager-demo.netlify.app",
    imageUrl: "/images/projects/task-manager.jpg",
    features: [
      "Real-time collaboration",
      "Drag and drop interface",
      "Team management",
      "Progress tracking",
      "File attachments",
      "Notification system",
    ],
  },
  {
    id: "proj-003",
    title: "AI Chat Assistant",
    slug: "ai-chat-assistant",
    description:
      "Intelligent chatbot powered by machine learning for customer support automation.",
    longDescription:
      "An AI-powered chatbot application that uses natural language processing to provide automated customer support with context-aware responses and learning capabilities.",
    technologies: [
      "Python",
      "TensorFlow",
      "Flask",
      "React",
      "OpenAI API",
      "Redis",
    ],
    category: "AI",
    status: "In Progress",
    startDate: "2023-10-01",
    githubUrl: "https://github.com/username/ai-chat-assistant",
    imageUrl: "/images/projects/ai-chatbot.jpg",
    features: [
      "Natural language processing",
      "Context-aware responses",
      "Multi-language support",
      "Analytics dashboard",
      "Integration APIs",
      "Learning from interactions",
    ],
  },
  {
    id: "proj-004",
    title: "Mobile Fitness Tracker",
    slug: "mobile-fitness-tracker",
    description:
      "Cross-platform mobile app for fitness tracking with social features.",
    longDescription:
      "A comprehensive fitness tracking mobile application built with React Native, featuring workout logging, progress tracking, social challenges, and health insights.",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
    category: "Mobile",
    status: "Completed",
    startDate: "2023-01-15",
    endDate: "2023-04-30",
    githubUrl: "https://github.com/username/fitness-tracker",
    imageUrl: "/images/projects/fitness-app.jpg",
    features: [
      "Workout logging",
      "Progress visualization",
      "Social challenges",
      "Health insights",
      "Offline support",
      "Wearable integration",
    ],
  },
];
