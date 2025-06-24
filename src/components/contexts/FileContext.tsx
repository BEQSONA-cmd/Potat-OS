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
    addFile: (position: I_Point, name: string, type: FileType) => void;
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

    const addFile = (position: I_Point, name: string, type: FileType) => {
        setFiles((prevFiles) => [
            ...(prevFiles || []),
            {
                id: crypto.randomUUID(),
                name,
                type,
                position,
                content: type === "directory" ? [] : "",
            },
        ]);
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
        const fileToOpen = files?.find((f) => f.id === id);
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
