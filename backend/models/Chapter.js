const mongoose = require('mongoose');
const { Schema } = mongoose;

const segmentSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'video', 'file']
  },
  content: { type: String, required: true } // Contenu texte ou URL (vidéo ou fichier)
});

const chapterSchema = new Schema({
  title: { type: String, required: true },
  segments: [segmentSchema] // Tableau de segments ordonnés
});

module.exports = mongoose.model('Chapter', chapterSchema);