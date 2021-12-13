import React from "react";
import "./weather.css";
import axios from "axios";


const API_BASE_URL = "https://community-open-weather-map.p.rapidapi.com";

const Weather = () => {

    const [data, setData] = React.useState("");
    const [answer, SetAnswer] = React.useState("");
    const [duration30, SetDuration30] = React.useState("");
    const [duration16, SetDuration16] = React.useState("");
    const [duration5, SetDuration5] = React.useState("");
    const[weatherthirty,setWeatherThirthy] = React.useState("");
    const [weather, setWeather] = React.useState("");
    const[five,setFive] = React.useState();
    const[api,setApi] = React.useState();

    function changeHandler(event) {
        if (event.key === "Enter") {
            SetAnswer(event.target.value);
            setApi("/weather")
        }
    }

    function showDuration30() {
        SetDuration30(answer);
        setApi("/climate/month")
    }

    function showDuration16() {
        SetDuration16(answer);
        setApi("/forecast/daily")
    }

    function showDuration5() {
        SetDuration5(answer);
        setApi("/forecast")
    }

    function callAPI(API_URL, keyword) {
        return axios.get(API_BASE_URL + API_URL, {
            params: {
                q: keyword
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': '011f22e004msh454fb3bbf894d8fp19efeajsneb48311842f1'
            }
        })
    }

    //useEffect for current weather location
    React.useEffect(() => {
        if(answer === '') return;
        callAPI(api, answer).then((response) => {
            setData(response.data);
            console.log("my data -->",response.data)
        })
        .catch((err) => {
            console.log(err);
        });
    },[answer,duration30,duration16,duration5])

    const weatherListSixteen = data?.list?.map((el,pos) => (
        <div key = {pos}>
            <p>{"Sunrise --> " + el.sunrise}</p>
            <p>{"Sunset -->" + el.sunset}</p>
            <p>{"Gust -->" + el.gust}</p>
        </div>
    ));

    const weatherListThirty = data?.list?.map((el,pos)=>(
        <div key = {pos}>
            <p>{"Humidity --> " + el.humidity + "kg-1"}</p>
            <p>{"Pressure -->" + el.pressure + "N/m2"}</p>
            <p>{"WindSpeed -->" + el.wind_speed + "m/s"}</p>
        </div>
    ))

    const weatherListFive = data?.list?.map((el,pos) => (
        <div key = {pos}>
            <p>{"humidity -->"+el.main.humidity}</p>
            <p>{"Temperature -->"+el.main.temp}</p>
            <p>{"Feels Like -->"+el.main.feels_like}</p>
            <p>{"Minimum Temperature -->"+el.main.temp_min}</p>
            <p>{"Maximum Temperature -->"+el.main.temp_max}</p>
            <p>{"Pressure-->"+el.main.pressure}</p>
        </div>
    ))

    return (
    <>
        <h2 className="main">Real Time Weather Application</h2>
        <div className="search">
            <input
                type="text"
                placeholder="Enter your city to see the current weather"
                onKeyDown={changeHandler}
            />
        </div>

        <div className="container">
            <div className = "name-container">{answer}</div>
            {data?.weather?.map((el,pos) => (
                <div key = {pos}>
                    <h1> {el.description} </h1>
                    <img
                        src={"http://api.openweathermap.org/img/w/" + el.icon + ".png"}
                        alt="please check internet"
                    />
                </div>
            ))}
        </div>

        

        <div className="flex-container">
            <div>
                <button onClick = {showDuration30} className = "thirty">30 days </button>
                <div className = "thirty-container">{weatherListThirty}</div>
            </div>
            <div>
                <button className="sixteen" onClick={showDuration16}>16 Days</button>
                <div className="sixteen-container">{weatherListSixteen}</div>
            </div>
            <div>
                <button className = "fiveday-btn" onClick = {showDuration5}>5 days</button>
                <div className = "fiveday-container">{weatherListFive}</div>
            </div> 
        </div>
    </>
    );
};

export default Weather;
