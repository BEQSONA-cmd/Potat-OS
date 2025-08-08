"use client";

import { useState, useRef, useEffect } from "react";
import { VscChromeMinimize } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { I_Point, I_Window, useWindows } from "../../../components/contexts/WindowContext";
import { DirectoryContent } from "./DirectoryContent";
import { FileContent } from "./FileContent";
import BackgroundContent from "./BackgroundContent";
import TerminalContent from "./TerminalContent";
import FirefoxContent from "./FirefoxContent";

interface WindowProps {
    fileWindow: I_Window;
}

export default function Window({ fileWindow }: WindowProps) {
    const [position, setPosition] = useState(fileWindow.position);
    const [size, setSize] = useState(fileWindow.size);
    const windowRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const resizeHandleRef = useRef<HTMLDivElement>(null);
    const { minimizeWindow, closeWindow, setCurrentWindow, currentFileId } = useWindows();

    const onClose = () => {
        closeWindow(fileWindow.id);
    };
    const onMinimize = () => {
        minimizeWindow(fileWindow.id);
    };

    useEffect(() => {
        if (!headerRef.current || fileWindow.minimized) return;

        const header = headerRef.current;
        let offsetX = 0;
        let offsetY = 0;

        const handleMouseDown = (e: MouseEvent) => {
            if (!windowRef.current) return;
            if (fileWindow.id) {
                setCurrentWindow(fileWindow.id);
            }
            if (e.button !== 0) return;
            offsetX = e.clientX - position.x;
            offsetY = e.clientY - position.y;

            const handleMouseMove = (e: MouseEvent) => {
                const newX = e.clientX - offsetX;
                const newY = e.clientY - offsetY;
                setPosition({ x: newX, y: newY });
            };

            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        };

        header.addEventListener("mousedown", handleMouseDown);

        return () => {
            header.removeEventListener("mousedown", handleMouseDown);
        };
    }, [position, fileWindow.minimized]);

    useEffect(() => {
        if (!resizeHandleRef.current || fileWindow.minimized) return;

        const resizeHandle = resizeHandleRef.current;
        let startX = 0;
        let startY = 0;
        let startWidth = 0;
        let startHeight = 0;

        const handleMouseDown = (e: MouseEvent) => {
            if (fileWindow.id) {
                setCurrentWindow(fileWindow.id);
            }
            if (e.button !== 0) return;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = size.x;
            startHeight = size.y;

            const handleMouseMove = (e: MouseEvent) => {
                const newWidth = Math.max(300, startWidth + (e.clientX - startX));
                const newHeight = Math.max(200, startHeight + (e.clientY - startY));
                const newSize: I_Point = { x: newWidth, y: newHeight };
                setSize(newSize);
            };

            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        };

        resizeHandle.addEventListener("mousedown", handleMouseDown);

        return () => {
            resizeHandle.removeEventListener("mousedown", handleMouseDown);
        };
    }, [size, fileWindow.minimized]);

    if (fileWindow.minimized) {
        return null;
    }

    return (
        <div
            ref={windowRef}
            onClick={() => {
                setCurrentWindow(fileWindow.id);
            }}
            className="absolute bg-gray-800 rounded-md shadow-lg flex flex-col border border-gray-700 resize-container"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.x}px`,
                height: `${size.y}px`,
                minWidth: "300px",
                minHeight: "200px",
                zIndex: fileWindow.id === currentFileId ? 100 : 11,
            }}
        >
            <div ref={headerRef} className="flex items-center justify-between bg-gray-700 p-2 rounded-t-md cursor-move">
                <h3 className="text-white font-medium">{fileWindow.file.name}</h3>
                <div className="flex items-center gap-3 ml-auto">
                    <button
                        onClick={onMinimize}
                        className="text-white hover:text-blue-500 focus:outline-none"
                        title="Minimize"
                    >
                        <VscChromeMinimize size={20} />
                    </button>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-red-500 focus:outline-none"
                        title="Close"
                    >
                        <IoClose size={20} />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                {fileWindow.file.type === "file" ? (
                    <FileContent file={fileWindow.file} />
                ) : fileWindow.file.type === "settings" ? (
                    <BackgroundContent />
                ) : fileWindow.file.type === "terminal" ? (
                    <TerminalContent />
                ) : fileWindow.file.type === "firefox" ? (
                    <FirefoxContent />
                ) : (
                    <DirectoryContent file={fileWindow.file} />
                )}
            </div>
            <div className="flex justify-end gap-2 p-2 bg-gray-700 rounded-b-md"></div>
            <div
                ref={resizeHandleRef}
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-600 rounded-tl-md"
            />
        </div>
    );
}
