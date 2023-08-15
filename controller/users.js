const User = require("../models/users");
const tryAndCatch = require("../utils/tryAndCatch");

exports.getAllUsers = tryAndCatch(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});



exports.getUser = tryAndCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateMe = tryAndCatch(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "Success",
    data: updateUser,
  });
});

exports.deleteMe = tryAndCatch(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});
