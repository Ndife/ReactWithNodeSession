const userRepo = require('../repo/userRepo');
const sessionRepo = require('../repo/sessionRepo');
const userModel = require('../models/User');

const user = new userModel();

exports.addUser = (data,req,res) => {
    
    data.password = user.generateHash(data.password)
    data.email = data.email.toLowerCase();

    userRepo.get({email:data.email},(err,previousEmail) =>{
        if (err) res.send(err);
        else if(previousEmail.length > 0){
          return res.send({
            success: false,
            message: " Email already exist"
          });
        }else {
            userRepo.add(data, (err,info) => {
                if (err) res.send(err)
                res.send({
                    success: true,
                    message: info
                });
            });
        }    
    })
 
}

exports.getAllUser = (req,res) =>{
    userRepo.get({},(err,result) =>{
        if(err) res.send(err);
        return res.send({
            success: true,
            message: result
        })
    });
}


exports.signIn = (data,req,res) =>{
    data.email = data.email.toLowerCase();

    userRepo.getByParams({email:data.email},(err,users) =>{
        if(err) return res.send(err);
        else if(!users) 
        return res.send({
            success: false,
            message: " Email does not exist"
          });
        else{
            if(!user.validPassword(data.password,users.password)){
                return res.send({
                    success: false,
                    message: "password is incorrect: "+ data.password
                  });
            }

            sessionRepo.userId = users._id
            sessionRepo.add(sessionRepo,(err, doc) =>{
                if(err) return res.send(err)
                return res.send({success:true, token: doc._id });
            })
    } 
    })
}

exports.verifyUser = (data,req,res) => {
    sessionRepo.getById(data.token,(err, doc) => {
       if(doc) return res.send({success:true, message:'User verified successfully'});
       else return res.send({success:'false', message:'User not recognise'});
    })
}

exports.signOut = (data,req,res) => {
    sessionRepo.updateData({_id:data.token},{$set:{isDeleted:true}},(err,session) =>{
        if(err) return res.send(err);
        else if(session){
            return res.send({
                success:true, 
                message:'Logged out successfully'
            })
        }
        else {
            return res.send({
                success:false, 
                message:'Logged out Failed'
            })
        }
    })

}