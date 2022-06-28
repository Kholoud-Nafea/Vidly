const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi =require('joi');

//schema
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:2,
        maxlength:200
    },
    email:{
        type: String,
        unique:true,
        required: true,
        minlength:2,
        maxlength:200
    },
    password: {
        type:String,
        required: true,
        minlength:5,
        maxlength:1024
    },
    isAdmin: Boolean
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id , isAdmin:this.isAdmin}, config.get('jwtPrivateKey'));
    return token
}

const Users = mongoose.model('Users',userSchema);

function validateUser(user){
    
    const schema = Joi.object({
        name : Joi.string().min(2).max(200).required(),
        email : Joi.string().min(2).max(200).email().required(),
        password : Joi.string().min(5).max(250).required()
    });
    return schema.validate(user);
    //Joi.validate(user, schema);
}

exports.Users = Users;
exports.validate = validateUser;