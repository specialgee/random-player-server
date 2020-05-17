const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema(
    {
        name: { type: String, required: true },
        category: { type: Array, required: true },
        cover: { type: String, data: Buffer, required: true },
        url: { type: String, required: false },
    },
    { timestamps: false },
)

module.exports = mongoose.model('categories', Category);