const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    candidateName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    language: { type: String, required: true },
    location: { type: String, required: true },
    currentCTC: { type: Number, required: true },
    expectedCTC: { type: Number, required: true },
    experience: { type: String, required: true },
    aadharNo: { type: Number, required: false },
    FatherName: { type: String, required: false },
    DOB: { type: Date, required: false },
    resumeURL: { type: String, required: false },
    shortlisted: { type: Boolean, required: false },
    remarks: { type: String, required: false },
    feedback: { type: String, required: false },
    clientFeedback: { type: String, required: false },
    DOI: { type: Date, required: true },
    noticePeriod: { type: String, required: true },
    proficiency: { type: String, required: true },
    recruiter:{type:String,required:true},
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
// "candidateName": "Ram Kumar",
//     "clientEmail": "Ram@gmail.com",
//     "language": "English",
//     "location": "Mumbai",
//     "currentCTC": 200000,
//     "expectedCTC": 700000,
//     "experience": "1 year",
//     "aadharNo": 2022221525,
//     "FatherName": "Ram parshad",
//     "DOB": "12/11/2004",
//     "resumeURL": "http://localhost:3000/api/createCandidate",
//     "shortlisted": "yes",
//     "remarks": "sjdjja jf askjf dkljfa sfkjsk",
//     "feedback": "dhhfashf djhsajdhf hfjhdfah fhfdsh dhjshja",
//     "clientFeedback": "kjfd fja jfkdjf kjkdfjiwjefksajdflhdf sdakf ",
//    " assignedRecruiter": "",
//     "DOI": "12/06/2025",
//     "noticePeriod": "2 months",
//     "proficiency": "Coding"
