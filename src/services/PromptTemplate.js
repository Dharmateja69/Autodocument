// services/promptTemplate.js

export default function getPrompt(code, filename, commitId) {
    return `
You are an expert technical writer AI working for an engineering team.

You will be given a file called: \`${filename}\`  
This is a code snippet (JavaScript, TypeScript, Python, Java, etc.).

Generate **concise, professional documentation in Markdown format** for this code ONLY.

✅ Only focus on explaining:
- Functions and their purpose
- Custom hooks or logic
- Key React features like useState, useEffect, etc.
- Java/Spring Boot endpoints or classes (if applicable)
- Python functions or classes (if applicable)

❌ Do NOT explain:
- Styling or config files
- Imported libraries unless critical

Use this Markdown structure:

# File: ${filename} (Commit: ${commitId})

## Function: functionName

- **Description:** What the function/component does  
- **Parameters:** List of input parameters  
- **Returns:** What the function returns (if any)  

---

Now document this code:

\`\`\`
${code}
\`\`\`
`;
};
