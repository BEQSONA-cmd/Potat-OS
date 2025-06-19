"use client";

import { useStore } from "@/lib/store";
import { FaFileAlt, FaFolder } from "react-icons/fa";

export function Files() {
    const { files } = useStore();
    const rawFiles = files.filter((file) => file.type === "file");

    return (
        <>
            {rawFiles.map((file) => (
                <div
                    key={file.id}
                    title={file.name}
                    className="absolute flex flex-col items-center justify-center w-20 text-white text-xs font-medium cursor-pointer group"
                    style={{ top: file.y, left: file.x }}
                >
                    <div className="bg-blue-600 group-hover:bg-blue-500 transition-colors w-full h-16 rounded-xl shadow-lg flex items-center justify-center">
                        <FaFileAlt size={28} />
                    </div>
                    <span className="mt-1 truncate w-full text-center">{file.name}</span>
                </div>
            ))}
        </>
    );
}

export function Directories() {
    const { files } = useStore();
    const directories = files.filter((file) => file.type === "directory");

    return (
        <>
            {directories.map((directory) => (
                <div
                    key={directory.id}
                    title={directory.name}
                    className="absolute flex flex-col items-center justify-center w-20 text-white text-xs font-medium cursor-pointer group"
                    style={{ top: directory.y, left: directory.x }}
                >
                    <div className="bg-yellow-500 group-hover:bg-yellow-400 transition-colors w-full h-16 rounded-xl shadow-lg flex items-center justify-center">
                        <FaFolder size={28} />
                    </div>
                    <span className="mt-1 truncate w-full text-center">{directory.name}</span>
                </div>
            ))}
        </>
    );
}
