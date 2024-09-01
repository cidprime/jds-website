const Quiz = require('../models/Quiz');

exports.getAllQuiz = async (req, res, next) => {
  try{
    const quiz = await Quiz.find();
    res.json({ quiz });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}


exports.getOneQuiz = async (req, res, next) => {
  try{
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if(!quiz) return res.status(404).json({ message: 'Not found' });

    res.json({ quiz });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}


exports.createQuiz = async (req, res, next) => {
  // use matchedData to verified the data in req here
  try{
    const newQuiz = new Quiz({
      ...req.body
    });

    await newQuiz.save();
    return res.status(201).json({ message: 'Quiz created successfully' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}


exports.modifyQuiz = async (req, res, next) => {
  // use matchedData to verified the data in req here
  try{
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if(!quiz) return res.status(404).json({ message: 'Not found' });

    await Quiz.findByIdAndUpdate(quizId, { ...req.body }, { new: true, runValidators: true });
    return res.json({ message: 'modified quiz' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}


exports.deleteQuiz = async (req, res, next) => {
  try{
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if(!quiz) return res.status(404).json({ message: 'Not found' });

    await Quiz.findByIdAndDelete(quizId);
    return res.json({ message: 'quiz deleted successfully' });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}