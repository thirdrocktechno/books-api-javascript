const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

/**
 * Author Schema
 * @private
 */
const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 128,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 128,
  },
  email: {
    type: String,
    index: true,
    trim: true,
    maxlength: 128
  },
  password: {
    type: String,
    trim: true,
    maxlength: 128
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    trim: true,
  },
  city: {
    type: String,
    index: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
});

AuthorSchema.index({ firstName: 1 });
AuthorSchema.index({ city: 1 });
AuthorSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Author', AuthorSchema);
