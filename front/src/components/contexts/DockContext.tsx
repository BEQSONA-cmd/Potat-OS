"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IconType } from "react-icons";
import { FaFirefoxBrowser } from "react-icons/fa";
import { ImTerminal } from "react-icons/im";

export interface I_DockApp {
    isDefault: boolean;
    id: string;
    name: string;
    icon: IconType;
}

interface DockAppsContextType {
    dockApps: I_DockApp[];
    currentAppName: string | null;
    setCurrentAppName: (appName: string | null) => void;
    setDockApps: (dockApps: I_DockApp[]) => void;
    addDockApp: (app: I_DockApp) => void;
    removeDockApp: (appName: string) => void;
}

const DockAppsContext = createContext<DockAppsContextType | undefined>(undefined);

export const DockAppsProvider = ({ children }: { children: ReactNode }) => {
    const [dockApps, setDockApps] = useState<I_DockApp[]>([
        {
            isDefault: true,
            id: "firefoxId",
            name: "Firefox",
            icon: FaFirefoxBrowser,
        },
        {
            isDefault: true,
            id: "terminalId",
            name: "Terminal",
            icon: ImTerminal,
        },
    ]);
    const [currentAppName, setCurrentAppName] = useState<string | null>(null);

    function addDockApp(app: I_DockApp) {
        setDockApps((prevApps) => [...prevApps, app]);
    }
    function removeDockApp(appName: string) {
        setDockApps((prevApps) => prevApps.filter((app) => app.name !== appName));
    }

    return (
        <DockAppsContext.Provider
            value={{
                dockApps,
                currentAppName,
                setCurrentAppName,
                setDockApps,
                addDockApp,
                removeDockApp,
            }}
        >
            {children}
        </DockAppsContext.Provider>
    );
};

export const useDockApps = (): DockAppsContextType => {
    const context = useContext(DockAppsContext);
    if (!context) throw new Error("useDockApps must be used within a DockAppsProvider");
    return context;
};
