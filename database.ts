export const dbConfig = {
    host: 'localhost', 
    port: 5432,
    user: 'postgres', 
    password: 'gg2445', 
    database: 'queryKnex', 
};


import Knex from 'knex';

export const knex = Knex({
    client: 'pg',
    connection: dbConfig,
});
