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

const getCandidate = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const candidate = await candidateModel.find({}).skip(skip).limit(limit);
    const totalCandidate = await candidateModel.countDocuments();

    res.status(200).json({
      totalCandidate,
      page,
      totalPages: Math.ceil(totalCandidate / limit),
      candidate,
    });
  } catch (err) {
    console.log("Error fetching Client", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await candidateModel.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      candidate,
    });
  } catch (err) {
    console.log("Error fetching Candidate", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

const deleteCandidateById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await candidateModel.findById(id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    await candidateModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
      delectedCandidate: candidate,
    });
  } catch (err) {
    console.log("Error delecting Candidate", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

const updateCandidateById = async (req, res) => {
  const { id } = req.params;
  try {
    const updateCandidate = await candidateModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      updateCandidate,
    });
  } catch (err) {
    console.error("Error updating candidate :", err);
    res.status(500).json({
      success: false,
      message: "Error while updating candidate",
      error: err.message,
    });
  }
};

module.exports = {
  createCandidate,
  getCandidate,
  getCandidateById,
  deleteCandidateById,
  updateCandidateById,
};
