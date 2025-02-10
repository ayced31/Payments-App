const app = require("./src/app");
const { PORT } = require("./src/config/index");
const connectDB = require("./src/services/db");

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening to the port ${PORT}`);
});
