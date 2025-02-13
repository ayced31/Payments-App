const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password_hash: {
    type: String,
    required: true,
    minLength: 6,
  },
});

userSchema.methods.createHash = async function (plainTextPassword) {
  return await argon2.hash(plainTextPassword);
};

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await argon2.verify(this.password_hash, candidatePassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
