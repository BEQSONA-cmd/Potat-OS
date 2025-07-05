import React from "react";
import { useStatic } from "@/lib/useStatic";
import Image from "next/image";

export default function BackgroundContent() {
    const [value, setValue] = useStatic("Background");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const backgrounds = ["/background/1.png", "/background/2.png", "/background/3.png", "/background/4.png"];

    return (
        <div className="h-full w-full p-4 bg-gray-800 text-white">
            <h2 className="text-xl font-bold mb-4">Background Settings</h2>

            <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Select a new background:</p>
                <div className="grid grid-cols-2 gap-4">
                    {backgrounds.map((bg) => (
                        <div
                            key={bg}
                            onClick={() => handleChange(bg)}
                            className={`relative h-32 rounded-md overflow-hidden cursor-pointer border-2 transition-all
                                ${value === bg ? "border-blue-500" : "border-transparent hover:border-gray-500"}`}
                        >
                            <Image
                                src={bg}
                                alt={`Background ${bg.split("/").pop()?.split(".")[0]}`}
                                layout="fill"
                                objectFit="cover"
                                className="pointer-events-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
