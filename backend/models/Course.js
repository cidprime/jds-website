const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: { type: String, required: true, index: true }, // Adding index to optimize search
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section', required: true }],
    createdBy: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    price: { type: Number, default: 0 },    // Prix du cours si payant
    isFree: { type: Boolean },
    level: { type: String, default: "Beginner", required: true }, // Niveau de difficulte du cours
    domain: { type: String, required: true, index: true }, // Domaine dans lequel se situe le cours
    duration: { type: Number, default: 10, required: true },     // Temps estimer pour finir le cours
    rating: { type: Number, default: 0 },
    syllabus: [{ type: String, required: true }]     // Programme du cours
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
