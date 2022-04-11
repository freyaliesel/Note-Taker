const express = require("express");
const path = require("path");
const notesData = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(notesData));

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    console.info(req.rawHeaders);
    console.info(req.body);
    let response;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        console.log(newNote);
        response = {
            status: "success",
            data: req.body,
        };
        res.status(201).json(`${req.method} request received`);
    } else {
        res.status(400).json(`Request body must contain a title and text`);
    }
});

app.listen(PORT, () => console.log(`Serving routes on port ${PORT}!`));
