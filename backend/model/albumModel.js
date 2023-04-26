const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 25
    },
    artist: {
        type: String,
        required: true,
        maxlength: 25
    },
    year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('album', schema);