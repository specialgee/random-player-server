const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Video = new Schema(
    {
        title: { type: String, required: false },
        url: { type: String, required: true },
        category: { type: String, required: true },
    },
    { timestamps: false },
)

module.exports = mongoose.model('videos', Video);