const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Users} = require('../models/user');
const Joi =require('joi');


router.post('/', async (req,res)=>{
    const {error} =validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Users.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
    
   const token = user.generateAuthToken();
    res.send(token);
});
function validate(req){
    const schema = Joi.object({
        email : Joi.string().min(2).max(200).email().required(),
        password : Joi.string().min(5).max(250).required(),
    });
    return schema.validate(req);
}


module.exports = router;