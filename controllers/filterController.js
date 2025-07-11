const candidateModel = require("../models/candidatemodel.js");
const jobmodel = require("../models/jobmodel");

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
const filterByCandidateStage = async (req, res) => {
  try {
    const stage = req.body;

    if (!Array.isArray(stage) || stage.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Candidate Stage is not provided" });
    }
    const stageQuery = stage.map((stage) => ({
      candidateStage: { $regex: stage, $options: "i" },
    }));
    const candidates = await candidateModel.find({ $or: stageQuery });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtering candidate by Stages",
      error: error.message,
    });
  }
};
const filterByDOI = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ success: false, message: "Date of interview is not provided" });
    }

    let query = {};
    if (startDate && endDate) {
      query.DOI = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.DOI = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.DOI = { $lte: new Date(endDate) };
    }

    const candidates = await candidateModel.find(query);
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtering candidate by Date of interview",
      error: error.message,
    });
  }
};
const filterJobByClientName = async (req, res) => {
  try {
    const { client } = req.body;

    if (!client || !Array.isArray(client) || client.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Client Name is not provided" });
    }

    const jobs = await jobmodel.find({ clientName: { $in: client } });
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while filtering Jobs By Client name",
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
  filterByCandidateStage,
  filterByDOI,
  filterJobByClientName,
};
