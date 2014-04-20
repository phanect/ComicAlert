desc("Build files such as TypeScript and Sass");
task("build", function (params) {
	var cmd = "sass --style expanded --update ./public/css/style.scss:./public/css/style.css";
	console.log(cmd)
	jake.exec([cmd], {printStdOut : true, printStderr : true, breakOnError : true}, function() {
		cmd = "tsc @tscopt ./crawler/crawler.ts";
		console.log(cmd);
		jake.exec([cmd], {printStdOut : true, printStderr : true, breakOnError : false}, function() {
			console.log("Build complete");
			complete();
		});
	});
});

var t = new jake.TestTask('web', function () {
	this.testFiles.include('test/*.js');
	this.testFiles.include('test/**/*.js');
});
