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
    FaInfoCircle,
} from "react-icons/fa";
import { SiCplusplus, SiJson, SiTypescript, SiGnubash, SiPhp, SiC } from "react-icons/si";

import { ImTerminal } from "react-icons/im";
import { IconType } from "react-icons";
import { I_File } from "../contexts/FileContext";
import { GrDocumentConfig } from "react-icons/gr";
import { LuFileJson } from "react-icons/lu";
import { IoTrashBin } from "react-icons/io5";

export function getCloseDirectory(position: I_Point, files: I_File[]): string {
    if (!files) return "";
    let closestDirectoryId = "";
    let closestDistance = Infinity;

    files.forEach((file) => {
        if (file.type === "directory" || file.type === "trash") {
            const distance = Math.sqrt(
                Math.pow(position.x - file.position.x, 2) + Math.pow(position.y - file.position.y, 2)
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
                return { icon: LuFileJson, color: "#f7df1e" };
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
        case "trash":
            return { icon: IoTrashBin, color: "#61dafb" };
        case "project":
            return { icon: FaInfoCircle, color: "#1E90FF" };
        default:
            return { icon: FaFile, color: "#1E90FF" };
    }
}
