// %s String
// %d Number
// %j JSON

console.log('One action %s seccound action %s', 'numero 1', 'numero 2');

console.info('Hello World');
console.warn('Hello warn can by an error');
console.assert(42 === '42');
console.trace('Marca el error en las lineas y columnas');

const util = require('util');
const debuglog = util.debuglog('foo');
debuglog('Hello Jaime from some body');
