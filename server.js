var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./api/models/User');
var Todo = require('./api/models/Todo');

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	User.findById(obj._id).exec().then(function(user) {
		done(null, user);
	});
});

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, 
	function(username, password, done) {
		User.findOne({ email: username }, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			user.comparePassword(password).then(function(matched) {
				if (!matched) {
					return done(null, false);
				}
				return done(null, user);
			});
	});
}));

mongoose.connect('mongodb://localhost/my-todos');

var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(session({
	secret: 'iluvtodos1234567890'
}));
app.use(passport.initialize());
app.use(passport.session());

var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
}

app.post('/api/auth', passport.authenticate('local'), function(req, res) {
	return res.status(200).end();
});
app.post('/api/register', function(req, res) {
	if (!req.body.email || !req.body.password) {
		return res.status(400).end();
	}
	User.findOne({ email: req.body.email }).exec().then(function(user) {
		if (user) {
			return res.status(400).end();
		}
		var newUser = new User(req.body);
		newUser.save(function(err, user) {
			if (!user) {
				return res.status(500).end();
			}
			return res.json(user);
		});
	});
});

app.get('/api/todos', isAuthed, function(req, res) {
	Todo.find({user: req.user._id})
		.exec()
		.then(function(todos) {
			return res.json(todos);
		});
});

app.post('/api/todos', isAuthed, function(req, res) {
	var newTodo = new Todo(req.body);
	newTodo.user = req.user._id;
	newTodo.save(function(err, todo) {
		return res.json(todo);
	});
});

app.put('/api/todos/:id', isAuthed, function(req, res) {
	Todo.update({ _id: req.params.id }, req.body).exec(function(err) {
		if (err) {
			console.error(err);
			return res.status(500).end();
		}
		return res.status(200).end();
	})
});

app.get('/api/profile', isAuthed, function(req, res) {
	return req.json(req.user);
});

app.listen(8080);