const express = require("express");
const fs = require("fs");
const path = require("path");
var notes = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");
const { fstat } = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(notes));

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
            id: uuidv4(),
        };
        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (err) =>
            err
                ? console.error(err)
                : `New note named ${title} has been written to JSON file`
        );
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

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    console.info(`${req.method} request received to remove note ${id}`);

    if (id) {
        notes = notes.filter((note) => note.id !== id);
        fs.writeFile(
            "./db/db.json",
            JSON.stringify(notes, null, 4),
            (err) =>
                err
                    ? console.error(err)
                    : `Note id ${id} has been deleted from the JSON file`
        );
        res.status(202).json(`${req.method} request received`);
    } else {
        res.status(400).json(`Request parameter must contain an id`);
    }
});

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`Serving routes on port ${PORT}!`));
