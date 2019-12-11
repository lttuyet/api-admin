const userModel = require("../models/users");
const userTagModel = require("../models/user_tag");

exports.getDetails = async (req, res) => {
    try {
        const _user = await userModel.getDetails(req.body.id);

        if (req.body.role === 'tutor') {
            const _tags = await userTagModel.findByUser(req.body.id);

            if (!_user || !_tags) {
                return res.json({
                    status: 507,
                    message: "get details user failed"
                });
            }

            return res.json({
                user: _user,
                tags: _tags
            });
        } else {
            if (!_user) {
                return res.json({
                    status: 507,
                    message: "get details user failed"
                });
            }

            return res.json({
                user: _user
            });
        }


    } catch (e) {
        return res.json({
            status: 507,
            message: "get details user failed"
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const allUsers = await userModel.getAll();

        if (!allUsers) {
            return res.json({
                status: 507,
                message: "get details user failed"
            });
        }

        return res.json({
            users: allUsers
        });

    } catch (e) {
        return res.json({
            status: 508,
            message: "get all users failed"
        });
    }
};