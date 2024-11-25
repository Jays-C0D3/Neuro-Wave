const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method.toLowerCase() === 'get') {
        // Serve the HTML file
        fs.readFile('./public/index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method.toLowerCase() === 'post' && req.url === '/upload') {
        // Handle file upload
        const form = new formidable.IncomingForm();
        form.uploadDir = './uploads';
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File upload failed', error: err }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'File uploaded successfully', file: files.file }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});