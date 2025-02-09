const mongoose = require("mongoose");
const { DB_URI } = require("../config");
const { DB_NAME } = require("../config");

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

module.exports = connectDB;
