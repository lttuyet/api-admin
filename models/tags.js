const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");
const userTagModel = require("./user_tag");

module.exports.getAll = async () => {
  return await dbs.production.collection("tags").find({ isDeleted: false }).toArray();
};

const findByName = async (_name) => {
  return await dbs.production.collection('tags').find({
    name: _name,
    isDeleted: false
  }).toArray();
};
exports.findByName = findByName;

const findById = async (id) => {
  try{
    const res = await dbs.production.collection('tags').findOne({_id:ObjectId(id),isDeleted: false});

    return res;
  }catch(e){
    return false;
  }
  
};
exports.findById = findById;

module.exports.insertTag = async (data) => {
  const existedTags = await findByName(data.name);

  if (existedTags.length > 0) {
    return false;
  }

  return await dbs.production.collection("tags").insertOne({
    name: data.name,
    isDeleted: false
  });
};

module.exports.deleteTag = async (data) => {
  try {
    await dbs.production.collection('tags').updateOne({ _id: ObjectId(data.id) },
      {
        $set: {
          isDeleted: true
        }
      });

    await userTagModel.deleteTag(data.id);

    return true;
  } catch (e) {
    return false;
  }
};