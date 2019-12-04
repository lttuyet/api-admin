var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");

router.post("/insertadmin", adminController.insertAdmin);

module.exports = router;
