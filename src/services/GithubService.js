// services/githubService.js

import axios from 'axios';
import { exec } from 'child_process';
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
                Authorization: `token ${GITHUB_PAT}`,

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
function syncLocalRepo() {
    return new Promise((resolve, reject) => {
        exec('git pull origin main && git push origin main', (err, stdout, stderr) => {
            if (err) {
                reject(new Error(`Git sync failed: ${stderr || err.message}`));
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
}


export async function pushDocToRepo({ repoOwner, repoName, commitId, filePath, content }) {
    const fileName = filePath.split('/').pop().replace(/\.[^/.]+$/, '.md');
    const docPath = `docs/${commitId}/${fileName}`;
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${docPath}`;

    console.log(`\n📤 [GitHub Service] Pushing docs to: ${repoOwner}/${repoName}/${docPath}`);

    try {
        // 🔐 Encode Markdown content to base64 (required by GitHub)
        const encodedContent = Buffer.from(content, 'utf-8').toString('base64');
        console.log(`📝 Prepared content (${encodedContent.length} chars encoded)`);

        let sha = null;

        // 🔍 Check if the file already exists to get its current SHA
        try {
            const checkRes = await axios.get(url, {
                headers: {
                    Authorization: `token ${GITHUB_PAT}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });

            sha = checkRes.data.sha;
            console.log(`🧩 Existing file SHA found: ${sha}`);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log(`📁 File does not exist yet. Will create new.`);
            } else {
                throw err; // throw other errors
            }
        }

        const payload = {
            message: `📄 AI Doc for ${fileName} (commit ${commitId})`,
            content: encodedContent,
            ...(sha && { sha }), // include SHA only if it's found
        };

        console.log(`🚀 Sending PUT request to: ${url}`);
        const res = await axios.put(url, payload, {
            headers: {
                Authorization: `token ${GITHUB_PAT}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        console.log(`✅ Docs pushed successfully! Commit SHA: ${res.data.commit.sha}`);
        console.log(`🔗 View at: https://github.com/${repoOwner}/${repoName}/blob/main/${docPath}`);

        // ✅ Auto-sync local repo with latest state from remote (main branch)
        try {
            console.log(`🔄 Syncing local branch with remote...`);
            await syncLocalRepo();
            console.log(`✅ Local repo synced successfully.`);
        } catch (syncError) {
            console.error(`❌ Git sync failed: ${syncError.message}`);
        }

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


