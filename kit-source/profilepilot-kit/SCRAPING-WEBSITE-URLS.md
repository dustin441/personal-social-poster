# Scraping Website URLs with n8n

ProfilePilot Kit can use n8n to turn a website, article, landing page, or source link into a draft post row in your Google Sheet queue.

The safest default is:

```text
website URL -> n8n scrape/fetch step -> draft post -> Google Sheet row with status=draft or needs_review -> human approval -> local poster
```

Do not scrape a page and publish it automatically without review. The browser poster should only post after a human changes the Sheet row to `status=approved` and `local_status=ready_to_post`.

## Option A: Paste one URL directly into n8n

Use this when you want to test one page.

1. Open n8n.
2. Create or open your ProfilePilot workflow.
3. Add a **Manual Trigger** node.
4. Add a **Set** node after it.
5. In the Set node, create a field named `source_url` or `scrape_url`.
6. Paste the page you want to scrape into that field.
7. Add a scraping step:
   - simple pages: use **HTTP Request** to fetch the page HTML
   - cleaner extraction: use Firecrawl or another scraper to return markdown/text
8. Add an AI/content step, if desired, to turn the scraped page into draft `post_text`.
9. Add or update a Google Sheets row with:
   - `post_text`
   - `first_comment` if needed
   - `source_url`
   - `status=draft` or `status=needs_review`
   - `local_status` blank until approved
10. Review the row in the Sheet before approving it.

## Option B: Put URLs in the Google Sheet

Use this when you want a queue of pages to turn into posts.

1. Add a column named `source_url` or `scrape_url` to your Sheet if it is not already there.
2. Add one URL per row.
3. Set `status=needs_draft` or another draft-only status.
4. In n8n, use a Google Sheets node to read rows where `source_url` is not empty and `post_text` is empty.
5. For each row, pass the URL to HTTP Request, Firecrawl, or your scraper.
6. Generate or write the draft post content into `post_text`.
7. Set `status=needs_review`.
8. Do not set `local_status=ready_to_post` until a human approves the final post.

## Firecrawl pattern

Firecrawl is useful when you want markdown/text instead of raw HTML.

Typical n8n pattern:

1. Add an HTTP Request node.
2. Method: `POST`.
3. URL: Firecrawl scrape endpoint from the Firecrawl docs.
4. Authentication: use your own Firecrawl API key in n8n credentials or environment variables.
5. Body: pass the URL from `source_url` / `scrape_url`.
6. Use the returned markdown/text as source material for a draft post.
7. Write the draft to the Google Sheet with `status=needs_review`.

Never paste your Firecrawl API key into an AI chat. Configure it directly in n8n.

## Sheet fields to use

Recommended minimum fields:

```text
source_url      the URL being scraped
post_text       generated draft post
first_comment   optional source link or comment
status          draft / needs_review / approved
local_status    ready_to_post only after approval
error_notes     scrape or draft errors
```

## Safety checklist

Before activating any scraping workflow:

- [ ] The workflow writes drafts, not auto-approved posts.
- [ ] Every scraped post is reviewed by a human.
- [ ] Source URLs are stored in `source_url` or `first_comment` for attribution/context.
- [ ] The local poster still requires `status=approved` and `local_status=ready_to_post`.
- [ ] Dry-run tests pass before any real post.
