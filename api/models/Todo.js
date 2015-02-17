var mongoose = require('mongoose');

var schema = mongoose.Schema({
	title: String,
	completed: { type: Boolean, default: false },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
});

module.exports = mongoose.model('Todo', schema);