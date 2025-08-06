"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "xterm/css/xterm.css";

function TerminalContent() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const xtermRef = useRef<any>(null); // Use `any` temporarily to avoid type errors

    useEffect(() => {
        if (!terminalRef.current) return;

        // Dynamically import xterm and FitAddon ONLY on the client
        Promise.all([import("xterm"), import("xterm-addon-fit")]).then(([xterm, fitAddonModule]) => {
            const { Terminal } = xterm;
            const { FitAddon } = fitAddonModule;

            const term = new Terminal({
                cursorBlink: true,
                fontSize: 14,
                theme: {
                    background: "#111827",
                },
            });
            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);

            term.open(terminalRef.current!);
            fitAddon.fit();

            term.writeln("Welcome to Potato OS Terminal!");
            term.writeln("");

            const prompt = () => {
                term.write("\r\n$ ");
            };

            prompt();

            term.onKey(({ key, domEvent }) => {
                const ev = domEvent;
                const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

                if (ev.key === "Enter") {
                    prompt();
                } else if (ev.key === "Backspace") {
                    term.write("\b \b");
                } else if (printable) {
                    term.write(key);
                }
            });

            xtermRef.current = term;

            const resizeHandler = () => {
                fitAddon.fit();
            };
            window.addEventListener("resize", resizeHandler);

            return () => {
                window.removeEventListener("resize", resizeHandler);
                term.dispose();
            };
        });
    }, []);

    return (
        <div className="h-full w-full bg-gray-900 text-white">
            <div ref={terminalRef} className="h-full w-full" />
        </div>
    );
}

// Export with SSR disabled (just in case)
export default dynamic(() => Promise.resolve(TerminalContent), {
    ssr: false,
});
