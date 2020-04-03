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
    date: {
        type: Date
    }
});

module.exports = mongoose.model("Exercise", exerciseSchema);