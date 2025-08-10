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
  FaCuttlefish,
  FaCss3Alt,
  FaDocker,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiJson,
  SiYaml,
  SiTypescript,
  SiGnubash,
  SiPhp,
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

function getFileStyleIcon(filename: string): IconType {
  const fileStyle = getFileStyle(filename);

  if (fileStyle.style === "code") {
    switch (fileStyle.language) {
      case "javascript":
        return FaJs;
      case "typescript":
        return SiTypescript;
      case "jsx":
        return FaReact;
      case "tsx":
        return FaReact;
      case "css":
        return FaCss3Alt;
      case "html":
        return FaHtml5;
      case "c":
        return FaCuttlefish;
      case "cpp":
        return SiCplusplus;
      case "python":
        return FaPython;
      case "java":
        return FaJava;
      case "json":
        return SiJson;
      case "yaml":
        return FaDocker;
      case "bash":
        return SiGnubash;
      case "php":
        return SiPhp;
      case "config":
        return GrDocumentConfig;
      default:
        return FaFile;
    }
  } else {
    switch (fileStyle.style) {
      case "readme":
      case "basic":
        return FaFileAlt;
      case "image":
        return FaFileImage;
      default:
        return FaFile;
    }
  }
}

export function getFileIcon(file: I_File): IconType {
  switch (file.type) {
    case "file":
      return getFileStyleIcon(file.name);
    case "directory":
      return FaFolder;
    case "settings":
      return FaDesktop;
    case "terminal":
      return ImTerminal;
    case "firefox":
      return FaFirefoxBrowser;
    default:
      return FaFile;
  }
}
