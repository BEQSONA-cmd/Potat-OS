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
                        <FaFileAlt size={28} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
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
                        <FaFolder size={28} className="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                    <span className="mt-1 truncate w-full text-center">{directory.name}</span>
                </div>
            ))}
        </>
    );
}
