"use client";

import { FaFile, FaFolder } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useContextMenu } from "../../components/contexts/ContextMenuContext";
import { I_File, useFiles } from "../../components/contexts/FileContext";
import { I_Point } from "../../components/contexts/WindowContext";
import NameInput from "@/components/Files/NameInput";
import { getCloseDirectory } from "@/components/Files/utils";

function File({ file }: { file: I_File }) {
    const {
        setHoveredDirectoryId,
        updateFileContent,
        deleteFile,
        getDirFiles,
        hoveredDirectoryId,
        editFileId,
        setCurrentFileId,
        updateFilePosition,
        openFile,
        findFile,
        files,
    } = useFiles();
    const { openContextMenu } = useContextMenu();
    const offset = useRef<I_Point | null>(null);

    function onDoubleClick(e: React.MouseEvent, file: I_File) {
        openFile(file.id);
    }

    function onMouseDown(e: React.MouseEvent, file: any) {
        if (e.button !== 0) return;
        let closeDirectoryId = "";

        offset.current = {
            x: e.clientX - file.position.x,
            y: e.clientY - file.position.y,
        };

        function onMouseMove(e: MouseEvent) {
            const movePos: I_Point = {
                x: e.clientX - offset.current!.x,
                y: e.clientY - offset.current!.y,
            };
            if (offset.current) {
                setHoveredDirectoryId("");
                updateFilePosition(file.id, movePos);
                closeDirectoryId = getCloseDirectory(movePos, files || []);
                if (closeDirectoryId && closeDirectoryId !== file.id) {
                    setHoveredDirectoryId(closeDirectoryId);
                }
            }
        }

        function onMouseUp() {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            if (closeDirectoryId && closeDirectoryId !== file.id) {
                setHoveredDirectoryId("");
                const directry = findFile(closeDirectoryId) as I_File;
                const files = getDirFiles(directry);
                files.push(file);
                updateFileContent(closeDirectoryId, files);
                deleteFile(file.id);
            }
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    return (
        <div
            key={file.id}
            title={file.name}
            className="absolute flex flex-col items-center justify-center text-white text-xs cursor-pointer font-medium group p-2 hover:bg-gray-600 hover:bg-opacity-50 rounded transition-colors resize-container"
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
                file.id === hoveredDirectoryId ? (
                    <FaFolder size={40} className="text-orange-500 animate-pulse" />
                ) : (
                    <FaFolder size={40} className="text-yellow-500 transition-colors" />
                )
            ) : (
                <FaFile size={40} className="text-blue-500 transition-colors" />
            )}
            {editFileId === file.id ? (
                <NameInput file={file} />
            ) : (
                <span className="mt-1 truncate w-full text-center">{file.name}</span>
            )}
        </div>
    );
}

export default function Files() {
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
        <div>
            {files &&
                files.map((file) => (
                    <div
                        key={file.id}
                        className="relative "
                        style={{
                            zIndex: file.id === currentFileId ? 10 : 1,
                        }}
                    >
                        <File key={file.id} file={file} />
                    </div>
                ))}
        </div>
    );
}
