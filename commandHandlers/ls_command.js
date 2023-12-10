function ls_command(path) {
  try {
    // List the contents of the specified directory or the current directory
    const resolvePath = path == null ? this.currentDirectory : this.resolvePath(path);

    if (resolvePath) {
      // Check if the resolved path is a directory
      if (resolvePath.type === "dir") {
        const content = Object.keys(resolvePath.content);
        console.log(content.join("\t"));
      } else {
        console.log(`Error: '${path}' is not a directory`);
      }
    } else {
      console.log("Error: Invalid path");
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default ls_command;
