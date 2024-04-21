const MedicalCondition = require('./medicalConditionModel');

// Controller function to retrieve all medical conditions
exports.getAllMedicalConditions = async (req, res) => {
    try {
        const medicalConditions = await MedicalCondition.find();
        res.status(200).json(medicalConditions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving medical conditions', error });
    }
};

// Controller function to create a new medical condition
exports.createMedicalCondition = async (req, res) => {
    try {
        const { name, description, symptoms, treatments } = req.body;
        const newMedicalCondition = new MedicalCondition({ name, description, symptoms, treatments });
        const savedMedicalCondition = await newMedicalCondition.save();
        res.status(201).json(savedMedicalCondition);
    } catch (error) {
        res.status(400).json({ message: 'Error creating medical condition', error });
    }
};
