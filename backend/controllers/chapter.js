const Chapter = require('../models/Chapter');

exports.getAllChapter = async (req, res, next) => {
  try{
    const chapters = await Chapter.find();
    if(!chapters) return res.status(404).json({ message: 'Not found' });

    res.json({ chapters });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getOneChapter = async (req, res, next) => {
  try{
    const chapterId = req.params.id;
    const chapter = await Chapter.findById(chapterId);
    if(!chapter) return res.status(404).json({ message: 'Not found' });

    res.json({ chapter });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}

exports.createChapter = async (req, res, next) => {
  // use matchedData to verified the data in req here
  try{
    const newChapter = new Chapter({
      ...req.body
    });

    await newChapter.save();
    return res.status(201).json({ message: 'Chapter created successfully' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}

exports.modifyChapter = async (req, res, next) => {
  // use matchedData to verified the data in req here
  try{
    const chapterId = req.params.id;
    const chapter = await Chapter.findById(chapterId);
    if(!chapter) return res.status(404).json({ message: 'Not found' });

    await Chapter.findByIdAndUpdate(chapterId, { ...req.body }, { new: true, runValidators: true });
    return res.json({ message: 'Modified chapter' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}

exports.deleteChapter = async (req, res, next) => {
  try{
    const chapterId = req.params.id;
    await Chapter.findByIdAndDelete(chapterId);
    res.json({ message: 'Chapter deleted successfully' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}