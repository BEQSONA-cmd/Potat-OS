"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FaFirefoxBrowser } from "react-icons/fa";
import { ImTerminal } from "react-icons/im";

export interface I_DockApp {
    id: string;
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
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
            id: crypto.randomUUID(),
            name: "Firefox",
            icon: <FaFirefoxBrowser />,
            onClick: () => console.log("Open Firefox"),
        },
        {
            id: crypto.randomUUID(),
            name: "Terminal",
            icon: <ImTerminal />,
            onClick: () => console.log("Open Terminal"),
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
