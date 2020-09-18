const userController = {};

const User = require('../models/user.model')

userController.getUsers = async(req, res)=>{
    const users = await User.find();
    return res.json(users);
}

module.exports = userController;
