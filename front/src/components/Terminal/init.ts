import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { handleCommand } from "./functions";
import { I_File } from "../contexts/FileContext";

export function prompt(term: Terminal, first: boolean = false) {
  if (first) {
    term.write("\r");
  } else {
    term.write("\r\n");
  }

  term.write("\x1b[32mPotatOS@User:");
  term.write("\x1b[34m~/Desktop");
  term.write("\x1b[0m$ ");
}

export function keyHook(term: Terminal, getFiles: () => I_File[]) {
  let buffer = "";
  let history: string[] = [];
  let historyIndex = -1;

  term.onKey(({ key, domEvent }) => {
    const ev = domEvent;
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

    if (ev.ctrlKey && ev.key === "c") {
      term.write("^C\r");
      buffer = "";
      historyIndex = -1;
      prompt(term);
    } else if (ev.key === "Enter") {
      if (buffer.trim()) {
        history.unshift(buffer);
        if (history.length > 10) history.pop();
      }
      historyIndex = -1;
      handleCommand(buffer, term, getFiles());
      buffer = "";
    } else if (ev.key === "Backspace") {
      if (buffer.length > 0) {
        buffer = buffer.slice(0, -1);
        term.write("\b \b");
      }
    } else if (ev.key === "ArrowUp") {
      if (history.length > 0) {
        if (historyIndex < history.length - 1) historyIndex++;
        buffer = history[historyIndex] || "";
        term.write("\x1b[2K\r");
        prompt(term, true);
        term.write(buffer);
      }
    } else if (ev.key === "ArrowDown") {
      if (historyIndex > 0) {
        historyIndex--;
        buffer = history[historyIndex] || "";
      } else {
        historyIndex = -1;
        buffer = "";
      }
      term.write("\x1b[2K\r");
      prompt(term, true);
      term.write(buffer);
    } else if (printable) {
      buffer += key;
      term.write(key);
    }
  });
}
