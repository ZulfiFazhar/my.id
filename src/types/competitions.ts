export interface Competition {
  id: string;
  title: string;
  organizer: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  result: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  imageUrl?: string;
}

export const competitions: Competition[] = [
  {
    id: "comp-001",
    title: "National Coding Championship",
    organizer: "Tech Innovators Association",
    description:
      "A nationwide competition to find the best coding talent. Participants will solve complex algorithmic problems within time constraints.",
    startDate: "2023-11-15",
    endDate: "2023-12-15",
    location: "Virtual",
    result: "2nd Place",
    status: "Completed",
    imageUrl: "/images/competitions/coding-championship.jpg",
  },
  {
    id: "comp-002",
    title: "Hackathon for Social Good",
    organizer: "Community Tech Alliance",
    description:
      "Build innovative solutions addressing social challenges in 48 hours. Open to teams of 3-5 members.",
    startDate: "2023-10-01",
    endDate: "2023-10-03",
    location: "Tech Hub Central",
    result: "1st Place Winner",
    status: "Completed",
    imageUrl: "/images/competitions/hackathon.jpg",
  },
  {
    id: "comp-003",
    title: "AI Innovation Challenge",
    organizer: "Future Technologies Forum",
    description:
      "Showcase your AI project that solves real-world problems. Open to individuals and teams.",
    startDate: "2023-08-10",
    endDate: "2023-09-10",
    location: "Innovation Center",
    result: "Finalist",
    status: "Completed",
    imageUrl: "/images/competitions/ai-challenge.jpg",
  },
  {
    id: "comp-004",
    title: "Game Development Showdown",
    organizer: "Gaming Industry Network",
    description:
      "Create an original game in any platform or engine. Judging based on creativity, gameplay, and technical execution.",
    startDate: "2023-12-01",
    endDate: "2024-02-28",
    location: "Virtual with Final Showcase",
    result: "3rd Place",
    status: "Completed",
    imageUrl: "/images/competitions/game-dev.jpg",
  },
];
