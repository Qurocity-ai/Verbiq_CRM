const recruitermodel = require("../models/recruitermodel");

const createRecruiter = async (req, res) => {
  try {
    const { fullname, email, password, role, number } = req.body;

    const existing = await recruitermodel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const newUser = new recruitermodel({
      fullname,
      email,
      password,
      number,
      role,
      created_by: req.user.id, // added by middleware
    });

    await newUser.save();

    res.status(201).json({
      message: `${role} created successfully.`,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = createRecruiter;
