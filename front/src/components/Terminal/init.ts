import "xterm/css/xterm.css";
import { Terminal } from "xterm";

export function prompt(term: Terminal) {
    term.write("\r\n");
    term.write("\x1b[32mPotatOS@User:");
    term.write("\x1b[34m~/Desktop");
    term.write("\x1b[0m$ ");
}

function handleCommand(cmd: string, term: Terminal) {
    switch (cmd) {
        case "clear":
            term.clear();
            break;
        case "ls":
            term.write("\r\nDocuments  Downloads  Pictures  Desktop");
            break;
        case "help":
            term.write("\r\nAvailable commands: ls, clear, help");
            break;
        case "":
            break;
        default:
            term.write(`\r\nCommand not found: ${cmd}`);
    }
}

export function keyHook(term: Terminal) {
    let buffer = "";

    term.onKey(({ key, domEvent }) => {
        const ev = domEvent;
        const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

        if (ev.key === "Enter") {
            handleCommand(buffer.trim(), term);
            buffer = "";
            prompt(term);
        } else if (ev.key === "Backspace") {
            if (buffer.length > 0) {
                buffer = buffer.slice(0, -1);
                term.write("\b \b");
            }
        } else if (printable) {
            buffer += key;
            term.write(key);
        }
    });
}
