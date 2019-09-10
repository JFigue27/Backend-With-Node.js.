const { Duplex } = require('stream');

const duplexStream = new Duplex({
  write(chunk, encoding, callbak) {
    console.log(chunk.toString());
    callbak();
  },

  read(size) {
    if (this.currentCharCode > 90) {
      this.push(null);
      return;
    }

    this.push(String.fromCharCode(this.currentCharCode++));
  }
});

duplexStream.currentCharCode = 65;
process.stdin.pipe(duplexStream).pipe(process.stdout);
