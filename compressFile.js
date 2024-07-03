const fs = require('node:fs/promises');
const zlib = require('node:zlib');
const { pipeline } = require('node:stream');

(async () => {
try {
    console.time('Time');

    const srcFile = await fs.open('./Docs/Numbers.txt', 'r');
    const destFile = await fs.open('./Docs/CompressedNumbers.txt.gz', 'w');

    const readStream = srcFile.createReadStream({highWaterMark: Math.pow(2, 20)});
    const writeStream = destFile.createWriteStream({highWaterMark: Math.pow(2, 20)});

    const gzip = zlib.createGzip();

/*     readStream.pipe(gzip).pipe(writeStream);

    readStream.on('end', () => {
        console.log('Pipe finished');
        console.timeEnd('Time');
    }) */

    pipeline(readStream, gzip, writeStream, (err) => {
        if(err){
            console.error('Pipeline failed.',err);
        } else {
            console.log('Pipeline succeeded.');
        }
        console.timeEnd('Time');
    })

} catch (err) {
    console.error(err);
}
})();