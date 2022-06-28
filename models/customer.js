const mongoose = require('mongoose');
const Joi =require('joi');

//schema
const Customers = mongoose.model('Customers',new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:2,
        maxlength:20
    },
    isGold:{
        type: Boolean,
        default:false
    },
    phone: {
        type:String,
        required: true,
        minlength:2,
        maxlength:20
    }
}));

function validateCustomer(customer){
    const schema = Joi.object({
        name : Joi.string().min(2).max(20).required(),
        phone : Joi.string().min(2).max(20).required(),
        isGold : Joi.boolean()
    });
    return schema.validate(customer);
}

exports.Customers = Customers;
exports.validate = validateCustomer;