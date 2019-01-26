var should = require("should");

var testdata = require("../testdata");
var User = geddy.model.User;

var tests = {
  "after" : function(next) {
    // cleanup DB
/*    User.remove(function(err, data) {
      if (err) {
        throw err;
      }
      next();
    });*/
  },
  "User creation test" : function(next) {
    var user = testdata.unSavedUser();
    user.save(function(err, data) {
      should.not.exist(err);
      next();
    });
  },
  "Test user.connectComics()" : function() {
    var user = testdata.unSavedUser();
    var comic = testdata.unSavedComic();
    
    user.save(function(err, data) {
      if (err) {
        should.not.exist(err);
      }
      comic.save(function(err, data) {
        if (err) {
          should.not.exist(err);
        }
        
        user.connectComics(comic);

        user.getComics(function(err, comics) {
          comic.id.should.equal(comics[0].id);
        });

        comic.getUsers(function(err, users) {
          user.id.should.equal(users[0].id);
        });
      });
    });
    

  }
};

module.exports = tests;
