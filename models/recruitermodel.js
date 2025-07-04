const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number:{type:String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, enum: ['recruiter', 'super_admin'], default: 'recruiter' },
  is_active: { type: Boolean, default: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' }, // Super Admin who created this recruiter
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const recruitermodel = mongoose.model('Recruiter', recruiterSchema);
module.exports = recruitermodel;