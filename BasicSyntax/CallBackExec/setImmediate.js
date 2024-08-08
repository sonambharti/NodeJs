const fs = require('fs');

console.log('Start');

/*
fs.readFile() function to read the contents of the current file (__filename is a built-in Node.js variable that returns the path of the current file). The second argument is a callback function that will be executed when the file read operation is complete.
*/

fs.readFile(__filename, () => {
  console.log('File read complete at location: ', __filename);


  /*
  This line uses the setImmediate() function to schedule a callback function to be executed in the next iteration of the event loop. The callback function prints "Set Immediate callback" to the console.
   */
  setImmediate(() => {
    console.log('Set Immediate callback');
  });

  /*
  This line uses the process.nextTick() function to schedule a callback function to be executed in the next iteration of the event loop, but with higher priority than setImmediate(). The callback function prints "Next Tick callback" to the console
  */
  process.nextTick(() => {
    console.log('Next Tick callback');
  });

  console.log('End of I/O callback');
});

console.log('End');
