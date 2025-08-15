import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";

interface RandomTrash {
    text: string;
    icon: IconType;
}

import { FaPhp, FaPython, FaJava } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { GiLeak } from "react-icons/gi";

const randomTrashes: RandomTrash[] = [
    { text: "PHP - Where spaghetti is a design pattern", icon: FaPhp },
    { text: "Memory Management in C", icon: GiLeak },
    { text: "Python speed - Powered by molasses", icon: FaPython },
    { text: "Java - Write once, debug everywhere", icon: FaJava },
    { text: "JavaScript - Cuz we have TypeScript", icon: SiJavascript },
];

export default function TrashContent() {
    const [randomItem, setRandomItem] = useState<RandomTrash | null>(null);

    useEffect(() => {
        const newItem = randomTrashes[Math.floor(Math.random() * randomTrashes.length)];
        setRandomItem(newItem);
    }, []);

    if (!randomItem) return null;

    return (
        <div className="h-full w-full p-6 bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                {randomItem.icon && <randomItem.icon size={64} className="text-red-400" />}
                {randomItem && <p className="text-xl font-semibold text-center">{randomItem.text}</p>}
            </div>
        </div>
    );
}
