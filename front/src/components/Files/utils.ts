import { I_Point } from "../contexts/WindowContext";
import {
  FaDesktop,
  FaFile,
  FaFileAlt,
  FaFileImage,
  FaFirefoxBrowser,
  FaFolder,
  FaJs,
  FaReact,
  FaHtml5,
  FaPython,
  FaJava,
  FaCss3Alt,
  FaDocker,
  FaUser,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiJson,
  SiTypescript,
  SiGnubash,
  SiPhp,
  SiC,
} from "react-icons/si";

import { ImTerminal } from "react-icons/im";
import { IconType } from "react-icons";
import { I_File } from "../contexts/FileContext";
import { GrDocumentConfig } from "react-icons/gr";

export function getCloseDirectory(position: I_Point, files: I_File[]): string {
  if (!files) return "";
  let closestDirectoryId = "";
  let closestDistance = Infinity;

  files.forEach((file) => {
    if (file.type === "directory") {
      const distance = Math.sqrt(
        Math.pow(position.x - file.position.x, 2) +
          Math.pow(position.y - file.position.y, 2)
      );
      if (distance > 50) return;
      if (distance < closestDistance) {
        closestDistance = distance;
        closestDirectoryId = file.id;
      }
    }
  });
  return closestDirectoryId;
}

export function getFileStyle(fileName: string): {
  style: string;
  language?: string;
} {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    // code
    case "js":
      return { style: "code", language: "javascript" };
    case "ts":
      return { style: "code", language: "typescript" };
    case "jsx":
      return { style: "code", language: "jsx" };
    case "tsx":
      return { style: "code", language: "tsx" };
    case "css":
      return { style: "code", language: "css" };
    case "html":
      return { style: "code", language: "html" };
    case "c":
      return { style: "code", language: "c" };
    case "cpp":
    case "c++":
    case "ino":
      return { style: "code", language: "cpp" };
    case "py":
      return { style: "code", language: "python" };
    case "java":
      return { style: "code", language: "java" };
    case "json":
      return { style: "code", language: "json" };
    case "yaml":
    case "yml":
      return { style: "code", language: "yaml" };
    case "sh":
    case "bash":
      return { style: "code", language: "bash" };
    case "php":
      return { style: "code", language: "php" };
    case "conf":
    case "config":
      return { style: "code", language: "config" };
    // documents
    case "md":
      return { style: "readme" };
    case "txt":
      return { style: "basic" };
    // images
    case "gif":
    case "png":
    case "svg":
    case "jpg":
    case "jpeg":
    case "webp":
      return { style: "image" };
    default:
      return { style: "basic" };
  }
}

export interface FileIcon {
  icon: IconType;
  color: string;
}

// Languages
// const skills: I_Skills[] = [
//   { name: "JavaScript", level: 90, color: "#f7df1e", icon: FaJs },
//   { name: "TypeScript", level: 90, color: "#3178c6", icon: SiTypescript },
//   { name: "Python", level: 80, color: "#3776ab", icon: FaPython },
//   { name: "C", level: 95, color: "#00599C", icon: SiC },
//   { name: "C++", level: 95, color: "#004482", icon: SiCplusplus },
//   { name: "Java", level: 70, color: "#f89820", icon: FaJava },
//   { name: "Bash", level: 85, color: "#4EAA25", icon: SiGnubash },
//   { name: "HTML", level: 70, color: "#e34f26", icon: FaHtml5 },
//   { name: "CSS", level: 60, color: "#1572b6", icon: FaCss3Alt },
// ];

// // Frameworks
// const frameworks: I_Skills[] = [
//   { name: "React", level: 95, color: "#61dafb", icon: FaReact },
//   { name: "React Native", level: 70, color: "#61dafb", icon: SiReact },
//   { name: "Electron", level: 75, color: "#47848F", icon: SiElectron },
//   { name: "Next.js", level: 95, color: "#000000", icon: SiNextdotjs },
//   { name: "Node.js", level: 90, color: "#68a063", icon: FaNodeJs },
//   { name: "Express.js", level: 75, color: "#ffffff", icon: SiExpress },
//   { name: "Fastify", level: 95, color: "#000000", icon: SiFastify },
//   { name: "NestJS", level: 70, color: "#E0234E", icon: SiNestjs },
//   { name: "Flask", level: 60, color: "#000000", icon: SiFlask },
//   { name: "Http Server", level: 60, color: "#888888", icon: FaCloudversify },
//   { name: "FastAPI", level: 50, color: "#009688", icon: SiFastapi },
//   { name: "Spring Boot", level: 70, color: "#6DB33F", icon: SiSpring },
// ];

