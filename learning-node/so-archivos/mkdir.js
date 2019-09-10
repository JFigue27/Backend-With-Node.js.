const fs = require('fs');

fs.mkdir('learning-node/escuela-js/node', { recursive: true }, err => {
  if (err) {
    return console.log(err);
  }
});
