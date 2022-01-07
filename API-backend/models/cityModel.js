const mongoose = require('mongoose');

const citySchema = mongoose.Schema(
    {
        
        city : {
            type:String
        },
        count:{
            type:Number
        },email:{
            type:String
        }
        
    }
    // {collections:searchedCities}
)


const City = mongoose.model("City",citySchema);

module.exports = City