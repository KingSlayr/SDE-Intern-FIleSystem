function mkdir_command(name) {
  try {
    // Create a new directory with the given name in the current directory
    if (!name || name.includes("/")) {
      console.log("Error: Invalid directory name");
      return;
    }

    // Check if the directory already exists
    if (this.currentDirectory.content && this.currentDirectory.content[name]) {
      console.log(`Error: Directory '${name}' already exists`);
      return;
    }

    // Create the new directory
    this.currentDirectory.content[name] = {
      type: "dir",
      name: name,
      content: {},
      parent: this.currentDirectory,
    };
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default mkdir_command;
