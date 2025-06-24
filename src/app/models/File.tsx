"use client";

import { FaFile, FaFolder } from "react-icons/fa";
import { useRef } from "react";
import { useContextMenu } from "../../components/contexts/ContextMenuContext";
import { I_File, useFiles } from "../../components/contexts/FileContext";
import { I_Point } from "../../components/contexts/WindowContext";
import NameInput from "@/components/Files/NameInput";

export default function File({ file }: { file: I_File }) {
    const { editFileId, setCurrentFileId, updateFilePosition, openFile } = useFiles();
    const { openContextMenu } = useContextMenu();
    const offset = useRef<I_Point | null>(null);

    function onDoubleClick(e: React.MouseEvent, file: I_File) {
        openFile(file.id);
    }

    function onMouseDown(e: React.MouseEvent, file: any) {
        if (e.button !== 0) return;

        offset.current = {
            x: e.clientX - file.position.x,
            y: e.clientY - file.position.y,
        };

        function onMouseMove(e: MouseEvent) {
            if (offset.current) {
                updateFilePosition(file.id, {
                    x: e.clientX - offset.current.x,
                    y: e.clientY - offset.current.y,
                });
            }
        }

        function onMouseUp() {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    return (
        <div
            key={file.id}
            title={file.name}
            className="absolute flex flex-col items-center justify-center w-20 text-white text-sm cursor-pointer font-medium group"
            style={{ top: file.position.y, left: file.position.x }}
            onDoubleClick={(e) => onDoubleClick(e, file)}
            onMouseDown={(e) => onMouseDown(e, file)}
            onClick={() => {
                setCurrentFileId(file.id);
            }}
            onContextMenu={(e) => {
                openContextMenu(e, file.id);
            }}
        >
            {file.type === "directory" ? (
                <FaFolder size={64} className="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
            ) : (
                <FaFile size={64} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
            )}
            {editFileId === file.id ? (
                <NameInput file={file} />
            ) : (
                <span className="mt-1 truncate w-full text-center">{file.name}</span>
            )}
        </div>
    );
}
