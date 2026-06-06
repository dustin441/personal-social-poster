# Local Poster Setup

From the `local-poster` folder:

```bash
npm install
cp .env.example .env
node scripts/test-config.mjs
node scripts/post-approved-content.mjs --dry-run
```

Edit `.env`:

```bash
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_SHEET_TAB=Queue
BROWSER_PROFILE_PATH=/path/to/your/browser/profile
POSTING_PLATFORM=linkedin
```

Real test:

```bash
node scripts/post-approved-content.mjs --limit 1
```

Do not run a real post until the dry-run checklist passes and you have intentionally approved one safe test row.
