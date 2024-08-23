const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChapterSchema = new Schema({
    title: { type: String, required: true },
    videoUrl: [{ type: String }],  // Lien vers la vidéo
    content: { type: String, required: true },  // Texte du chapitre
    fileUrl: [{ type: String }],  // Lien vers des fichiers telechargeables
});

module.exports = mongoose.model('Chapter', ChapterSchema);