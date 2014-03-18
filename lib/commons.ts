interface String {
	toHalfWidth(): string;
	contains(): boolean;
}

String.prototype.toHalfWidth = function() {
	return this.replace(/[！-～]/g, function(_str) {
		return String.fromCharCode(_str.charCodeAt(0) - 65248);
	});
}

String.prototype.contains = function(substr: string) {
	return (this.indexOf(substr) != -1);
}
