const City = require('../models/cityModel');
const User = require('../models/cityModel')
const asyncHandler = require('express-async-handler');

const saveCityName = asyncHandler(async(req,res)=>{

    const {cityArray,email } = req.body;

            const city = await City.findOneAndUpdate(
                {
                    email: req.body.email
                }, 
                {
                    $addToSet: {
                        cityArray: req.body.cityArray
                    }
                }, { upsert: true }
            );

            if(city.cityArray.length){
                res.json({
                    email:city.email,
                    status:"success",
                    message:"city name added to db"
                })
            }else{
                res.status(500).json({
                    status:"failed",
                    message:"city name not added to db"
                })
            } 
    
        
})


module.exports = saveCityName;