function cp_command(source, destination) {
  try {
    // Copy a file or directory
    const sourcePath = this.resolvePath(source);
    const destinationPath = this.resolvePath(destination);

    // Check for invalid source or destination paths
    if (!sourcePath || !destinationPath) {
      console.log("Invalid source or destination path");
      return;
    }

    const fileName = sourcePath.name;
    // Check if the destination already contains a file or directory with the same name
    if (destinationPath.content && destinationPath.content[fileName]) {
      console.log(`Error: '${fileName}' already exists in '${destination}'`);
      return;
    }
    
    // Deep copy the file or directory
    destinationPath.content[fileName] = sourcePath;
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default cp_command;
