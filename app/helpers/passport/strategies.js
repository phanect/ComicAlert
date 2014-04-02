module.exports = {
	twitter : {
		name : 'Twitter',
		keyField : 'id',
		parseProfile : function(profile) {
			var userData = {
				name : profile.displayName || profile.username,
				username : profile.username,
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
					? profile.name.givenName + profile.name.familyName : profile.username,
				username : profile.username,
			};
			return userData;
		}
	}
};

