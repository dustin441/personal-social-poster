---
name: profilepilot-kit
description: Install and troubleshoot the ProfilePilot Kit.
version: 0.1.0
---

# ProfilePilot Kit

Use this skill when helping a buyer install the kit.

Rules:

- Read START-HERE.md first.
- Do not publish real posts without explicit user approval.
- Stop on login, 2FA, checkpoint, suspicious activity, or security screens.
- Run dry tests before real tests.
- Verify Sheet updates after posting.

Install order:

1. Confirm requirements.
2. Set up Google Sheet queue.
3. Configure/import n8n workflow.
4. Configure local poster `.env`.
5. Run config and dry-run tests.
6. Publish one approved test post only after user approval.
7. Enable scheduled polling.
