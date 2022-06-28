const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Customers, validate} = require('../models/customer');


router.get('/' , async (req, res)=>{
    const customers = await Customers.find().sort('name');
    res.send(customers);
});

router.post('/', async (req,res)=>{
    const {error} =validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
     const customer= new Customers({ 
        name:req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
     });
    await customer.save();
    res.send(customer);
});

router.put('/', async (req,res)=> {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {name:req.body.name,
        isGold:req.body.isGold,
    phone:req.body.phone
}, {new:true});
if(!customer) return res.status(404).send('The customer with the given id does not excist');
res.send(customer);
});

router.delete('/', async(req, res)=>{
    const customer = Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given id does not excist');
    res.send(customer)
});

router.get('/', async (req, res)=>{
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given id does not excist');
    res.send(customer);
});

module.exports = router;