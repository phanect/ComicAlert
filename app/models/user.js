var User = function() {
	this.defineProperties({
		username : {
			type : "string",
			required : true,
			on : ["create", "update"]
		},
		password : {
			type : "string",
			required : true,
			on : ["create", "update"]
		},
		name : {
			type : "string",
			required : true
		},
		email : {
			type : "string",
			on : ["create", "update"]
		},
		activationToken : {
			type : "string"
		},
		activatedAt : {
			type : "datetime"
		}
	});

	this.validatesLength("username", {
		min : 3
	});
	this.validatesLength("password", {
		min : 8
	});
	this.validatesConfirmed("password", "confirmPassword");

	this.hasMany("Passports");
	this.hasMany("Subscriptions");
	this.hasMany("Unreads");
};

User.prototype.isActive = function() {
	return !!this.activatedAt;
};

User = geddy.model.register("User", User);
