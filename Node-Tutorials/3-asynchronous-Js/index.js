// Promise solve the callback hell '>' problem.

const fs = require('fs')
const superagent = require('superagent')

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject('I could not find the file... ', err);
            }
            resolve(data);
            });
        });
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject('I could not write into the file... ', err);
            }
            resolve('success');
            });
        });
}

const getDogPic = async() => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file!');
    } catch (err) {
        console.log(err);

        throw err;
    }
    return '2: Ready 🐶';
}

// annonymous async function to call a function to fulfill the promise
// (async () => {
//     try {
//         console.log('1: Will get dog pics!');
//         const x = await getDogPic();
//         console.log(x);
//         console.log('3: Done getting dog pics!');
//     } catch (err) {
//         console.log('ERROR 💥');
//     }
// })();

/** */
// sequence to execute Promise using a synchronous function
// const fun = function() {
//     console.log('1. Will get DOG pics')
//     getDogPic().then(x => {
//         console.log(x);
//         console.log('3: Done getting Dog Pics!');
//     }).catch(err => {
//         console.log('Error 💥');
//     });
// }
// fun();


// sequence to execute Promise 
console.log('1. Will get DOG pics')
    getDogPic().then(x => {
        console.log(x);
        console.log('3: Done getting Dog Pics!');
    }).catch(err => {
        console.log('Error 💥');
});

/** 
// Promise chaining 
readFilePro(`${__dirname}/dog.txt`)
    .then(data => { 
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message)
    })
    .then(() => {
        console.log('Image saved to dog-img.txt');
    })
    .catch(err => {
        console.log(err);
    });
    
*/
