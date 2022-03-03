const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const postSchema = new Schema({
    username: { type: String, required: true },
    graphic: { type: String, required: true },
    description: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    frequency: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const mySchemas = { 'Users': User, 'Posts': Post };

module.exports = mySchemas;