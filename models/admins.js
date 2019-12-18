const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");
const SALT_ROUNDS = 10;
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");

module.exports.findAdminByUsername = async _username => {
  return await dbs.production
    .collection("admins")
    .findOne({ username: _username,isDeleted:false });
};

module.exports.findAdminById = async id => {
  return await dbs.production.collection("admins").findOne(id);
};

module.exports.insertAdmin = async admin => {
  const existAdmin = await dbs.production.collection("admins").findOne({
    username:admin.username,
    isDeleted: false
  });

  if (!existAdmin) {
    const hash = await bcrypt.hash(admin.password, SALT_ROUNDS);
    const newAdmin = {
      name: admin.name,
      username: admin.username,
      address: admin.address,
      phone: admin.phone,
      email: admin.email,
      password: hash,
      isDeleted: false
    };

    return await dbs.production.collection("admins").insertOne(newAdmin);
  } else {
    return false;
  }
};

module.exports.getAllAdmin = async () => {
  try {
    return await dbs.production
      .collection("admins")
      .find({ isDeleted: false })
      .toArray();
  } catch (e) {
    return false;
  }
};

module.exports.deleteAdmin = async id => {
  try {
    return await dbs.production.collection("admins").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          isDeleted: true
        }
      }
    );
  } catch (e) {
    return false;
  }
};
