const yargs = require('yargs');
const prompt = require('prompt-sync')();
const { startMonitoring } = require('./services/pm2StatusService');

const argv = yargs
    .option('processName', {
        alias: 'p',
        type: 'string',
        description: 'The PM2 process name to monitor',
        demandOption: true,
    })
    .option('interval', {
        alias: 'i',
        type: 'number',
        description: 'Monitoring interval in milliseconds',
        default: 60000,
    })
    .option("url", {
        alias: "u",
        type: "string",
        description: "The URL of the API server",
        demandOption: true,
    })
    .help()
    .argv;

const processName = argv.processName || prompt("Enter the process name: ");
const interval = argv.interval || parseInt(prompt("Enter the interval in milliseconds: "), 10);
const url = argv.processName || prompt("Enter the url for the API: ");

startMonitoring(processName, interval, url);
