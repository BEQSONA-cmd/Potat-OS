"use client";
import { keyHook, prompt } from "@/components/Terminal/init";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";

export default function TerminalContent() {
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!terminalRef.current) return;

        let terminal: Terminal;
        async function init() {
            const { allocTerm } = await import("@/components/Terminal/alloc");

            terminal = allocTerm();
            terminal.open(terminalRef.current!);

            prompt(terminal);
            keyHook(terminal);
        }

        init();

        return () => {
            if (terminal) terminal.dispose();
        };
    }, []);

    return (
        <div className="h-full p-4 w-full bg-gray-900 text-white">
            <div ref={terminalRef} className="h-full w-full" />
        </div>
    );
}
