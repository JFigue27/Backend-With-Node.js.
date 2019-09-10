const cluster = require('cluster');
const http = require('http');

// Requerimos la cantidad de CUPs que tiene la maquina actual
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Si el cluster es maestro, creamos tantos procesos como numeros de CPUs
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (Worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Los difentes workers pueden compartir la conexion TCP
  // En este caso un servidor HTTP
  http
    .createServer((rep, res) => {
      res.writeHead(200);
      res.end('Hello World\n');
    })
    .listen(8000);
  console.log(`Worker ${process.pid} started`);
}
