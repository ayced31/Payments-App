const express = require("express");
const rootRouter = require("./routes/index");
const { PORT } = require("./config");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // body-parser

app.use("/api/v1/", rootRouter);

app.get("/", (req, res) => {
  res.json("Hey there!");
});

app.listen(PORT, () => {
  console.log(`Server listening to the port ${PORT}`);
});
