const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customers} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router();

Fawn.init(mongoose);

router.get('/' , async (req, res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req,res)=>{
    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invaled movie.. ');

    const customer = await Customers.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invaled customer.. ');
    
    if (movie.numberInStock === 0) return res.status.send('Movie is not in stock..');
    
    let rental = new Rental ({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

try{
    new Fawn.Task()
    .save('rental',rental)
    .update('movie',{_id:movie._id}, {
        $inc:{numberInStock:-1}
    })
  .run();
  res.send(rental);
}
catch(ex){
    res.status(500).send('something failed..');
}
});


router.put('/:id', async (req,res)=>{
    const rental = await Rental.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    
    if(!rental) return res.status(404).send("genre with id not found");
    const {error} =validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    res.send(rental);
});

 router.delete('/:id', async (req,res)=>{
     const rental =await Rental.findByIdAndRemove(req.params.id);

    if(!rental) return res.status(404).send("genre with id not found");

    res.send(rental);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    
    if (!rental) return res.status(404).send('The genre with the given ID was not found.');
    res.send(rental);
  });

module.exports = router;