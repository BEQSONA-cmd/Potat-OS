"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { I_Point, I_Window, useWindows } from "./WindowContext";
import { toast } from "react-toastify";

export type FileType = "file" | "directory";

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

export const FilesProvider = ({ children }: { children: ReactNode }) => {
    const [editFileId, setEditFileId] = useState<string | null>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    const [files, setFiles] = useState<I_File[] | null>(null);
    const [hoveredDirectoryId, setHoveredDirectoryId] = useState("");
    const { windows, openWindow, closeWindow, findWindowId, fileUpdate } = useWindows();

    const addFile = (file: I_File) => {
        setFiles((prevFiles) => [...(prevFiles || []), file]);
    };

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
        if (windows && windows.some((w) => w.file.id === id)) return;
        openWindow(fileToOpen, fileToOpen.position);
    };

    return (
        <FilesContext.Provider
            value={{
                files,
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
