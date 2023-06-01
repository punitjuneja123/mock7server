const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const { connection } = require("./config/db.config");
const { userRouter } = require("./routes/user.route");
const { restaurantRouter } = require("./routes/restaurant.route");
const { auth } = require("./middleware/auth.middleware");
const { orderRouter } = require("./routes/order.route");

app.get("/", (req, res) => {
  res.send("welcome to food delivery app");
});

app.use(userRouter);
app.use(auth);
app.use(restaurantRouter);
app.use(orderRouter);

app.listen(port, "0.0.0.0", async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("server running at " + port);
});
