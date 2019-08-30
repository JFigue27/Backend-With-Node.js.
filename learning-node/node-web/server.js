const http = require('http');
const server = http.createServer();

server.on('request', (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');

  response.end('hello world\n');
});

server.listen(8000);
console.log('Servidor en la URL http://localhost:8000');
