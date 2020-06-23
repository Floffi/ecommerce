const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const catchAsync = require('../utilities/catchAsync');
const createToken = require('../utilities/createToken');
const AppError = require('../utilities/appError');

exports.login = catchAsync(async (req, res, _next) => {
  const { email, password } = req.body;
  // Get user with e-mail.
  const user = await User.findOne({ email }).lean();
  // If no user found, return error.
  if (!user) {
    return res.json({
      status: 'failure',
      error: {
        general: 'Invalid credentials.',
      },
    });
  }
  // Compare passwords.
  const match = await bcrypt.compare(password, user.password);
  // If passwords are not matching, return error.
  if (!match) {
    return res.json({
      status: 'failure',
      error: {
        general: 'Invalid credentials',
      },
    });
  }
  // Create access token
  const accessToken = await createToken(
    { userId: user._id, version: user.tokenVersion },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRATION
  );
  // Create refresh token
  const refreshToken = await createToken(
    { userId: user._id, version: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRATION
  );
  // Send refresh token as HTTP-only cookie.
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
  });
  // Omit password from user.
  const { password: omit, ...rest } = user;
  res.json({
    status: 'success',
    data: {
      user: rest,
      accessToken,
    },
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  // Check whether e-mail address is already taken.
  const userWithEmail = await User.findOne({ email }).lean();
  // If user with e-mail address found, return error.
  if (userWithEmail) {
    return res.json({
      status: 'failure',
      error: {
        email: 'E-mail address is already taken',
      },
    });
  }

  // Save user to database.
  const user = await (
    await User.create({
      firstName,
      lastName,
      email,
      password,
    })
  ).toObject();
  // Create access token
  const accessToken = await createToken(
    { userId: user._id, version: user.tokenVersion },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRATION
  );
  // Create refresh token
  const refreshToken = await createToken(
    { userId: user._id, version: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRATION
  );
  // Send refresh token as HTTP-only cookie.
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
  });
  // Omit password from user.
  const { password: omit, ...rest } = user;
  res.json({
    status: 'success',
    data: {
      user: rest,
      accessToken,
    },
  });
});

exports.logout = catchAsync(async (_req, res, _next) => {
  // Delete cookie with name 'refreshToken'
  res.clearCookie('refreshToken');
  res.json({
    status: 'success',
    message: 'Successfully logout',
  });
});

exports.refreshToken = catchAsync(async (req, res, _next) => {
  // Destructure refresh token from request cookies.
  const { refreshToken } = req.cookies;
  // If no refresh token found, return error.
  if (!refreshToken) {
    throw new AppError('Refresh token is required', 401);
  }
  // Check validity of refresh token.
  const { userId, version } = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  // Get user with id and token version.
  const user = await User.findOne({
    _id: userId,
    tokenVersion: version,
  }).lean();
  // If no user with given id and token version found, return error.
  if (!user) {
    throw new AppError('Invalid refresh token', 401);
  }
  // Create access token
  const accessToken = await createToken(
    { userId: user._id, version: user.tokenVersion },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRATION
  );
  res.json({
    status: 'success',
    data: {
      accessToken,
    },
  });
});

exports.loadSession = catchAsync(async (req, res, _next) => {
  // Omit password from user.
  const { password: omit, ...rest } = req.user;
  res.json({
    status: 'success',
    data: {
      user: rest,
    },
  });
});
