"use client";

import { useState, useRef, useEffect } from "react";
import { I_Window, useWindows } from "../../components/contexts/WindowContext";
import { getFileIcon } from "@/components/Files/utils";
import WindowContent from "./Window/WindowContent";
import { VscChromeMinimize } from "react-icons/vsc";
import { MdOutlineRectangle } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface WindowProps {
    fileWindow: I_Window;
}

export default function Window({ fileWindow }: WindowProps) {
    const { id, file, minimized, position: initialPos, size: initialSize, fullscreen } = fileWindow;
    const [position, setPosition] = useState(initialPos);
    const [size, setSize] = useState(initialSize);
    const windowRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const resizeHandleRef = useRef<HTMLDivElement>(null);

    const { fullscreenWindow, minimizeWindow, closeWindow, setCurrentWindow, currentFileId } = useWindows();
    const { icon: Icon, color } = getFileIcon(file);

    const handleAction = (action: () => void) => (e: React.MouseEvent) => {
        e.stopPropagation();
        action();
    };

    useEffect(() => {
        if (minimized || !headerRef.current) return;

        const header = headerRef.current;
        let offset = { x: 0, y: 0 };

        const onMouseDown = (e: MouseEvent) => {
            if (e.button !== 0) return;
            offset = { x: e.clientX - position.x, y: e.clientY - position.y };
            setCurrentWindow(id);

            const onMouseMove = (e: MouseEvent) => {
                setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
            };

            const onMouseUp = () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        };

        header.addEventListener("mousedown", onMouseDown);
        return () => header.removeEventListener("mousedown", onMouseDown);
    }, [position, minimized, id]);

    useEffect(() => {
        if (fullscreen || minimized || !resizeHandleRef.current) return;

        const resizeHandle = resizeHandleRef.current;
        let start = { x: 0, y: 0, width: size.x, height: size.y };

        const onMouseDown = (e: MouseEvent) => {
            if (e.button !== 0) return;
            start = { x: e.clientX, y: e.clientY, width: size.x, height: size.y };
            setCurrentWindow(id);

            const onMouseMove = (e: MouseEvent) => {
                setSize({
                    x: Math.max(500, start.width + (e.clientX - start.x)),
                    y: Math.max(300, start.height + (e.clientY - start.y)),
                });
            };

            const onMouseUp = () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        };

        resizeHandle.addEventListener("mousedown", onMouseDown);
        return () => {
            window.removeEventListener("mousemove", onMouseDown);
            window.removeEventListener("mouseup", onMouseDown);
            resizeHandle.removeEventListener("mousedown", onMouseDown);
        };
    }, [size, minimized, id, fullscreen]);

    if (minimized) return null;

    const windowStyle = fullscreen
        ? {
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 100,
          }
        : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${size.x}px`,
              height: `${size.y}px`,
              zIndex: id === currentFileId ? 100 : 11,
          };

    return (
        <div
            ref={windowRef}
            onClick={() => setCurrentWindow(id)}
            className="absolute bg-gray-800 rounded-md shadow-lg flex flex-col border border-gray-700 resize-container"
            style={{
                ...windowStyle,
                minWidth: "300px",
                minHeight: "200px",
            }}
        >
            <div ref={headerRef} className="flex items-center justify-between bg-gray-700 p-2 rounded-t-md cursor-move">
                <div className="flex items-center gap-2">
                    <Icon className="text-white" size={20} style={{ color }} />
                    <h3 className="text-white font-medium">{file.name}</h3>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <button
                        className="text-white hover:text-blue-500 p-1 rounded-xl hover:bg-gray-600"
                        onClick={handleAction(() => minimizeWindow(id))}
                        title="Minimize"
                    >
                        <VscChromeMinimize />
                    </button>
                    <button
                        className="text-white hover:text-blue-500 p-1 rounded-xl hover:bg-gray-600"
                        onClick={handleAction(() => fullscreenWindow(id))}
                        title={fullscreen ? "Restore" : "Maximize"}
                    >
                        <MdOutlineRectangle />
                    </button>
                    <button
                        className="text-white hover:text-blue-500 p-1 rounded-xl hover:bg-gray-600"
                        onClick={handleAction(() => closeWindow(id))}
                        title="Close"
                    >
                        <IoClose />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <WindowContent file={file} />
            </div>

            {!fullscreen && (
                <div
                    ref={resizeHandleRef}
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-600 rounded-tl-md"
                />
            )}
        </div>
    );
}
