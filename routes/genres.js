const asyncMiddleWare = require('../middleware/async');
const admin = require('../middleware/admin');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Genres, validate} = require('../models/genres');
const auth = require('../middleware/auth');

router.get('/' , async (req, res)=>{
    throw new Error('could not get the genres.');
     const genres = await Genres.find().sort('name');
    res.send(genres);
});

router.post('/', auth, async (req,res)=>{
    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre= new Genres({ name:req.body.name });
     await genre.save();
    res.send(genre);
});

router.put('/:id', async (req,res)=>{
    const genre = await Genres.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    
    if(!genre) return res.status(404).send("genre with id not found");
    const {error} =validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    res.send(genre);
});

 router.delete('/:id', [auth,admin], async (req,res)=>{
     const genre =await Genres.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send("genre with id not found");

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genres.findById(req.params.id);
    
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  });


module.exports=router;