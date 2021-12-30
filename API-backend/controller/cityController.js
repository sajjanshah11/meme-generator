const City = require('../models/cityModel');
const User = require('../models/cityModel')

const saveCityName = (req,res)=>{

        console.log(req.body);
        const cityObj = new City({
            userId: req.body.userId,
            city:req.body.city,
            email:req.body.email
        })

        console.log(cityObj,"data to be saved")
        //return false
     cityObj.save().then(result => {
        res.status(201).json({
            message:"city name stored"
        })
    }).catch(err => {
        res.status(500).json({
            error:err
        })
    })
}


module.exports = saveCityName;