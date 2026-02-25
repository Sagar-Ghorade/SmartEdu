const { Pool } = require("pg");
require("dotenv").config();

// Build pool config. Support DATABASE_URL and optional SSL flags.
const poolConfig = {};
if (process.env.DATABASE_URL) {
  poolConfig.connectionString = process.env.DATABASE_URL;
} else {
  poolConfig.host = process.env.DB_HOST || 'localhost';
  poolConfig.user = process.env.DB_USER;
  poolConfig.password = process.env.DB_PASSWORD;
  poolConfig.database = process.env.DB_NAME;
  poolConfig.port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
}
poolConfig.max = parseInt(process.env.DB_MAX_CLIENTS || '10');

// SSL handling: If DB_SSL is truthy, enable SSL. For secure connections to cloud
// Postgres providers, set DB_SSL=true and DB_SSL_REJECT_UNAUTHORIZED=false if using
// self-signed certs or pooled proxies.
if (process.env.DB_SSL && process.env.DB_SSL.toLowerCase() === 'true') {
  const rejectUnauthorized = !(process.env.DB_SSL_REJECT_UNAUTHORIZED && process.env.DB_SSL_REJECT_UNAUTHORIZED.toLowerCase() === 'false');
  poolConfig.ssl = {
    rejectUnauthorized
  };
}

const pool = new Pool(poolConfig);

// Test connection
(async () => {
  try {
    const client = await pool.connect();
    client.release();
    console.log("✅ PostgreSQL Connected Successfully");
  } catch (err) {
    console.error("❌ Postgres Connection Failed:", err.message);
  }
})();

// Helper to convert `?` placeholders to $1, $2, ... for pg
function toPgPlaceholders(sql) {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

// Provide a mysql2-like promise query interface: returns [rows, meta]
async function query(sql, params = []) {
  const pgSql = toPgPlaceholders(sql);
  const res = await pool.query(pgSql, params);
  return [res.rows, res];
}

module.exports = {
  query,
  pool
};