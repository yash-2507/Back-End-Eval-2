const express = require("express");
const router = express.Router();
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
    const { q, location, date, author, tag, id, title } = req.query;

    let searcher = {};

    if (q) {
        searcher["Title"] = {
            $regex: q,
            $options: "i",
        };
    }

    searcher[location ? "Location" : undefined] = location;

    searcher[author ? "Author" : undefined] = author;

    searcher[tag ? "tags" : undefined] = tag;

    if (id) {
        searcher[_id] = id;
    }

    if (title) {
        searcher["Title"] = title;
    }

    const news = await News.find(searcher);

    if (title || id) {
        const id_to_update = String(news[0]["_id"]);
        const prev_view = Number(news[0]["total_views"]);

        if (prev_view > 50) {
            await News.findByIdAndUpdate(id_to_update, {
                category: "trending",
            });
        }
        if (prev_view > 100) {
            await News.findByIdAndUpdate(id_to_update, {
                category: "top",
            });
        }

        await News.findByIdAndUpdate(id_to_update, {
            total_views: prev_view + 1,
        });
    }

    return res.json(news);
});

module.exports = router;
