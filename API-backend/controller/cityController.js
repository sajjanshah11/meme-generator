const City = require('../models/cityModel');
const User = require('../models/cityModel')
const asyncHandler = require('express-async-handler');

const saveCityName = asyncHandler(async(req,res)=>{

    const { userId,city,email } = req.body;

    const cityObj = await City.create({userId,city,email})

    if(cityObj){
        res.status(201).json({
            _id:cityObj._id,
            userId:cityObj.userId,
            city:cityObj.city,
            email:cityObj.email,
            status:"city name stored"
        })
    }else {
         res.status(500).json({status:'error',message:"city name not saved"})
    }
})


module.exports = saveCityName;