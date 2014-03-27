var Unreads = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Unread.all(function(err, unreads) {
      if (err) {
        throw err;
      }
      self.respondWith(unreads, {type:'Unread'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , unread = geddy.model.Unread.create(params);

    if (!unread.isValid()) {
      this.respondWith(unread);
    }
    else {
      unread.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(unread, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Unread.first(params.id, function(err, unread) {
      if (err) {
        throw err;
      }
      if (!unread) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(unread);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Unread.first(params.id, function(err, unread) {
      if (err) {
        throw err;
      }
      if (!unread) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(unread);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Unread.first(params.id, function(err, unread) {
      if (err) {
        throw err;
      }
      unread.updateProperties(params);

      if (!unread.isValid()) {
        self.respondWith(unread);
      }
      else {
        unread.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(unread, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Unread.first(params.id, function(err, unread) {
      if (err) {
        throw err;
      }
      if (!unread) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Unread.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(unread);
        });
      }
    });
  };

};

exports.Unreads = Unreads;
