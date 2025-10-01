require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function run() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moneri';
    await mongoose.connect(mongoUri);
    const username = process.env.SEED_USERNAME || 'admin';
    const password = process.env.SEED_PASSWORD || 'admin123';
    let admin = await Admin.findOne({ username });
    if (!admin) {
      admin = await Admin.create({ username, password });
      console.log('Seeded admin:', admin.username);
    } else {
      console.log('Admin exists:', admin.username);
    }
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();


