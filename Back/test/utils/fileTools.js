const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const exists = (path) => fs.existsSync(path);

const getLastLine = (path, minLength) => {
    let inStream = fs.createReadStream(path);
    let outStream = new Stream;
    return new Promise((resolve, reject)=> {
        let rl = readline.createInterface(inStream, outStream);

        let lastLine = '';
        rl.on('line', function (line) {
            if (line.length >= minLength) {
                lastLine = line;
            }
        });

        rl.on('error', reject)

        rl.on('close', function () {
            resolve(lastLine)
        });
    })
};

module.exports = {
    exists,
    getLastLine
}