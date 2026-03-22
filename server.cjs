const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STATIC_DIR = path.join(__dirname, 'dist');
const SUBS_FILE = path.join(__dirname, 'subscribers.csv');
const PORT = 8880;

// Ensure subscribers file exists
if (!fs.existsSync(SUBS_FILE)) {
  fs.writeFileSync(SUBS_FILE, 'email,timestamp\n');
}

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain',
};

function handleSubscribe(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try {
      let email;
      if ((req.headers['content-type'] || '').includes('json')) {
        email = JSON.parse(body).email;
      } else {
        email = new URLSearchParams(body).get('email');
      }
      if (!email || !email.includes('@')) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid email' }));
        return;
      }
      const existing = fs.readFileSync(SUBS_FILE, 'utf8');
      if (existing.toLowerCase().includes(email.toLowerCase())) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, message: 'Already subscribed!' }));
        return;
      }
      fs.appendFileSync(SUBS_FILE, `${email.toLowerCase()},${new Date().toISOString()}\n`);
      const count = existing.trim().split('\n').length;
      console.log(`✉️  New subscriber: ${email} (total: ${count})`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Subscribed! We\'ll notify you of new visualizations.' }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Server error' }));
    }
  });
}

const server = http.createServer((req, res) => {
  // API routes
  if (req.method === 'POST' && req.url === '/api/subscribe') {
    return handleSubscribe(req, res);
  }
  if (req.method === 'GET' && req.url === '/api/subscribers/count') {
    const data = fs.readFileSync(SUBS_FILE, 'utf8');
    const count = Math.max(0, data.trim().split('\n').length - 1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count }));
  }

  // Static file serving
  let urlPath = req.url.split('?')[0];
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  if (!path.extname(urlPath)) urlPath += '/index.html';

  const filePath = path.join(STATIC_DIR, urlPath);
  
  // Security: prevent path traversal
  if (!filePath.startsWith(STATIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try without /index.html
      const altPath = path.join(STATIC_DIR, urlPath.replace('/index.html', '.html'));
      fs.readFile(altPath, (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
        } else {
          const ext = path.extname(altPath);
          res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
          res.end(data2);
        }
      });
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 systeminternals.dev server on port ${PORT} (static + API)`);
});
