const cron = require('cron')
const { exec } = require('child_process')

const cronJob = new cron.CronJob('*/2 * * * * ', () => {
    //Exec ping command in terminal
    exec(`ping -c 1 node-bot4.onrender.com`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ping: ${error.message}`);
            return;
        }
        // Log the output of the ping command (stdout and stderr)
        console.log(stdout);
        console.error(stderr);
    })
})

cronJob.start();