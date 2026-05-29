const schedule = require('node-schedule');
const DevicesReport=()=>{


    const job = schedule.scheduleJob({ hour: 9, minute: 47, dayOfWeek: 5 }, function () {
        console.log('Time for tea!');
    });

}
module.exports=DevicesReport;