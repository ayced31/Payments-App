const mongoose = require("mongoose");
const { DB_URI } = require("./config");
const { DB_NAME } = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbName: DB_NAME,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log(`MongoDB connect successfully to database: ${DB_NAME}`);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};

connectDB();

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
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId of...
    ref: "User", // ...user
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
