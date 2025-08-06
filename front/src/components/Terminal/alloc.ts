import { Terminal } from "xterm";

export function allocTerm(): Terminal {
    return new Terminal({
        cursorBlink: true,
        fontSize: 15,
        fontFamily: '"Fira Code", "Courier New", monospace',
        fontWeight: "600",
        theme: {
            background: "#111827",
        },
    });
}
