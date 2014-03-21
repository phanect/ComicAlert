var cronJob = require("cron").CronJob;

exports.start = function() {
	var job = new cronJob({
		// minute, hour, day, month, weekday
		cronTime : "0 14 5 * * *", // Execute on 5:14:0 everyday

		onTick : function() {
			// TODO
		},
		onComplete : function() {
		},
		start : true, // Specified whether to start the job after just before exiting the constructor.
		timeZone : "Asia/Tokyo"
	});

	// Runs your job.
	job.start();
};
