const express = require('express');
const mongoose = require('mongoose');
const  userRoutes  = require('./routes/userRoutes');
const cors = require('cors')



// set up our express app
const app = express();

app.use(cors())

// connect to mongodb
try {
mongoose.connect('mongodb+srv://weather:12345@cluster0.jtsgl.mongodb.net/weather?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
console.log("connected to db")
}catch(error){
    console.log("not connected to db",error.message)
}

app.use(express.static('public'));

app.use(express.json());





// initialize routes
// app.use('/api',require('./routes/api'));

app.use('/api/user',userRoutes);

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(400).send({error: err.message});
});

app.get('/check',function(req,res){
    res.send("hi");
})

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Ready to Go!');
});

