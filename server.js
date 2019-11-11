require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();


const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/api/sharks', async(req, res) => {
    
    try {
        const result = await client.query(`
        SELECT
            s.*,
            d.dangerous as dangerLevel
            FROM sharkstable s
            JOIN dangerLevel d
            ON s.dangerlevel_id = d.id
        `); 
        res.json(result.rows);           
    }
    catch (err) {
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.get('/api/sharks/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query(`
        SELECT
            s.*,
            d.dangerous as dangerLevel
        FROM sharkstable s
        JOIN dangerLevel d
        ON s.dangerlevel_id = d.id
        WHERE s.id = $1
    `,
        [id]);

        const shark = result.rows[0];
        if (!shark) {
            res.status(404).json({
                error: `Shark id ${id} does not exist`
            });
        }
        else {
            res.json(result.rows[0]);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.post('/api/sharks', async(req, res) => {
    const shark = req.body;
    try {
        const result = await client.query(`
        INSERT INTO sharkstable (name, dangerLevel_id, url, killer)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
        [shark.name, shark.dangerLevel, shark.url, shark.killer]
        );
        res.json(result.rows[0]);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.get('/api/dangerlevel', async(req, res) => {
    try {
        const result = await client.query(`
        SELECT *
        FROM dangerLevel
        ORDER BY dangerous;
        `);

        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err 
        });
    }
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});

