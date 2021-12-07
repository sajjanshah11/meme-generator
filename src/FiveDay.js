import React from "react";
import "./weather.css"
import axios from "axios";

const fiveDayWeather = "https://community-open-weather-map.p.rapidapi.com/forecast";

const FiveDay = (props)=>{
    const[five,setFive] = React.useState();
    const[check,setCheck] = React.useState(false)
    React.useEffect(()=>{
        axios
            .get(fiveDayWeather,{
                params:{
                    q:'delhi'
                },
                headers:{
                    "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key":"2322907e88msh323aeb45d46445bp1e87e5jsn445088b15555"
                }
            }).then(response => {
                setFive(response.data)
            }).catch(error => {
                console.log(error.message);
            })
    },[])

    console.log(five?.list)

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

    function clickHandler(){
        setCheck((prev)=>{
           return prev ? false : true
        })
    }

    return(
        <>
            <button className = "fiveday-btn" onClick = {clickHandler}>five days</button>
            <div className = "fiveday-container">
                {check && fivedayElement}
            </div>
        </>
    )
}

export default FiveDay;