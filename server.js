var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var User = require('./api/models/User');
var TodoController = require('./api/controllers/TodoController')
var UserController = require('./api/controllers/UserController')

mongoose.connect('mongodb://localhost/todos');

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(username, password, done) {
	User.findOne({ email: username }).exec().then(function(user) {
		if (!user) {
			return done(null, false);
		}
		user.comparePassword(password).then(function(isMatch) {
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
}));

passport.serializeUser(function(user, done) {
	//input user model (mongoose)
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	//user object (json)
	done(null, obj);
});


var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(session({
	secret: 'abc123iliketodos12345679'
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/api/auth', passport.authenticate('local'), function(req, res) {
	//if auth was successful, this will happen
	return res.status(200).end();
});
app.post('/api/register', function(req, res) {
	//create a user
	var newUser = new User(req.body);
	newUser.save(function(err, user) {
		if (err) {
			return res.status(500).end();
		}
		return res.json(user);
	});
});

var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
};

app.get('/api/todos', isAuthed, TodoController.list);
app.post('/api/todos', isAuthed, TodoController.create);

app.put('/api/todos/:id', isAuthed, TodoController.update);

app.get('/api/profile', isAuthed, UserController.profile);


app.listen(8080);