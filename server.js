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
            FROM sharks s
            JOIN dangerLevel d
            ON s.dangerlevel_id = d.id
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

