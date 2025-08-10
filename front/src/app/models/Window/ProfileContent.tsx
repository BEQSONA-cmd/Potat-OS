"use client";
import React from "react";
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
  FaCloud,
  FaCloudversify,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiNestjs, SiFastapi, SiMongodb, SiPostgresql, SiMysql, SiSqlite, SiExpress, SiFlask, SiSpringboot, SiOracle, SiGooglecloud, SiNginx, SiFastify, SiReact, SiElectron, SiGnubash, SiCplusplus, SiC } from "react-icons/si";
import { IconType } from "react-icons";

const user = {
  name: "Beqa",
  surname: "Tvildiani",
  bio: "Software Developer",
};

interface I_Skills {
  name: string;
  level: number; // 0 to 100
  color: string;
  icon: IconType;
}

// Languages
const skills: I_Skills[] = [
  { name: "JavaScript", level: 90, color: "#f7df1e", icon: FaJs },
  { name: "TypeScript", level: 90, color: "#3178c6", icon: SiTypescript },
  { name: "Python", level: 80, color: "#3776ab", icon: FaPython },
  { name: "C", level: 95, color: "#00599C", icon: SiC },
  { name: "C++", level: 95, color: "#004482", icon: SiCplusplus },
  { name: "Java", level: 70, color: "#f89820", icon: FaJava },
  { name: "Bash", level: 85, color: "#4EAA25", icon: SiGnubash },
  { name: "HTML", level: 70, color: "#e34f26", icon: FaHtml5 },
  { name: "CSS", level: 60, color: "#1572b6", icon: FaCss3Alt },
];

// Frameworks
const frameworks: I_Skills[] = [
  { name: "React", level: 95, color: "#61dafb", icon: FaReact },
  { name: "React Native", level: 70, color: "#61dafb", icon: SiReact },
  { name: "Electron", level: 75, color: "#47848F", icon: SiElectron },
  { name: "Next.js", level: 95, color: "#000000", icon: SiNextdotjs },
  { name: "Node.js", level: 90, color: "#68a063", icon: FaNodeJs },
  { name: "Express.js", level: 75, color: "#ffffff", icon: SiExpress },
  { name: "Fastify", level: 95, color: "#000000", icon: SiFastify },
  { name: "NestJS", level: 70, color: "#E0234E", icon: SiNestjs },
  { name: "Flask", level: 60, color: "#000000", icon: SiFlask },
  { name: "Http Server", level: 60, color: "#888888", icon: FaCloudversify },
  { name: "FastAPI", level: 50, color: "#009688", icon: SiFastapi },
  { name: "Spring Boot", level: 70, color: "#6DB33F", icon: SiSpringboot },
];

// Databases
const databases: I_Skills[] = [
  { name: "MySQL", level: 90, color: "#4479A1", icon: SiMysql },
  { name: "SQLite", level: 90, color: "#003B57", icon: SiSqlite },
  { name: "PostgreSQL", level: 80, color: "#336791", icon: SiPostgresql },
  { name: "MongoDB", level: 70, color: "#47A248", icon: SiMongodb },
];

// DevOps
const devOPS: I_Skills[] = [
  { name: "AWS", level: 90, color: "#FF9900", icon: FaAws },
  { name: "Oracle Cloud", level: 85, color: "#F80000", icon: SiOracle },
  { name: "Azure", level: 70, color: "#0078D4", icon: FaCloud },
  { name: "Google Cloud", level: 75, color: "#4285F4", icon: SiGooglecloud },
  { name: "Docker", level: 85, color: "#0db7ed", icon: FaDocker },
  { name: "Linux", level: 95, color: "#FCC624", icon: FaLinux },
  { name: "Nginx", level: 75, color: "#009639", icon: SiNginx },
  { name: "Git", level: 85, color: "#F05032", icon: FaGitAlt },
  { name: "GitHub", level: 90, color: "#181717", icon: FaGithub },
  { name: "GitLab", level: 70, color: "#FC6D26", icon: FaGitlab },
];

function SkillBar({ name, level, color, icon: Icon }: I_Skills) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm font-medium mb-1">
        <div className="flex items-center gap-2">
          <Icon style={{ color }} className="text-lg" />
          <span>{name}</span>
        </div>
        <span className="text-gray-400">{level}%</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          }}
        />
      </div>
    </div>
  );
}

function SkillSection({ title, skills }: { title: string; skills: I_Skills[] }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-1 flex items-center gap-2">
        {title}
      </h2>
      {skills.map((skill, idx) => (
        <SkillBar key={idx} {...skill} />
      ))}
    </div>
  );
}

export default function ProfileContent() {
  return (
    <div className="h-full w-full bg-gray-900 text-white p-6 overflow-y-auto">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-2xl font-bold shadow-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {user.name} {user.surname}
          </h1>
          <p className="text-gray-400">{user.bio}</p>
        </div>
      </div>

      {/* Skills Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <SkillSection title="Languages" skills={skills} />
        <SkillSection title="Frameworks & Libraries" skills={frameworks} />
        <SkillSection title="Databases" skills={databases} />
        <SkillSection title="DevOps & Tools" skills={devOPS} />
      </div>
    </div>
  );
}
