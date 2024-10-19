// module exports
const modExpo = require('./test-module-1')
const c = new modExpo()
sum = c.add(2, 3);
console.log("Sum of 2, and 3 is: ", sum);

// exports
// const calc2 = require("./test-module-2");
const { add, multiply } = require("./test-module-2");
console.log(multiply(2, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
