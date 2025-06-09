const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const recruitermodel = require('../models/recruitermodel');


console.log('MONGO_URI:', process.env.MONGO_URI);

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await recruitermodel.findOne({ email: 'sushil@gmail.com' });
    if (existing) {
      console.log('Super Admin already exists');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('sushil', 10);

    const superAdmin = await recruitermodel.create({
      first_name: 'sushil',
      last_name: 'sushil',
      email: 'sushil@gmail.com',
      password_hash: hashedPassword,
      role: 'super_admin'
    });

    console.log('✅ Super Admin created:', superAdmin.email);
    process.exit();
  } catch (err) {
    console.error(' Error:', err);
    process.exit(1);
  }
};

seedSuperAdmin();
