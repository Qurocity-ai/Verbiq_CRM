const candidateModel = require("../models/candidatemodel.js");

const filterByCurrentCTC = async (req, res) => {
  try {
    const ranges = req.body;

    if (ranges.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "current CTC is not provided" });
    }
    const salaryQuery = ranges.map((r) => ({
      currentCTC: { $eq: r.CTC },
    }));
    const CTC = await candidateModel.find({ $or: salaryQuery });
    res.status(200).json(CTC);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtring candidate by current CTC",
      error: error.message,
    });
  }
};
const filterByExpectedCTC = async (req, res) => {
  try {
    const ranges = req.body;

    if (ranges.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Expected CTC is not provided" });
    }
    const salaryQuery = ranges.map((r) => ({
      expectedCTC: { $eq: r.CTC },
    }));
    const jobs = await candidateModel.find({ $or: salaryQuery });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtring candidate by expected CTC",
      error: error.message,
    });
  }
};
const filterByLocation = async (req, res) => {
  try {
    const locations = req.body;

    if (locations.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "location is not provided" });
    }
    const locationQuery = locations.map((location) => ({
      location: { $regex: location, $options: "i" },
    }));
    const Loc = await candidateModel.find({ $or: locationQuery });
    res.status(200).json(Loc);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtring job by location",
      error: error.message,
    });
  }
};
const filterByLanguage = async (req, res) => {
  try {
    const languages = req.body;

    if (languages.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Language is not provided" });
    }
    const languageQuery = languages.map((language) => ({
      language: { $regex: language, $options: "i" },
    }));
    const candidates = await candidateModel.find({ $or: languageQuery });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtering candidate by language",
      error: error.message,
    });
  }
};
const filterByExperience = async (req, res) => {
  try {
    const experience = req.body;

    if (experience.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Experience is not provided" });
    }
    const experienceQuery = experience.map((exp) => ({
      experience: { $eq: exp.experience },
    }));
    const candidates = await candidateModel.find({ $or: experienceQuery });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtering candidate by experience",
      error: error.message,
    });
  }
};
const filterByNoticePeriod = async (req, res) => {
  try {
    const noticePeriod = req.body;

    if (noticePeriod.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Notice period is not provided" });
    }
    const noticeQuery = noticePeriod.map((np) => ({
      noticePeriod: { $eq: np.noticePeriod },
    }));
    const candidates = await candidateModel.find({ $or: noticeQuery });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtering candidate by notice period",
      error: error.message,
    });
  }
};

module.exports = {
  filterByCurrentCTC,
  filterByExpectedCTC,
  filterByLocation,
  filterByLanguage,
  filterByExperience,
  filterByNoticePeriod,
};
