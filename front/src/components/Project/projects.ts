import { IconType } from "react-icons";
import { FaPython } from "react-icons/fa";
import { SiCplusplus, SiGnubash, SiC, SiTypescript, SiNextdotjs, SiFastify, SiSequelize } from "react-icons/si";
import { GiProcessor, Gi3dHammer, GiRayGun } from "react-icons/gi";
import { HiSignal } from "react-icons/hi2";

export interface I_Skill {
    name: string;
    precent?: number;
    color: string;
    icon: IconType;
}
interface Project {
    name: string;
    description: string;
    howItWorks: string;
    whatILearn: string;
    exampleUrl: string;
    languages: I_Skill[];
    technologies: I_Skill[];
    github?: string;
}

const MinishellTester: Project = {
    name: "Minishell Tester",
    description:
        "A tool to streamline testing for the 42 Minishell project by connecting two terminals and executing commands simultaneously in bash and your minishell.",
    howItWorks:
        "Runs Minishell as a child process in a Python script, catches signals, and bridges input/output between two terminals for side-by-side comparison.",
    whatILearn:
        "Signals, Python's subprocess module, socket-based terminal connections, and basic penetration testing for shell vulnerabilities.",
    exampleUrl: "https://raw.githubusercontent.com/BEQSONA-cmd/Minishell_Tester/main/gifs/Tests.gif",
    languages: [
        { name: "Bash", precent: 65, color: "#4EAA25", icon: SiGnubash },
        { name: "Python", precent: 27, color: "#3776ab", icon: FaPython },
        { name: "C++", precent: 8, color: "#004482", icon: SiCplusplus },
    ],
    technologies: [
        { name: "Py Signal", color: "#00ff00", icon: HiSignal },
        { name: "Py Subprocess", color: "#00bfff", icon: GiProcessor },
    ],
    github: "https://github.com/BEQSONA-cmd/Minishell_Tester",
};

const Cabinette: Project = {
    name: "Cabinette",
    description:
        "A unified testing suite for multiple beginner-level 42 projects like Ft_Printf, Get_Next_Line, Libft, Philosophers, Pipex, and Push_Swap.",
    howItWorks:
        "Automates building, running, and validating each project with predefined input/output cases, error handling checks, and stress tests for performance and correctness.",
    whatILearn:
        "Cross-project automation in Bash and Python, process management in C, testing strategies, and developing reusable test harnesses.",
    exampleUrl: "https://raw.githubusercontent.com/BEQSONA-cmd/Minishell_Tester/main/gifs/Tests.gif",
    languages: [
        { name: "C", precent: 67, color: "#A8B9CC", icon: SiC },
        { name: "Python", precent: 25, color: "#3776ab", icon: FaPython },
        { name: "C++", precent: 6, color: "#004482", icon: SiCplusplus },
        { name: "Bash", precent: 2, color: "#4EAA25", icon: SiGnubash },
    ],
    technologies: [
        { name: "Automated Scripts", color: "#FFD700", icon: GiProcessor },
        { name: "Stress Testing", color: "#FF4500", icon: HiSignal },
    ],
    github: "https://github.com/BEQSONA-cmd/Cabinette",
};

const Cub3d: Project = {
    name: "Cub3d",
    description:
        "A raycasting-based 3D game written in C for the 42 curriculum, inspired by early FPS engines like Wolfenstein 3D.",
    howItWorks:
        "Implements a raycasting engine to render walls, textures, and player movement in real-time, simulating a 3D environment from a 2D map.",
    whatILearn:
        "Raycasting math, game loop design, input handling, texture mapping, and performance optimization in C.",
    exampleUrl: "https://raw.githubusercontent.com/BEQSONA-cmd/Minishell_Tester/main/gifs/Tests.gif",
    languages: [{ name: "C", precent: 100, color: "#A8B9CC", icon: SiC }],
    technologies: [
        { name: "Raycasting", color: "#FF6347", icon: GiRayGun },
        { name: "MiniLibX", color: "#4682B4", icon: Gi3dHammer },
    ],
    github: "https://github.com/BEQSONA-cmd/Cub3d",
};

const Minishell: Project = {
    name: "Minishell",
    description:
        "A full bash-like shell implementation in C, capable of handling environment variables, command execution, and multiple processes.",
    howItWorks:
        "Parses user input, manages child processes for command execution, implements piping and redirection, and handles key hooks and signals.",
    whatILearn:
        "Shell parsing, process communication via pipes, signal handling, and replicating bash-like environment behavior.",
    exampleUrl: "https://raw.githubusercontent.com/BEQSONA-cmd/Minishell_Tester/main/gifs/Tests.gif",
    languages: [{ name: "C", precent: 100, color: "#A8B9CC", icon: SiC }],
    technologies: [
        { name: "Pipes & Redirection", color: "#20B2AA", icon: GiProcessor },
        { name: "Signal Handling", color: "#FF4500", icon: HiSignal },
    ],
    github: "https://github.com/BEQSONA-cmd/Minishell",
};

const Tabley: Project = {
    name: "Tabley",
    description:
        "A web application for restaurant table reservations, featuring a Next.js frontend and a Fastify backend.",
    howItWorks:
        "Users can view restaurant availability, select a date and time, and book tables online, with data stored and managed via a Fastify API.",
    whatILearn:
        "Full-stack development with TypeScript, integrating Next.js SSR features with a Fastify backend, and designing intuitive UI/UX for reservations.",
    exampleUrl: "https://tabley.vercel.app/",
    languages: [{ name: "TypeScript", precent: 100, color: "#3178C6", icon: SiTypescript }],
    technologies: [
        { name: "Next.js", color: "#000000", icon: SiNextdotjs },
        { name: "Fastify", color: "#FFCC00", icon: SiFastify },
        { name: "Sequelize", color: "#3776ab", icon: SiSequelize },
    ],
};

export const projects: Project[] = [MinishellTester, Cabinette, Cub3d, Minishell, Tabley];
