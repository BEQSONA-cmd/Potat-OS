"use client";

import { useEffect } from "react";
import { useContextMenu } from "../components/contexts/ContextMenuContext";
import { useFiles } from "../components/contexts/FileContext";
import { ContextMenu } from "./models/ContextMenu";
import File from "./models/File";
import Window from "./models/Window/Window";
import { useWindows } from "../components/contexts/WindowContext";

export default function Desktop() {
    const { contextMenu, setContextMenu, openContextMenu } = useContextMenu();
    const { windows } = useWindows();
    const { setEditFileId, currentFileId, files } = useFiles();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "F2") {
                setEditFileId(currentFileId);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentFileId]);

    return (
        <div
            className="w-screen h-screen bg-gradient-to-l from-gray-900 to-gray-950 relative overflow-hidden"
            onContextMenu={openContextMenu}
            onClick={() => setContextMenu(null)}
        >
            {files && files.map((file) => <File key={file.id} file={file} />)}
            {windows && windows.map((window) => <Window key={window.id} fileWindow={window} />)}
            {contextMenu && contextMenu.show && <ContextMenu context={contextMenu} />}
        </div>
    );
}
