import { Terminal } from "xterm";
import { prompt } from "./init";
import { I_File } from "../contexts/FileContext";

function ls(term: Terminal, files: I_File[]) {
    const fileNames: string[] = files.map((file) => file.name);
    term.write("\r\n" + fileNames.join("  "));
    prompt(term);
}

function help(term: Terminal) {
    term.write("\r\nAvailable commands: ls, clear, help");
    prompt(term);
}

function noCommand(term: Terminal, cmd: string) {
    term.write(`\r\nPotatOS: Command not found: ${cmd}`);
    prompt(term);
}

function clear(term: Terminal) {
    term.clear();
    term.reset();
    prompt(term, true);
}

export function handleCommand(cmd: string, term: Terminal, files: I_File[]) {
    const commands = cmd.split(" ");
    switch (commands[0]) {
        case "clear":
            clear(term);
            break;
        case "ls":
            ls(term, files);
            break;
        case "help":
            help(term);
            break;
        case "":
            prompt(term);
            break;
        default:
            noCommand(term, cmd);
    }
}
