var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');

var Todo = require('./Todo');

var schema = mongoose.Schema({
	email: String,
	password: String,
	age: Number,
	gender: String,
	bio: String,
	todos: [Todo.schema]
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
			if (err) {
				return next(err);
			}
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
		deferred.resolve(isMatch);
	});
	return deferred.promise;
};

module.exports = mongoose.model('User', schema); 