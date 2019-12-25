const userModel = require("../models/users");
const userTagModel = require("../models/user_tag");

exports.getDetails = async (req, res) => {
  try {
    const _user = await userModel.getDetails(req.body.id);

    if (_user.role === "tutor") {
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

exports.block = async (req, res) => {
  try {
    const _user = await userModel.block(req.body.id);

    if (!_user) {
      return res.json({
        status: "failed",
        message: "block user failed"
      });
    }

    return res.json({
        status: "success",
        message: "success"
    });
  } catch (e) {
    return res.json({
        status: "failed",
        message: "block user failed"
    });
  }
};

exports.unblock = async (req, res) => {
    try {
      const _user = await userModel.unblock(req.body.id);
  
      if (!_user) {
        return res.json({
          status: "failed",
          message: "unblock user failed"
        });
      }
  
      return res.json({
          status: "success",
          message: "success"
      });
    } catch (e) {
      return res.json({
          status: "failed",
          message: "unblock user failed"
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


exports.top10byincome = async(req,res) =>{
  try {
    const _toplist = await userModel.findTop10ByIncome();

    if (!_toplist) {
      return res.json({
        status: 507,
        message: "get top user failed"
      });
    }

    return res.json({
      toplist: _toplist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top users failed"
    });
  }
}

exports.top10byincomeday = async(req,res) =>{
  try {
    const _toplist = await userModel.findTop10ByIncomeDay();

    if (!_toplist) {
      return res.json({
        status: 507,
        message: "get top user failed"
      });
    }

    return res.json({
      toplist: _toplist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top users failed"
    });
  }
}

exports.top10byincomeweek = async(req,res) =>{
  try {
    const _toplist = await userModel.findTop10ByIncomeWeek();

    if (!_toplist) {
      return res.json({
        status: 507,
        message: "get top user failed"
      });
    }

    return res.json({
      toplist: _toplist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top users failed"
    });
  }
}

exports.top10byincomemonth = async(req,res) =>{
  try {
    const _toplist = await userModel.findTop10ByIncomeMonth();

    if (!_toplist) {
      return res.json({
        status: 507,
        message: "get top user failed"
      });
    }

    return res.json({
      toplist: _toplist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top users failed"
    });
  }
}

exports.top10byincomeyear = async(req,res) =>{
  try {
    const _toplist = await userModel.findTop10ByIncomeYear();

    if (!_toplist) {
      return res.json({
        status: 507,
        message: "get top user failed"
      });
    }

    return res.json({
      toplist: _toplist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top users failed"
    });
  }
}

exports.top10incomebytag = async(req,res) =>{
  try {
    const _taglist = await userModel.findTop10IncomeByTag();

    if (!_taglist) {
      return res.json({
        status: 507,
        message: "get top tags failed"
      });
    }

    return res.json({
      taglist: _taglist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top tags failed"
    });
  }
}
exports.top10incomebytagbyday = async(req,res) =>{
  try {
    const _taglist = await userModel.findTop10IncomeByTagByDay();

    if (!_taglist) {
      return res.json({
        status: 507,
        message: "get top tags failed"
      });
    }

    return res.json({
      taglist: _taglist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top tags failed"
    });
  }
}
exports.top10incomebytagbyweek = async(req,res) =>{
  try {
    const _taglist = await userModel.findTop10IncomeByTagByWeek();

    if (!_taglist) {
      return res.json({
        status: 507,
        message: "get top tags failed"
      });
    }

    return res.json({
      taglist: _taglist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top tags failed"
    });
  }
}
exports.top10incomebytagbymonth = async(req,res) =>{
  try {
    const _taglist = await userModel.findTop10IncomeByTagByMonth();

    if (!_taglist) {
      return res.json({
        status: 507,
        message: "get top tags failed"
      });
    }

    return res.json({
      taglist: _taglist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top tags failed"
    });
  }
}
exports.top10incomebytagbyyear = async(req,res) =>{
  try {
    const _taglist = await userModel.findTop10IncomeByTagByYear();

    if (!_taglist) {
      return res.json({
        status: 507,
        message: "get top tags failed"
      });
    }

    return res.json({
      taglist: _taglist,
    });
  } catch (e) {
    return res.json({
      status: 508,
      message: "get top tags failed"
    });
  }
}
