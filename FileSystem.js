import { ls_command, mkdir_command, cd_command, grep_command, cat_command, touch_command, echo_command, mv_command, cp_command, rm_command } from "./commandHandlers/index.js";

class FileSystem {
    constructor() {
      this.root = {
        type: "dir",
        name: "/",
        content: {},
      };
      this.currentDirectory = this.root;
    }

    resolvePath(path) {
      if (!path || path === "/" || path === "~") {
        return this.root;
      }
  
      const parts = path.split("/").filter((part) => part !== "");
  
      let current = this.currentDirectory;
  
      for (const part of parts) {
        if (part === "..") {
          current = current.parent || current;
        } else if (part === ".") {
          current = current;
        } else {
          current = current.content[part];
        }
  
        if (!current) {
          return null;
        }
      }
      return current;
    }
}

FileSystem.prototype.mkdir=mkdir_command;
FileSystem.prototype.cd=cd_command;
FileSystem.prototype.ls=ls_command;
FileSystem.prototype.grep=grep_command;
FileSystem.prototype.cat=cat_command;
FileSystem.prototype.touch=touch_command;
FileSystem.prototype.echo=echo_command;
FileSystem.prototype.mv=mv_command;
FileSystem.prototype.cp=cp_command;
FileSystem.prototype.rm=rm_command;


export default FileSystem