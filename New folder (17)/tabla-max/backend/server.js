const http = require('http');
const fs = require('fs');
const path = require('path');

const serveFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server error");
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    serveFile(res, path.join(__dirname, '../frontend/index.html'), 'text/html');
  } else if (req.url === '/styles.css') {
    serveFile(res, path.join(__dirname, '../frontend/styles.css'), 'text/css');
  } else if (req.url === '/dice.js') {
    serveFile(res, path.join(__dirname, '../frontend/dice.js'), 'application/javascript');
  } else if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', time: new Date() }));
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Tabla Max live on port ${PORT}`);
});
