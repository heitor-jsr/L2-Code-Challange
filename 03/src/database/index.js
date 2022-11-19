const { Client } = require('pg');
const { migrate } = require("postgres-migrations");
const path  = require("node:path");

const client = new Client({
  host: 'localhost',
  port: '5432',
  user: 'root',
  password: 'root',
  database: 'mybank',
});

client.connect();

(async () => {
  await migrate({client}, __dirname+'/migrations')
})();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
