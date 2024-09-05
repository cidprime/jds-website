const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: { type: String, required: true, index: true }, // Adding index to optimize search
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section', required: true }],
    createdBy: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    price: { type: Number, default: 0 },    // Prix du cours si payant
    level: { type: String, required: true }, // Niveau de difficulte du cours
    duration: { type: Number, required: true },     // Temps estimer pour finir le cours
    tags: [{ type: String, required: true }], // Updated to store multiple tags
    rating: { type: Number, default: 0 },
    syllabus: [{ type: String, required: true }]     // Programme du cours
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
