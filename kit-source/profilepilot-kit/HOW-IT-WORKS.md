# How It Works

The automation has three parts.

## 1. Google Sheet Approval Queue

The Sheet is the source of truth. A post is eligible only when:

- `status = approved`
- `local_status = ready_to_post`
- `scheduled_for` is now or in the past
- `posted_url` is blank

## 2. n8n Workflow

n8n can create, organize, and manage draft posts. In v1, n8n is mainly for the queue/content side, not direct personal-profile publishing.

n8n can:

- create post drafts
- pull content from URLs/RSS/notes
- write rows to Google Sheets
- notify you when posts need approval
- archive completed posts

## 3. Local Browser Poster

A script runs on your computer. It:

- checks the Sheet
- finds approved posts
- opens your trusted browser profile
- creates the post
- optionally adds a first comment/source link
- updates the Sheet
- logs errors and screenshots
