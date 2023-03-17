const express = require("express");
const app = express();
const { sequelize } = require("./db");
const { seed } = require("./seed");
const showRouter = require("./routes/shows");
const userRouter = require("./routes/users");

const port = 3030;

//include Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express routes
app.use("/shows", showRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  //sequelize.sync();
  console.log(`Server listening on port ${port}`);
});
