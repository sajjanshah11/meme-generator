import "./weather.css"
import React from "react";
import axios from "axios";

const thirtyWeather = "https://community-open-weather-map.p.rapidapi.com/climate/month"

const WeatherThirty = (props)=>{


    const[weatherthirty,setWeatherThirthy] = React.useState("");


    React.useEffect(()=>{
        axios.get(thirtyWeather,{
            params:{
                q: props.answer || 'noida'
            },
            headers:{
               'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': '10e92000e2msha02a3a21cb31d0dp169ed5jsn6b843d9a7c37'
            }
        },{
        }).then(response=>{
            setWeatherThirthy(response.data)
        }).catch(error => {
            console.log(error.message)
        })
    },[props.answer])




    const weatherList1 = weatherthirty?.list?.map((el)=>(
                        <>
                            <p>{"Humidity --> " + el.humidity + "kg-1"}</p>
                            <p>{"Pressure -->" + el.pressure + "N/m2"}</p>
                            <p>{"WindSpeed -->" + el.wind_speed + "m/s"}</p>
                        </>
                    ))

    // console.log(check)

    return(
        <>
            <button onClick = {props.clickHandler} className = "thirty">30 days </button>
            <div className = "thirty-container">
                    {props.check && weatherList1}
            </div>
        </>
    )
}


export default WeatherThirty;