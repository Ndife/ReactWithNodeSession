const userModel = require('../models/UserSession');
const bRepo = require('../repo/baseRepo');

function sessionRepo(){

}

sessionRepo.prototype = bRepo(userModel);

module.exports = new sessionRepo();