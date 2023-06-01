| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | /api/register | This endpoint should allow users to register. Hash the password on store. | 201 | 
| POST | /api/login | This endpoint should allow users to login. Return JWT token on login. | 201 |
| PUT / PATCH | /api/user/:id/reset | This endpoint should allow users to reset the password identified by user id, providing the current password and new password in the body. | 204 |
| GET | /api/restaurants | This endpoint should return a list of all available restaurants. | 200 |
| GET | /api/restaurants/:id | This endpoint should return the details of a specific restaurant identified by its ID. | 200 |
| GET | /api/restaurants/:id/menu | This endpoint should return the menu of a specific restaurant identified by its ID. | 200 |
| POST / PUT | /api/restaurants/:id/menu | This endpoint should allow the user to add a new item to a specific restaurants menu identified by it id. | 201 |
| DELETE | /api/restaurants/:id/menu/:id | This endpoint should allow the user to delete a particular menu item identified by its id from a specific restaurant. | 202 |
| POST | /api/orders | This endpoint should allow the user to place an order. | 201 |
| GET | /api/orders/:id | This endpoint should return the details of a specific order identified by its ID. | 200 |
| PUT / PATCH | /api/orders/:id | This endpoint should allow users to update the status of a specific order identified by its ID. | 204 |


Body

USER ROUTE

/api/register - {
                    "name": String,
                    "email": String,
                    "password": String,
                    "address": {
                        "street": String,
                        "city": String,
                        "state": String,
                        "country": String,
                        "zip": String
                    }
                }

/api/login - {"email": String,
            "password": String}

/api/user/:id/reset - {
  "currentPassword":"1234",
  "newPassword":"12345"
}

Restaurants routes

/api/restaurants- (POST) -{
  "name": "Res2",
  "address": {
    "street": "2",
    "city": "ukt",
    "state": "od",
    "country": "IND",
    "zip": "123456"
  },
  "menu": [
    {
      "name": "Rice",
      "description": "disc 1wdjald ",
      "price": 30,
      "image": "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
  ]
}



/api/restaurants- (POST) -nothing required in body

/api/restaurants/:id- (GET) -nothing required in body

/api/restaurants/:id/menu-(GET) -nothing required in body

/api/restaurants/:id/menu -(POST) -{
   "name": "Dal",
   "description": "disc 1wdjald ",
   "price": 50,
   "image": "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
}

/api/restaurants/:id/menu/:id -(DELETE) -nothing required in body

ORDER ROUTE

/api/orders-(POST)-{
  "restaurant": "6478430428d70088be527ce7",
  "items": [
    {
      "name": "Dal",
      "price": 50,
      "quantity": 2
    }
  ],
  "totalPrice": 100,
  "deliveryAddress": {
    "street": "1",
    "city": "ukt",
    "state": "od",
    "country": "IND",
    "zip": "123456"
  }
}

/api/orders/:id - (GET) -nothing required in body

/api/orders/:id - (PATCH) - {"status": String // e.g, "placed", "preparing", "on the way", "delivered"}