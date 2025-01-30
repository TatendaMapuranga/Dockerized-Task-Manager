import { Pool } from 'pg';

// Create a new pool instance
export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'TaskManager',
  password: process.env.DB_PASSWORD || 'user123',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to the database.');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err);
  process.exit(-1);
});
