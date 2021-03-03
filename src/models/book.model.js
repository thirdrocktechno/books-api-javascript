const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

/**
 * Book Schema
 * @private
 */
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 128,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.ObjectId,
    ref: "Author",
    required: true
  },
}, {
  timestamps: true,
});

BookSchema.index({ title: 1 });

module.exports = mongoose.model('Book', BookSchema);
