const http = require('http');
const fs = require('fs');
const path = require('path');

const SUBS_FILE = path.join(__dirname, 'subscribers.csv');
const PORT = 8881;

// Ensure file exists with header
if (!fs.existsSync(SUBS_FILE)) {
  fs.writeFileSync(SUBS_FILE, 'email,timestamp\n');
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://systeminternals.dev');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/subscribe') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        let email;
        // Handle both JSON and form-encoded
        if (req.headers['content-type']?.includes('application/json')) {
          email = JSON.parse(body).email;
        } else {
          email = new URLSearchParams(body).get('email');
        }

        if (!email || !email.includes('@')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid email' }));
          return;
        }

        // Check for duplicates
        const existing = fs.readFileSync(SUBS_FILE, 'utf8');
        if (existing.includes(email.toLowerCase())) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, message: 'Already subscribed!' }));
          return;
        }

        // Append
        const line = `${email.toLowerCase()},${new Date().toISOString()}\n`;
        fs.appendFileSync(SUBS_FILE, line);

        const count = existing.trim().split('\n').length; // includes header
        console.log(`New subscriber: ${email} (total: ${count})`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, message: 'Subscribed!' }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/subscribers/count') {
    const data = fs.readFileSync(SUBS_FILE, 'utf8');
    const count = Math.max(0, data.trim().split('\n').length - 1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Subscribe server running on port ${PORT}`);
});
