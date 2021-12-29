const express = require('express');
const mongoose = require('mongoose');
const  userRoutes  = require('./routes/userRoutes');

// set up our express app
const app = express();

// connect to mongodb

mongoose.connect('mongodb+srv://weather:12345@cluster0.jtsgl.mongodb.net/weather?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;


app.use(express.static('public'));

app.use(express.json());

// initialize routes
app.use('/api/user',userRoutes);

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(400).send({error: err.message});
});


// listen for requests
app.listen(process.env.port || 5000, function(){
    console.log('Ready to Go!');
});

