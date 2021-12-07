import "./weather.css"
import React from "react";
import axios from "axios";

const thirtyWeather = "https://community-open-weather-map.p.rapidapi.com/climate/month"

const WeatherThirty = (props)=>{

    const[weather,setWeather] = React.useState("");
    const[check, setCheck] = React.useState(false)
    // console.log(props)
    React.useEffect(()=>{
        axios.get(thirtyWeather,{
            params:{
                q: props.answer || 'noida'
            },
            headers:{
                "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key":"2322907e88msh323aeb45d46445bp1e87e5jsn445088b15555"
            }
        },{
        }).then(response=>{
            setWeather(response.data)
        }).catch(error => {
            console.log(error.message)
        })
    },[props.answer])

    // console.log(weather)

    function clickHandler(){
        setCheck((prev)=>{
           return prev ? false : true
        })
    }

    const weatherList = weather?.list?.map((el)=>(
                        <div>
                            <p>{"Humidity --> " + el.humidity}</p>
                            <p>{"Pressure -->" + el.pressure}</p>
                            <p>{"WindSpeed -->" + el.wind_speed}</p>
                        </div>
                    ))

    // console.log(check)

    return(
        <>
            <button onClick = {clickHandler}>Weather Forcast for 30 days </button>
            <div className = "thirty-container">
                    {check && weatherList}
            </div>
        </>
    )
}


export default WeatherThirty;