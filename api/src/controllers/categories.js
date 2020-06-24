const catchAsync = require('../utilities/catchAsync');
const Category = require('../models/Category');
const AppError = require('../utilities/appError');

exports.createCategory = catchAsync(async (req, res, _next) => {
  const category = await Category.create({ user: req.user._id, ...req.body });
  res.status(201).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.getCategories = catchAsync(async (req, res, _next) => {
  const categories = await Category.find();
  res.json({
    status: 'success',
    data: {
      categories,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, _next) => {
  const { category_id } = req.params;

  const category = await Category.findById(category_id);
  if (!category) {
    throw new AppError('Category with ID not found', 404);
  }
  res.json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, _next) => {
  const { category_id } = req.params;

  const category = await Category.findByIdAndUpdate(category_id, req.body);
  res.json({
    status: 'success',
    data: {
      category,
    },
  });
});
