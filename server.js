const express = require("express");
const path = require("path");
const notesData = require("./db/db.json");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.static("public"));

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(notesData));

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);

    console.info(req.rawHeaders);
    console.info(req.body);
    let response;

    if(req.body && req.body.title && req.body.text) {
        response = {
            status: 'success',
            data: req.body
        };
        res.json(`${req.method} request received`);
    }  else {
        
        res.json(`Request body must contain a title and text`);
    }
});


app.listen(PORT, () => console.log(`Serving routes on port ${PORT}!`));
