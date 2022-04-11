const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.static("public"));

app.listen(PORT, () =>
    console.log(`Serving static asset routes on port ${PORT}!`)
);
