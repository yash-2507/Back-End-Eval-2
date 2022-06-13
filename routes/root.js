const express = require("express");
const router = express.Router();
const path = require("path");
const { News } = require("../db/db");

router.post("/new", async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            author,
            location,
            tags,
            total_views,
            category,
        } = req.body;

        const newNews = await News.create({
            title,
            description,
            date,
            author,
            location,
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

module.exports = router;
