var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");
var tagController = require("../controllers/tagControllers");
var userController = require("../controllers/userControllers");
var contractController = require("../controllers/contractControllers");

//---------------Admin----------------
router.post("/insertadmin", adminController.insertAdmin);

router.get("/alladmins", adminController.getAllAdmin);

router.post("/deleteadmin", adminController.deleteAdmin);

//---------------Tag----------------
router.get("/alltags", tagController.getAll);

router.post("/inserttag", tagController.insertTag);

router.post("/deletetag", tagController.deleteTag);

//---------------User----------------
router.post("/detailsuser", userController.getDetails);

router.post("/blockuser", userController.block);

router.post("/unblockuser", userController.unblock);

router.get("/allusers", userController.getAll);

//---------------Contract-----------------
router.get("/allContracts", contractController.getAll);

router.post("/detailscontract", contractController.getDetails);

//---------------- Income ------------------

router.get("/top10byincome",userController.top10byincome);
router.get("/top10byincomeday",userController.top10byincomeday);
router.get("/top10byincomemonth",userController.top10byincomemonth);
router.get("/top10byincomeyear",userController.top10byincomeyear);
router.get("/top10byincomeweek",userController.top10byincomeweek);


module.exports = router;
