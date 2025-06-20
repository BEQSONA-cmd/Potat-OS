import { ContextMenuProvider } from "@/components/contexts/ContextMenuContext";
import "./globals.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { FilesProvider } from "@/components/contexts/FileContext";

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
                <FilesProvider>
                    <ContextMenuProvider>
                        <main>{children}</main>
                    </ContextMenuProvider>
                    <ToastContainer />
                </FilesProvider>
            </body>
        </html>
    );
}
