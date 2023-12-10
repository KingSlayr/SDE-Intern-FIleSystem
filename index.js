import yargs from 'yargs';
import readline from 'readline';
import FileSystem from './FileSystem.js';
import HandleUserInput from './HandleUserInput.js';

const fileSystem = new FileSystem();

const readUserInputLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const saveState = yargs(process.argv.slice(2)).option("save_state", {
  describe: "Specify whether to save state",
  type: "boolean",
  default: false,
}).argv;

const loadState = yargs(process.argv.slice(2)).option("load_state", {
  describe: "Specify whether to load state",
  type: "boolean",
  default: false,
}).argv;

const path = yargs(process.argv.slice(2)).option("path", {
  describe: "Specify the path",
  type: "string",
  default: false,
}).argv;

const inputHandler = new HandleUserInput(
  fileSystem,
  path.path,
  saveState.save_state
);

console.log("Greetings! You've entered the In-Memory File System.");
console.log("Feel free to input your commands");

if (loadState.load_state && path.path) inputHandler.loadStateFromFile();

readUserInputLine.on("line", (input) => {
  inputHandler.processCommand(input);
  readUserInputLine.prompt();
});

readUserInputLine.on("close", () => {
  inputHandler.processCommand('exit');
  process.exit(0);
});
readUserInputLine.prompt();
