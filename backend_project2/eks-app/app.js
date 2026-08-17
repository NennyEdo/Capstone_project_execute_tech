const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

pool.query(`
  CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    seen_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => {
  console.log('Table check/create succeeded');
}).catch((err) => {
  console.error('Table check/create FAILED:', err.message);
});

app.get('/healthz', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('ok');
  } catch (err) {
    console.error('Healthz check failed:', err.message);
    res.status(500).send('db unreachable');
  }
});

app.get('/', async (req, res) => {
  await pool.query('INSERT INTO visits DEFAULT VALUES');
  const r = await pool.query('SELECT COUNT(*) FROM visits');
  res.send(`Hello from EKS. Visits: ${r.rows[0].count}`);
});

app.listen(3000, () => console.log('listening on 3000'));