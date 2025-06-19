const candidateModel = require("../models/candidatemodel.js");

const createCandidate = async (req, res) => {
  try {
    const candidate = new candidateModel(req.body);
    candidate.save();
    res.status(200).json({
      success: true,
      message: "Candidate Created successfully !",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating Candidate",
      error: error.message,
    });
  }
};

module.exports = { createCandidate };
