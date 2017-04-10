#!/usr/bin/env node --harmony

const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const url = require('url');
const fs = require('fs');
const platform = require('os').platform();
const prompt = require('prompt');
const exec = require('child_process').exec;

const shellOpenCommand = {
  'win32': 'start ',
  'linux': 'xdg-open ',
  'darwin': 'open ',
}[platform];

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
        let wikis = [];
        r.map((result, index) => {
          let title = result.title;
          let wikiUrl = url.format(`https://${lang}.wikipedia.org/wiki/${title}`);
          let size = result.size;
          let wordcount = result.wordcount;
          console.log(`${index + 1}- ${title}: ${wikiUrl}`);
          console.log(`Size: ${size}, Wordcount: ${wordcount}`);
          console.log(chalk.gray('*****'));
          wikis = [...wikis, wikiUrl];
        });
        promptForWiki(wikis);
      }).catch(err => {
      console.log(err);
      process.exit(0);
    });
    
  });

program
  .on('--help', function() {
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

function promptForWiki(wikis) {
  prompt.start();
  const schema = {
    properties: {
      wikiNumber: {
        message: 'Type wiki number to open, or 0 to quit',
        required: true,
      },
    },
  };
  prompt.get(schema, function(err, result) {
    
    if (!result || !result.wikiNumber) return console.log('\r');
    
    if (result.wikiNumber !== '0') {
      let i = parseInt(result.wikiNumber);
      if (isNaN(i) || i > wikis.length || i < 1) {
        console.log('Invalid wiki number');
      } else {
        exec(shellOpenCommand + `"${wikis[i - 1]}"`, (error) => {
          if (error) throw error;
        });
      }
      promptForWiki(wikis);
    }
  });
}

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}