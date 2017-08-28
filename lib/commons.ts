interface String {
  toHalfWidth(): string;
  contains(substr: string): boolean;
}

String.prototype.toHalfWidth = function(): string {
  return this.replace(/[！-～]/g, function(_str) {
    return String.fromCharCode(_str.charCodeAt(0) - 65248);
  });
};

String.prototype.contains = function(substr: string): boolean {
  return (this.indexOf(substr) != -1);
};
