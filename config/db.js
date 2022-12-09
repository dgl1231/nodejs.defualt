import pg from 'pg';
import db_connection from './db_config.json' assert {type: "json"};
const Client = pg.Pool;

const client = new Client(db_connection);

const createDatabase = async () => {
    try {
        console.log('db connect');
        await client.connect();
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
    // finally {
    //     await client.end();
    // }
};

createDatabase().then((result) => {
    if (result) {
        console.log('Database created');
    }
});
export default client;