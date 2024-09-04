const Progress = require('../models/Progress');

exports.getAllProgess = async (req, res, next) => {
  try{
    const progress = await Progress.find();
    if(!progress) return res.status(404).json({ message: 'Not found' });

    return res.json({ progress });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}


exports.getOneProgess = async (req, res, next) => {
  try{
    const progressId = req.params.id;
    const progress = await Progress.findById(progressId);
    if(!progress) return res.status(404).json({ message: 'Not found' });

    return res.json({ progress });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}


exports.createProgess = async (req, res, next) => {
  try{
    const newProgress = new Progress({
      ...req.body
    });

    await newProgress.save();
    return res.status(201).json({ message: 'Progress created successfully' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}


exports.modifyProgess = async (req, res, next) => {
  try{
    const progressId = req.params.id;
    const progress = await Progress.findById(progressId);
    if(!progress) return res.status(404).json({ message: 'Not found' });

    await Progress.findByIdAndUpdate(progressId, { ...req.body }, { new: true, runValidators: true });
    return res.json({ message: 'modified progress' });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}