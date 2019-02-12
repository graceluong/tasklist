const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    complete: Boolean,
    due_date: String,
    category: String
});

module.exports = mongoose.model('Task', taskSchema);