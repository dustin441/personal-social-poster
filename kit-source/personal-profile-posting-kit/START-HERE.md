# Start Here

This kit helps you set up a local personal-profile posting automation system.

The system works like this:

1. Posts are drafted into a Google Sheet approval queue.
2. A human approves the posts.
3. Your local computer checks for approved/scheduled rows.
4. Your logged-in browser publishes the post.
5. The queue updates with success or error status.

Important:

- You need a computer that stays on during posting windows.
- You must already be logged into the social platform in your browser.
- This kit does not bypass login, 2FA, checkpoint, or security screens.
- Nothing should publish until you approve it.

## If you use Hermes

Open this folder in your terminal and paste the prompt from:

`prompts/hermes-install-prompt.md`

## If you use OpenClaw

Open this folder in OpenClaw and paste the prompt from:

`prompts/openclaw-install-prompt.md`

## Manual install order

1. Read `WHAT-YOU-NEED.md`
2. Create your Google Sheet using `google-sheets/sheet-columns.md`
3. Import/configure the n8n workflow in `n8n/workflow.json`
4. Configure the local poster in `local-poster/`
5. Run the dry-run tests
6. Publish one approved real test post
7. Enable scheduled polling
