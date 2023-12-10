function grep_command(fileName, pattern) {
  try {
    // Search for a pattern in the content of a file
    const file = this.currentDirectory.content[fileName];

    if (file) {
      if (file.type === "file") {
        const content = file.content;

        if (content === undefined || content === null) {
          console.log(`Error: Content of file '${fileName}' is null or undefined`);
          return;
        }

        const lines = content.split("\n");
        const matchedLines = lines.filter((line) => line.includes(pattern));

        if (matchedLines.length > 0) {
          console.log(`Pattern '${pattern}' found in file '${fileName}':`);
          console.log(matchedLines.join("\n"));
        } else {
          console.log(`Pattern '${pattern}' not found in file '${fileName}'`);
        }
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

export default grep_command;
