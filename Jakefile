desc("Build files such as TypeScript and Sass");
task("build", function (params) {
	var cmd = "sass --style expanded --update ./public/css/style.scss:./public/css/style.css";
	console.log(cmd)
	jake.exec([cmd], {printStdOut : true, printStderr : true, breakOnError : true}, function() {
		cmd = "tsc @tscopt ./crawler/crawler.ts";
		console.log(cmd);
		jake.exec([cmd], {printStdOut : true, printStderr : true, breakOnError : false}, function() {
			cmd = "cd ./_build/pre/; ts-yield -o ../../_build/ ./crawler/* ./lib/*";
			console.log(cmd);
			jake.exec([cmd], {printStdOut : true, printStderr : true, breakOnError : false}, function() {
				console.log("Build complete");
				complete();
			});
		});
	});
});

desc("Start server and application");
task("start", function (params) {
	var cmd = " node --harmony-generators ~/.nvm/v0.11.13/bin/geddy";
	console.log(cmd);
	jake.exec([cmd], {printStdOut : true, printStderr : true, breakOnError : true}, function() {
		complete();
	});
});

var t = new jake.TestTask('web', function () {
	this.testFiles.include('test/*.js');
	this.testFiles.include('test/**/*.js');
});
