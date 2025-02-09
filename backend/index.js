const app = require("./src/app");
const { PORT } = require("./config");
const connectDB = require("./db");

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening to the port ${PORT}`);
});
