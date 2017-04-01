#!/usr/bin/env node --harmony

const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const url = require('url');
const fs = require("fs");

const version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))).version;

const nodeVersion = Number(process.version.match(/^v(\d)/)[1]);

let wikiup;

if (nodeVersion < 7) {
  wikiup = require('./modules/wiki-promise');
} else {
  wikiup = require('./modules/wiki-asyncawait');
}

program
  .version(version);

program
  .command('search <yourText>').alias('s')
  .option('-l, --lang [language]', 'Language that you need to see results')
  .option('-r, --result [result]', 'Number of results')
  .description('as easy as typing your phrase or word')
  .action((yourText, options) => {

    const lang = options.lang || 'en';
    const limit = options.result || 3;

    wikiup(yourText, limit)
      .then(res => {
        const r = res.body.query.search;
        r.map(result => {
          let title = result.title;
          let wikiUrl = url.format(`https://${lang}.wikipedia.org/wiki/${title}`);
          let size = result.size;
          let wordcount = result.wordcount;
          console.log(`${title}: ${wikiUrl}`);
          console.log(`Size: ${size}, Wordcount: ${wordcount}`);
          console.log(chalk.gray('*****'));
        })
      }).catch(err => {
      console.log(err);
      process.exit(0);
    });

  });

program
  .on('--help', function () {
    console.log(chalk.red('  Default:'));
    console.log('');
    console.log(`    Target Language is English`);
    console.log(`    Maximum search limit is 3`);
    console.log('');
    console.log(chalk.cyan('  Usage:'));
    console.log('');
    console.log(`    $ wikiup s "love" `);
    console.log(`    $ wikiup s "love" --result 10`);
    console.log(`    $ wikiup s "love" -r 10`);
    console.log('');
  });

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}