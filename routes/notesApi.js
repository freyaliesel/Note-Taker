const api = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
var notes = require("../db/db.json");

// GET route for the notes
api.get("/", (req, res) => res.json(notes));

// POST route for adding to the notes db
api.post("/", (req, res) => {
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

// DELETE route for removing notes from the db
api.delete("/:id", (req, res) => {
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

module.exports = api;