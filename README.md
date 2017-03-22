# WikiUP,a Wikipedia lookup helper in your terminal

**[STILL UNDER DEVELOPMENT, WAITING FOR VERSION 1.0.0 TO BE RELEASED SOON]**

This is a simple CLI tool that helps you to lookup about what you need to know more via Wikipedia.It uses
Async/Await in Node 7+ and fall back to Promise in Node >= 4 < 7.

## Installation

##### NPM 
````bash
npm install --global wikiup // or use -g instead of --global
````
##### Yarn 
````bash
yarn global add wikiup 
````
## Test

````
npm test
````

## Commands
````
 Commands:

    search|s [options] <yourText>  as easy as typing your phrase or word

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Default:

    Target Language is English
    Maximum search limit is 5

  Usage:

    $ wikiup s "love" 

````
## Bug

Please open your issue [HERE](https://github.com/mhadaily/wikiup/issues)

## Contribution

Feel free to fork this project and make that better.

## Disclaimer 

Please do not use this package in production or for heavy usage.