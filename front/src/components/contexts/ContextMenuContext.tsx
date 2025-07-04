"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { I_Point } from "./WindowContext";

export interface IContextMenu {
    position: I_Point;
    show: boolean;
    actions: string[];
    fileId?: string;
}

interface ContextMenuContextType {
    contextMenu: IContextMenu | null;
    setContextMenu: (contextMenu: IContextMenu | null) => void;
    openContextMenu: (e: React.MouseEvent, fileId?: string) => void;
}

const desktopActions = ["New Folder", "Refresh", "New File", "Change Background", "Exit"];
const fileActions = ["Open", "Rename", "Delete", "Exit"];

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export const ContextMenuProvider = ({ children }: { children: ReactNode }) => {
    const [contextMenu, setContextMenu] = useState<IContextMenu | null>(null);

    const openContextMenu = (e: React.MouseEvent, fileId?: string) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            position: { x: e.clientX, y: e.clientY },
            show: true,
            actions: fileId ? fileActions : desktopActions,
            fileId: fileId,
        });
    };

    return (
        <ContextMenuContext.Provider value={{ contextMenu, setContextMenu, openContextMenu }}>
            {children}
        </ContextMenuContext.Provider>
    );
};

export const useContextMenu = (): ContextMenuContextType => {
    const context = useContext(ContextMenuContext);
    if (!context) throw new Error("useContextMenu must be used within a ContextMenuProvider");
    return context;
};
