# Google Sheet Template

Create a Google Sheet with a tab named `Queue` and these exact columns:

| Column | Name | Purpose |
|---|---|---|
| A | post_id | Unique ID for the post |
| B | platform | `linkedin`, `facebook`, or another supported platform |
| C | post_text | Main post content |
| D | first_comment | Optional first comment/source link |
| E | source_url | Optional reference/source URL |
| F | scheduled_for | Date/time the post can publish |
| G | status | Human approval status |
| H | local_status | Local poster status |
| I | posted_url | URL after successful posting |
| J | error_notes | Error details if blocked |
| K | last_attempted_at | Last attempted timestamp |
| L | created_at | Draft created timestamp |
| M | posted_at | Posted timestamp |

Eligible-to-post rule:

```text
status = approved
local_status = ready_to_post
scheduled_for <= now
posted_url is blank
```

Recommended status values:

`draft`, `needs_review`, `approved`, `rejected`, `posted`, `error`

Recommended local_status values:

`waiting`, `ready_to_post`, `posting`, `posted`, `error`, `paused`
