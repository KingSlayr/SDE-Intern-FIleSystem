# In-Memory File System Implementation Documentation 
##### By - Ankit Rastogi

### Assignment Description
- The assignment involves creating an in-memory file system using Node.js to support various file operations. The specified functionalities include 
- Creating directories (mkdir)
- Changing the current directory (cd)
- Listing directory contents (ls)
- Searching for patterns in files (grep)
- Displaying file contents (cat)
- Creating empty files (touch)
- Writing text to files (echo)
- Moving files or directories (mv)
- Copying files or directories (cp)
- Removing files or directories (rm)
- Additionally, there is a bonus feature to save and reload the state of the file system.

### Approach

##### File System Structure
The file system is implemented as a class (FileSystem) with a tree-like structure. Each directory and file is represented by a node in the tree. The root of the tree is initialized with the / directory. The currentDirectory pointer keeps track of the current working directory.


##### Command Processing
A separate class (CommandProcessor) handles the processing of user commands. It is initialized with references to the FileSystem, parsed path, and save state options. The class includes methods to load and save the file system state from / to a file.

##### Command Handlers
Individual command handlers are implemented as methods in the FileSystem class. Each method corresponds to a specific file operation (e.g., mkdir, cd, ls). These methods are invoked based on the user's command.

##### Bonus Feature - Save and Reload State
The bonus feature allows the user to save and reload the state of the file system. When the program is terminated, the user can specify whether to save the current state (save_state). Similarly, when starting a new process, the user can specify whether to load a previously saved state (load_state). The state is stored in a JSON format.


### Key Components

##### commandHandlers Directory
Contains individual JavaScript files for each command supported by the file system (e.g., ls, mkdir, touch).

##### FileSystem.js
Defines the FileSystem class, which includes methods for each file operation and maintains the state of the in-memory file system.
Uses import statements to include command handlers from the commandHandlers directory.

##### HandleUserInput.js
Imports utility functions and defines the CommandProcessor class that processes user input commands and delegates actions to the FileSystem class.
Handles state loading and saving to persist the file system state across sessions.

##### utils.js
Provides utility functions such as createFinalState and loadFinalState which help in serializing the file system state and reconstructing it from a saved state.

##### index.js
Serves as the entry point for the application.
Sets up the command-line interface for user interaction and initializes the FileSystem and HandleUserInput classes.
Parses command-line arguments to determine if the state should be saved or loaded and specifies the file path for the saved state.


### Working Mechanism

The user starts the application, which initializes the FileSystem and CommandProcessor classes.
The application checks for command-line arguments to determine whether to load or save the state and where the state file is located.
The CommandProcessor waits for user input, processes the received commands, and interacts with the FileSystem to execute the commands.
If the state saving feature is enabled, the CommandProcessor uses the utility functions from utils.js to serialize and save the current state to a file.
Upon restarting the application with the state loading feature enabled, the saved state is loaded, and the file system is reconstructed to reflect the previous session's state.


### Usage Section
Below is a description of the usage of each command within the in-memory file system:

##### cat:
Usage: cat file.txt
Description: Displays the content of file.txt. If the file does not exist, an error message will be shown.

##### cd:
Usage: cd .. or cd dir1
Description: Changes the current directory to the parent directory (when using ..) or to a specified subdirectory (when using dir1). Mimics the behavior of the cd command in UNIX-like operating systems.

##### cp:
Usage: cp sourceLocation destinationLocation
Description: Copies a file or directory from sourceLocation to destinationLocation. If sourceLocation is a file, the command creates a new file with the same content at the destinationLocation. 

##### echo:
Usage: echo 'content_of_the_file' file.txt
Description: Takes a string and redirects it to a file. If the file exists, it will overwrite the file with the new content

##### grep:
Usage: grep file.txt 'sample_text_to_find'
Description: Searches for the specified text within file.txt

##### ls:
Usage: ls
Description: Lists the contents of the current directory, including files and subdirectories.

##### mkdir:
Usage: mkdir dir1
Description: Creates a new directory named dir1 in the current directory. If the directory already exists, an error message will be displayed.

##### mv:
Usage: mv sourceLocation destinationLocation
Description: Moves a file or directory from sourceLocation to destinationLocation. If destinationLocation is a directory, the source is moved inside it with the same name.

##### rm:
Usage: rm -r dir or rm dir/file
Description: Removes the specified file or directory. If the -r flag is used, it will recursively remove a directory and all of its contents.

##### touch:
Usage: touch file.txt
Description: Creates a new file named file.txt in the current directory.

These commands simulate the standard file system operations in a UNIX-like environment. They are designed to work within the constructed in-memory file system and do not affect the actual filesystem of the host machine.



This in-memory file system is a simulation of a traditional file system and is intended to be used for educational purposes or as a part of a larger application that requires file management capabilities. It is not intended to interact with the actual file system of the host operating system.
