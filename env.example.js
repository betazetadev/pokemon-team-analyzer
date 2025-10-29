// Local development configuration (optional)
//
// By default, the app uses the Netlify function endpoint: /.netlify/functions/analyze
// This works automatically when deployed to Netlify (using N8N_WEBHOOK_URL env var)
//
// For local development WITHOUT deploying to Netlify:
// 1. Copy this file to env.js
// 2. Uncomment and set WEBHOOK_URL to your direct n8n webhook URL
//
window.pokemonTeamAnalyzerEnv = {
  // WEBHOOK_URL: 'https://example.com/your-pokemon-team-n8n-webhook'
};
