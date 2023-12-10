function touch_command(fileName) {
  try {
    // Create a new empty file
    if (!fileName || fileName.includes("/")) {
      console.log("Error: Invalid file name");
      return;
    }

    // Check if the file already exists
    if (this.currentDirectory.content && this.currentDirectory.content[fileName]) {
      console.log(`Error: File '${fileName}' already exists`);
      return;
    }

    // Create the new file
    this.currentDirectory.content[fileName] = {
      type: "file",
      name: fileName,
      content: "",
      parent: this.currentDirectory,
    };

    console.log(`File '${fileName}' created successfully.`);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default touch_command;
