var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();
const passport = require("passport");

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, admin, info) => {
    if (err || !admin) {
      return res.json({
        status: 501,
        message: 'failed login'
      });
    }

    req.login(admin, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(admin, 'your_jwt_secret');

      const data = {
        image: admin.image
      }
      return res.json({
        data,
        token
      });
    });
  })(req, res, next);

});

module.exports = router;
