"use client";

import { useEffect } from "react";
import { useContextMenu } from "../components/contexts/ContextMenuContext";
import { useFiles } from "../components/contexts/FileContext";
import { ContextMenu } from "./models/ContextMenu";
import Window from "./models/Window/Window";
import { useWindows } from "../components/contexts/WindowContext";
import Files from "./models/File";

export default function Desktop() {
    const { contextMenu, setContextMenu, openContextMenu } = useContextMenu();
    const { windows } = useWindows();

    return (
        <div
            className="w-screen h-screen bg-gradient-to-l from-gray-900 to-gray-950 relative overflow-hidden"
            onContextMenu={openContextMenu}
            onClick={() => setContextMenu(null)}
        >
            <Files />
            {windows && windows.map((window) => <Window key={window.id} fileWindow={window} />)}
            {contextMenu && contextMenu.show && <ContextMenu context={contextMenu} />}
        </div>
    );
}
