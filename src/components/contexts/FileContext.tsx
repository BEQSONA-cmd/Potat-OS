"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { I_Point, I_Window, useWindows } from "./WindowContext";

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
    setFiles: (files: I_File[] | null) => void;
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
    const { windows, openWindow, closeWindow, findWindowId } = useWindows();

    const addFile = (file: I_File) => {
        setFiles((prevFiles) => [...(prevFiles || []), file]);
    };

    const findFile = (id: string): I_File | undefined => {
        if (!files) return undefined;
        const file = files.find((f) => f.id === id);
        if (file) return file;

        for (const f of files) {
            if (f.type === "directory" && Array.isArray(f.content)) {
                const found = f.content.find((item) => item.id === id);
                if (found) return found;
            }
        }
        return undefined;
    };

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
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, name: newName } : file)) : null
        );
    };

    const updateFilePosition = (id: string, position: I_Point) => {
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, position } : file)) : null
        );
    };

    const updateFileContent = (id: string, content: ContentType) => {
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, content } : file)) : null
        );
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
