const express = require("express");
const app = express();
const rootRouter = require("./routes/routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("server running at 3000");
});
