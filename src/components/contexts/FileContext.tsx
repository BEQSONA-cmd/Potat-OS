"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { I_Point, I_Window, useWindows } from "./WindowContext";

export type FileType = "file" | "directory";

export type ContentType = string | I_File[];

export interface I_File {
    id: string;
    name: string;
    type: FileType;
    x: number;
    y: number;
    content: ContentType;
}

interface FilesContextType {
    files: I_File[] | null;
    editFileId: string | null;
    currentFileId: string | null;
    setFiles: (files: I_File[] | null) => void;
    addFile: (x: number, y: number, name: string, type: FileType) => void;
    deleteFile: (id: string) => void;
    renameFile: (id: string, newName: string) => void;
    updateFilePosition: (id: string, x: number, y: number) => void;
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
    const { windows, openWindow } = useWindows();

    const addFile = (x: number, y: number, name: string, type: FileType) => {
        setFiles((prevFiles) => [
            ...(prevFiles || []),
            { id: crypto.randomUUID(), name, type, content: type === "file" ? "" : [], x, y },
        ]);
    };

    const deleteFile = (id: string) => {
        setFiles((prevFiles) => (prevFiles ? prevFiles.filter((file) => file.id !== id) : null));
        // Also close any open windows for this file
        // setWindows((prev) => prev.filter((w) => w.file.id !== id));
    };

    const renameFile = (id: string, newName: string) => {
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, name: newName } : file)) : null
        );
        // Update window titles if open
        // setWindows((prev) => prev.map((w) => (w.file.id === id ? { ...w, file: { ...w.file, name: newName } } : w)));
    };

    const updateFilePosition = (id: string, x: number, y: number) => {
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, x, y } : file)) : null
        );
    };

    const updateFileContent = (id: string, content: ContentType) => {
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, content } : file)) : null
        );
        // Update content in open windows
        // setWindows((prev) => prev.map((w) => (w.file.id === id ? { ...w, file: { ...w.file, content } } : w)));
    };

    const openFile = (id: string) => {
        const fileToOpen = files?.find((f) => f.id === id);
        if (!fileToOpen) return;

        if (windows && windows.some((w) => w.file.id === id)) return;
        const position: I_Point = {
            x: fileToOpen.x || 100,
            y: fileToOpen.y || 100,
        };
        openWindow(fileToOpen, position);
    };

    return (
        <FilesContext.Provider
            value={{
                files,
                editFileId,
                currentFileId,
                setFiles,
                addFile,
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
