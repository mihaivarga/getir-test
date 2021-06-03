const mongoose = require('mongoose');

const records = mongoose.Schema({
    counts: [],
    createdAt: Date,
    key: String,
    value: String
});

module.exports = mongoose.model('records', records)
