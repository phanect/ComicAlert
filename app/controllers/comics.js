var Comics = function() {
	this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

	this.index = function(req, resp, params) {
		var self = this;

		geddy.model.Comic.all(function(err, comics) {
			if (err) {
				throw err;
			}
			self.respondWith(comics, {
				type : 'Comic'
			});
		});
	};

	this.add = function(req, resp, params) {
		this.respond({
			params : params
		});
	};

	this.create = function(req, resp, params) {
		var self = this, comic = geddy.model.Comic.create(params);

		if (!comic.isValid()) {
			this.respondWith(comic);
		} else {
			comic.save(function(err, data) {
				if (err) {
					throw err;
				}
				self.respondWith(comic, {
					status : err
				});
			});
		}
	};

	this.show = function(req, resp, params) {
		var self = this;

		geddy.model.Comic.first(params.id, function(err, comic) {
			if (err) {
				throw err;
			}
			if (!comic) {
				throw new geddy.errors.NotFoundError();
			} else {
				self.respondWith(comic);
			}
		});
	};

	this.edit = function(req, resp, params) {
		var self = this;

		geddy.model.Comic.first(params.id, function(err, comic) {
			if (err) {
				throw err;
			}
			if (!comic) {
				throw new geddy.errors.BadRequestError();
			} else {
				self.respondWith(comic);
			}
		});
	};

	this.update = function(req, resp, params) {
		var self = this;

		geddy.model.Comic.first(params.id, function(err, comic) {
			if (err) {
				throw err;
			}
			comic.updateProperties(params);

			if (!comic.isValid()) {
				self.respondWith(comic);
			} else {
				comic.save(function(err, data) {
					if (err) {
						throw err;
					}
					self.respondWith(comic, {
						status : err
					});
				});
			}
		});
	};

	this.remove = function(req, resp, params) {
		var self = this;

		geddy.model.Comic.first(params.id, function(err, comic) {
			if (err) {
				throw err;
			}
			if (!comic) {
				throw new geddy.errors.BadRequestError();
			} else {
				geddy.model.Comic.remove(params.id, function(err) {
					if (err) {
						throw err;
					}
					self.respondWith(comic);
				});
			}
		});
	};

};

exports.Comics = Comics;
