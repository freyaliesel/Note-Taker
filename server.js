const express = require("express");
const fs = require("fs");
const path = require("path");
const api = require("./routes/index.js");
const PORT = process.env.PORT || 3001;
const app = express();
// middleware for parsing JSON and urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// all-method route for /api/
app.use("/api", api);

// GET route for the notes page
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// fallback route for routes that don't exist
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`Serving routes on port ${PORT}!`));
