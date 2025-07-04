"use client";

import { useContextMenu } from "../components/contexts/ContextMenuContext";
import { ContextMenu } from "./models/ContextMenu";
import Window from "./models/Window/Window";
import { useWindows } from "../components/contexts/WindowContext";
import Files from "./models/File";
import Navbar from "@/components/Navbar";
import Dock from "@/components/Dock";

export default function Desktop() {
    const { contextMenu, setContextMenu, openContextMenu } = useContextMenu();
    const { windows } = useWindows();

    return (
        <div
            className="w-screen h-screen bg-gradient-to-l from-gray-900 to-gray-950 relative overflow-hidden text-white"
            onContextMenu={openContextMenu}
            onClick={() => setContextMenu(null)}
        >
            {/* Top Nav Bar */}
            <Navbar />

            {/* Files and Open Windows */}
            <Files />
            {windows && windows.map((window) => <Window key={window.id} fileWindow={window} />)}

            {/* Context Menu */}
            {contextMenu && contextMenu.show && <ContextMenu context={contextMenu} />}

            {/* Bottom Dock */}
            <Dock />
        </div>
    );
}
