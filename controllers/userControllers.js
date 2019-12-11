const userModel = require("../models/users");
const userTagModel = require("../models/user_tag");

exports.getDetails = async (req, res) => {
    try{
        const _user = await userModel.getDetails(req.body.id);
        const _tags = await userTagModel.findByUser(req.body.id);

        return res.json({
            user:_user,
            tags:_tags
        });

    }catch(e){
        return res.json({
            status: 507,
            message: "get details user failed"
        });
    }
};
