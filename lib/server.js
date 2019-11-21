const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const routes = require('./api/routes');
const mongourl = 'mongodb+srv://user:user123@cluster0-s7lwm.mongodb.net/test?retryWrites=true&w=majority';
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

MongoClient.connect(mongourl, (err, database) => {
    if (err) return console.log(err);

    const db = database.db('edadil');

    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

    routes(app, db);

    app.get('/pege', async (req, res) => {
        client.connect();

        client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
                console.log(JSON.stringify(row));
            }
            client.end();
        });
    });

    app.listen(PORT, () => {
       console.log(`App listening on ${PORT}`);
    });
});