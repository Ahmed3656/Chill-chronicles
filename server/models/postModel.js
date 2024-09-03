const {Schema, model} = require('mongoose');

const postSchema = new Schema({
    title: {type: String, required: true},
    category: {type: String, enum: ['Finance', 'Business', 'Education', 'Entertainment', 'Art', 'Technology', 'Sports', 'Uncategorized'], message: '{value is not supported}', required: true},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true})

module.exports = model("Post", postSchema);