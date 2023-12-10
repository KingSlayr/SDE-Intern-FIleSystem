import fs from 'fs'
import { createFinalState, loadFinalState } from './utils.js';

class CommandProcessor {
  constructor(fileSystem, pathParsed, saveStateParsed) {
    // Initialize the CommandProcessor with references to the file system, path, and save state options
    this.fileSystem = fileSystem;
    this.pathParsed = pathParsed;
    this.saveStateParsed = saveStateParsed;
  }

  loadStateFromFile() {
    console.log('Loading State...');
    const filePath = this.pathParsed;

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      if(data && Object.keys(data).length !== 0)loadFinalState(this, JSON.parse(data));
    });
  }

  saveStateToFile(finalState) {
    console.log('Saving State...');
    const filePath = this.pathParsed;
    fs.writeFileSync(filePath, JSON.stringify(finalState), "utf8", (err) => {
      if (err) {
        console.error("Error appending to file:", err);
        return;
      }
    });
  }

  processCommand(input, isLoading = false) {
    const [command, ...args] = input.trim().split(" ");

    switch (command) {
      case "mkdir":
        this.fileSystem.mkdir(...args);
        break;
      case "cd":
        this.fileSystem.cd(...args);
        break;
      case "ls":
        this.fileSystem.ls(...args);
        break;
      case "grep":
        const fileName = args[0];
        let pattern = args.slice(1).join(" ");
        if (pattern.startsWith('"') && pattern.endsWith('"')) {
          pattern = pattern.slice(1, -1);
        }
        this.fileSystem.grep(fileName, pattern);
        break;
      case "cat":
        this.fileSystem.cat(...args);
        break;
      case "touch":
        this.fileSystem.touch(...args);
        break;
      case "echo":
        this.fileSystem.echo(args[0], args.slice(1).join(" "));
        break;
      case "mv":
        this.fileSystem.mv(...args);
        break;
      case "cp":
        this.fileSystem.cp(...args);
        break;
      case "rm":
        const recursiveFlagIndex = args.indexOf("-r");
        const pathIndex =
          recursiveFlagIndex !== -1 ? recursiveFlagIndex + 1 : 0;
        const path = args[pathIndex];
        const recursive = recursiveFlagIndex !== -1;
        this.fileSystem.rm(path, recursive);
        break;
      case "exit":
        console.log("Exiting...");
        if (this.saveStateParsed && this.pathParsed && !isLoading)this.saveStateToFile(createFinalState(this.fileSystem.root));
        process.exit();
        break;
      default:
        console.log("Invalid command");
    }
  }
}

// Export the CommandProcessor class for use in other modules
export default CommandProcessor