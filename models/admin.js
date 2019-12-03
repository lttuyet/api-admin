const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");
const SALT_ROUNDS = 10;
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");

module.exports.findAdminByUsername = async (_username) => {
  return await dbs.production.collection("admins").findOne({ username: _username });
};