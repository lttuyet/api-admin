const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");

module.exports.getDetails = async id => {
  try {
    return await dbs.production
      .collection("users")
      .findOne({ _id: ObjectId(id) });
  } catch (e) {
    return false;
  }
};

module.exports.block = async id => {
  try {
    return await dbs.production.collection("users").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          isblocked: true
        }
      }
    );
  } catch (e) {
    return false;
  }
};
module.exports.unblock = async id => {
  try {
    return await dbs.production.collection("users").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          isblocked: false
        }
      }
    );
  } catch (e) {
    return false;
  }
};

module.exports.getAll = async () => {
  try {
    return await dbs.production
      .collection("users")
      .find({ isDeleted: false })
      .toArray();
  } catch (e) {
    return false;
  }
};



module.exports.findTop10ByIncome = async () => {
  const tutors = await dbs.production
    .collection("contracts")
    .aggregate([
      { $match: { status: "Đã thanh toán" } }, // match dùng để lọc dữ liệu theo các trường
      {
        $lookup: {
          from: "users",
          localField: "tutor",
          foreignField: "_id",

          as: "tutor_contracts"
        }
      }, // Lấy danh sách hợp đồng
      {
        $project: {
          id: "$tutor_contracts._id",
          total: { $multiply: ["$price", "$hours" ] }
        }
      }, // Tính số hợp đồng
      {
        $group:
          {
            _id: "$id",
            totalAmount: { $sum:  "$total"  },         
          }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",

          as: "tutor"
        }
      },
      {
        $project: {
          
          name: "$tutor.name",
          image: "$tutor.image",
          total: "$totalAmount",
        }
      }, 

      {
        $sort: { total: -1 }
      }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
      {
        $limit: 5
      },
      // Chọn trường
    ])
    .toArray();

  return tutors;
};

module.exports.findTop10ByIncomeDay = async () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  const tutors = await dbs.production
    .collection("contracts")
    .aggregate([
      { $match: { status: "Đã thanh toán", paidDate: today } }, // match dùng để lọc dữ liệu theo các trường
      {
        $lookup: {
          from: "users",
          localField: "tutor",
          foreignField: "_id",

          as: "tutor_contracts"
        }
      }, // Lấy danh sách hợp đồng
      {
        $project: {
          id: "$tutor_contracts._id",
          total: { $multiply: ["$price", "$hours" ] }
        }
      }, // Tính số hợp đồng
      {
        $group:
          {
            _id: "$id",
            totalAmount: { $sum:  "$total"  },         
          }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",

          as: "tutor"
        }
      },
      {
        $project: {
          
          name: "$tutor.name",
          image: "$tutor.image",
          total: "$totalAmount",
        }
      }, 

      {
        $sort: { total: -1 }
      }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
      {
        $limit: 5
      },
       // Chọn trường
    ])
    .toArray();

  return tutors;
};

module.exports.findTop10ByIncomeWeek = async () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  

  today = `${yyyy}-${mm}-${dd}`;
  const _year = 2018;
  console.log(new Date("2019-10-10"));
  const tutors = await dbs.production
    .collection("contracts")
    .aggregate([
      { $match: { status: "Đã thanh toán" } }, // match dùng để lọc dữ liệu theo các trường

      {
        $lookup: {
          from: "users",
          let: {
            w1: {
              $week: {
                date: {
                  $dateFromString: {
                    dateString: "$paidDate"

                  }
                }
              }
            },
            w2: {
              $week: {
                date: {
                  $dateFromString: {
                    dateString: today

                  }
                }
              }
            },
            user_id: "$tutor",
            paid:"$status"
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$_id", "$$user_id"]
                    },
                    {
                      $eq: ["$$w1", "$$w2"]
                    },
                    
                  ]
                }
              }
            }
          ],
          as: "tutor_contracts"
        }
      }, // Lấy danh sách hợp đồng
      {$match:{
        tutor_contracts: {$ne:[]}
      }},
      {
        $project: {
          id: "$tutor_contracts._id",
          total: { $multiply: ["$price", "$hours" ] },
          
        }
      }, // Tính số hợp đồng
      {
        $group:
          {
            _id: "$id",
            totalAmount: { $sum:  "$total"  },         
          }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",

          as: "tutor"
        }
      },
      {
        $project: {
          
          name: "$tutor.name",
          image: "$tutor.image",
          total: "$totalAmount",
        }
      }, 


      {
        $sort: { total: -1 }
      }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
      {
        $limit: 5
      },
      // Chọn trường
    ])
    .toArray();

  return tutors;
};

module.exports.findTop10ByIncomeMonth = async () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;
  const _year = 2018;
  console.log(new Date("2019-10-10"));
  const tutors = await dbs.production
    .collection("contracts")
    .aggregate([
      { $match: { status: "Đã thanh toán" } }, // match dùng để lọc dữ liệu theo các trường

      {
        $lookup: {
          from: "users",
          let: {
            y: {
              $month: {
                date: {
                  $dateFromString: {
                    dateString: "$paidDate"

                  }
                }
              }
            },
            user_id: "$tutor",
            paid:"$status"
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$_id", "$$user_id"]
                    },
                    {
                      $eq: ["$$y", parseInt(mm)]
                    },
                    
                  ]
                }
              }
            }
          ],
          as: "tutor_contracts"
        }
      }, // Lấy danh sách hợp đồng
      {$match:{
        tutor_contracts: {$ne:[]}
      }},
      {
        $project: {
          
          id: "$tutor_contracts._id",
          total: { $multiply: ["$price", "$hours" ] },
          
        }
      }, // Tính số hợp đồng
      {
        $group:
          {
            _id: "$id",
            totalAmount: { $sum:  "$total"  },         
          }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",

          as: "tutor"
        }
      },
      {
        $project: {
          
          name: "$tutor.name",
          image: "$tutor.image",
          total: "$totalAmount",
        }
      }, 

      {
        $sort: { total: -1 }
      }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
      {
        $limit: 5
      },
       // Chọn trường
    ])
    .toArray();

  return tutors;
};

module.exports.findTop10ByIncomeYear = async () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;
  
  
  const tutors = await dbs.production
    .collection("contracts")
    .aggregate([
      { $match: { status: "Đã thanh toán" } }, // match dùng để lọc dữ liệu theo các trường

      {
        $lookup: {
          from: "users",
          let: {
            y: {
              $year: {
                date: {
                  $dateFromString: {
                    dateString: "$paidDate"

                  }
                }
              }
            },
            user_id: "$tutor",
            paid:"$status"
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$_id", "$$user_id"]
                    },
                    {
                      $eq: ["$$y", parseInt(yyyy)]
                    },
                    
                  ]
                }
              }
            }
          ],
          as: "tutor_contracts"
        }
      }, // Lấy danh sách hợp đồng
      {$match:{
        tutor_contracts: {$ne:[]}
      }},
      {
        $project: {
          
          id: "$tutor_contracts._id",
         
          total: { $multiply: ["$price",  "$hours" ] },
         
        }
      }, // Tính số hợp đồng
      {
        $group:
          {
            _id: "$id",
            totalAmount: { $sum:  "$total"  },         
          }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",

          as: "tutor"
        }
      },
      {
        $project: {
          
          name: "$tutor.name",
          image: "$tutor.image",
          total: "$totalAmount",
        }
      }, 


      {
        $sort: { total: -1 }
      }, // Sắp xếp theo phổ biến // bỏ qua skip tutors
      {
        $limit: 5
      },
      // Chọn trường
    ])
    .toArray();

  return tutors;
};
