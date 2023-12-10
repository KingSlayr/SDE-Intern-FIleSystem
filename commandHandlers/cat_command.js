function cat_command(fileName) {
  try {
    const file = this.currentDirectory.content[fileName];

    if (file && file.type === "file") {
      if (file.content !== undefined && file.content !== null) {
        console.log(file.content);
      } else {
        console.log(`Error: Content of file '${fileName}' is null or undefined`);
      }
    } else {
      console.log(`Error: File '${fileName}' not found or is not a file`);
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default cat_command;
