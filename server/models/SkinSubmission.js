const mongoose = require('mongoose');

const SkinSubmissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    skinType: { type: String },
    concerns: { type: Object },
    otherConcern: { type: String },
    allergies: { type: String },
    medication: { type: String },
    skinConditions: { type: String },
    sunExposure: { type: String },
    usesSunscreen: { type: String },
    healthConcerns: { type: String },
    currentRoutine: { type: Object },
    submissionDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SkinSubmission', SkinSubmissionSchema);