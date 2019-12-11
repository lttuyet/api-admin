const tagModel = require("../models/tags");

exports.getAll = async (req, res) => {
    const allTags = await tagModel.getAll();

    if (allTags) {
        return res.json(allTags);
    } else {
        return res.json({
            status:504,
            message: "get all tags failed"
        });
    }
};

exports.insertTag = async (req, res) => {
    const result = await tagModel.insertTag(req.body);

    if (result) {
        return res.json({
            message:"success"
        });
    } else {
        return res.json({
            status:505,
            message: "insert tag failed"
        });
    }
};

exports.deleteTag = async (req, res) => {
    const result = await tagModel.deleteTag(req.body);

    if (result) {
        return res.json({
            message:"success"
        });
    } else {
        return res.json({
            status:506,
            message: "delete tag failed"
        });
    }
};