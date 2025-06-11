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

    const existing = await recruitermodel.findOne({ email: 'sunil@gmail.com' });
    if (existing) {
      console.log('Super Admin already exists');
      return process.exit();
    }



    const superAdmin = await recruitermodel.create({
      fullname:"sunil",
      email: 'sunil@gmail.com',
      number:"1234567890",
      password:"sunil",
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
