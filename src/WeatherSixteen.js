// import "./weather.css"
import React from "react";
import axios from "axios";

const sixtyWeather = "https://community-open-weather-map.p.rapidapi.com/forecast/daily"

const WeatherThirty = (props)=>{

    const[weather,setWeather] = React.useState("");
    const[check, setCheck] = React.useState(false)
    // console.log(props)
    React.useEffect(()=>{
        axios.get(sixtyWeather,{
            params:{
                q: 'san francisco,us'
            },
            headers:{
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': '2322907e88msh323aeb45d46445bp1e87e5jsn445088b15555'
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
                            <p>{"Sunrise --> " + el.sunrise}</p>
                            <p>{"Sunset -->" + el.sunset}</p>
                            <p>{"Gust -->" + el.gust}</p>
                        </div>
                    ))

    // console.log(check)

    return(
        <>
            <button onClick = {clickHandler} className = "sixteen">Sixteen Days</button>
            <div className = "sixteen-container">
                    {check && weatherList}
            </div>
        </>
    )
}


export default WeatherThirty;