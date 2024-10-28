const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur qui donne l'avis
    rating: { type: Number, required: true, min: 1, max: 5 }, // Note donnée, entre 1 et 5
    comment: { type: String }, // Commentaire optionnel de l'utilisateur
}, { timestamps: true });
  

const courseSchema = new Schema({
    title: { type: String, required: true, index: true }, // Adding index to optimize search
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    previewVideoUrl: { type: String, required: true },
    previewText: { type: String, required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section', required: true }],
    createdBy: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    price: { type: Number, default: 0 },    // Prix du cours si payant
    isFree: { type: Boolean },
    level: { type: String, default: "Beginner", required: true }, // Niveau de difficulte du cours
    domain: { type: String, required: true, index: true }, // Domaine dans lequel se situe le cours
    duration: { type: Number, default: 1, required: true },    // Temps estimer pour finir le cours
    theme: [{ type: Array, required: true, index: true}], // Les themes associes au cours
    rating: { type: Number, default: 0 }, // Note moyenne du cours
    reviews: [reviewSchema], // Liste des avis utilisateurs
    numberOfReviews: { type: Number, default: 0 }, // Nombre de personnes ayant noté
    syllabus: [{ type: String, required: true }]     // Programme du cours
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
