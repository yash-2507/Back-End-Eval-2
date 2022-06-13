const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const connection = mongoose.connect("mongodb://127.0.0.1:27017/news");

const NewsSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    date: Date,
    author: {
        type: String,
        enum: [
            "Mathias Newburn",
            "Rey Rutty",
            "Magdaia Shellard",
            "Kathrine Faichney",
        ],
    },
    location: { type: String, enum: ["London", "New York"] },
    tags: {
        type: String,
        enum: ["politics", "crime", "tech", "sports", "health"],
    },
    total_views: Number,
    category: {
        type: String,
        enum: ["trending", "top", "new"],
    },
});

const News = model("news", NewsSchema);

module.exports = { News, connection };
