const knex = require('knex');
const stringcase = require('knex-stringcase');
const knexConfig = require('../../knexfile');

const env = process.env.NODE_ENV || 'development';

let db = null;

function connectDB() {
  if (!db) {
    console.log('Initializing DB connection...');

    // Print what the package exports (VERY IMPORTANT)

    // Detect correct exported function automatically
    const mapper =
      stringcase.knexStringcase ||
      stringcase.knexSnakeCaseMappers ||
      stringcase.default ||
      stringcase;

    if (typeof mapper !== 'function') {
      throw new Error('knex-stringcase: No valid function exported!');
    }

    const config = mapper(knexConfig[env]);
    db = knex(config);
  }

  return db;
}

module.exports = connectDB;
