const adminModel = require("../models/admins");

exports.insertAdmin = async (req, res) => {
  const existedAdmins = await adminModel.findAdminByUsername(req.body.username);

  if (existedAdmins) {
    return res.json({
      status: 500,
      message: "existed account"
    });
  } else {
    await adminModel.insertAdmin(req.body);

    return res.json({
      message: "success"
    });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const allAdmin = await adminModel.getAllAdmin();

    if (!allAdmin) {
      return res.json({
        status: 507,
        message: "get details admin failed"
      });
    }

    return res.json({
        admins: allAdmin
    });
  }catch(e){
      return res.json({
          status: 508,
          message: "get all admin failed"
      });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const result = await adminModel.deleteAdmin(req.body.id);

    if (!result) {
      return res.json({
        status: "failed",
        message: "delete admin failed"
      });
    }

    return res.json({
      status: "success",
      message: "success"
    });
  }catch(e){
      return res.json({
          status: "failed",
          message: "delete admin failed"
      });
  }
};
