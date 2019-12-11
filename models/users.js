const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");

module.exports.getDetails = async (id) => {
    try{
        return  await dbs.production.collection('users').findOne({_id:ObjectId(id)});
    }catch(e){
        return false;
    }
};