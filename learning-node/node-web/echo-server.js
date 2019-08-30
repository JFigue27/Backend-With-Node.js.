const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url == '/echo') {
    let body = [];

    req
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        body = Buffer.concat(body).toString();
        const MyDate = new Date(body);

        var weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';
        var DateName = weekday[MyDate.getDay()];
        console.log(DateName);

        res.end(DateName);
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8001);
console.log('Servidor en la URL http://localhost:8001');
