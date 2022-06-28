const mongoose = require('mongoose');
const Joi =require('joi');
const {genreSchema} =require('./genres');
//mongoose schema is represent the model of application that store as a document in mongoDB
const Movie =  mongoose.model('Movie',new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        trim:true
    },
    genre:{
        type:genreSchema, 
        requried:true
    },
    numberInStock:{
        type:Number,
        min:0,
        max:250,
        requried:true
    },
    dailyRentalRate:{
        type:Number,
        min:0,
        max:250,
        requried:true
    }
}));

 function validateMovie(movie){
     const schema= Joi.object({ //joi schema is what the client send to us so we define the genre id because that what will send to us to return info...
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(250).required(),
    dailyRentalRate: Joi.number().min(0).max(250).required()
     });
     return schema.validate(movie);
}

exports.validate =validateMovie;
exports.Movie = Movie;
