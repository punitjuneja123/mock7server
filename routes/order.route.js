const express = require("express");

const orderRouter = express.Router();

const { orderModel } = require("../models/order.model");

orderRouter.post("/api/orders", async (req, res) => {
  try {
    let payload = req.body;
    payload.user = payload.userID;
    let userOrder = await new orderModel(payload);
    userOrder.save();
    res.status(201);
    res.send("order added");
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

orderRouter.get("/api/orders/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let orderData = await orderModel.find({ _id });
    if (orderData.length > 0) {
      res.send(orderData);
    } else {
      res.status(400);
      res.send("plese provide correct ID");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

orderRouter.patch("/api/orders/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let orderData = await orderModel.find({ _id });
    if (orderData.length > 0) {
      await orderModel.findByIdAndUpdate({ _id }, { status: req.body.status });
      res.send("status updated");
    } else {
      res.status(400);
      res.send("plese provide correct ID");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});
module.exports = { orderRouter };

// {
//   "restaurant": "6478430428d70088be527ce7",
//   "items": [
//     {
//       "name": "Dal",
//       "price": 50,
//       "quantity": 2
//     }
//   ],
//   "totalPrice": 100,
//   "deliveryAddress": {
//     "street": "1",
//     "city": "ukt",
//     "state": "od",
//     "country": "IND",
//     "zip": "123456"
//   }
// }
