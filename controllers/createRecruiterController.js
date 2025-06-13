const recruitermodel = require('../models/recruitermodel');




const createRecruiter = async (req, res) => {
  try {
    const { fullname, email, password, role , number } = req.body;


    const existing = await recruitermodel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

 
  


    const newUser = new recruitermodel({
      fullname,
      email,
      password,
      number,
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

const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await recruitermodel.find({ role: 'recruiter' });

    res.status(200).json({
      message: 'Recruiters fetched successfully',
      count: recruiters.length,
      recruiters
    });
  } catch (err) {
    console.error('Error fetching recruiters:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getSingleRecruiter = async (req, res) => {
  try {
    const { id } = req.params;

    const recruiter = await recruitermodel.findById(id); // includes all fields

    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json({
      message: 'Recruiter fetched successfully',
      recruiter
    });
  } catch (err) {
    console.error('Error fetching recruiter:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateRecruiter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRecruiter = await recruitermodel.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // return the updated document
    );

    if (!updatedRecruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json({
      message: 'Recruiter updated successfully',
      recruiter: updatedRecruiter
    });
  } catch (err) {
    console.error('Error updating recruiter:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteRecruiter = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecruiter = await recruitermodel.findByIdAndDelete(id);

    if (!deletedRecruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json({
      message: 'Recruiter deleted successfully',
      recruiter: deletedRecruiter
    });
  } catch (err) {
    console.error('Error deleting recruiter:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createRecruiter,
  getSingleRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getAllRecruiters
};