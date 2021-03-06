const express = require('express');
const mongoose = require('mongoose');
const {Movie, validate} = require('../models/movie');
const {Genres} = require('../models/genres');
const router =express.Router();

router.get('/' , async (req, res)=>{
    const movie = await Movie.find().sort('name');
    res.send(movie);
});

router.post('/', async (req,res)=>{
    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genres.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invaled genre.. ')
    
  const movie= new Movie({ 
        title:req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
     });
await movie.save();
    res.send(movie);
});

router.put('/:id', async (req,res)=>{
    const movie = await Movie.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    
    if(!movie) return res.status(404).send("genre with id not found");
    const {error} =validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    res.send(movie);
});

 router.delete('/:id', async (req,res)=>{
     const movie =await Movie.findByIdAndRemove(req.params.id);

    if(!movie) return res.status(404).send("genre with id not found");

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) return res.status(404).send('The genre with the given ID was not found.');
    res.send(movie);
  });


module.exports=router;