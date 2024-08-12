const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChapterSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },  // Texte du chapitre
    videoUrl: { type: String },  // Lien vers la vidéo
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' }
});

module.exports = mongoose.model('Chapter', ChapterSchema);
