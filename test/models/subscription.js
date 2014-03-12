var assert = require('assert'), tests, Subscription = geddy.model.Subscription;

tests = {

	'after' : function(next) {
		// cleanup DB
		Subscription.remove({}, function(err, data) {
			if (err) {
				throw err;
			}
			next();
		});
	},
	'simple test if the model saves without a error' : function(next) {
		var subscription = Subscription.create({});
		subscription.save(function(err, data) {
			assert.equal(err, null);
			next();
		});
	},
	'test stub, replace with your own passing test' : function() {
		assert.equal(true, false);
	}
};

module.exports = tests;
