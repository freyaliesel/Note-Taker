const express = require('express');
const notes = require('./notesApi');
const route = express();

// all-method route for /api/notes/
route.use('/notes', notes);

module.exports = route;