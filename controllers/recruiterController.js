const recruitermodel = require("../models/recruitermodel");

const getRecuiters = async (req, res) => {
  try {
    const recruiters = await recruitermodel.find({ role: "recruiter" }); // only fetch recruiters

    res.status(200).json({ count: recruiters.length, recruiters });
  } catch (err) {
    console.log("Error fetching recuiters", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

module.exports = { getRecuiters };
