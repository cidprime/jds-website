const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChapterSchema = new Schema({
    title: { type: String, required: true },
    videoUrl: { type: String },  // Lien vers la vidéo
    content: { type: String, required: true },  // Texte du chapitre
    fileUrl: [String],  // Lien vers des fichiers telechargeables
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' }
});

module.exports = mongoose.model('Chapter', ChapterSchema);
