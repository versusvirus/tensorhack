const express = require('express');
const routes = require('./api/routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

class Application {
    constructor() {
        this.app = express();
        this.apiRoutes = new routes(this.app);
        this.configure();
    }

    configure() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }
}

module.exports = new Application().app;