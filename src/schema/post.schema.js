const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const postSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: String,
    description: String,
});

module.exports = mongoose.model('Post', postSchema);