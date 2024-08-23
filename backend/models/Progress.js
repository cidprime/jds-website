const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProgressSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  completedSections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  quizScores: [{
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
    score: { type: Number }
  }],
  progressCourse: { type: Number, default: 0 } // En pourcentage
});

module.exports = mongoose.model('Progress', ProgressSchema);