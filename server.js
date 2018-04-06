const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/apinode');

//midleware
mongoose.Promise = global.Promise;
app.use(logger('dev'));
app.use(bodyParser.json());

//route
const users = require('./app/routes/users');
app.use('/users', users);

//forward error handler
app.use((req, res, next) => {
    const err = new Error('Not FOund');
    err.status = 404;
    next(err);
});

//error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    //respon to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    //respon to ourselves
    console.error(err);


});



//start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log('server listener on port ${port}'));