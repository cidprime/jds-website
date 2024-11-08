const mongoose = require('mongoose');
const { Schema } = mongoose;

const EnrollmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  dateEnrolled: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'Completed', 'Dropped'], default: 'Active' },
  progress: {
    completedSections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
    quizScores: [
      {
        sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
        score: { type: Number },
      }
    ],
    progressPercentage: { type: Number, default: 0 } // En pourcentage
  }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
