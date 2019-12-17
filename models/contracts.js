const ObjectId = require("mongodb").ObjectId;
const { dbs } = require("../dbs");

// Chờ xác nhận - vàng, Bị từ chối - đỏ đô, Còn thời hạn xanh lá, Bị khiếu nại - đỏ chói, đã thanh toán - xanh dương

module.exports.getAll = async () => {
  const allContracts = await dbs.production.collection("contracts").aggregate([
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
          emailTutor:"$tutorInfo.email",
          nameLearner: "$learnerInfo.name",
          emailLearner:"$learnerInfo.email",
          status:"$status"
        }
      }])
    .toArray();

  return allContracts;
};
