# Start Here

ProfilePilot Kit helps you set up a local personal-profile posting automation system.

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

## Exactly what to do with this ZIP

Do not paste the entire ZIP or every file into a chat window. The best workflow is to unzip the folder, open the folder in your AI coding agent, and paste one setup prompt.

1. Download `profilepilot-kit.zip`.
2. Unzip it. You should now have a folder named `profilepilot-kit/`.
3. Open that folder in your coding agent, terminal, or editor.
   - Hermes: open a terminal in the folder and start Hermes there.
   - Claude Code / Codex / OpenClaw: open the folder as the project/workspace.
4. Tell the agent:

```text
Read START-HERE.md first. Then walk me through installing ProfilePilot Kit one step at a time. Do not skip verification. Do not publish a real post until I explicitly approve it. Stop if you see login, 2FA, checkpoint, suspicious-activity, or account-security screens.
```

5. Paste the matching install prompt from the `prompts/` folder:
   - Hermes: `prompts/hermes-install-prompt.md`
   - OpenClaw: `prompts/openclaw-install-prompt.md`
   - Claude Code, Codex, or another agent: use the Hermes prompt as the closest general prompt.
6. Let the agent read the docs and inspect the files. It should help you set up each part in this order:
   - requirements and safety boundaries
   - Google Sheet approval queue
   - n8n workflow/import or your draft source
   - local poster configuration
   - dry-run tests
   - one explicitly approved real test post
   - scheduled polling only after tests pass

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
