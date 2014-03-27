var Unread = function() {
	this.belongsTo("User");
	this.belongsTo("Episode");
};

Unread = geddy.model.register('Unread', Unread);
