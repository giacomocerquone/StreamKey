var program = require('commander');

program
  .version('0.5.0');

program
  .command('server')
  .action( function() {
    require("./server")();
  });

program
  .command('client')
  .option('-i, --ip <ip>', 'Specify the IP where the StreamKey Server is located')
  .action( function(options) {
    var ip = options.ip || "localhost";
    console.log('Connecting to ' + ip);
    require("./client")(ip);
  });
  
program.parse(process.argv);
