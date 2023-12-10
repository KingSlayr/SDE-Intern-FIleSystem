function cd_command(path) {
  try {
    const resolvePath = this.resolvePath(path);

    if (resolvePath) {
      if (resolvePath.type !== "dir") {
        console.log(`${path} is not a directory`);
        return;
      }
      this.currentDirectory = resolvePath;
    } else {
      console.log("Invalid path");
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default cd_command;
