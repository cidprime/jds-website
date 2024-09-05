const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
  title: { type: String, required: true},
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: [{ type: String, required: true }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