// // Databases
// const databases: I_Skills[] = [
//   { name: "MySQL", level: 90, color: "#4479A1", icon: SiMysql },
//   { name: "SQLite", level: 90, color: "#4479A1", icon: SiSqlite },
//   { name: "PostgreSQL", level: 80, color: "#336791", icon: SiPostgresql },
//   { name: "MongoDB", level: 70, color: "#47A248", icon: SiMongodb },
// ];

// // DevOps
// const devOPS: I_Skills[] = [
//   { name: "AWS", level: 90, color: "#FF9900", icon: FaAws },
//   { name: "Oracle Cloud", level: 85, color: "#F80000", icon: SiOracle },
//   { name: "Azure", level: 70, color: "#0078D4", icon: VscAzure },
//   { name: "Google Cloud", level: 75, color: "#4285F4", icon: SiGooglecloud },
//   { name: "Docker", level: 85, color: "#0db7ed", icon: FaDocker },
//   { name: "Linux", level: 95, color: "#FCC624", icon: FaLinux },
//   { name: "Nginx", level: 75, color: "#009639", icon: SiNginx },
//   { name: "Git", level: 85, color: "#F05032", icon: FaGitAlt },
//   { name: "GitHub", level: 90, color: "#181717", icon: FaGithub },
//   { name: "GitLab", level: 70, color: "#FC6D26", icon: FaGitlab },
// ];

function getFileStyleIcon(filename: string): FileIcon {
  const fileStyle = getFileStyle(filename);

  if (fileStyle.style === "code") {
    switch (fileStyle.language) {
      case "javascript":
        return { icon: FaJs, color: "#f7df1e" };
      case "typescript":
        return { icon: SiTypescript, color: "#3178c6" };
      case "jsx":
        return { icon: FaReact, color: "#61dafb" };
      case "tsx":
        return { icon: FaReact, color: "#61dafb" };
      case "css":
        return { icon: FaCss3Alt, color: "#1572b6" };
      case "html":
        return { icon: FaHtml5, color: "#e34f26" };
      case "c":
        return { icon: SiC, color: "#00599C" };
      case "cpp":
        return { icon: SiCplusplus, color: "#004482" };
      case "python":
        return { icon: FaPython, color: "#3776ab" };
      case "java":
        return { icon: FaJava, color: "#f89820" };
      case "json":
        return { icon: SiJson, color: "#000000" };
      case "yaml":
        return { icon: FaDocker, color: "#0db7ed" };
      case "bash":
        return { icon: SiGnubash, color: "#4EAA25" };
      case "php":
        return { icon: SiPhp, color: "#8892be" };
      case "config":
        return { icon: GrDocumentConfig, color: "#6e7680" };
      default:
        return { icon: FaFile, color: "#1E90FF" };
    }
  } else {
    switch (fileStyle.style) {
      case "readme":
      case "basic":
        return { icon: FaFileAlt, color: "#1E90FF" };
      case "image":
        return { icon: FaFileImage, color: "#1E90FF" };
      default:
        return { icon: FaFile, color: "#1E90FF" };
    }
  }
}

export function getFileIcon(file: I_File): FileIcon {
  switch (file.type) {
    case "file":
      return getFileStyleIcon(file.name);
    case "directory":
      return { icon: FaFolder, color: "#FFD700" };
    case "settings":
      return { icon: FaDesktop, color: "#4CAF50" };
    case "terminal":
      return { icon: ImTerminal, color: "#FF6600" };
    case "firefox":
      return { icon: FaFirefoxBrowser, color: "#FF6600" };
    case "profile":
      return { icon: FaUser, color: "#1E90FF" };
    default:
      return { icon: FaFile, color: "#1E90FF" };
  }
}
