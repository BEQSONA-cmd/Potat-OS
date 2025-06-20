"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type FileType = "file" | "directory";

export interface I_File {
    id: string;
    name: string;
    type: FileType;
    x: number;
    y: number;
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
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export const FilesProvider = ({ children }: { children: ReactNode }) => {
    const [editFileId, setEditFileId] = useState<string | null>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    const [files, setFiles] = useState<I_File[] | null>(null);

    const addFile = (x: number, y: number, name: string, type: FileType) => {
        setFiles((prevFiles) => [...(prevFiles || []), { id: crypto.randomUUID(), name, type, x, y }]);
    };

    const deleteFile = (id: string) => {
        setFiles((prevFiles) => (prevFiles ? prevFiles.filter((file) => file.id !== id) : null));
    };

    const renameFile = (id: string, newName: string) => {
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, name: newName } : file)) : null
        );
    };

    const updateFilePosition = (id: string, x: number, y: number) => {
        setFiles((prevFiles) =>
            prevFiles ? prevFiles.map((file) => (file.id === id ? { ...file, x, y } : file)) : null
        );
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
