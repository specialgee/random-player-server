const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Video = new Schema(
    {
        title: { type: String, required: true },
        id: { type: [String], required: true },
        views: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('videos', Video)