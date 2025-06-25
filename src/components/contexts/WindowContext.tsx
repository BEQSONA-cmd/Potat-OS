"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { I_File } from "./FileContext";

export interface I_Point {
    x: number;
    y: number;
}

export interface I_Window {
    id: string;
    file: I_File;
    position: I_Point;
    size: I_Point;
}

interface WindowsContextType {
    windows: I_Window[] | null;
    setWindows: (windows: I_Window[]) => void;
    openWindow: (file: I_File, position: I_Point) => void;
    updateWindowPosition: (windowId: string, position: I_Point) => void;
    updateWindowSize: (windowId: string, size: I_Point) => void;
    closeWindow: (id: string) => void;
    fileUpdate: (file: I_File) => void;
    findWindowId: (fileId: string) => string | undefined;
}

const WindowsContext = createContext<WindowsContextType | undefined>(undefined);

export const WindowsProvider = ({ children }: { children: ReactNode }) => {
    const [windows, setWindows] = useState<I_Window[]>([]);

    const openWindow = (file: I_File, position: I_Point) => {
        const newWindow: I_Window = {
            id: crypto.randomUUID(),
            file,
            position,
            size: { x: 500, y: 350 },
        };
        setWindows((prev) => [...prev, newWindow]);
    };

    const updateWindowPosition = (windowId: string, position: I_Point) => {
        setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, position } : w)));
    };

    const updateWindowSize = (windowId: string, size: I_Point) => {
        setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, size } : w)));
    };

    const closeWindow = (id: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
    };

    const findWindowId = (fileId: string): string | undefined => {
        const window = windows.find((w) => w.file.id === fileId);
        return window ? window.id : undefined;
    };
    const fileUpdate = (file: I_File) => {
        const windowToUpdate = findWindowId(file.id);
        if (windowToUpdate) {
            setWindows((prev) => prev.map((w) => (w.id === windowToUpdate ? { ...w, file } : w)));
        }
    };

    return (
        <WindowsContext.Provider
            value={{
                windows,
                setWindows,
                openWindow,
                updateWindowPosition,
                updateWindowSize,
                closeWindow,
                fileUpdate,
                findWindowId,
            }}
        >
            {children}
        </WindowsContext.Provider>
    );
};

export const useWindows = (): WindowsContextType => {
    const context = useContext(WindowsContext);
    if (!context) throw new Error("useWindows must be used within a WindowsProvider");
    return context;
};
