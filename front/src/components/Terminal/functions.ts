import { Terminal } from "xterm";
import { prompt } from "./init";
import { I_File } from "../contexts/FileContext";

function ls(term: Terminal, files: I_File[]) {
  const fileNames: string[] = files.map((file) => file.name);
  term.write("\r\n" + fileNames.join("  "));
  prompt(term);
}

function uname(term: Terminal) {
  const asciiLines: string[] = [
    " ____       _        _         ___  ____  ",
    "|  _ \\ ___ | |_ __ _| |_      / _ \\/ ___| ",
    "| |_) / _ \\| __/ _` | __|____| | | \\___ \\ ",
    "|  __/ (_) | || (_| | || ⎯⎯⎯⎯| |_| |___) |",
    "|_|   \\___/ \\__\\__,_|\\__|     \\___/|____/ ",
    "",
    "Potat-OS Terminal",
    "Type 'help' for a list of commands.",
    "Potat-OS v1.0.3",
    "Kernel: MashedPotato 0.9.8",
    "Uptime: 42 days",
    "Memory: 4096MB / 8192MB",
  ];
  for (const line of asciiLines) {
    term.write("\r\n" + line);
  }
  prompt(term);
}

function dateCmd(term: Terminal) {
  term.write("\r\n" + new Date().toString());
  prompt(term);
}

const startTime = Date.now();
function uptime(term: Terminal) {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  term.write(`\r\nUptime: ${seconds}s`);
  prompt(term);
}

function fortune(term: Terminal) {
  const quotes = [
    "A potato a day keeps the doctor away.",
    "You can mash the world if you believe.",
    "404 Motivation Not Found.",
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  term.write("\r\n" + quote);
  prompt(term);
}

function clear(term: Terminal) {
  term.clear();
  term.reset();
  prompt(term, true);
}

function noCommand(term: Terminal, cmd: string) {
  term.write(`\r\nPotatOS: Command not found: ${cmd}`);
  prompt(term);
}

function help(term: Terminal) {
  const availableCommands: string[] = [
    "ls",
    "uname",
    "date",
    "uptime",
    "fortune",
    "clear",
    "help",
  ];
  term.write("\r\nAvailable commands: " + availableCommands.join(", "));
  prompt(term);
}

export function handleCommand(cmd: string, term: Terminal, files: I_File[]) {
  const commands = cmd.split(" ");
  switch (commands[0]) {
    case "ls":
      ls(term, files);
      break;
    case "uname":
      uname(term);
      break;
    case "date":
      dateCmd(term);
      break;
    case "uptime":
      uptime(term);
      break;
    case "fortune":
      fortune(term);
      break;
    case "clear":
      clear(term);
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
