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
    title: "International ICT Innoserve 2024",
    organizer: "International ICT Organization",
    description:
      "International competition showcasing innovative ICT solutions with Agrimate - an AIoT-based system to support agriculture with machine learning and edge computing.",
    startDate: "2024-06-01",
    endDate: "2024-09-30",
    location: "International",
    result: "Finalist",
    status: "Completed",
    imageUrl: "/images/competitions/ict-innoserve.jpg",
  },
  {
    id: "comp-002",
    title: "Google Solution Challenge 2024",
    organizer: "Google Developers",
    description:
      "Global competition for students to solve real-world problems using Google technology. Built MainChick - an AIoT-based chicken coop monitoring system with correlation analysis and real-time data communication.",
    startDate: "2024-01-01",
    endDate: "2024-04-30",
    location: "Global",
    result: "Top 100 Finalist",
    status: "Completed",
    imageUrl: "/images/competitions/google-solution.jpg",
  },
  {
    id: "comp-003",
    title: "Microsoft Imagine Cup 2024",
    organizer: "Microsoft",
    description:
      "Premier global student technology competition. Showcased Doko - an educational game with image classification model for waste sorting to educate children about proper waste management.",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    location: "Global",
    result: "Qualifying Round",
    status: "Completed",
    imageUrl: "/images/competitions/imagine-cup.jpg",
  },
  {
    id: "comp-004",
    title: "Astranauts 2023 - Student Track",
    organizer: "Astranauts Competition Committee",
    description:
      "National student innovation competition. Presented MainChick - smart collaborative system for broiler livestock businesses using IoT and AI technology with NoSQL databases and WebRTC.",
    startDate: "2023-04-01",
    endDate: "2023-06-30",
    location: "National",
    result: "2nd Place Winner",
    status: "Completed",
    imageUrl: "/images/competitions/astranauts.jpg",
  },
  {
    id: "comp-005",
    title: "LIDM 2023 - Inovasi Teknologi Digital Pendidikan",
    organizer: "LIDM Committee",
    description:
      "Educational technology innovation competition. Showcased Doko - a gamification solution to educate children about proper waste management with AR and AI waste classification.",
    startDate: "2023-05-01",
    endDate: "2023-07-31",
    location: "National",
    result: "Finalist",
    status: "Completed",
    imageUrl: "/images/competitions/lidm.jpg",
  },
];
