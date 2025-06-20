"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface IContextMenu {
    x: number;
    y: number;
    show: boolean;
    actions: string[];
    fileId?: string;
}

interface ContextMenuContextType {
    contextMenu: IContextMenu | null;
    setContextMenu: (contextMenu: IContextMenu | null) => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export const ContextMenuProvider = ({ children }: { children: ReactNode }) => {
    const [contextMenu, setContextMenu] = useState<IContextMenu | null>(null);

    return <ContextMenuContext.Provider value={{ contextMenu, setContextMenu }}>{children}</ContextMenuContext.Provider>;
};

export const useContextMenu = (): ContextMenuContextType => {
    const context = useContext(ContextMenuContext);
    if (!context) throw new Error("useContextMenu must be used within a ContextMenuProvider");
    return context;
};
