const winston = require('winston');
const express = require('express');
const apps = express(); 

require('./startup/logging'); 
require('./startup/routes')(apps); //because it is return a function 
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

// //throw new Error('something failed during startup');
// const p = Promise.reject(new Error('something failed misurably! '));
// p.then(console.log("Done..."));

const port = process.env.PORT || 3000;
apps.listen(port, winston.info(`listening on port ${port}....`));