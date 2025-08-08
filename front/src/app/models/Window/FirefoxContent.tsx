import React from "react";
import { useStatic } from "@/lib/useStatic";
import Image from "next/image";

export default function FirefoxContent() {
    return (
        <div className="h-full w-full bg-gray-800 text-white">
            <iframe src="https://www.google.com/webhp?igu=1" title="Firefox" className="w-full h-full border-none" />
        </div>
    );
}
