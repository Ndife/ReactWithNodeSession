var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const { check, validationResult } = require('express-validator/check');

/* Add User. */
router.post('/addUser', 
    check('firstname')
        .isLength({ min:2 }).withMessage("first name cannot be less than 2")
        .isAlphanumeric().withMessage("first name cannot contain symbols or characters "),
    check('lastname')
        .isLength({ min:2 }).withMessage("last name cannot be less than 2")
        .isAlphanumeric().withMessage("last name cannot contain symbols or characters "),
    check('password')
        .isLength({ min:8 }).withMessage("Password cannot be less than 8 characters")
        .matches('[0-9]').withMessage("Password must contain a number")
        .matches('[a-z]').withMessage("Password  must contain a lowercase letter")
        .matches('[A-Z]').withMessage("Password  must contain an uppercase letter"),
    check('email')
        .isEmail().withMessage('please enter a valid email address'),
    (req, res,next) =>{
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({success:'false' , errorMessage:errors.array()});
        } else {
            next()
        }
    },
    userController.addUsers);

/* Get All Users. */
router.get('/getAllUsers', userController.getAllUsers);

/* Users login. */
router
    .post('/login', userController.signIn)
    .get('/verify', userController.verifyUser)
    .get('/signOut', userController.signOut)

module.exports = router;
