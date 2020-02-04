const db = require('../factories/databaseFactory');
const validator = require('validator');

var schema = {
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Please enter your password!')
            }
        }
    },
    token:{
        type:String,
        required: true
    },
    isConnected:{
        type: Boolean,
        required: true,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
};

var userModel = new db.Schema(schema);

module.exports = db.mongoose.model('User', userModel, 'User');