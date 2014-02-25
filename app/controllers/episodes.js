var Episodes = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.all(function(err, episodes) {
      if (err) {
        throw err;
      }
      self.respondWith(episodes, {type:'Episode'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , episode = geddy.model.Episode.create(params);

    if (!episode.isValid()) {
      this.respondWith(episode);
    }
    else {
      episode.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(episode, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.first(params.id, function(err, episode) {
      if (err) {
        throw err;
      }
      if (!episode) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(episode);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.first(params.id, function(err, episode) {
      if (err) {
        throw err;
      }
      if (!episode) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(episode);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.first(params.id, function(err, episode) {
      if (err) {
        throw err;
      }
      episode.updateProperties(params);

      if (!episode.isValid()) {
        self.respondWith(episode);
      }
      else {
        episode.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(episode, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.first(params.id, function(err, episode) {
      if (err) {
        throw err;
      }
      if (!episode) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Episode.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(episode);
        });
      }
    });
  };

};

exports.Episodes = Episodes;
