const fs = require('fs')

// const http = require('http')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// const fileRead = fs.readFileSync("./input.txt")
const fileRead = fs.readFile("./input.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(e);
    }else{
        console.log(data);
        const filwrite = fs.writeFile("output.txt", data, (err) => {
            if(err){
                console.log(err);
            }
            else{
                console.log("Writing complete....");
            }
        });
    }
})
sleep(1000);
console.log("Reading File....")
const fileWrite = fs.writeFileSync("./output.txt", "Kartikay is idiot")
console.log("File write...")