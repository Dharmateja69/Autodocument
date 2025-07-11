# File: src/services/DocWriter.js (Commit: 1b85ab6f1ae541be84ec4949625d2298ac3a1109)

## Function: toMarkdown(markdownContent)

- **Description:** This function takes a Markdown string as an input and returns it without any modification. The purpose of this function is to prepare the Markdown content for sending to the GitHub API, but it does not encode the content here.
- **Parameters:**
  - `markdownContent`: The Markdown string to be processed.
- **Returns:** The original Markdown string.

## Function: getMarkdownFilename(filePath)

- **Description:** This function takes a file path and returns the corresponding Markdown file name. It uses the 'path' library to parse the file path and extract the name, then appends '.md' to it.
- **Parameters:**
  - `filePath`: The file path to be processed.
- **Returns:** The Markdown file name. For example, if the input is 'src/index.js', the function will return 'index.md'.