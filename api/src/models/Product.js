const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    categories: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }],
    name: {
      type: String,
      required: true,
      max: 80,
    },
    description: {
      type: String,
      required: true,
      max: 2000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

// Middleware
productSchema.pre('validate', function (next) {
  if (this.images.length > 6)
    throw 'Product images exceeds maximum array size (6)!';
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
