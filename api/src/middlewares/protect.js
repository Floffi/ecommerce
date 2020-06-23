const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

const protect = catchAsync(async (req, _res, next) => {
  // Destructure authorization from headers.
  const { authorization } = req.headers;
  // If no authorization header found, return error.
  if (!authorization) {
    throw new AppError('Unauthorized access', 401);
  }
  // Split token from 'Bearer' string.
  const token = authorization.split(' ')[1];
  // If no access token found, return error.
  if (!token) {
    throw new AppError('Invalid authorization header', 401);
  }
  // Verify validity of access token.
  const { userId, version } = await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  // Get user with id and token version.
  const user = await User.findOne({
    _id: userId,
    tokenVersion: version,
  }).lean();
  // If no user found, return error.
  if (!user) {
    throw new AppError('Invalid access token', 401);
  }
  req.user = user;
  next();
});

module.exports = protect;
