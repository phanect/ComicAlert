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
	this.hasMany("Comics");
	this.belongsTo("Comics");
	this.hasMany("Episodes");
	this.belongsTo("Episodes");
	
	User.connectComics = function(comics) {
		var _comics = new Array();

		if (Array.isArray(comics)) {
			_comics = comics;
		} else if (comics) {
			_comics[0] = comics;
		} else {
			console.error("No comics given");
			return;
		}

		for (var i in _comics) {
			this.addComic(_comics[i]);
			_comics[i].addUser(this);
			
			_comics[i].save(function (err, data) {
				if (err) {
					throw err;
				}
			});
		}

		this.save(function (err, data) {
			if (err) {
				throw err;
			}
		});
	};

	User.connectEpisodes = function(episodes) {
		var _episodes = new Array();

		if (Array.isArray(episodes)) {
			_episodes = episodes;
		} else if (episodes) {
			_episodes[0] = episodes;
		} else {
			console.error("No episodes given");
			return;
		}

		for (var i in _episodes) {
			this.addEpisode(_episodes[i]);
			_episodes[i].addUser(this);

			_episodes[i].save(function (err, data) {
				if (err) {
					throw err;
				}
			});
		}

		this.save(function (err, data) {
			if (err) {
				throw err;
			}
		});
	};
};

User.prototype.isActive = function() {
	return !!this.activatedAt;
};

User = geddy.model.register("User", User);
