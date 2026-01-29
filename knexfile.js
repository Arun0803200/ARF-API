require('dotenv').config();
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Welcome123$',
      database: process.env.DB_NAME || 'test',
      port: process.env.DB_PORT || 3306,
    },
    migrations: {
      directory: './src/Migrations',
    },
    pool: { min: 2, max: 10 },
  },
};
