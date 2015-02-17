var Todo = require('../models/Todo');

module.exports = {
	list: function(req, res) {
		Todo.find({ user: req.user._id }).exec().then(function(todos) {
			return res.json(todos);
		});
	},
	create: function(req, res) {
		var newTodo = new Todo(req.body);
		newTodo.user = req.user._id;
		newTodo.save(function(err, todo) {
			if (err) {
				return res.status(500).end();
			}
			return res.json(todo);
		});
	},
	update: function(req, res) {
		Todo.update({ _id: req.params.id }, req.body).exec(function(err) {
			return res.status(200).end();
		});

		// Todo.findOne({ _id: req.params.id }).exec().then(function(todo) {
		// 	todo.completed = req.body.completed;
		// 	//...
		// 	todo.save(function(err) {
		// 		return res.json(todo);
		// 	});
		// });
	}
};