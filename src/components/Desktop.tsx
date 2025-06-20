"use client";

import { ContextMenu } from "./models.tsx/ContextMenu";
import { Files } from "./models.tsx/Files";
import { useContextMenu } from "./contexts/ContextMenuContext";
import { useEffect } from "react";
import { useFiles } from "./contexts/FileContext";

export default function Desktop() {
    const { contextMenu, setContextMenu } = useContextMenu();
    const { setEditFileId, currentFileId } = useFiles();

    const actions = ["New File", "New Folder", "Refresh", "Settings", "Exit"];

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, show: true, actions: actions });
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "F2") {
                setEditFileId(currentFileId);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentFileId]);

    return (
        <div
            className="w-screen h-screen bg-blue-300"
            onContextMenu={handleRightClick}
            onClick={() => setContextMenu({ x: 0, y: 0, show: false, actions: [] })}
        >
            <Files />

            {contextMenu && contextMenu.show && <ContextMenu context={contextMenu} />}
        </div>
    );
}
