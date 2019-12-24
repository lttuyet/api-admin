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

module.exports.findTop10ByIncome = async () => {
  const tutors = await dbs.production.collection('contracts').aggregate([
    { $match: { status: "Đã thanh toán" } }, // match dùng để lọc dữ liệu theo các trường
    {
        $lookup: {
            from: 'users',
            localField: 'tutor',
            foreignField: '_id',
            
            as: 'tutor_contracts'
        },
    }, // Lấy danh sách hợp đồng
    {
       
        $project: {
          
            name: "$tutor_contracts.name",
            image: "$tutor_contracts.image",
            hours: "$hours",
            price: "$price",
            status: "$status",
            total:{ $multiply: [ "$price", { $sum: "$hours" }]},
            
          
        }
    }, // Tính số hợp đồng

    {
        $sort: { total: -1 }
    }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
    {
        $limit: 10
    },
    {
        $project: {
          
            name: "$name",
            image: "$image",
            price: "$price",
            total: "$total"
            
        }
    } // Chọn trường
]).toArray();

return tutors;
};

module.exports.findTop10ByIncome = async () => {
  

  const tutors = await dbs.production.collection('contracts').aggregate([
    { $match: {  status: "Đã thanh toán"}}, // match dùng để lọc dữ liệu theo các trường
    {
        $lookup: {
            from: 'users',
            localField: 'tutor',
            foreignField: '_id',
            
            as: 'tutor_contracts'
        },
    }, // Lấy danh sách hợp đồng
    {
       
        $project: {
          
            name: "$tutor_contracts.name",
            image: "$tutor_contracts.image",
            hours: "$hours",
            price: "$price",
            status: "$status",
            total:{ $multiply: [ "$price", { $sum: "$hours" }]},
            
          
        }
    }, // Tính số hợp đồng

    {
        $sort: { total: -1 }
    }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
    {
        $limit: 5
    },
    {
        $project: {
          
            name: "$name",
            image: "$image",
            price: "$price",
            total: "$total"
            
        }
    } // Chọn trường
]).toArray();

return tutors;
};

module.exports.findTop10ByIncomeDay = async () => {
  let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    
    today = `${dd  }/${  mm  }/${  yyyy}`;

  const tutors = await dbs.production.collection('contracts').aggregate([
    { $match: {  status: "Đã thanh toán", paidDate: today  }}, // match dùng để lọc dữ liệu theo các trường
    {
        $lookup: {
            from: 'users',
            localField: 'tutor',
            foreignField: '_id',
            
            as: 'tutor_contracts'
        },
    }, // Lấy danh sách hợp đồng
    {
       
        $project: {
          
            name: "$tutor_contracts.name",
            image: "$tutor_contracts.image",
            hours: "$hours",
            price: "$price",
            status: "$status",
            total:{ $multiply: [ "$price", { $sum: "$hours" }]},
            
          
        }
    }, // Tính số hợp đồng

    {
        $sort: { total: -1 }
    }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
    {
        $limit: 5
    },
    {
        $project: {
          
            name: "$name",
            image: "$image",
            price: "$price",
            total: "$total"
            
        }
    } // Chọn trường
]).toArray();

return tutors;
};