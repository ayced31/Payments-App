const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const { JWT_SECRET } = require("../config");

const signup = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists.",
    });
  }

  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  await Account.create({
    userId: newUser._id,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

  res.json({
    message: "User created successfully.",
    token: token,
  });
};

const signin = async (req, res) => {
  const existingUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (existingUser) {
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
};

const updateUser = async (req, res) => {
  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "Updated successfully",
  });
};

const bulkSearch = async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  res.json({
    user: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};

module.exports = {
  signup,
  signin,
  updateUser,
  bulkSearch,
};
