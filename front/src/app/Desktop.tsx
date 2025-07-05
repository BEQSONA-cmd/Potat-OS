"use client";

import { useContextMenu } from "../components/contexts/ContextMenuContext";
import { ContextMenu } from "./models/ContextMenu";
import Window from "./models/Window/Window";
import { useWindows } from "../components/contexts/WindowContext";
import Files from "./models/File";
import Navbar from "@/components/Navbar";
import Dock from "@/components/Dock";
import { useState, useRef, use } from "react";
import { I_Point } from "../components/contexts/WindowContext";
import Image from "next/image";
import { useStatic } from "@/lib/useStatic";

export default function Desktop() {
    const { contextMenu, setContextMenu, openContextMenu } = useContextMenu();
    const { windows } = useWindows();

    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState<I_Point>({ x: 0, y: 0 });
    const [selectionEnd, setSelectionEnd] = useState<I_Point>({ x: 0, y: 0 });
    const desktopRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useStatic("Background", "/background/1.png");

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0 || e.target !== desktopRef.current) {
            return;
        }

        setIsSelecting(true);
        setSelectionStart({ x: e.clientX, y: e.clientY });
        setSelectionEnd({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isSelecting) return;
        setSelectionEnd({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    const selectionStyle = {
        left: Math.min(selectionStart.x, selectionEnd.x),
        top: Math.min(selectionStart.y, selectionEnd.y),
        width: Math.abs(selectionEnd.x - selectionStart.x),
        height: Math.abs(selectionEnd.y - selectionStart.y),
    };

    return (
        <div
            ref={desktopRef}
            className="w-screen h-screen relative overflow-hidden text-white select-none"
            onContextMenu={openContextMenu}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={() => setContextMenu(null)}
        >
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <Image src={value} alt="Desktop Background" layout="fill" objectFit="cover" quality={100} priority />
            </div>
            {/* Top Nav Bar */}
            <Navbar />

            {/* Files and Open Windows */}
            <Files />
            {windows && windows.map((window) => <Window key={window.id} fileWindow={window} />)}

            {/* Selection Rectangle */}
            {isSelecting && (
                <div
                    className="absolute border border-orange-500 bg-orange-600 rounded-l bg-opacity-50 pointer-events-none"
                    style={selectionStyle}
                />
            )}

            {/* Context Menu */}
            {contextMenu && contextMenu.show && <ContextMenu context={contextMenu} />}

            {/* Bottom Dock */}
            <Dock />
        </div>
    );
}
