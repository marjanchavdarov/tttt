const http = require('http');
const fs = require('fs');
const path = require('path');

const serveFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Server error");
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
};

http.createServer((req, res) => {
  const routes = {
    '/': '../frontend/index.html',
    '/index.html': '../frontend/index.html',
    '/styles.css': '../frontend/styles.css',
    '/dice.js': '../frontend/dice.js',
  };

  const file = routes[req.url];
  if (file) {
    const ext = path.extname(file);
    const mime = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
    };
    serveFile(res, path.join(__dirname, file), mime[ext]);
  } else if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', time: new Date() }));
  } else {
    res.writeHead(404);
    res.end("404 Not Found");
  }
}).listen(process.env.PORT || 3000, () =>
  console.log("✅ Tabla Max server running")
);
