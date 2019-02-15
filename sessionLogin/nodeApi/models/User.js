const bcryptjs = require('bcryptjs');
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname:{
		type: String,
		default: ''
	},
	lastname:{
		type: String,
		default: ''},
	email:{
		type: String,
		default: ''
	},
	password:{
		type: String,
		default: ''
	},
	isDeleted: {
		type: Boolean,
		default: false

	}
})

userSchema.methods.generateHash = function(password){
	return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password,currentPassword){
	return bcryptjs.compareSync(password, currentPassword);
};


module.exports = mongoose.model('User', userSchema);