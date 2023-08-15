const Users = require("../models/users");
const tryAndCatch = require("../utils/tryAndCatch");
const AppError = require("../utils/appError");

exports.signUp = tryAndCatch(async (req, res, next) => {
  const newUser = new Users(req.body);
  await newUser.save();
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.login = tryAndCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await Users.findOne({ email });

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError("Email or Password is incorrect!", 401));
    }
    res.status(201).json({
      status: "success",
      data: user,
    });
  } else {
    next(new AppError("Please provide email or password to login!", 400));
  }
});
