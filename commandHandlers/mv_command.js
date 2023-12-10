function mv_command(source, destination) {
  try {
    // Move a file or directory
    const sourcePath = this.resolvePath(source);
    const destinationPath = this.resolvePath(destination);

    // Check for invalid source or destination paths
    if (!sourcePath || !destinationPath) {
      console.log("Error: Invalid source or destination path");
      return;
    }

    // Check if the source and destination are the same
    if (sourcePath === destinationPath) {
      console.log(`Error: Cannot move '${source}' to a subdirectory of itself`);
      return;
    }

    const fileName = sourcePath.name;

    // Check if the destination already contains a file or directory with the same name
    if (destinationPath.content && destinationPath.content[fileName]) {
      console.log(`Error: '${fileName}' already exists in '${destination}'`);
      return;
    }

    // Move the file or directory
    destinationPath.content[fileName] = sourcePath;
    delete sourcePath.parent.content[fileName];
    sourcePath.parent = destinationPath;
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default mv_command;
