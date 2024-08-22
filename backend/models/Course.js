const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: { type: String, required: true, index: true }, // Adding index to optimize search
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: [{ type: Schema.Types.ObjectId, ref: 'Chapter', required: true }],
    createdBy: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    price: { type: Number, default: 0 },    // Prix du cours si payant
    level: { type: String, required: true }, // Niveau de difficulte du cours
    duration: { type: Number, required: true },     // Temps estimer pour finir le cours
    tags: [{ type: String, required: true }], // Updated to store multiple tags
    rating: { type: Number, default: 0 },
    syllabus: [String],        // Programme du cours
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
