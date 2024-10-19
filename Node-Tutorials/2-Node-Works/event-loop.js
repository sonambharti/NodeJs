const fs = require('fs')
const crypto = require('crypto')

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4

setTimeout(() => console.log("Wait for 5 sec. Timer 1 finished."), 5000);
setImmediate(() => console.log("Immediate 1 finished."));

fs.readFile("./test-file.txt", () => {
    console.log("I/O finished");
    console.log("----------------");

    setTimeout(() => console.log("Timer 2 finished"), 1000);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log("Process.nextTick 1 executed"));

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");

    process.nextTick(() => console.log("Process.nextTick 2 executed"));
})

// const hash = crypto.createHash('sha256')
// console.log(Date.now() - start, " hash created!!! \nhash: ", hash)