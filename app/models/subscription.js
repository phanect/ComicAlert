var Subscription = function() {
	this.belongsTo("User");
	this.belongsTo("Comic");
};

Subscription = geddy.model.register('Subscription', Subscription);
