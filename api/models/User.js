var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');

var schema = mongoose.Schema({
	email: { type: String, unique: true },
	password: String,
	gender: String,
	age: Number,
	bio: String
});

schema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(12, function(err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			return next();
		});
	});
});

schema.methods.comparePassword = function(pass) {
	var deferred = q.defer();
	bcrypt.compare(pass, this.password, function(err, isMatch) {
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(isMatch);
		}
	});
	return deferred.promise;
};


module.exports = mongoose.model('User', schema);