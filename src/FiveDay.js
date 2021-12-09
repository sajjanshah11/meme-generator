import React from "react";
import "./weather.css"
import axios from "axios";

const fiveDayWeather = "https://community-open-weather-map.p.rapidapi.com/forecast";

const FiveDay = (props)=>{
    const[five,setFive] = React.useState();
    React.useEffect(()=>{
        axios
            .get(fiveDayWeather,{
                params:{
                    q: props.answer || 'noida'
                },
                headers:{
                     'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                    'x-rapidapi-key': '10e92000e2msha02a3a21cb31d0dp169ed5jsn6b843d9a7c37'
                }
            }).then(response => {
                setFive(response.data)
            }).catch(error => {
                console.log(error.message);
            })
    },[props.answer])

    
    // console.log(five?.list)

    const fivedayElement = five?.list?.map(el => (
        <div>
            <p>{"humidity -->"+el.main.humidity}</p>
            <p>{"Temperature -->"+el.main.temp}</p>
            <p>{"Feels Like -->"+el.main.feels_like}</p>
            <p>{"Minimum Temperature -->"+el.main.temp_min}</p>
            <p>{"Maximum Temperature -->"+el.main.temp_max}</p>
            <p>{"Pressure-->"+el.main.pressure}</p>
        </div>
    ))

   
    return(
        <>
            <button className = "fiveday-btn" onClick = {props.clickHandler}>5 days</button>
            <div className = "fiveday-container">
                {props.check && fivedayElement}
            </div>
        </>
    )
}

export default FiveDay;