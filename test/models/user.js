var should = require("should");

var testdata = require("../testdata");
var User = geddy.model.User;

var tests = {
	"after" : function(next) {
		// cleanup DB
/*		User.remove(function(err, data) {
			if (err) {
				throw err;
			}
			next();
		});*/
	},
	"User creation test" : function(next) {
		var user = testdata.unSavedUser();
		user.save(function(err, data) {
			should.not.exist(err);
			next();
		});
	}
};

module.exports = tests;
