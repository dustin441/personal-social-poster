# n8n Setup

1. Open n8n.
2. Import `n8n/workflow.json`.
3. Connect your Google Sheets credential.
4. Set your Sheet ID.
5. Set your worksheet/tab name, usually `Queue`.
6. If you want to turn website links into draft posts, read `SCRAPING-WEBSITE-URLS.md` and add a `source_url` or `scrape_url` field to the workflow.
7. Test the workflow manually.
8. Confirm it writes a sample draft row.
9. Do not activate scheduled automations until the Sheet columns are correct.

The included workflow is intentionally simple. It creates a sample post row so you can verify the queue structure before customizing content generation, website scraping, or Firecrawl/HTTP Request steps.
