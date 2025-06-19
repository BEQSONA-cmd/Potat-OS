"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface I_Some {
    attribute1: string;
    attribute2: string;
    attribute3: string;
}

interface SomeContextType {
    some: I_Some | null;
    setSome: (some: I_Some | null) => void;
}

const someContext = createContext<SomeContextType | undefined>(undefined);

export const someProvider = ({ children }: { children: ReactNode }) => {
    const [some, setSome] = useState<I_Some | null>(null);

    return <someContext.Provider value={{ some, setSome }}>{children}</someContext.Provider>;
};

export const usesome = (): SomeContextType => {
    const context = useContext(someContext);
    if (!context) throw new Error("usesome must be used within a someProvider");
    return context;
};
