var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");
var tagController = require("../controllers/tagControllers");
var userController = require("../controllers/userControllers");

//---------------Admin----------------
router.post("/insertadmin", adminController.insertAdmin);

//---------------Tag----------------
router.get("/alltags", tagController.getAll);

router.post("/inserttag", tagController.insertTag);

router.post("/deletetag", tagController.deleteTag);

//---------------User----------------
router.get("/detailsuser", userController.getDetails);

router.get("/allusers", userController.getAll);

module.exports = router;
