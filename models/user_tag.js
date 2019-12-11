const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");

module.exports.deleteTag = async (tag) => {
  return  await dbs.production.collection('user_tag').updateOne({ tag: ObjectId(tag) },
    {
      $set: {
        isDeleted: true
      }
    });
};