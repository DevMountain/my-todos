var mongoose = require('mongoose');

var schema = mongoose.Schema({
	title: String,
	completed: { type: Boolean, default: false },
	user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Todo', schema); 