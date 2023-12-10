function rm_command(path, recursive = false) {
  try {
    // Remove a file or directory
    const targetPath = this.resolvePath(path);

    // Check for invalid paths
    if (!targetPath) {
      console.log("Error: Invalid path");
      return;
    }

    // Prevent removal of the root directory
    if (targetPath === this.root) {
      console.log("Error: Cannot remove the root directory");
      return;
    }

    // Check if the directory is not empty (unless the -r option is provided)
    if (
      !recursive &&
      targetPath.type === "dir" &&
      targetPath.content &&
      Object.keys(targetPath.content).length > 0
    ) {
      console.log(
        `Error: Directory '${path}' is not empty. Use -r option to delete anyway.`
      );
      return;
    }

    // Delete the file or directory
    if (targetPath.parent && targetPath.parent.content) {
      delete targetPath.parent.content[targetPath.name];

      if (recursive || targetPath.type === "file") {
        console.log(
          `${
            targetPath.type === "file" ? "File" : "Directory"
          } '${path}' deleted successfully.`
        );
      } else {
        console.log(`File or directory '${path}' deleted successfully.`);
      }
    } else {
      console.log("Error: Cannot delete root directory content.");
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default rm_command;
