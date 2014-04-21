/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var strategies = require('../helpers/passport/strategies'), authTypes = geddy.mixin(strategies, {
	local : {
		name : 'local account'
	}
});
;

var passport = require("../helpers/passport");

var Main = function() {

	this.before(passport.requireAuth, {
		except : ["index", "logout"]
	});

	this.index = function(req, resp, params) {
		var self = this;
		var comics = new Array();

		geddy.model.User.first({
			id : this.session.get("userId")
		}, function(err, user) {
			if (err) {
				throw err;
			}

			if (user) {
				geddy.model.Episode.all({userId : user.id},
					{ sort : { publishedAt : "desc" } },
					function(err, episodes)
				{
					if (err) {
						throw err;
					}

					var respondWithEachComics = function(episodes, count) {
						geddy.model.Comic.first({ id : episodes[count].comicId },
							function(err, comic)
						{
							if (err) {
								throw err;
							}

							comics[count] = comic;

							if (count + 1 < episodes.length) {
								respondWithEachComics(episodes, count + 1);
							} else {
								self.respond({
									episodes : episodes,
									comics : comics,
									user : user
								}, {
									format : "html",
									template : "app/views/main/index"
								});
							}
						});
					};

					if (episodes.length > 0) {
						respondWithEachComics(episodes, 0);
					} else {
						self.respond({
							episodes : null,
							comics : null,
							user : user
						}, {
							format : "html",
							template : "app/views/main/index"
						});
					}
				});
			} else {
				self.respond(params, {
					format : "html",
					template : "app/views/main/login"
				});
			}
		});
	};

	this.logout = function(req, resp, params) {
		this.session.unset('userId');
		this.session.unset('authType');
		this.redirect("/#logout");
	};

	this.addcomics = function(req, resp, params) {
		var self = this;

		geddy.model.User.first({id : this.session.get("userId")}, function(err, user) {
			if (err) {
				throw err;
			}

			if (user) {
				geddy.model.Comic.all(function(err, comics) {
					if (err) {
						throw err;
					}

					user.getComics(function(err, registeredComics) {
						if (err) {
							throw err;
						}

						if (comics && registeredComics) {
							// Remove registered comics
							for (var i = 0; i < comics.length; i++) { // Check comics.length every time
								for (var j = 0, jj = registeredComics.length; j < jj; j++) {
									if (comics[i].id == registeredComics[j].id) {
										comics.splice(i, 1); // Remove comic[i]
									}
								}
							}
						}
						self.respond({
							comics : comics,
							user : user
						}, {
							format : "html",
							template : "app/views/main/addcomics"
						});
					});
				
				});
			} else {
				self.redirect("/");
			}
		});
	};
};

exports.Main = Main;

