const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const routes = require('./api/routes');
const mongourl = 'mongodb+srv://user:user123@cluster0-s7lwm.mongodb.net/test?retryWrites=true&w=majority';
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
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
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM test_table');
            const results = {results: result ? result.rows : null};
            res.render('pages/db', results);
            client.release();
        } catch(err) {
            console.error(err);
            res.send('Error'+ err);
        }
    });

    app.listen(PORT, () => {
       console.log(`App listening on ${PORT}`);
    });
});