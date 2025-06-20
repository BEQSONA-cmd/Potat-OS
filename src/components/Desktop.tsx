"use client";

import { useState } from "react";
import { ContextMenu } from "./models.tsx/ContextMenu";
import { Files } from "./models.tsx/Files";
import { useContextMenu } from "./contexts/ContextMenuContext";

export default function Desktop() {
    const { contextMenu, setContextMenu } = useContextMenu();

    const actions = ["New File", "New Folder", "Refresh", "Settings", "Exit"];

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, show: true, actions: actions });
    };

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
