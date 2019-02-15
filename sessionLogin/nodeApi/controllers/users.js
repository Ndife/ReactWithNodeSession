const userService = require('../service/users');


exports.addUsers = (req,res) => {
    const {body} = req;
    const {
        firstname,
        lastname,
        email,
        password
    } = body;
    
    return userService.addUser(body,req,res);
}

exports.getAllUsers = (req,res) =>{
    return userService.getAllUser(req,res);
}

exports.signIn = (req,res) => {
    const {body} = req;
    const {email, password} = body;
    return userService.signIn(body,req,res);
}

exports.verifyUser = (req,res) =>{
    const {query} = req;
    const {token} = query;
    return userService.verifyUser(query,req,res);
}

exports.signOut = (req,res) => {
    const {query} = req;
    const {token} = query;
    return userService.signOut(query,res,res);
}