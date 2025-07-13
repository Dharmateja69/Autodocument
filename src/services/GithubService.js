// services/githubService.js

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_PAT = process.env.GITHUB_PAT;
const DEFAULT_BRANCH = 'main';
const DOC_BRANCH = 'Document';
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
// function syncLocalRepo() {
//     return new Promise((resolve, reject) => {
//         exec('git pull origin main && git push origin main', (err, stdout, stderr) => {
//             if (err) {
//                 reject(new Error(`Git sync failed: ${stderr || err.message}`));
//             } else {
//                 console.log(stdout);
//                 resolve();
//             }
//         });
//     });
// }


// export async function pushDocToRepo({ repoOwner, repoName, commitId, filePath, content }) {
//     const fileName = filePath.split('/').pop().replace(/\.[^/.]+$/, '.md');
//     const docPath = `docs/${commitId}/${fileName}`;
//     const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${docPath}`;

//     console.log(`\n📤 [GitHub Service] Pushing docs to: ${repoOwner}/${repoName}/${docPath}`);

//     try {
//         // 🔐 Encode Markdown content to base64 (required by GitHub)
//         const encodedContent = Buffer.from(content, 'utf-8').toString('base64');
//         console.log(`📝 Prepared content (${encodedContent.length} chars encoded)`);

//         let sha = null;

//         // 🔍 Check if the file already exists to get its current SHA
//         try {
//             const checkRes = await axios.get(url, {
//                 headers: {
//                     Authorization: `token ${GITHUB_PAT}`,
//                     Accept: 'application/vnd.github.v3+json',
//                 },
//             });

//             sha = checkRes.data.sha;
//             console.log(`🧩 Existing file SHA found: ${sha}`);
//         } catch (err) {
//             if (err.response && err.response.status === 404) {
//                 console.log(`📁 File does not exist yet. Will create new.`);
//             } else {
//                 throw err; // throw other errors
//             }
//         }

//         const payload = {
//             message: `📄 AI Doc for ${fileName} (commit ${commitId})`,
//             content: encodedContent,
//             ...(sha && { sha }), // include SHA only if it's found
//         };

//         console.log(`🚀 Sending PUT request to: ${url}`);
//         const res = await axios.put(url, payload, {
//             headers: {
//                 Authorization: `token ${GITHUB_PAT}`,
//                 Accept: 'application/vnd.github.v3+json',
//             },
//         });

//         console.log(`✅ Docs pushed successfully! Commit SHA: ${res.data.commit.sha}`);
//         console.log(`🔗 View at: https://github.com/${repoOwner}/${repoName}/blob/main/${docPath}`);

//         // ✅ Auto-sync local repo with latest state from remote (main branch)
//         try {
//             console.log(`🔄 Syncing local branch with remote...`);
//             await syncLocalRepo();
//             console.log(`✅ Local repo synced successfully.`);
//         } catch (syncError) {
//             console.error(`❌ Git sync failed: ${syncError.message}`);
//         }

//         return res.data;

//     } catch (error) {
//         console.error(`❌ Failed to push docs for ${fileName}:`, {
//             status: error.response?.status,
//             message: error.message,
//             responseData: error.response?.data,
//             url: url,
//         });
//         throw new Error(`GitHub push failed: ${error.message}`);
//     }
// }


