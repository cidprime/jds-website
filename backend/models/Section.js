const mongoose = require('mongoose');
const { Schema } = mongoose;

const SectionSchema = new Schema({
  title: { type: String, required: true },
  chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz'}
});

module.exports = mongoose.model('Section', SectionSchema);