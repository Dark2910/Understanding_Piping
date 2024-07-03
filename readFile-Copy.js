const fs = require('node:fs/promises');
const { pipeline } = require('node:stream');

/* (async () => {
    try {
        console.time('Copy');

        const srcFile = await fs.open('../4-Readable_Streams/numbers.txt', 'r');
        const destFile = await fs.open('./Numbers.txt', 'w');
        
        let bytesRead = -1;

        while(bytesRead !== 0) {
            const readResult = await srcFile.read();
            let buff = readResult.buffer;
            bytesRead = readResult.bytesRead;

            if(bytesRead !== 16384) {
                const indexOfNotFilled = readResult.buffer.indexOf(0);
                buff = Buffer.alloc(indexOfNotFilled);

                readResult.buffer.copy(buff, 0, 0, indexOfNotFilled);
            }
            
            await destFile.write(buff);
        }

        console.timeEnd('Copy');
    } catch (err) {
        console.error(err)
    }
})(); */

(async () => {
    try {
        console.time('Copy');

        const srcFile = await fs.open('./Numbers.txt', 'r');
        const destFile = await fs.open('./Docs/Numbers.txt', 'w');

        const readStream = srcFile.createReadStream({highWaterMark: Math.pow(2, 20)});
        const writeStream = destFile.createWriteStream({highWaterMark: Math.pow(2, 20)});


/*         console.log(readStream.readableFlowing);
        
        readStream.pipe(writeStream);
        console.log(readStream.readableFlowing);
        
        //readStream.pause();
        //readStream.resume()
        readStream.unpipe(writeStream);
        console.log(readStream.readableFlowing);


        readStream.on('end', () => {
            console.timeEnd('Copy');
        }) */

        pipeline(readStream, writeStream, (err) => {
            if(err){
                console.error('Pipeline failed.',err);
            } else {
                console.log('Pipeline succeeded.');
            }
            console.timeEnd('Copy');
        }) 

    } catch (err) {
        console.error(err)
    }
})();