async function branchExists(repoOwner, repoName, branchName) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/branches/${branchName}`;
    console.log(`Checking if branch ${branchName} exists in ${repoOwner}/${repoName}`);
    try {
        await axios.get(url, {
            headers: { Authorization: `token ${GITHUB_PAT}` },
        });
        console.log(`Branch ${branchName} exists`);
        return true;
    } catch (err) {
        console.log(`Branch ${branchName} does not exist`);
        return false;
    }
}

async function createBranchFromMain(repoOwner, repoName) {
    console.log(`Creating new branch ${DOC_BRANCH} from ${DEFAULT_BRANCH}`);
    // 1. Get SHA of default branch
    const mainRefUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/${DEFAULT_BRANCH}`;
    console.log(`Fetching SHA from ${mainRefUrl}`);
    const refRes = await axios.get(mainRefUrl, {
        headers: { Authorization: `token ${GITHUB_PAT}` },
    });

    const sha = refRes.data.object.sha;
    console.log(`Got SHA: ${sha}`);

    // 2. Create new branch from that SHA
    const createRefUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`;
    console.log(`Creating branch at ${createRefUrl}`);
    await axios.post(
        createRefUrl,
        {
            ref: `refs/heads/${DOC_BRANCH}`,
            sha,
        },
        {
            headers: { Authorization: `token ${GITHUB_PAT}` },
        }
    );
    console.log(`Successfully created branch ${DOC_BRANCH}`);
}

async function createOrUpdatePR(repoOwner, repoName) {
    const prsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`;
    console.log(`Checking for existing PRs in ${repoOwner}/${repoName}`);

    const existingPRs = await axios.get(prsUrl, {
        headers: { Authorization: `token ${GITHUB_PAT}` },
        params: { state: 'open', head: `${repoOwner}:${DOC_BRANCH}`, base: DEFAULT_BRANCH },
    });

    if (existingPRs.data.length === 0) {
        console.log(`No existing PR found, creating new PR`);
        await axios.post(
            prsUrl,
            {
                title: 'AutoDoc AI Documentation Updates',
                body: 'Auto-generated documentation for recent commits. Please review and merge.',
                head: DOC_BRANCH,
                base: DEFAULT_BRANCH,
            },
            {
                headers: { Authorization: `token ${GITHUB_PAT}` },
            }
        );
        console.log(`Successfully created new PR`);
    } else {
        console.log(`Existing PR found: #${existingPRs.data[0].number}`);
    }
}

export async function pushDocToRepo({ repoOwner, repoName, commitId, filePath, content }) {
    const fileName = filePath.split('/').pop().replace(/\.[^/.]+$/, '.md');
    const docPath = `docs/${commitId}/${fileName}`;
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${docPath}`;

    console.log(`\n📤 [GitHub Service] Pushing docs to: ${repoOwner}/${repoName}/${docPath}`);

    try {
        const encodedContent = Buffer.from(content, 'utf-8').toString('base64');
        console.log(`Content encoded successfully`);
        let sha = null;

        // Check if the file already exists
        try {
            console.log(`Checking if file exists at ${url}`);
            const checkRes = await axios.get(url, {
                headers: {
                    Authorization: `token ${GITHUB_PAT}`,
                    Accept: 'application/vnd.github.v3+json',
                },
                params: { ref: DOC_BRANCH },
            });
            sha = checkRes.data.sha;
            console.log(`File exists, SHA: ${sha}`);
        } catch (err) {
            if (err.response?.status !== 404) throw err;
            console.log(`File does not exist, will create new file`);
        }

        // Ensure branch exists
        console.log(`Checking if branch ${DOC_BRANCH} exists`);
        const exists = await branchExists(repoOwner, repoName, DOC_BRANCH);
        if (!exists) {
            console.log(`Branch doesn't exist, creating it`);
            await createBranchFromMain(repoOwner, repoName);
        }

        // Push file
        console.log(`Pushing file to ${url}`);
        await axios.put(
            url,
            {
                message: `📄 AI Doc for ${fileName} (commit ${commitId})`,
                content: encodedContent,
                branch: DOC_BRANCH,
                ...(sha && { sha }),
            },
            {
                headers: {
                    Authorization: `token ${GITHUB_PAT}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        console.log(`✅ Docs pushed to '${DOC_BRANCH}' branch.`);

        console.log(`Creating/updating PR`);
        await createOrUpdatePR(repoOwner, repoName);
        console.log(`🔁 Pull request created/updated.`);
    } catch (error) {
        console.error(`❌ Failed to push docs:`, error.response?.data || error.message);
        throw new Error(`GitHub push failed: ${error.message}`);
    }
}
