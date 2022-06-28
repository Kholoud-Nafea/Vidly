const mongoose = require('mongoose');
const Joi =require('joi');

//schema
const genreSchema =new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:2,
        maxlength:20
    }
})
const Genres = mongoose.model('Genres',genreSchema);

function validateGenres(genre){
    const schema = Joi.object({
        name : Joi.string().min(2).required()
    });
    return schema.validate(genre);
}

exports.Genres = Genres;
exports.validate = validateGenres;
exports.genreSchema =genreSchema;