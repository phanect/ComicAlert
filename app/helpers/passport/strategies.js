module.exports = {
	twitter : {
		name : 'Twitter',
		keyField : 'id',
		parseProfile : function(profile) {
			var userData = {
				name : profile.displayName || profile.username
			};
			return userData;
		}
	},
	facebook : {
		name : 'Facebook',
		keyField : 'id',
		parseProfile : function(profile) {
			var userData = {
				name : (profile.name.givenName && profile.name.familyName)
					? profile.name.givenName + profile.name.familyName : profile.username
			};
			return userData;
		}
	},
	yammer : {
		name : 'Yammer',
		keyField : 'id',
		parseProfile : function(profile) {
			var userData = {
				givenName : profile._json.first_name || profile.name,
				familyName : profile._json.last_name
			};
			return userData;
		}
	}
};

