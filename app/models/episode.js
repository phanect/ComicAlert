var moment = require("moment");

var Episode = function() {

  this.defineProperties({
    name : {
      type : 'string',
      required : true
    },
    number : {
      type : "number",
      required : true
    },
    subTitle : {
      type : 'string'
    },
    url : {
      type : "string"
    },
    publishedAt : {
      type : "date",
      required : true
      // TODO Add validation to check if given date is before today
    },
    availableUntil : {
      type : "date",
      // TODO Add validation to check if given date is after today

    }
  });

  this.belongsTo("Comic");
  this.hasMany("Users");
  this.belongsTo("User");

  /*
   this.property('login', 'string', {required: true});
   this.property('password', 'string', {required: true});
   this.property('lastName', 'string');
   this.property('firstName', 'string');

   this.validatesPresent('login');
   this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
   this.validatesLength('login', {min: 3});
   // Use with the name of the other parameter to compare with
   this.validatesConfirmed('password', 'confirmPassword');
   // Use with any function that returns a Boolean
   this.validatesWithFunction('password', function (s) {
   return s.length > 0;
   });

   // Can define methods for instances like this
   this.someMethod = function () {
   // Do some stuff
   };
   */
  Episode.formattedPublishedAt = function() {
    var oneYearAgo = new moment().subtract({years:1});
    var _publishedAt = new moment(this.publishedAt);

    if (_publishedAt > oneYearAgo) { // if this episode is published in one year
      return _publishedAt.local().format("MM/DD");
    } else {
      return _publishedAt.local().format("YYYY/MM/DD");
    }
  };

  Episode.formattedAvailableUntil = function() {
    var oneYearLater = new moment().add({years:1});
    var _availableUntil = new moment(this.availableUntil);

    if (_availableUntil < oneYearLater) { // if this episode expires in one year
      return _availableUntil.local().format("MM/DD");
    } else {
      return _availableUntil.local().format("YYYY/MM/DD");
    }
  };
};

/*
 // Can also define them on the prototype
 Episode.prototype.someOtherMethod = function () {
 // Do some other stuff
 };
 // Can also define static methods and properties
 Episode.someStaticMethod = function () {
 // Do some other stuff
 };
 Episode.someStaticProperty = 'YYZ';
 */

Episode = geddy.model.register('Episode', Episode);
