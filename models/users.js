const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");

module.exports.getDetails = async (id) => {
    try{
        return  await dbs.production.collection('users').findOne({_id:ObjectId(id)});
    }catch(e){
        return false;
    }
};

module.exports.block = async (id) => {
    try {
        return await dbs.production.collection('users').updateOne({ _id: ObjectId(id) },
          {
            $set: {
              isblocked: true
            }
          });
      } catch (e) {
        return false;
      }
};
module.exports.unblock = async (id) => {
    try {
        return await dbs.production.collection('users').updateOne({ _id: ObjectId(id) },
          {
            $set: {
              isblocked: false
            }
          });
      } catch (e) {
        return false;
      }
};

module.exports.getAll = async () => {
    try{
        return  await dbs.production.collection('users').find({isDeleted:false}).toArray();
    }catch(e){
        return false;
    }
};