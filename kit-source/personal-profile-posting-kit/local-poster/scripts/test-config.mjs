import 'dotenv/config';
const required=['GOOGLE_SHEET_ID','GOOGLE_SHEET_TAB','BROWSER_PROFILE_PATH'];
const missing=required.filter(k=>!process.env[k]);
if(missing.length){ console.error('Missing env vars:', missing.join(', ')); process.exit(1); }
console.log('Config shape looks OK.');
