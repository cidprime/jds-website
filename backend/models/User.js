const mongoose = require('mongoose');
const { Schema } = mongoose;
const ROLES = require('../config/roles');

// le package mongoose-unique-validator permet de gerer les elements unique pour chaque user comme les email.
const uniqueValidator = require('mongoose-unique-validator');
const Enrollment = require('./Enrollment');

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
  role: { type: Number, enum: Object.values(ROLES), default: ROLES.STUDENT },
  enrollments: [{ type: Schema.Types.ObjectId, ref: 'Enrollment' }] // ????
}, { timestamps: true })

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);