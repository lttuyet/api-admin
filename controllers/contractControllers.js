const contractModel = require("../models/contracts");

exports.getAll = async (req, res) => {
    const allContracts = await contractModel.getAll();

    if (allContracts) {
        return res.json(allContracts);
    } else {
        return res.json({
            status:"failed",
            message: "get all contracts failed"
        });
    }
};