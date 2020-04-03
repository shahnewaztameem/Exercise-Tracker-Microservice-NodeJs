var mongoose = require('mongoose');
var exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    date: String,
});

module.exports = mongoose.model("Exercise", exerciseSchema);