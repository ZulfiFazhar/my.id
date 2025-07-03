import {
  Bot,
  BrainCircuit,
  CodeXml,
  Infinity,
  LucideIcon,
  Terminal,
} from "lucide-react";

export interface TechStack {
  name: string;
  tech: string[];
  logo: LucideIcon;
}

export const techStack: TechStack[] = [
  {
    name: "Frontend",
    tech: ["React", "Next.js", "Tailwind CSS", "Shadcn/ui", "TypeScript"],
    logo: CodeXml,
  },
  {
    name: "Backend",
    tech: [
      "Node.js",
      "Express",
      "Python",
      "FastAPI",
      "MongoDB",
      "ChromaDB",
      "Redis",
      "PostgreSQL",
    ],
    logo: Terminal,
  },
  {
    name: "DevOps",
    tech: ["Azure", "CI/CD", "Docker"],
    logo: Infinity,
  },
  {
    name: "AI/ML",
    tech: ["TensorFlow", "PyTorch", "LangChain", "Hugging Face", "OpenAI"],
    logo: BrainCircuit,
  },
  {
    name: "IoT",
    tech: ["Arduino", "PlatformIO", "MQTT", "RTOS"],
    logo: Bot,
  },
];
