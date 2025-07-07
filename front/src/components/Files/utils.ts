import { I_File } from "../contexts/FileContext";
import { I_Point } from "../contexts/WindowContext";

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
    case "md":
      return { style: "readme" };
    case "txt":
      return { style: "basic" };
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
      return { style: "code", language: "cpp" };
    case "ino":
      return { style: "code", language: "cpp" };
    case "py":
      return { style: "code", language: "python" };
    case "java":
      return { style: "code", language: "java" };
    case "json":
      return { style: "code", language: "json" };
    case "yaml":
      return { style: "code", language: "yaml" };
    case "yml":
      return { style: "code", language: "yaml" };
    case "sh":
      return { style: "code", language: "bash" };
    case "bash":
      return { style: "code", language: "bash" };
    case "php":
      return { style: "code", language: "php" };
    default:
      return { style: "basic" };
  }
}
