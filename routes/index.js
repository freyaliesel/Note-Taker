const express = require('express');
const apiRouter = require('./notesApi');
const route = express();

// all-method route for /api/notes/
route.use('/notes', apiRouter);

module.exports = route;