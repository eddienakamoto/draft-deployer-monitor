// src/services/pm2MonitorService.js
const pm2 = require('pm2');
const { postStatus } = require('../utils/apiClient');

function monitorProcess(processName, url) {
    pm2.connect((err) => {
        if (err) {
            console.error(`Error connecting to PM2: ${err.message}`);
            const data = {
                process_name: processName,
                status: 'connection_error',
                memory: 0,
                cpu: 0,
                timestamp: new Date().toISOString(),
            };

            postStatus(url, data);

            return;
        }

        pm2.describe(processName, async (err, processDescription) => {
            let data;

            if (err) {
                console.error(`Error describing PM2 process: ${err.message}`);
                pm2.disconnect();
                return;
            }

            if (processDescription && processDescription[0]) {
                const { pm2_env, monit } = processDescription[0];
                data = {
                    process_name: processName,
                    status: pm2_env.status,
                    memory: monit.memory,
                    cpu: monit.cpu,
                    timestamp: new Date().toISOString(),
                };
            } else {
                data = {
                    process_name: processName,
                    status: 'offline',
                    memory: 0,
                    cpu: 0,
                    timestamp: new Date().toISOString(),
                }
            }

            await postStatus(url, data);

            pm2.disconnect();
        });
    });
}

function startMonitoring(processName, interval, url) {
    console.info(`Starting PM2 monitoring for process: ${processName} with interval: ${interval}ms`);
    setInterval(() => monitorProcess(processName, url), interval);
}

module.exports = { startMonitoring };
