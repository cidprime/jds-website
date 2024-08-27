const mongoose = require('mongoose');
const { Schema } = mongoose;

const uniqueValidator = require('mongoose-unique-validator');

const tokenBlacklistSchema = Schema({
  token: {
    type: String,
    require: true,
    unique: true
  },
  createAt: {
    type: Date,
    default: Date.now,
    expires: '1d' // Automatically remove the token after 1 day
  }
});

tokenBlacklistSchema.plugin(uniqueValidator);

module.exports = mongoose.model('tokenBlacklist', tokenBlacklistSchema);