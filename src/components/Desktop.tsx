"use client";

import { useEffect } from "react";
import { useContextMenu } from "./contexts/ContextMenuContext";
import { useFiles } from "./contexts/FileContext";
import { ContextMenu } from "./models/ContextMenu";
import File from "./models/Files";
import Window from "./models/Window";
import { useWindows } from "./contexts/WindowContext";

export default function Desktop() {
    const { contextMenu, setContextMenu } = useContextMenu();
    const { windows } = useWindows();
    const { setEditFileId, currentFileId, files } = useFiles();

    const actions = ["New File", "New Folder", "Refresh", "Exit"];

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.closest(".file-icon")) return;

        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            show: true,
            actions,
        });
    };

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
            onContextMenu={handleRightClick}
            onClick={() => setContextMenu({ x: 0, y: 0, show: false, actions: [] })}
        >
            {files && files.map((file) => <File key={file.id} file={file} />)}
            {windows && windows.map((window) => <Window key={window.id} fileWindow={window} />)}
            {contextMenu && contextMenu.show && <ContextMenu context={contextMenu} />}
        </div>
    );
}
