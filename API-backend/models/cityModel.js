const mongoose = require('mongoose');

const citySchema = mongoose.Schema(
    {
        cityArray : {
            type:[String]
        },
        email :{
            type:String
        }
    }
)


const City = mongoose.model("City",citySchema);

module.exports = City