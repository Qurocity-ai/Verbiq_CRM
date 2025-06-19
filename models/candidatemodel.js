const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    candidateName: { type: String, require: true },
    clientEmail: { type: String, required: true },
    language: { type: String, required: true },
    location: { type: String, required: true },
    minCTC: { type: Number, required: true },
    maxCTC: { type: Number, required: true },
    experience: { type: Number, require: true },
    aadharNo: { type: Number, require: false },
    FatherName: { type: String, require: false },
    DOB: { type: Date, require: false },
    resumeURL: { type: String, require: false },
    shortlisted: { type: Boolean, require: false },
    remarks: { type: String, require: false },
    feedback: { type: String, require: false },
    clientFeedback: { type: String, require: false },
    DOI: { type: Date, require: true },
    noticePeriod: { type: String, required: true },
    proficiency: { type: String, required: true },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
