router.post('/webhook', async (req, res) => {
    console.log('🔔 Webhook received - Starting verification');

    // 🔐 Verify webhook signature
    const signature = req.headers['x-hub-signature-256'];
    const rawBody = JSON.stringify(req.body);
    const isVerified = verifyWebhook(signature, rawBody);
    if (!isVerified) {
        console.error('❌ Invalid webhook signature');
        return res.status(403).send('Invalid signature');
    }
    console.log('✅ Webhook verified successfully');

    try {
        console.log('📦 Extracting data from payload');

        const { repository, head_commit } = req.body;

        if (!repository || !head_commit) {
            console.warn('⚠️ Missing repository or head_commit in payload');
            return res.status(400).send('Incomplete webhook payload');
        }

        const repoOwner = repository.owner?.name || repository.owner?.login || 'unknown';
        const repoName = repository.name;
        const commitId = head_commit.id;
        const modifiedFiles = head_commit.modified || [];
        const addedFiles = head_commit.added || [];

        console.log(`🏷️ Repo: ${repoOwner}/${repoName}, Commit: ${commitId}`);
        console.log(`📄 Modified files: ${modifiedFiles.length}, Added files: ${addedFiles.length}`);

        const relevantFiles = [...modifiedFiles, ...addedFiles].filter(file =>
            ALLOWED_EXTENSIONS.some(ext => file.endsWith(ext))
        );
        console.log(`🔍 Relevant files to document: ${relevantFiles.join(', ')}`);

        for (const filePath of relevantFiles) {
            console.log(`\n🔄 Processing file: ${filePath}`);
            try {
                const code = await getFileContent(repoOwner, repoName, filePath);
                console.log(`✅ Got ${code.length} bytes of code`);

                const docMarkdown = await generateDoc({ code, filename: filePath, commitId });
                console.log(`📝 Generated ${docMarkdown.length} chars of documentation`);

                console.log('⬆️ Pushing documentation to GitHub...');
                await pushDocToRepo({
                    repoOwner,
                    repoName,
                    commitId,
                    filePath,
                    content: toMarkdown(docMarkdown),
                });

                console.log(`✅ Successfully pushed docs for ${filePath}`);
            } catch (fileError) {
                console.error(`❗ Error processing ${filePath}:`, fileError.message);
            }
        }

        console.log('🎉 All files processed successfully without any delay');
        res.status(200).send('📄 Documentation generated successfully');
    } catch (err) {
        console.error('💥 Webhook processing failed:', err.message);
        console.error('Stack trace:', err.stack);
        res.status(500).send('Webhook processing failed');
    }
});
