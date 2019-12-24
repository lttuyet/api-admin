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

module.exports.findSumHoursByTutor = async () => {
  const tutors = await dbs.production.collection('users').aggregate([
    { $match: { role: "tutor", isDeleted: false, isblocked: false, isActivated: true } }, // match dùng để lọc dữ liệu theo các trường
    {
        $lookup: {
            from: 'contracts',
            localField: '_id',
            foreignField: 'tutor',
            
            as: 'tutor_contracts'
        },
    }, // Lấy danh sách hợp đồng

    {
       
        $project: {
            _id: "$_id",
            name: "$name",
            image: "$image",
            intro: "$intro",
            price: "$price",
            address: "$address",
            status: "$tutor_contracts.status",
            hours: "$tutor_contracts.hours",
            
            
          
        }
    }, // Tính số hợp đồng
    {
      $match:{
        status:"Đã thanh toán"
      }
    },{
       
      $project: {
          _id: "$_id",
          name: "$name",
          image: "$image",
          intro: "$intro",
          price: "$price",
          address: "$address",
          status: "$tutor_contracts.status",
          total:{ $multiply: [ "$price", { $sum: "$hours" }]},
          
        
      }
  },

    {
        $sort: { total: -1 }
    }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
    {
        $limit: 10
    },
    {
        $project: {
            _id: "$_id",
            name: "$name",
            image: "$image",
            intro: "$intro",
            price: "$price",
            address: "$address",
            total: "$total"
            
        }
    } // Chọn trường
]).toArray();

return tutors;
};