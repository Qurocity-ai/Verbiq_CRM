const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    contactNumber: { type: String, required: true },
    Role: { type: String, required: true },
    // location: { type: String, required: true },
    // employmentType: { type: [String], required: true },
    // workMode: { type: [String], required: true },
    // minCTC: { type: Number, required: true },
    // maxCTC: { type: Number, required: true },
    // noticePeriod: { type: String, required: true },
    // language: { type: String, required: true },
    // proficiency: { type: String, required: true }
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
