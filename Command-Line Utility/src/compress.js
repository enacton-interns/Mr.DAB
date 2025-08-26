const fs = require("fs");
const zlib = require("zlib");

function compressFile(input, output) {
  const read = fs.createReadStream(input);
  const write = fs.createWriteStream(output);
  read.pipe(zlib.createGzip()).pipe(write);
}

function decompressFile(input, output) {
  const read = fs.createReadStream(input);
  const write = fs.createWriteStream(output);
  read.pipe(zlib.createGunzip()).pipe(write);
}

module.exports = { compressFile, decompressFile };
