const notesAPI = require('./notes/api');

module.exports = class Route {
    constructor(app) {
        app.use('/notes', notesAPI.notesList);
    }
};