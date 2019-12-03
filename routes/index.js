var express = require("express");
var router = express.Router();
var userController = require("../controllers/adminController");

router.get("/me", function(req, res, next) {
  return res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    picture:req.user.picture
  });
});


module.exports = router;
