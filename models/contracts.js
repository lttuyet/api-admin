const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");

// Chờ xác nhận - vàng, Bị từ chối - đỏ đô, Còn thời hạn xanh lá, Bị khiếu nại - đỏ chói, đã thanh toán - xanh dương

module.exports.getAll = async () => {
  const allContracts = await dbs.production
    .collection("contracts")
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "tutor",
          foreignField: "_id",
          as: "tutorInfo"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "learner",
          foreignField: "_id",
          as: "learnerInfo"
        }
      },
      {
        $project: {
          _id: "$_id",
          nameTutor: "$tutorInfo.name",
          emailTutor: "$tutorInfo.email",
          nameLearner: "$learnerInfo.name",
          emailLearner: "$learnerInfo.email",
          status: "$status"
        }
      }
    ])
    .toArray();

  return allContracts;
};

module.exports.getDetails = async id => {
  const contract = await dbs.production
    .collection("contracts")
    .aggregate([
      { $match: { _id: ObjectId(id), isDeleted: false } },
      {
        $lookup: {
          from: "users",
          localField: "tutor",
          foreignField: "_id",
          as: "tutorInfo"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "learner",
          foreignField: "_id",
          as: "learnerInfo"
        }
      },
      {
        $project: {
          _id: "$_id",
          tutor: "$tutorInfo",
          learner:"$learnerInfo",
          status: "$status",
          hours: "$hours",
          time: "$time",
          startDate: "$startDate",
          endDate:"$endDate",
          paidDate:"$paidDate"
        }
      }
    ])
    .toArray();

  return contract[0];
};

/*
  const typicalTutors = await dbs.production.collection('users').aggregate([
        { $match: { role: "tutor", isDeleted: false } },
        {
            $lookup: {
                from: 'contracts',
                localField: '_id',
                foreignField: 'tutor',
                as: 'tutor_contracts'
            }
        },
        {
            $project:{
                    _id:"$_id",
                    name:"$name",
                    image:"$image",
                    intro:"$intro",
                    price:"$price",
                    address:"$address",
                    numOfContracts:{$size:"$tutor_contracts"}
                }
        },
        {
            $sort:{numOfContracts:-1}
        },
        {
            $limit:4
        },
        {
            $lookup: {
                from: 'user_tag',
                localField: '_id',
                foreignField: 'user',
                as: 'tutorTag'
            }
        },
        {
            $lookup: {
                from: 'tags',
                localField: 'tutorTag.tag',
                foreignField: '_id',
                as: 'tags'
            }
        },
        {
            $project:{
                    _id:"$_id",
                    name:"$name",
                    image:"$image",
                    intro:"$intro",
                    price:"$price",
                    address:"$address",
                    numOfContracts:"$numOfContracts",
                    tags:"$tags.name"
                }
        }
    ]).toArray();
  */
