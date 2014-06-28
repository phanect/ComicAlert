var crypto = require('crypto'), bcrypt = require('bcrypt-nodejs');

exports.actions = require('./actions');



exports.isAuthenticated = function(control) {
	return (control.session.get("userId") || control.name == "Main" || control.name == "Auth");
};

// Redirect to the login page unless the user has an authenticated session.
// Leaves open the index, login, logout (on Main), and (of course) the actual
// authentication endpoints
exports.requireAuth = function() {
	if (!exports.isAuthenticated(this)) {
		// Record the page the user was trying to get to, will
		// try to return them there after login
		this.session.set('successRedirect', this.request.url);
		this.flash.keep('success');
		this.redirect("/");
	}
};

exports.generateHash = function(cleartextPass) {
	if (!geddy.config.secret) {
		throw new Error('Need application secret');
	}

	return bcrypt.hashSync(cleartextPass + geddy.config.secret, 10);
};

