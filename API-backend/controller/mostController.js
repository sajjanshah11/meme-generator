const City = require('../models/cityModel');
const axios = require('axios')

const mostCity = async function(req,res){
   const rez = await City.aggregate([
        {
            $group: {
                _id: "$city",
                // search: {
                //     $push: "$email"
                // },
                total: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        },
        {
            $limit: 1
        }
    ]).then(result => {

        const cityName = result[0]._id;
        // let data;
        // let key = "57d277927c76ef5e55af9e48d8425fed"
        // console.log(cityName)
        // try{
        //      data  = axios.get("https://api.openweathermap.org/data/2.5/weather",{ params: { q: cityName,APPID:key } })
        // } catch(error){
        //     console.log(error.message)
        // }

        // console.log(data)

        console.log(cityName)
        
        res.json({
            status: 'success',
            data: result[0]
        })
    })
    console.log(rez);
}

module.exports = mostCity