var assert = require('assert'), tests, Comic = geddy.model.Comic;

tests = {

	'after' : function(next) {
		// cleanup DB
		Comic.remove({}, function(err, data) {
			if (err) {
				throw err;
			}
			next();
		});
	},
	'simple test if the model saves without a error' : function(next) {
		var comic = Comic.create({});
		comic.save(function(err, data) {
			assert.equal(err, null);
			next();
		});
	},
	'test stub, replace with your own passing test' : function() {
		assert.equal(true, false);
	}
};

module.exports = tests;
