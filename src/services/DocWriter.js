// services/docWriter.js

import { parse } from 'path';

/**
 * Convert Markdown string to Base64 for GitHub API
 */
export function toMarkdown(markdownContent) {
    console.log("🧾 [Debug] Raw content before encoding:\n", markdownContent);

    return Buffer.from(markdownContent, 'utf-8').toString('base64');
}

/**
 * Convert 'src/index.js' → 'index.md'
 */
export function getMarkdownFilename(filePath) {
    const parsed = parse(filePath);
    return `${parsed.name}.md`;
}


