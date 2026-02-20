import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "222612925549-3kjshsapngiopj12220s7q6dvct984md.apps.googleusercontent.com";

console.log(`Checking Client ID: ${CLIENT_ID}`);

if (!CLIENT_ID || CLIENT_ID.includes('your_google_client_id_here')) {
    console.error('❌ Error: Invalid or missing Client ID.');
    process.exit(1);
}

const client = new OAuth2Client(CLIENT_ID);

console.log('✅ Client ID format looks correct.');
console.log('To verify this ID is active:');
console.log('1. Go to Google Cloud Console > APIs & Services > Credentials');
console.log('2. Ensure this Client ID exists in the "OAuth 2.0 Client IDs" list.');
console.log(`3. Ensure "https://life-physics-architect-222612925549.us-west1.run.app" is added to "Authorized JavaScript origins".`);
console.log(`4. Ensure "https://life-physics-architect-222612925549.us-west1.run.app" is added to "Authorized redirect URIs" (if using redirects).`);
