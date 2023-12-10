export function createFinalState(fileStructure) {
  const resultObject = {};

  for (const childNode in fileStructure.content) {
    const childNodeContent = fileStructure.content[childNode];

    if (childNodeContent.type === "dir") {
      resultObject[childNode] = createFinalState(childNodeContent);
    } else {
      resultObject[childNode] = childNodeContent.content;
    }
  }

  return resultObject;
}


export function loadFinalState(fileSystem, fileStructure) {
  try {
    if (!fileStructure || Object.keys(fileStructure).length === 0) {
      console.warn("File structure is empty or null.");
      return;
    }

    for (const key in fileStructure) {
      if (typeof fileStructure[key] === "object") {
        fileSystem.processCommand(`mkdir ${key}`);
        fileSystem.processCommand(`cd ${key}`);
        loadFinalState(fileSystem, fileStructure[key]);
        fileSystem.processCommand(`cd ..`);
      } else {
        fileSystem.processCommand(`touch ${key}`);
        fileSystem.processCommand(`echo ${key} ${fileStructure[key]}`);
      }
    }
  } catch (error) {
    console.error(`Error during file system operations: ${error.message}`);
  }
}