const express = require("express");

const restaurantRouter = express.Router();

const { restaurantModel } = require("../models/restaurant.model");

restaurantRouter.post("/api/restaurants", async (req, res) => {
  try {
    let payload = req.body;
    let addRestaurant = await new restaurantModel(payload);
    addRestaurant.save();
    res.status(201);
    res.send("restaurant added");
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

restaurantRouter.get("/api/restaurants", async (req, res) => {
  try {
    let resData = await restaurantModel.find();
    res.send(resData);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

restaurantRouter.get("/api/restaurants/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let resData = await restaurantModel.find({ _id: id });
    res.send(resData);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

restaurantRouter.get("/api/restaurants/:id/menu", async (req, res) => {
  let id = req.params.id;
  try {
    let resData = await restaurantModel.find({ _id: id });
    res.send(resData[0].menu);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

restaurantRouter.post("/api/restaurants/:id/menu", async (req, res) => {
  let id = req.params.id;
  try {
    let resData = await restaurantModel.find({ _id: id });
    if (resData.length > 0) {
      let allMenu = resData[0].menu;
      allMenu.push(req.body);
      console.log(allMenu);
      await restaurantModel.findByIdAndUpdate({ _id: id }, { menu: allMenu });
      res.status(201);
      res.send("item added to menu");
    } else {
      res.status(400);
      res.send("wrong id provided");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

restaurantRouter.delete(
  "/api/restaurants/:resid/menu/:itemid",
  async (req, res) => {
    let resid = req.params.resid;
    let itemid = req.params.itemid;
    try {
      let resData = await restaurantModel.find({ _id: resid });
      if (resData.length > 0) {
        let flag = false;
        let newMenuData = [];
        for (let i = 0; i < resData[0].menu.length; i++) {
          if (itemid == resData[0].menu[i]._id) {
            flag = true;
          } else {
            newMenuData.push(resData[0].menu[i]);
          }
        }
        if (flag == true) {
          await restaurantModel.findByIdAndUpdate(
            { _id: resid },
            { menu: newMenuData }
          );
          res.send("item deleted");
        } else {
          res.status(400);
          res.send("wrong item id");
        }
      } else {
        res.status(400);
        res.send("incorrect resturant id");
      }
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send("something went wrong");
    }
  }
);



module.exports = { restaurantRouter };

// {
//   "name": "Res2",
//   "address": {
//     "street": "2",
//     "city": "ukt",
//     "state": "od",
//     "country": "IND",
//     "zip": "123456"
//   },
//   "menu": [
//     {
//       "name": "Rice",
//       "description": "disc 1wdjald ",
//       "price": 30,
//       "image": "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
//     }
//   ]
// }

// {
//    "name": "Dal",
//    "description": "disc 1wdjald ",
//    "price": 50,
//    "image": "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
// }
