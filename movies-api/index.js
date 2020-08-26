const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');

// log errors and errorHandlers
const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// Body parser
app.use(express.json());

// routes
moviesApi(app);

// Catch error 404
app.use(notFoundHandler);

// Manejadores de Errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
