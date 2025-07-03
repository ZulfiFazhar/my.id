export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string[];
  //  | "Web" | "Mobile" | "Desktop" | "AI" | "Game" | "Other";
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
    title: "Doko: Managing Waste Educational Game",
    slug: "doko-managing-waste-educational-game",
    description:
      "Doko is a solution that can help educate children about proper waste management while increasing environment and social awareness in the community simultaneously through a gamification app.",
    longDescription:
      "Doko is a solution in the form of gamification to educate children from an early age about proper waste management. The game is presented in a unique and interactive way that creates a real-world experience for children.",
    technologies: ["Unity", "AR Core", "PyTorch", "Auzure Playfab"],
    category: ["Game", "Mobile", "AI"],
    status: "Completed",
    startDate: "2023-05-16",
    endDate: "2023-07-29",
    // githubUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://youtu.be/geF_DudS8yw",
    imageUrl: "/projects/doko.svg",
    features: [
      "Sorting Waste",
      "Scan Waste",
      "Recycle Waste",
      "Accesories Store",
      "Google Play Games Integration",
    ],
  },
  {
    id: "proj-002",
    title:
      "Mainchick: Smart collaborative system for broiler livestock businesses using IoT and AI technology.",
    slug: "moonchick-smart-collaborative-system",
    description:
      "Mainchick is an innovative collaborative system designed for broiler livestock businesses, integrating big data analytics and IoT technology.",
    longDescription:
      "Mainchick delivers IoT tools to gather significant environmental data, a monitoring system for efficient data transmission, correlation analysis to detect the factors that impact broiler mortality, and a feature based on machine learning for the identification of chicken diseases through the recognition of photographs. Mainchick can be accessed through both mobile and web platforms, to empower poultry owners by providing them with real-time awareness and reducing broiler mortality, particularly in rural areas that have limited network conditions, this is made possible by the implementation of edge computing on IoT devices.",
    technologies: ["React", "Flutter", "Firebase", "Gemini", "TensorFlow"],
    category: ["Mobile", "Web", "AI", "IoT"],
    status: "Completed",
    startDate: "2023-04-13",
    endDate: "2024-08-05",
    // githubUrl: "https://github.com/username/task-manager",
    liveUrl: "https://mainchick.zulfifazhar.my.id",
    imageUrl: "/projects/mainchick.svg",
    features: [
      "Real-time AIoT Monitoring",
      "Edge Computing",
      "Data Analytics Dashboard",
      "Disease Detection",
      "Correlation Analysis",
      "Chatbot Assistance",
      "Notification system",
    ],
  },
  {
    id: "proj-003",
    title: "Agrimate: Smart Farming IoT System",
    slug: "agrimate-smart-farming-iot-system",
    description:
      "Agrimate is a smart farming IoT system that utilizes AI and IoT technology to optimize agricultural practices, ensuring efficient resource management and improved crop yields.",
    longDescription:
      "Agrimate is a cross-platform application designed to assist farmers throughout their agricultural process—from Pre-Farming to Post-Farming. By leveraging advanced technologies like Convolutional Neural Networks (CNN), Large Language Models (LLM), and real-time data sources, Agrimate helps farmers optimize planting, manage crops effectively, and predict market prices to maximize profits.",
    technologies: ["NodeJS", "TypeScript", "Kotlin", "Redux", "Expo"],
    category: ["Mobile"],
    status: "In Progress",
    startDate: "2023-12-19",
    // endDate: "Now",
    // githubUrl: "https://github.com/username/fitness-tracker",
    imageUrl: "/projects/agrimate.svg",
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
