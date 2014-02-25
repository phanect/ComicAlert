var assert = require('assert')
  , tests
  , Episode = geddy.model.Episode;

tests = {

  'after': function (next) {
    // cleanup DB
    Episode.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var episode = Episode.create({});
    episode.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
