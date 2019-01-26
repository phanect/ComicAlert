var should = require("should");

var testdata = require("../testdata");
var Comic = geddy.model.Comic;

var tests = {

  "after" : function(next) {
    // cleanup DB
    Comic.remove({}, function(err, data) {
      if (err) {
        throw err;
      }
      next();
    });
  },
  "Comic creation test" : function(next) {
    var comic = testdata.unSavedComic();
    comic.save(function(err, data) {
      should.not.exist(null);
      next();
    });
  }
};

module.exports = tests;
