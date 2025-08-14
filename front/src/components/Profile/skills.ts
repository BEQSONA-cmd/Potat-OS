import {
    FaReact,
    FaPython,
    FaJava,
    FaJs,
    FaHtml5,
    FaCss3Alt,
    FaNodeJs,
    FaDocker,
    FaLinux,
    FaGitAlt,
    FaGithub,
    FaGitlab,
    FaAws,
    FaCloudversify,
} from "react-icons/fa";
import {
    SiTypescript,
    SiNextdotjs,
    SiNestjs,
    SiFastapi,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiSqlite,
    SiExpress,
    SiFlask,
    SiSpring,
    SiOracle,
    SiGooglecloud,
    SiNginx,
    SiFastify,
    SiReact,
    SiElectron,
    SiGnubash,
    SiCplusplus,
    SiC,
} from "react-icons/si";
import { IconType } from "react-icons";
import { VscAzure } from "react-icons/vsc";

export interface I_Skills {
    name: string;
    level: number;
    color: string;
    icon: IconType;
}

const codeSkills: I_Skills[] = [
    { name: "JavaScript", level: 91, color: "#f7df1e", icon: FaJs },
    { name: "TypeScript", level: 89, color: "#3178c6", icon: SiTypescript },
    { name: "Python", level: 81, color: "#3776ab", icon: FaPython },
    { name: "C", level: 97, color: "#00599C", icon: SiC },
    { name: "C++", level: 96, color: "#004482", icon: SiCplusplus },
    { name: "Java", level: 72, color: "#f89820", icon: FaJava },
    { name: "Bash", level: 86, color: "#4EAA25", icon: SiGnubash },
    { name: "HTML", level: 71, color: "#e34f26", icon: FaHtml5 },
    { name: "CSS", level: 62, color: "#1572b6", icon: FaCss3Alt },
];

const frameworks: I_Skills[] = [
    { name: "React", level: 96, color: "#61dafb", icon: FaReact },
    { name: "React Native", level: 71, color: "#61dafb", icon: SiReact },
    { name: "Electron", level: 76, color: "#47848F", icon: SiElectron },
    { name: "Next.js", level: 94, color: "#000000", icon: SiNextdotjs },
    { name: "Node.js", level: 91, color: "#68a063", icon: FaNodeJs },
    { name: "Express.js", level: 76, color: "#ffffff", icon: SiExpress },
    { name: "Fastify", level: 94, color: "#000000", icon: SiFastify },
    { name: "Flask", level: 61, color: "#000000", icon: SiFlask },
    { name: "Http Server", level: 61, color: "#888888", icon: FaCloudversify },
    { name: "FastAPI", level: 52, color: "#009688", icon: SiFastapi },
    { name: "Spring Boot", level: 72, color: "#6DB33F", icon: SiSpring },
];

const databases: I_Skills[] = [
    { name: "MySQL", level: 91, color: "#4479A1", icon: SiMysql },
    { name: "SQLite", level: 92, color: "#4479A1", icon: SiSqlite },
    { name: "PostgreSQL", level: 81, color: "#336791", icon: SiPostgresql },
    { name: "MongoDB", level: 71, color: "#47A248", icon: SiMongodb },
];

const devOPS: I_Skills[] = [
    { name: "AWS", level: 91, color: "#FF9900", icon: FaAws },
    { name: "Oracle Cloud", level: 86, color: "#F80000", icon: SiOracle },
    { name: "Azure", level: 71, color: "#0078D4", icon: VscAzure },
    { name: "Google Cloud", level: 76, color: "#4285F4", icon: SiGooglecloud },
    { name: "Docker", level: 86, color: "#0db7ed", icon: FaDocker },
    { name: "Linux", level: 97, color: "#FCC624", icon: FaLinux },
    { name: "Nginx", level: 76, color: "#009639", icon: SiNginx },
    { name: "Git", level: 86, color: "#F05032", icon: FaGitAlt },
    { name: "GitHub", level: 91, color: "#181717", icon: FaGithub },
    { name: "GitLab", level: 71, color: "#FC6D26", icon: FaGitlab },
];

interface allSkills {
    languages: I_Skills[];
    frameworks: I_Skills[];
    databases: I_Skills[];
    devOps: I_Skills[];
}

export const skills: allSkills = {
    languages: codeSkills,
    frameworks: frameworks,
    databases: databases,
    devOps: devOPS,
};

interface Project {
    name: string;
    description: string;
    howItWorks: string;
    whatILearn: string;
    exampleUrl: string;
    languages: string[];
    technologies: string[];
}
