# File: src/services/githubService.js (Commit: b8cc0672aebe8fd092107e7e9ad5be9d7347a41a)

## Function: `getFileContent`

- **Description:** Fetches the raw content of a file from GitHub.
- **Parameters:** `owner` (string) - The GitHub username or organization that owns the repository. `repo` (string) - The name of the repository. `filePath` (string) - The path to the file within the repository.
- **Returns:** The raw content of the file as a string.

---

## Function: `pushDocToRepo`

- **Description:** Pushes the generated documentation to a GitHub repository at `/docs/<commit-id>/<filename>.md`.
- **Parameters:** `repoOwner` (string) - The GitHub username or organization that owns the repository. `repoName` (string) - The name of the repository. `commitId` (string) - The commit ID of the commit that the documentation corresponds to. `filePath` (string) - The path to the file within the repository. `content` (string) - The content of the file to be pushed.
- **Returns:** The response data from GitHub API, containing the commit SHA and other information.

---

## Function: `branchExists`

- **Description:** Checks if a specified branch exists in a GitHub repository.
- **Parameters:** `repoOwner` (string) - The GitHub username or organization that owns the repository. `repoName` (string) - The name of the repository. `branchName` (string) - The name of the branch to check.
- **Returns:** A boolean value indicating whether the branch exists or not.

---

## Function: `createBranchFromMain`

- **Description:** Creates a new branch from the main branch in a GitHub repository.
- **Parameters:** `repoOwner` (string) - The GitHub username or organization that owns the repository. `repoName` (string) - The name of the repository.
- **Returns:** No return value.

---

## Function: `createOrUpdatePR`

- **Description:** Creates or updates a pull request in a GitHub repository.
- **Parameters:** `repoOwner` (string) - The GitHub username or organization that owns the repository. `repoName` (string) - The name of the repository.
- **Returns:** No return value.

---