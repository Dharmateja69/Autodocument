# File: src/services/GithubService.js (Commit: b8cc0672aebe8fd092107e7e9ad5be9d7347a41a)

## Function: getFileContent

- **Description:** Fetches the raw content of a file from GitHub.
- **Parameters:**
  - `owner`: The GitHub username of the repository owner.
  - `repo`: The name of the repository.
  - `filePath`: The path to the file in the repository.
- **Returns:** The raw content of the file as a string.

---

## Function: pushDocToRepo

- **Description:** Pushes generated documentation to a GitHub repository and creates or updates a pull request.
- **Parameters:**
  - `repoOwner`: The GitHub username of the repository owner.
  - `repoName`: The name of the repository.
  - `commitId`: The commit ID of the documentation to be pushed.
  - `filePath`: The path to the file in the repository.
  - `content`: The content of the documentation as a string.
- **Returns:** The response data from GitHub.

---

## Function: branchExists

- **Description:** Checks if a specific branch exists in a GitHub repository.
- **Parameters:**
  - `repoOwner`: The GitHub username of the repository owner.
  - `repoName`: The name of the repository.
  - `branchName`: The name of the branch to check.
- **Returns:** A boolean indicating whether the branch exists.

---

## Function: createBranchFromMain

- **Description:** Creates a new branch from the main branch in a GitHub repository.
- **Parameters:**
  - `repoOwner`: The GitHub username of the repository owner.
  - `repoName`: The name of the repository.
- **Returns:** Nothing.

---

## Function: createOrUpdatePR

- **Description:** Creates or updates a pull request in a GitHub repository.
- **Parameters:**
  - `repoOwner`: The GitHub username of the repository owner.
  - `repoName`: The name of the repository.
- **Returns:** Nothing.

---

This code defines several functions for interacting with GitHub repositories. The `getFileContent` function fetches the raw content of a file from GitHub, while the `pushDocToRepo` function pushes generated documentation to a GitHub repository and creates or updates a pull request. The `branchExists`, `createBranchFromMain`, and `createOrUpdatePR` functions are used to manage branches and pull requests within the repository.