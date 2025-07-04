import { ContextMenuProvider } from "@/components/contexts/ContextMenuContext";
import "./globals.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { FilesProvider } from "@/components/contexts/FileContext";
import { WindowsProvider } from "@/components/contexts/WindowContext";
import { DockAppsProvider } from "@/components/contexts/DockContext";

export const metadata = {
    title: "Potat-OS",
    description: "Welcome to Beqa Tvildiani's personal Potat-OS",
};

interface AppProps {
    children: ReactNode;
}

export default function App({ children }: AppProps) {
    return (
        <html lang="en">
            <body>
                <DockAppsProvider>
                    <WindowsProvider>
                        <FilesProvider>
                            <ContextMenuProvider>
                                <main>{children}</main>
                            </ContextMenuProvider>
                            <ToastContainer />
                        </FilesProvider>
                    </WindowsProvider>
                </DockAppsProvider>
            </body>
        </html>
    );
}
