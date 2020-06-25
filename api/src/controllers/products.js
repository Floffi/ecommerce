const Product = require('../models/Product');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.createProduct = catchAsync(async (req, res, _next) => {
  // TODO: upload images to cloudinary
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.getProducts = catchAsync(async (req, res, _next) => {
  const products = await Product.find();
  res.json({
    status: 'success',
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, _next) => {
  const product = await Product.findById(req.params.product_id);
  res.json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, _next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.product_id,
    req.body,
    { new: true }
  );
  res.json({
    status: 'success',
    data: {
      product,
    },
  });
});
