const mongoose = require('mongoose');

const medicalConditionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    symptoms: [{
        type: String,
        required: true,
        trim: true
    }],
    treatments: [{
        type: String,
        required: true,
        trim: true
    }]
}, { timestamps: true });

const MedicalCondition = mongoose.model('MedicalCondition', medicalConditionSchema);

module.exports = MedicalCondition;
