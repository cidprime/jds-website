const Section = require('../models/Section');

exports.getAllSections = async (req, res, next) => {
  try {
    const sections = await Section.find();
    res.json({ sections });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOneSection = async (req, res, next) => {
  try {
    const sectionId = req.params.id;
    const section = await Section.findById(sectionId);
    if(!section) return res.status(404).json({ message: 'Section not found' });

    res.json({ section });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createSection = async (req, res, next) => {
  // use matchedData to verified the data in req here
  try {
    const newSection = new Section({
      ...req.body
    });

    await newSection.save();
    return res.status(201).json({ message: 'Section created successfully' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

exports.modifySection = async (req, res, next) => {
  // use matchedData to verified the data in req here
  try {
    const sectionId = req.params.id;
    const section = await Section.findById(sectionId);
    if(!section) return res.status(404).json({ message: 'Section not found' });

    await Section.findByIdAndUpdate(sectionId, { ... req.body }, { new: true, runValidators: true });
    return res.json({ message: 'modified section' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSection = async (req, res, next) => {
  try {
    const sectionId = req.params.id;
    const section = await Section.findById(sectionId);
    if(!section) return res.status(404).json({ message: 'Section not found' });

    await Section.findByIdAndDelete(sectionId);
    return res.json({ message: 'Section deleted successfully' });
    
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};