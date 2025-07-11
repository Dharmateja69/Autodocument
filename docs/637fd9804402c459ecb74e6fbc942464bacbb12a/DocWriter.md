# File: src/services/DocWriter.js (Commit: 637fd9804402c459ecb74e6fbc942464bacbb12a)

## Function: `toMarkdown(markdownContent)`

- **Description:** This function takes a Markdown string as input and returns the same string without encoding. It is used for debugging purposes to log the raw Markdown content.
- **Parameters:**
  - `markdownContent` (string): The Markdown string to be logged.
- **Returns:** A string representing the raw Markdown content.

## Function: `getMarkdownFilename(filePath)`

- **Description:** This function takes a file path as input and returns the Markdown filename by parsing the path and keeping the name of the file. It is used to generate a Markdown file name from a JavaScript file path.
- **Parameters:**
  - `filePath` (string): The file path of the JavaScript file to be converted to Markdown.
- **Returns:** A string representing the Markdown file name. For example, if the input is `src/index.js`, the output will be `index.md`.