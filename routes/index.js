var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");
var tagController = require("../controllers/tagControllers");
var userController = require("../controllers/userControllers");

router.post("/insertadmin", adminController.insertAdmin);

router.get("/alltags", tagController.getAll);

router.post("/inserttag", tagController.insertTag);

router.post("/deletetag", tagController.deleteTag);

router.get("/detailsuser", userController.getDetails);

module.exports = router;
