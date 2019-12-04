const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");
const SALT_ROUNDS = 10;
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");

module.exports.findAdminByUsername = async (_username) => {
  return await dbs.production.collection("admins").findOne({ username: _username });
};

module.exports.findAdminById = async (id) => {
  return await dbs.production.collection("admins").findById(id);
};

module.exports.insertAdmin = async (admin) => {
  const hash = await bcrypt.hash(admin.password, SALT_ROUNDS);
  const newAdmin = {
    name: admin.name,
    username: admin.username,
    address: admin.address,
    phone: admin.phone,
    email: admin.email,
    password: hash
  };

  return await dbs.production.collection("admins").insertOne(newAdmin);
};
