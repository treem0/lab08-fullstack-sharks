require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
// import seed data:
const dangerLevel = require('./danger-level.js');
const sharks = require('./sharks.js');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);

    try {
        await client.connect();

        const savedDangerLevel = await Promise.all(
            dangerLevel.map(async level => {
                const result = await client.query(`
                INSERT INTO dangerLevel (dangerous)
                VALUES ($1)
                RETURNING *;
                `,
                [level]);
                return result.rows[0];
            })
        );
    
        // "Promise all" does a parallel execution of async tasks
        await Promise.all(
            // map every item in the array data
            sharks.map(shark => {
                const level = savedDangerLevel.find(level => {
                    return level.dangerous === shark.dangerLevel;
                });
                // Use a "parameterized query" to insert the data,
                // Don't forget to "return" the client.query promise!
                return client.query(`
                    INSERT INTO sharkstable (name, dangerLevel_id, type, url, killer)
                    VALUES ($1, $2, $3, $4, $5);
                `,  
                [shark.name, level.id, shark.type, shark.url, shark.killer]);
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
