function echo(fileName, text) {
  try {
    // Set the content of a file
    const file = this.currentDirectory.content[fileName];

    if (file) {
      if (file.type === "file") {
        file.content = text;
      } else {
        console.log(`Error: '${fileName}' is not a file`);
      }
    } else {
      console.log(`Error: File '${fileName}' not found`);
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export default echo;
