const { News, connection } = require("./db/db");
const express = require("express");
const PORT = process.env.PORT || 8080;
const router = require("./routes/root");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/news", router);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("Server started at PORT 8080");
});
