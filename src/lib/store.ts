import { create } from "zustand";
import { nanoid } from "nanoid";

export type FileType = "file" | "directory";

type FileItem = {
    id: string;
    name: string;
    type: FileType;
    x: number;
    y: number;
};

type Store = {
    files: FileItem[];
    addFile: (x: number, y: number, type: FileType) => void;
    deleteFile: (id: string) => void;
    renameFile: (id: string, newName: string) => void;
    updateFilePosition: (id: string, x: number, y: number) => void;
};

export const useStore = create<Store>((set) => ({
    files: [],

    addFile: (x, y, type) =>
        set((state) => ({
            files: [...state.files, { id: nanoid(), name: "New File", type: type, x, y }],
        })),

    deleteFile: (id) => set((state) => ({ files: state.files.filter((file) => file.id !== id) })),

    renameFile: (id, newName) =>
        set((state) => ({
            files: state.files.map((file) => (file.id === id ? { ...file, name: newName } : file)),
        })),

    updateFilePosition: (id, x, y) =>
        set((state) => ({
            files: state.files.map((file) => (file.id === id ? { ...file, x, y } : file)),
        })),
}));
