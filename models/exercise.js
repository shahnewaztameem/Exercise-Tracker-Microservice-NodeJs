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
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model("Exercise", exerciseSchema);