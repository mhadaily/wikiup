const nodeVersion = Number(process.version.match(/^v(\d)/)[1]);

if (nodeVersion < 6) {
  console.log('Node Version Less than 6 is not supported');
  process.exit(0);
}

if (nodeVersion < 7) {
  require('./v6.js')();
} else {
  require('./v7.js')();
}