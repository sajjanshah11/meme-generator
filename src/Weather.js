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

    function changeHandler(event) {
        if (event.key === "Enter") {
            SetAnswer(event.target.value);
        }
    }

    function showDuration30() {
        SetDuration30(answer);
    }

    function showDuration16() {
        SetDuration16(answer);
    }

    function showDuration5() {
        SetDuration5(answer);
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
        callAPI('/weather', answer).then((response) => {
            setData(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    },[answer])

    //useEffect for 30 days duration
    React.useEffect(() => {
        if(answer === '') return;
        callAPI('/climate/month', answer).then(response=>{
            setWeatherThirthy(response.data)
        }).catch(error => {
            console.log(error.message)
        })
    }, [duration30])

    //useEffect for 16 days duration    
    React.useEffect(() => {
        if(answer === '') return;
        callAPI('/forecast/daily', answer).then((response) => {
            setWeather(response.data);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }, [duration16]);

    //useEffect for 5 days duration
    React.useEffect(()=>{
        if(answer === '') return;
        callAPI('/forecast', answer).then(response => {
            setFive(response.data)
        }).catch(error => {
            console.log(error.message);
        })
    },[duration5])

    const weatherListSixteen = weather?.list?.map((el,uid) => (
        <div>
            <p key = {el.uniqueId}>{"Sunrise --> " + el.sunrise}</p>
            <p key = {el.uniqueId}>{"Sunset -->" + el.sunset}</p>
            <p key = {el.uniqueId}>{"Gust -->" + el.gust}</p>
        </div>
    ));

    const weatherListThirty = weatherthirty?.list?.map((el)=>(
        <>
            <p key = {el.uniqueId}>{"Humidity --> " + el.humidity + "kg-1"}</p>
            <p key = {el.uniqueId}>{"Pressure -->" + el.pressure + "N/m2"}</p>
            <p key = {el.uniqueId}>{"WindSpeed -->" + el.wind_speed + "m/s"}</p>
        </>
    ))

    const weatherListFive = five?.list?.map((el,uid) => (
        <div>
            <p key = {el.uniqueId}>{"humidity -->"+el.main.humidity}</p>
            <p key = {el.uniqueId}>{"Temperature -->"+el.main.temp}</p>
            <p key = {el.uniqueId}>{"Feels Like -->"+el.main.feels_like}</p>
            <p key = {el.uid}>{"Minimum Temperature -->"+el.main.temp_min}</p>
            <p key = {el.uniqueId}>{"Maximum Temperature -->"+el.main.temp_max}</p>
            <p key = {el.uniqueId}>{"Pressure-->"+el.main.pressure}</p>
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
            {data?.weather?.map((el) => (
                <div>
                    <h1 key = {el.uniqueId}> {el.description} </h1>
                    <img
                        key = {el.uniqueId}
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
