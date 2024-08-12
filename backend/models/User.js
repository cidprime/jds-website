const mongoose = require('mongoose');
const { Schema } = mongoose;

// le package mongoose-unique-validator permet de gerer les elements unique pour chaque user comme les email.
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  progress: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter' },
    completed: { type: Boolean, default: false },
    quizResults: [{
      quizId: { type: Schema.Types.ObjectId, ref: 'Quiz'},
      score: Number
    }]
  }]
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);