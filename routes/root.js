const express = require("express");
const router = express.Router();
const path = require("path");
const { News } = require("../db/db");

router.post("/new", async (req, res) => {
    try {
        const {
            Title,
            Description,
            Date,
            Author,
            Location,
            tags,
            total_views,
            category,
        } = req.body;

        const newNews = await News.create({
            Title,
            Description,
            Date,
            Author,
            Location,
            tags,
            total_views,
            category,
        });
        newNews.save();
        res.status(200).json({ message: "News posted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/get", async (req, res) => {
    const { q, location, date, author, tag } = req.query;

    let searcher = {};

    if (q) {
        searcher["Title"] = {
            $regex: q,
            $options: "i",
        };
    }

    searcher[location ? "Location" : undefined] = location;

    searcher[author ? "Author" : undefined] = author;

    searcher[tag ? "tag" : undefined] = tag;

    const news = await News.find(searcher);

    return res.json(news);
});

module.exports = router;
