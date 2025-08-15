"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { I_Point, useWindows } from "./WindowContext";
import axios from "axios";
import { useDockApps } from "./DockContext";
import { toast } from "react-toastify";

const HOST = process.env.NEXT_PUBLIC_HOST || "http://localhost:8080";

export type FileType = "file" | "directory" | "settings" | "terminal" | "firefox" | "profile" | "project";

export type ContentType = string | I_File[];

export interface I_File {
    id: string;
    name: string;
    type: FileType;
    position: I_Point;
    content: ContentType;
}

interface FilesContextType {
    files: I_File[] | null;
    editFileId: string | null;
    currentFileId: string | null;
    hoveredDirectoryId?: string;
    fileCount: number;
    setFileCount: (count: number) => void;
    folderCount: number;
    setFolderCount: (count: number) => void;
    setFiles: (files: I_File[] | null) => void;
    setHoveredDirectoryId: (id: string) => void;
    addFile: (file: I_File) => void;
    findFile: (id: string) => I_File | undefined;
    getDirFiles: (dir: I_File) => I_File[];
    deleteFile: (id: string) => void;
    renameFile: (id: string, newName: string) => void;
    updateFilePosition: (id: string, position: I_Point) => void;
    setEditFileId: (id: string | null) => void;
    setCurrentFileId: (id: string | null) => void;
    openFile: (id: string) => void;
    updateFileContent: (id: string, content: ContentType) => void;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

interface getRepoParams {
    repoName: string;
}

async function getRepo({ repoName }: getRepoParams) {
    try {
        const response = await axios.get(`${HOST}/api/get`, {
            params: {
                repoName: repoName,
            },
        });
        if (response.data && response.data.data) {
            return response.data.data as I_File;
        }
    } catch (error) {
        console.error("Error fetching files:", error);
    }
}

const repoNames = ["Minishell_Tester", "Cabinette", "Cub3d", "Minishell", "Tabley"];

const defaultFiles: I_File[] = [
    {
        id: "firefoxId",
        name: "Firefox",
        type: "firefox",
        position: { x: 10, y: 20 },
        content: "",
    },
    {
        id: "profileId",
        name: "Profile",
        type: "profile",
        position: { x: 10, y: 120 },
        content: "",
    },
    {
        id: "terminalId",
        name: "Terminal",
        type: "terminal",
        position: { x: 10, y: 220 },
        content: "",
    },
];

export const FilesProvider = ({ children }: { children: ReactNode }) => {
    const [files, setFiles] = useState<I_File[] | null>(defaultFiles);
    const [editFileId, setEditFileId] = useState<string | null>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    const [fileCount, setFileCount] = useState(0);
    const [folderCount, setFolderCount] = useState(0);
    const [hoveredDirectoryId, setHoveredDirectoryId] = useState("");
    const { setCurrentAppName } = useDockApps();

    const { openWindow, setCurrentWindow, closeWindow, maximizeWindow, findWindowId, fileUpdate } = useWindows();

    const addFile = (file: I_File) => {
        setFiles((prevFiles) => [...(prevFiles || []), file]);
    };

    useEffect(() => {
        (async () => {
            const ProjectsFile: I_File = {
                id: "projectsId",
                name: "Projects",
                type: "directory",
                position: { x: 10, y: 320 },
                content: [],
            };
            for (const name of repoNames) {
                const file = await getRepo({ repoName: name });
                if (file && Array.isArray(ProjectsFile.content)) {
                    ProjectsFile.content.push({ ...file, id: name });
                }
            }

            addFile(ProjectsFile);
        })();
    }, []);

    function findFile(id: string, searchFiles?: I_File[]): I_File | undefined {
        const filesToSearch = searchFiles || files;
        if (!filesToSearch) return undefined;

        const file = filesToSearch.find((f) => f.id === id);
        if (file) return file;

        for (const f of filesToSearch) {
            if (f.type === "directory" && Array.isArray(f.content)) {
                const found = findFile(id, f.content);
                if (found) return found;
            }
        }

        return undefined;
    }

    function updateFileInTree(files: I_File[] | null, id: string, updateFn: (file: I_File) => I_File): I_File[] | null {
        if (!files) return null;

        return files.map((file) => {
            if (file.id === id) {
                return updateFn(file);
            }

            if (file.type === "directory" && Array.isArray(file.content)) {
                const updatedContent = updateFileInTree(file.content, id, updateFn);
                if (updatedContent !== file.content && updatedContent !== null) {
                    return { ...file, content: updatedContent };
                }
            }

            return file;
        });
    }

    const getDirFiles = (dir: I_File): I_File[] => {
        if (dir.type !== "directory" || !Array.isArray(dir.content)) return [];
        return dir.content.map((file) => ({
            ...file,
            position: { x: file.position.x, y: file.position.y },
        }));
    };

    const deleteFile = (id: string) => {
        if (id === "firefoxId" || id === "profileId" || id === "terminalId" || id === "projectsId") {
            toast.error("You can't delete this file");
            return;
        }

        setFiles((prevFiles) => (prevFiles ? prevFiles.filter((file) => file.id !== id) : null));
        const windowId = findWindowId(id);
        closeWindow(windowId ? windowId : "");
    };

    const renameFile = (id: string, newName: string) => {
        let fileToUpdate = findFile(id);
        if (!fileToUpdate) return;
        fileToUpdate = { ...fileToUpdate, name: newName };
        setFiles((prevFiles) => (prevFiles ? prevFiles.map((file) => (file.id === id ? fileToUpdate : file)) : null));
        fileUpdate(fileToUpdate);
    };

    const updateFilePosition = (id: string, position: I_Point) => {
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, position } : file)) : null
        );
    };

    const updateFileContent = (id: string, content: ContentType) => {
        setFiles((prevFiles) => {
            if (!prevFiles) return null;

            const updatedFiles = updateFileInTree(prevFiles, id, (file) => {
                return { ...file, content };
            });
            if (!updatedFiles) return null;

            const updatedFile = findFile(id, updatedFiles);

            if (updatedFile && typeof content !== "string") {
                fileUpdate(updatedFile);
            }

            return updatedFiles;
        });
    };

    const openFile = (id: string) => {
        const fileToOpen = findFile(id);
        if (!fileToOpen) return;
        if (findWindowId(fileToOpen.id)) {
            setCurrentAppName(fileToOpen.name);
            maximizeWindow(fileToOpen.id);
            setCurrentWindow(fileToOpen.id);
            setCurrentFileId(fileToOpen.id);
            return;
        }
        openWindow(fileToOpen);
        if (fileToOpen.type === "directory" && Array.isArray(fileToOpen.content)) {
            const projectFile = fileToOpen.content.find((f) => f.type === "project");
            if (projectFile) {
                openFile(projectFile.id);
            }
        }
    };

    return (
        <FilesContext.Provider
            value={{
                files,
                fileCount,
                setFileCount,
                folderCount,
                setFolderCount,
                hoveredDirectoryId,
                editFileId,
                currentFileId,
                setFiles,
                addFile,
                getDirFiles,
                findFile,
                deleteFile,
                renameFile,
                updateFilePosition,
                setEditFileId,
                setCurrentFileId,
                setHoveredDirectoryId,
                openFile,
                updateFileContent,
            }}
        >
            {children}
        </FilesContext.Provider>
    );
};

export const useFiles = (): FilesContextType => {
    const context = useContext(FilesContext);
    if (!context) throw new Error("useFiles must be used within a FilesProvider");
    return context;
};
