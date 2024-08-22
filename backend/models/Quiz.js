const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: [{ type: String, required: true }]
});

module.exports = mongoose.model('Quiz', QuizSchema);
