#!/usr/bin/env node

const fs = require('fs');
const {promisify} = require('util');
const Path = require('path');


async function go(args) {
  for (const inFile of args) {
    const name = Path.basename(inFile, '.txt');
    try {
      const content = await promisify(fs.readFile)(inFile, 'utf8');
      const json = { name, content };
      console.log(JSON.stringify(json));
    }
    catch (err) {
      console.error(err);
    }
  }
}

if (process.argv.length !== 3) {
  console.error("usage: %s TXT_FILE", Path.basename(process.argv[1]));
  process.exit(1);
}
go(process.argv.slice(2));
