// services/docWriter.js

import { parse } from 'path';

/**
 * Convert Markdown string to Base64 for GitHub API
 */
// docWriter.js
export function toMarkdown(markdownContent) {
    console.log("🧾Raw content:\n", markdownContent);
    return markdownContent; // Don't encode here!
}


/**
 * Convert 'src/index.js' → 'index.md'
 */
export function getMarkdownFilename(filePath) {
    const parsed = parse(filePath);
    return `${parsed.name}.md`;
}


