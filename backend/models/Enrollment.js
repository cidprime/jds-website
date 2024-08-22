const mongoose = require('mongoose');
const { Schema } = mongoose;

const EnrollmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  dateEnrolled: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'Completed', 'Dropped'], default: 'Active' },
  progress: {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    completedChapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    quizScores: [{
      chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter' },
      score: { type: Number }
    }],
    progressCourse: { type: Number, default: 0 }, // En pourcentage
  }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
