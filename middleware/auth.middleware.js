const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token = req.headers.authorization;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.secret, (err, decode) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send("plese provide a correct token");
      } else {
        req.body.userID = decode.userID;
        next();
      }
    });
  } else {
    res.send("please provide a token");
  }
}

module.exports = { auth };
