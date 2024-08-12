const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    imageUrl: {type: String, required: true},
    isFree: { type: Boolean, default: true }, // Indique si le cours est gratuit
    price: { type: Number, default: 0 }, // Prix du cours si payant
    category: { type: String, required: true },
    duration: Number,
    tags: [String],
    materials: [String]  // Références aux fichiers téléchargeables
});

module.exports = mongoose.model('Course', courseSchema);
