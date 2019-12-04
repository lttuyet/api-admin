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
