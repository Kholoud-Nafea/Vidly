const express = require('express');
const geners =require('../routes/genres');
const customers =require('../routes/customer');
const movies = require('../routes/movie');
const rentals = require('../routes/rental');
const users = require('../routes/user');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(apps){
    apps.use(express.json());
    apps.use('/api/genres',geners);
    apps.use('/api/customer',customers);
    apps.use('/api/movie', movies);
    apps.use('/api/rental', rentals);
    apps.use('/api/user', users);
    apps.use('/api/auth', auth);
    apps.use(error);
}