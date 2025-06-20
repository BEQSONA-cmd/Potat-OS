"use client";

import { FaFileAlt, FaFolder } from "react-icons/fa";
import { useRef, useState } from "react";
import { ContextMenu } from "./ContextMenu";
import { IContextMenu, useContextMenu } from "../contexts/ContextMenuContext";
import { useFiles } from "../contexts/FileContext";

export function Files() {
    const { files, updateFilePosition, renameFile, editFileId, setEditFileId, setCurrentFileId } = useFiles();
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const offset = useRef({ x: 0, y: 0 });
    const { contextMenu, setContextMenu } = useContextMenu();

    const actions = ["Open", "Rename", "Delete", "Exit"];

    function onMouseDown(e: React.MouseEvent, file: any) {
        if (e.button !== 0) return;

        setDraggedId(file.id);
        offset.current = {
            x: e.clientX - file.x,
            y: e.clientY - file.y,
        };

        function onMouseMove(e: MouseEvent) {
            updateFilePosition(file.id, e.clientX - offset.current.x, e.clientY - offset.current.y);
        }

        function onMouseUp() {
            setDraggedId(null);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    function onContextMenu(e: React.MouseEvent, file: any) {
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            show: true,
            actions,
            fileId: file.id,
        });
    }

    return (
        <>
            {files &&
                files.map((file) => (
                    <div
                        key={file.id}
                        title={file.name}
                        className="absolute flex flex-col items-center justify-center w-20 text-white text-sm font-medium cursor-pointer group"
                        style={{ top: file.y, left: file.x, zIndex: draggedId === file.id ? 10 : 1 }}
                        onMouseDown={(e) => onMouseDown(e, file)}
                        onClick={(e) => {
                            setCurrentFileId(file.id);
                        }}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onContextMenu(e, file);
                        }}
                    >
                        {file.type === "directory" ? (
                            <FaFolder
                                size={64}
                                className="text-yellow-500 group-hover:text-yellow-400 transition-colors"
                            />
                        ) : (
                            <FaFileAlt
                                size={64}
                                className="text-blue-500 group-hover:text-blue-400 transition-colors"
                            />
                        )}
                        {editFileId === file.id ? (
                            <input
                                type="text"
                                value={file.name}
                                autoFocus
                                onFocus={(e) => e.currentTarget.select()}
                                onChange={(e) => renameFile(file.id, e.target.value)}
                                onBlur={() => setEditFileId(null)}
                                className="mt-1 w-full text-center bg-transparent focus:outline-none"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        renameFile(file.id, (e.target as HTMLInputElement).value);
                                        setEditFileId(null);
                                    }
                                }}
                            />
                        ) : (
                            <span className="mt-1 truncate w-full text-center">{file.name}</span>
                        )}
                    </div>
                ))}
            {contextMenu && contextMenu.show && <ContextMenu context={contextMenu} />}
        </>
    );
}
