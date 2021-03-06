const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSession = new Schema({
    userId:{
        type: String,
        default: ''
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('userSession', userSession);