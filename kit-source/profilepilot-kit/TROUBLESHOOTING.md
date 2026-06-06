# Troubleshooting

## The script cannot read my Google Sheet

Check Sheet ID, tab name, Google credentials, column names, and API access.

## Browser opens but I am not logged in

Open the same browser profile manually, log in yourself, complete 2FA manually, then rerun the browser-profile test.

## Facebook/LinkedIn changed the button

Do not randomly change selectors. Capture a screenshot and DOM dump first. Use `prompts/troubleshooting-prompt.md`.

## The post published but Sheet did not update

Check Google Sheets write permission, `post_id`, row lookup, and status update code.

## It posted twice

Check duplicate prevention, `posted_url`, `local_status`, lock file behavior, and schedule frequency.

## My computer went to sleep

Adjust power settings, use a dedicated always-on computer, or use a Mac caffeinate/LaunchAgent setup.
