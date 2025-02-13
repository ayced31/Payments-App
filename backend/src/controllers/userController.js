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

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  const hashedPassword = await newUser.createHash(req.body.password);
  newUser.password_hash = hashedPassword;

  await newUser.save();

  await Account.create({
    userId: newUser._id,
    balance: Number((1 + Math.random() * 10000).toFixed(2)),
  });

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully.",
    token: token,
  });
};

const signin = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser) {
    return res.status(400).json({
      message: "User not found.",
    });
  } else {
    if (await existingUser.validatePassword(req.body.password)) {
      const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
      return res.status(200).json({
        message: "User successfully logged in",
        name: existingUser.firstName,
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
  }
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

  res.status(200).json({
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
