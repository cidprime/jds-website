const mongoose = require('mongoose');
const { Schema } = mongoose;

const EnrollmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  courses: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    dateEnrolled: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'Completed', 'Dropped'], default: 'Active' },
    progressId: { type: Schema.Types.ObjectId, ref: 'Progress' }
  }],
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
