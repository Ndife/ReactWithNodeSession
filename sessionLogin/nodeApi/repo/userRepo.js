const userModel = require('../models/User');
const bRepo = require('../repo/baseRepo');

function userRepo(){

}

userRepo.prototype = bRepo(userModel);

module.exports = new userRepo();