const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  client_name: {
    type: String,
    required: true,
    maxLength: [255, "Client name cannot exceed 255 characters"],
    description: "Name of the client ",
  },
  vertical: {
    type: String,
    required: false,
    unique: true,
    maxLength: [100, "Vertical cannot exceed 100 characters"],
    description: "Industry vertical (e.g , BFSI ,IT ,Retail, etc.)",
  },
  spoc_name: {
    type: String,
    required: false,
    maxLength: [100, "SPOC name cannot exceed 100 characters"],
    description: "Point of Contact (SPOC) name",
  },
  spoc_email: {
    type: String,
    required: false,
    unique: true,
    maxLength: [255, "SPOC email cannot exceed 255 characters"],
    description: "Point of Contact (SPOC) email",
  },
  spoc_phone: {
    type: String,
    default: true,
    maxLength: [20, "SPOC phone cannot exceed 20 characters"],
    description: "Point of Contact (SPOC) phone number",
  },
  region: {
    type: String,
    required: false,
    maxLength: [50, "Region cannot exceed  characters"],
    description: "Client region (e.g., North , South India, etc.)",
  },

  created_at: {
    type: Date,
    default: Date.now,
    auto: true,
    description: "Default to current timestamp",
  },
  updated_at: {
    type: Date,
    default: Date.now,
    auto: true,
    description: "On update current timestamp",
  },
});

const clientmodel = mongoose.model("Client", clientSchema);
module.exports = clientmodel;
