module.exports = {
  client: "mysql2",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: "./knex/migrations",
  },
  seeds: {
    directory: "./knex/seeds",
  },
};
