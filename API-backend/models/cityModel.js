const mongoose = require('mongoose');

const citySchema = mongoose.Schema(
    {
        city : {
            type:String
        },

        userId :{
            type:String
        },

        email :{
            type:String
        }
    }
)


const City = mongoose.model("City",citySchema);

module.exports = City