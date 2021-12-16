import React from "react";
import "./weather.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";


const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

const NewWeather = () =>{

    const[city,setCity] = React.useState("");
    const[api,setApi] = React.useState("");
    const[currentWeather, setCurrentWeather] = React.useState("");
    const[weather4Data,setWeather4Data] = React.useState("");
    const[weather4,setWeather4] = React.useState("");
    const[dayCount,setDayCount] = React.useState();

    function callAPI(API_URL,params){
        return axios.get(API_BASE_URL + API_URL,{
            params: {
                ...params,
                APPID:'57d277927c76ef5e55af9e48d8425fed'
            }
        })
    }

    function setCityName(event){
        if(event.key === "Enter"){
            setCity(event.target.value)
            setApi("/weather")
        }
    }

    function setDuration4(){
        setApi("/forecast")
        setWeather4(city)
    }

    function setDays(event){
        if(event.key === "Enter"){
            setDayCount(event.target.value)
            setApi("/forecast");
        }
    }

    React.useEffect(()=>{
        if(city === '') return;
        callAPI(api,{q : city ,cnt : dayCount}).then((response)=>{
            if(api === '/weather'){
                setCurrentWeather(response.data)
            }
            if(api === '/forecast'){
                setWeather4Data(response.data)
                console.log(response.data)
            }
        })
    },[city,weather4,dayCount])

    const currentWeatherList = currentWeather?.weather?.map((el,pos)=>(
        <div key = {pos}>
            <h1>{el.description}</h1>
            <img
                src = {"http://openweathermap.org/img/w/" + el.icon + ".png"} 
            />
        </div>
    ))

    console.log(currentWeather);

    // console.log(weather4Data);
    return(
        <>
            <h2 className="main">Real Time Weather Application</h2>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Enter your city to see the current weather"
                        onKeyDown={setCityName}
                    />
                </div>

                
            <div className = "container">
                {/* <p>Current Weather</p> */}
                <div className = "name-container">{city}</div>
                {currentWeatherList}
            </div>

            <div className = "flex-container">
                <div>
                    <h2>Enter the Number of days to see the weather forecast</h2>
                    <input
                        id = "days"
                        type="number"
                        placeholder="Enter a Days to see the weather"
                        min = "1"
                        max = "40"
                        onKeyDown={setDays}

                    />
                </div>
            </div>

            <div>
                <div className = "four-container">
                     <ReactBootStrap.Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Humidity</th>
                                <th>Pressure</th>
                                <th>Temperature</th>
                                <th>Maximum Temperature</th>
                                <th>Minimum Temperature</th>
                            </tr>
                        </thead>
                        <tbody>
                            { weather4Data?.list?.map((el,pos)=>(
                                <tr key = {pos}>
                                    <td>{el.main.humidity}%</td>
                                    <td>{el.main.pressure} Pa</td>
                                    <td>{parseFloat(el.main.temp - 273.15).toFixed(1)}&deg;C</td>
                                    <td>{parseFloat(el.main.temp_max - 273.15).toFixed(1)}&deg;C</td>
                                    <td>{parseFloat(el.main.temp_min - 273.15).toFixed(1)}&deg;C</td>
                                </tr>
                            ))}
                        </tbody>
                     </ReactBootStrap.Table>
                </div>
            </div>

        </>
    )
}

export default NewWeather;