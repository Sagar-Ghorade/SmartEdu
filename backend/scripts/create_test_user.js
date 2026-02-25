const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/db');

async function run() {
  try {
    const name = process.env.TEST_USER_NAME || 'Test User';
    const email = process.env.TEST_USER_EMAIL || 'test@example.com';
    const password = process.env.TEST_USER_PASSWORD || 'testpass';

    const hashed = await bcrypt.hash(password, 10);

    const [ins] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING id, email, name, role',
      [name, email, hashed]
    );

    const user = ins[0];
    const token = jwt.sign({ id: user.id, role: user.role || 'student' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log('Created test user:', user);
    console.log('JWT token:', token);
  } catch (err) {
    console.error('Create test user failed:', err.message || err);
    process.exit(1);
  } finally {
    if (db.pool && db.pool.end) await db.pool.end();
  }
}

run();
