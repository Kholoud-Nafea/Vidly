const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function (){
    // process.on('uncaughtException', (ex)=>{
//     // console.log('WE GOT AN UNCAUGHT EXCEPTION');
//     winston.error(ex.message,ex);
//     process.exit(1);
// }); 

winston.exceptions.handle(new winston.transports.File({filename:'uncaughtexception.log'}));

process.on('unhandledRejection', (ex)=>{
    // console.log('WE GOT AN UNHANDLED REJECTION');
    // winston.error(ex.message,ex)
    throw ex;
});

//winston.add(winston.transports.File,{filename:'logfile.log'});// there is another one to mongoDB
winston.add(new winston.transports.File({ filename: "logfile.log" }));
// winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost/vidly", level:"info"}));

}