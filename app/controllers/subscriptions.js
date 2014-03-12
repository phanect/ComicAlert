var Subscriptions = function() {
	this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

	this.index = function(req, resp, params) {
		var self = this;

		geddy.model.Subscription.all(function(err, subscriptions) {
			if (err) {
				throw err;
			}
			self.respondWith(subscriptions, {
				type : 'Subscription'
			});
		});
	};

	this.add = function(req, resp, params) {
		this.respond({
			params : params
		});
	};

	this.create = function(req, resp, params) {
		var self = this, subscription = geddy.model.Subscription.create(params);

		if (!subscription.isValid()) {
			this.respondWith(subscription);
		} else {
			subscription.save(function(err, data) {
				if (err) {
					throw err;
				}
				self.respondWith(subscription, {
					status : err
				});
			});
		}
	};

	this.show = function(req, resp, params) {
		var self = this;

		geddy.model.Subscription.first(params.id, function(err, subscription) {
			if (err) {
				throw err;
			}
			if (!subscription) {
				throw new geddy.errors.NotFoundError();
			} else {
				self.respondWith(subscription);
			}
		});
	};

	this.edit = function(req, resp, params) {
		var self = this;

		geddy.model.Subscription.first(params.id, function(err, subscription) {
			if (err) {
				throw err;
			}
			if (!subscription) {
				throw new geddy.errors.BadRequestError();
			} else {
				self.respondWith(subscription);
			}
		});
	};

	this.update = function(req, resp, params) {
		var self = this;

		geddy.model.Subscription.first(params.id, function(err, subscription) {
			if (err) {
				throw err;
			}
			subscription.updateProperties(params);

			if (!subscription.isValid()) {
				self.respondWith(subscription);
			} else {
				subscription.save(function(err, data) {
					if (err) {
						throw err;
					}
					self.respondWith(subscription, {
						status : err
					});
				});
			}
		});
	};

	this.remove = function(req, resp, params) {
		var self = this;

		geddy.model.Subscription.first(params.id, function(err, subscription) {
			if (err) {
				throw err;
			}
			if (!subscription) {
				throw new geddy.errors.BadRequestError();
			} else {
				geddy.model.Subscription.remove(params.id, function(err) {
					if (err) {
						throw err;
					}
					self.respondWith(subscription);
				});
			}
		});
	};

};

exports.Subscriptions = Subscriptions;
