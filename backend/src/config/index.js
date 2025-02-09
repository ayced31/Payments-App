require("dotenv").config();

module.exports = {
  DB_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};
