var should = require("should");

var testdata = require("../testdata");
var Episode = geddy.model.Episode;

var tests = {
	"after" : function(next) {
		// cleanup DB
		Episode.remove({}, function(err, data) {
			if (err) {
				throw err;
			}
			next();
		});
	},
	"Episode creation test" : function(next) {
		var episode = testdata.unSavedEpisode();
		episode.save(function(err, data) {
			should.not.exist(null);
			next();
		});
	}
};

module.exports = tests;
