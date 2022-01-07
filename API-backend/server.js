const express = require('express');
const mongoose = require('mongoose');
const userRoutes  = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes');
// const City = require('../models/cityModel');
const mostRoutes = require('./routes/mostRouter');


// set up our express app
const app = express();
const router= express.Router();
// connect to mongodb

let mongodb = "mongodb+srv://weather:12345@cluster0.jtsgl.mongodb.net/weather?retryWrites=true&w=majority"
try {
    mongoose.connect(process.env.MONGODB_URI || mongodb);  
    mongoose.Promise = global.Promise;
    console.log("db connected")
} catch (error) {
    console.log(error,"db not connected");

}



app.use(express.static('public'));

app.use(express.json());

router.get('/', function(req, res)  {
    console.log('api hit');
    res.json({message: 'hello'})
})

app.use('/test', router);

// initialize routes
app.use('/api/user',userRoutes);

app.use('/api/location',cityRoutes);

app.use('/api/most',mostRoutes)

// router.get('/api/search', function(req,res){
//     res.json({"message": "Hello World"})
//     console.log('get called');
//     const rez = City.aggregate([
//         {
//             $group: {
//                 _id: "$city",
//                 search: {
//                     $push: "$email"
//                 },
//                 total: {
//                     $sum: 1
//                 }
//             }
//         }
//     ])
//     console.log(rez);
// })

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(400).send({error: err.message});
});

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static('../build'))
// }


// listen for requests
app.listen(process.env.port || 5000, function(){
    console.log('Ready to Go!');
});

