const fs = require('fs');

fs.copyFile('log', 'logssss.txt', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Log fue copiado como logs.txt');
});
