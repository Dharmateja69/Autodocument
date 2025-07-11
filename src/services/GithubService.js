// services/githubService.js

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_PAT = process.env.GITHUB_PAT;

/**
 * Get raw file content from GitHub
 */
export async function getFileContent(owner, repo, filePath) {
    console.log(`\n📥 [GitHub Service] Fetching file: ${GITHUB_USERNAME}/${repo}/${filePath}`);
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    try {
        console.log(`🔍 Sending GET request to github : ${url}`);
        console.log("🔑 GitHub PAT starts with:", GITHUB_PAT?.slice(0, 60)); // Just for debug, do not log full token

        const res = await axios.get(url, {
            headers: {
                Authorization: `token ${GITHUB_PAT ? '***masked***' : 'MISSING_PAT'}`,
                Accept: 'application/vnd.github.v3.raw',
            },
        });

        console.log(`✅ Successfully fetched file (${res.data.length} bytes)`);
        return res.data;
    } catch (error) {
        console.error(`❌ Failed to fetch file ${filePath}:`, {
            status: error.response?.status,
            message: error.message,
            url: url,
        });
        throw new Error(`GitHub API failed: ${error.message}`);
    }
}

/**
 * Push generated doc to GitHub repo at /docs/<commit-id>/<filename>.md
 */
export async function pushDocToRepo({ repoOwner, repoName, commitId, filePath, content }) {
    const fileName = filePath.split('/').pop().replace(/\.[^/.]+$/, '.md');
    const docPath = `docs/${commitId}/${fileName}`;
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${docPath}`;

    console.log(`\n📤 [GitHub Service] Pushing docs to: ${repoOwner}/${repoName}/${docPath}`);

    try {
        // Convert content to Base64 if not already encoded
        const encodedContent = Buffer.from(content).toString('base64');
        console.log(`📝 Prepared content (${encodedContent.length} chars encoded)`);

        const payload = {
            message: `📄 AI Doc for ${fileName} (commit ${commitId})`,
            content: encodedContent,
        };

        console.log(`🚀 Sending PUT request to: ${url}`);
        const res = await axios.put(
            url,
            payload,
            {
                headers: {
                    Authorization: `token ${GITHUB_PAT ? '***masked***' : 'MISSING_PAT'}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        console.log(`✅ Docs pushed successfully! Commit SHA: ${res.data.commit.sha}`);
        console.log(`🔗 View at: https://github.com/${repoOwner}/${repoName}/blob/main/${docPath}`);
        return res.data;
    } catch (error) {
        console.error(`❌ Failed to push docs for ${fileName}:`, {
            status: error.response?.status,
            message: error.message,
            responseData: error.response?.data,
            url: url,
        });
        throw new Error(`GitHub push failed: ${error.message}`);
    }
}

