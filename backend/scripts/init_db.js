const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { pool } = require('../config/db');

async function run() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'migrations', 'init.sql'), 'utf8');
    console.log('Running migration...');
    await pool.query(sql);
    console.log('Migration completed.');
  } catch (err) {
    console.error('Migration failed:', err.message || err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
