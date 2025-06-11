const recruitermodel = require('../models/recruitermodel');

const bcrypt = require('bcryptjs');


const createRecruiter = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;


    const existing = await recruitermodel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

 
    const password_hash = await bcrypt.hash(password, 10);


    const newUser = new recruitermodel({
      first_name,
      last_name,
      email,
      password_hash,
      role,
      created_by: req.user.id // added by middleware
    });

    await newUser.save();

    res.status(201).json({
      message: `${role} created successfully.`,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = createRecruiter;