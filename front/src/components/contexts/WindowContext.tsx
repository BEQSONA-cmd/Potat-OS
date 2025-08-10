"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {  I_File } from "./FileContext";
import { useDockApps } from "./DockContext";
import { getFileIcon } from "../Files/utils";

export interface I_Point {
    x: number;
    y: number;
}

export interface I_Window {
    id: string;
    file: I_File;
    position: I_Point;
    size: I_Point;
    minimized: boolean;
}

interface WindowsContextType {
    windows: I_Window[] | null;
    currentFileId?: string | null;
    setWindows: (windows: I_Window[]) => void;
    setCurrentFileId: (id: string | null) => void;
    setCurrentWindow: (id: string | null) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
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
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    const { addDockApp, removeDockApp, setCurrentAppName } = useDockApps();

    const setCurrentWindow = (id: string | null) => {
        setCurrentFileId(id);

        const appName = windows.find((w) => w.id === id)?.file.name;
        if (appName) {
            setCurrentAppName(appName);
        }
    };

    const openWindow = (file: I_File, position: I_Point) => {
        const newWindow: I_Window = {
            id: file.id,
            file,
            position,
            size: { x: 600, y: 500 },
            minimized: false,
        };
        setCurrentFileId(newWindow.id);
        setWindows((prev) => [...prev, newWindow]);
        if (file.type === "terminal" || file.type === "firefox") {
            setCurrentAppName(file.name);
            return;
        }
        addDockApp({
            isDefault: false,
            id: newWindow.id,
            name: file.name,
            icon: getFileIcon(file),
        });
        setCurrentAppName(file.name);
    };

    const updateWindowPosition = (windowId: string, position: I_Point) => {
        setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, position } : w)));
    };

    const updateWindowSize = (windowId: string, size: I_Point) => {
        setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, size } : w)));
    };

    const closeWindow = (id: string) => {
        const appName = windows.find((w) => w.id === id)?.file.name;
        if (!appName) return;
        if (appName === "Terminal" || appName === "Firefox") {
            minimizeWindow(id);
            return;
        }

        setWindows((prev) => prev.filter((w) => w.id !== id));
        removeDockApp(appName);
        setCurrentAppName(null);
    };

    const minimizeWindow = (id: string) => {
        setCurrentAppName(null);
        setTimeout(() => setCurrentAppName(null), 0);
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    };
    const maximizeWindow = (id: string) => {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
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
                currentFileId,
                setWindows,
                setCurrentFileId,
                setCurrentWindow,
                openWindow,
                updateWindowPosition,
                updateWindowSize,
                closeWindow,
                minimizeWindow,
                maximizeWindow,
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
