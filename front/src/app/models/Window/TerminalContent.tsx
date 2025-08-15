"use client";

import { useFiles } from "@/components/contexts/FileContext";
import { keyHook, veryFirstPrompt } from "@/components/Terminal/init";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export default function TerminalContent() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const { files } = useFiles();

    const filesRef = useRef(files);

    useEffect(() => {
        filesRef.current = files;
    }, [files]);

    useEffect(() => {
        if (!terminalRef.current) return;

        let terminal: Terminal;
        let fitAddon: FitAddon;

        async function init() {
            const { allocTerm, initFitAddon } = await import("@/components/Terminal/alloc");

            terminal = allocTerm();
            fitAddon = initFitAddon();

            terminal.loadAddon(fitAddon);

            terminalRef.current!.innerHTML = "";

            terminal.open(terminalRef.current!);
            fitAddon.fit();

            veryFirstPrompt(terminal);
            keyHook(terminal, () => filesRef.current ?? []);
        }

        init();

        const observer = new ResizeObserver(() => {
            if (fitAddon) fitAddon.fit();
        });
        if (terminalRef.current) observer.observe(terminalRef.current);

        return () => {
            if (observer && terminalRef.current) observer.unobserve(terminalRef.current);
            if (terminal) terminal.dispose();
        };
    }, []);

    return (
        <div className="p-4 h-full w-full bg-gray-900 text-white">
            <div ref={terminalRef} className="w-full h-full" />
        </div>
    );
}
