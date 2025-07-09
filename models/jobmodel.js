const mongoose = require("mongoose");
const { schema } = require("./recruitermodel");

const jobSchema = new mongoose.Schema(
  {
    clientName: { type: mongoose.Schema.ObjectId, required: true },
    headCount: { type: Number, required: true },
    processName: { type: String, required: true },
    POCcontactNumber: { type: Number, requried: true },
    POCname: { type: String, requried: true },
    vendorPayout: { type: Number, requried: true },
    empEngType: { type: String, requried: true },
    role: { type: String, requried: true },
    location: { type: String, requried: true },
    language: { type: String, requried: true },
    profencency: { type: String, requried: true },
    experience: { type: String, requried: true },
    interviewType: { type: String, requried: true },
    noticePeriod: { type: String, requried: true },
    relocationAllow: { type: Boolean, requried: true },
    interviewProcess: { type: String, requried: true },
    RFQstatus: { type: String, requried: true },
    extraNotes: { type: String, requried: true },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);
module.exports = Jobs;
