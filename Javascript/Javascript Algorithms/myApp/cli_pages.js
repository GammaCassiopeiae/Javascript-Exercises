const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let url = req.url === '/' ? '/index.html' : req.url;
    let filePath = path.join(__dirname, 'public', url);
    let ext = path.extname(filePath);
    
    // Osnovno mapiranje MIME tipov
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("404: Datoteka ne obstaja");
            return;
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Strežnik teče na: http://localhost:${PORT}`);
});
