require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
// import seed data:
const sharks = require('./sharks.js');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);

    try {
        await client.connect();
    
        // "Promise all" does a parallel execution of async tasks
        await Promise.all(
            // map every item in the array data
            sharks.map(shark => {

                // Use a "parameterized query" to insert the data,
                // Don't forget to "return" the client.query promise!
                return client.query(`
                    INSERT INTO sharks (name, dangerous, type, url, fatality)
                    VALUES ($1, $2, $3, $4, $5);
                `,  
                [shark.name, shark.dangerous, shark.type, shark.url, shark.fatality]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
