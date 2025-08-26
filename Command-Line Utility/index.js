#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { compressFile, decompressFile } = require("./src/compress");
const {
  toUpperCase,
  toLowerCase,
  wordCount,
  isPalindrome,
} = require("./src/strings");
const { getWeather } = require("./src/api");

const argv = yargs(hideBin(process.argv))
  .command("compress <input> <output>", "Compress a file", {}, (argv) => {
    compressFile(argv.input, argv.output);
  })
  .command("decompress <input> <output>", "Decompress a file", {}, (argv) => {
    decompressFile(argv.input, argv.output);
  })
  .command("upper <text>", "Convert text to uppercase", {}, (argv) => {
    console.log(toUpperCase(argv.text));
  })
  .command("lower <text>", "Convert text to lowercase", {}, (argv) => {
    console.log(toLowerCase(argv.text));
  })
  .command("count <text>", "Count number of words", {}, (argv) => {
    console.log("Word count:", wordCount(argv.text));
  })
  .command("palindrome <text>", "Check for palindrome", {}, (argv) => {
    console.log(isPalindrome(argv.text) ? "Yes" : "No");
  })
  .command("weather <city>", "Get weather info", {}, (argv) => {
    getWeather(argv.city);
  })
  .demandCommand(1)
  .help().argv;
