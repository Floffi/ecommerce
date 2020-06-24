const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
