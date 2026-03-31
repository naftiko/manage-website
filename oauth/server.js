require('dotenv').config({ path: '../../../.env' });
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.WEBFLOW_CLIENT_ID;
const CLIENT_SECRET = process.env.WEBFLOW_CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPE = 'assets:read assets:write cms:read cms:write components:read components:write pages:read pages:write sites:read sites:write site_activity:read';

// Step 1: Start the OAuth flow
app.get('/', (req, res) => {
  const authUrl = new URL('https://webflow.com/oauth/authorize');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPE);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);

  res.send(`
    <html>
      <body>
        <h2>Webflow OAuth</h2>
        <a href="${authUrl.toString()}">Authorize with Webflow</a>
      </body>
    </html>
  `);
});

// Step 2: Handle the redirect and exchange code for token
app.get('/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res.send(`<h2>Error:</h2><pre>${error}</pre>`);
  }

  if (!code) {
    return res.status(400).send('No authorization code received.');
  }

  try {
    const token = await exchangeCodeForToken(code);
    saveTokenToEnv(token.access_token);

    res.send(`
      <html>
        <body>
          <h2>Success!</h2>
          <p>Access token saved to .env as <code>WEBFLOW_ACCESS_TOKEN</code></p>
          <pre>${JSON.stringify(token, null, 2)}</pre>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`<h2>Token exchange failed:</h2><pre>${err.message}</pre>`);
  }
});

function exchangeCodeForToken(code) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    });

    const options = {
      hostname: 'api.webflow.com',
      path: '/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(`${parsed.error}: ${parsed.error_description || ''}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function saveTokenToEnv(accessToken) {
  const envPath = path.resolve(__dirname, '../../../.env');
  let contents = fs.readFileSync(envPath, 'utf8');

  if (contents.includes('WEBFLOW_ACCESS_TOKEN=')) {
    contents = contents.replace(/^WEBFLOW_ACCESS_TOKEN=.*/m, `WEBFLOW_ACCESS_TOKEN=${accessToken}`);
  } else {
    contents += `\nWEBFLOW_ACCESS_TOKEN=${accessToken}`;
  }

  fs.writeFileSync(envPath, contents);
  console.log('Access token saved to .env');
}

app.listen(PORT, () => {
  console.log(`\nWebflow OAuth server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to begin.\n`);
});
