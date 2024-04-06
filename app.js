const express = require("express");
require("dotenv").config();
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const { notFound } = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const port = process.env.PORT || 3000;
// Middleware
app.use(express.static("./public"));
app.use(express.json());
// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port-${port}`);
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
start();
