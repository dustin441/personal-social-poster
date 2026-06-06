import 'dotenv/config';
const dryRun = process.argv.includes('--dry-run') || process.env.DRY_RUN === 'true';
console.log(dryRun ? 'DRY RUN: would check approved rows and open browser.' : 'LIVE MODE: implement platform-specific posting selectors before use.');
console.log('Safety: stop on login, 2FA, checkpoint, or suspicious activity screens.');
