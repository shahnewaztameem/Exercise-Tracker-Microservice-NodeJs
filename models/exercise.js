var mongoose = require('mongoose');
var exerciseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
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