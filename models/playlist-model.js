const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Playlist = new Schema(
    {
        name: { type: String, required: true },
        categories: { type: [String], required: true },
        cover: { type: String, data: Buffer, required: true },
        url: { type: String, required: false },
    },
    { timestamps: false },
)

module.exports = mongoose.model('playlists', Playlist);