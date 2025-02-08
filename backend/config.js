require("dotenv").config();

const DB_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

module.exports = {
  DB_URI,
  DB_NAME,
  PORT,
  JWT_SECRET,
};
