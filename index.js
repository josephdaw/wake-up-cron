const http = require('http');
const https = require('https');
const cron = require('node-cron');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Wake Up Cron Job Running');
});

// cron-jobs
// cron.schedule('*/15 * * * * *', () => {
//     console.log('running a task every 15 seconds');
//   });

// run job to ensure app is awake for order execution
cron.schedule('50,53 15 * * Monday,Tuesday,Wednesday,Thursday,Friday', () => {

    const options = {
        hostname: 'universaltrademanager.herokuapp.com',
        port: 443,
        path: '/',
        method: 'GET'
    }

    const req = https.request(options, res => {
        console.log(`Refreshing webpage. StatusCode: ${res.statusCode}`)
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()

}, {
    scheduled: true,
    timezone: "America/New_York"
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});