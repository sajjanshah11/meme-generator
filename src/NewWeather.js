import React, { useState, useEffect } from "react";
import "./weather.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

const NewWeather = () => {
  const [city, setCity] = useState("");
  const [api, setApi] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [weather4Data, setWeather4Data] = useState("");
  const [dayCount, setDayCount] = useState("");
  const [message, setMessage] = useState("");
  const [latitude1, setLatitude1] = useState("");
  const [longitude1, setLongitude1] = useState("");
  const [dataOneCall, setDataOneCall] = useState("");
  const[oneApiMessage, setOneApiMessage] = useState("");
  const[dayFiveMessage,setDayFiveMessage] = React.useState("");

    const headArray1 = ["Date","Time","Humidity", "Pressure","Temperature","Maximum Temperature","Minimum Temperature"]
    const headArray2 = ["Time", "Humidity","Pressure", "Wind Speed", "Wind Gust"];

  function callAPI(API_URL, params) {
    return axios.get(API_BASE_URL + API_URL, {
      params: {
        ...params,
        APPID: "57d277927c76ef5e55af9e48d8425fed",
      },
    });
  }

  function setCityName(event) {
    if(event.target.value){
        setDayFiveMessage("")
        setOneApiMessage("")
    }
    setCity(event.target.value);
  }

  function oneApiCall() {
    if(latitude1 && longitude1){
        setApi("/onecall");
    } else {
        setOneApiMessage("city name is missing");
    }
  }
  function searchHandler() {
    setApi("/weather");
    console.log("hi");
    // setCurrentWeatherToogle(prev => !prev)
  }

  function showDayWiseData() {

    if(city && dayCount){
        setApi("/forecast");
        setDayFiveMessage("")
        setOneApiMessage("")
    }
     else {
        setDayFiveMessage("day and city name is missing");
    }    
    // setToogle((prev) => !prev);
  }

  function setDays(event) {
    if (event.target.value <= 40 && event.target.value > 0) {
      setDayCount(event.target.value);
      setMessage("");
    } else if(event.target.value === ""){
      setMessage("")
    }
    else {
      setMessage("please enter number between 1 to 40");
    }
  }

  useEffect(() => {
    if (city === "") return;
    console.log(city)
    if (api === "/weather") {
      callAPI(api, { q: city, cnt: dayCount }).then((response) => {
        setCurrentWeather(response.data);
        console.log("function from call API");
        setLatitude1(response.data.coord.lat);
        setLongitude1(response.data.coord.lon);
        setApi("")
      });
    } else if (api === "/forecast") {
      callAPI(api, { q: city, cnt: dayCount }).then((response) => {
        setWeather4Data(response.data);
      });
    } else if (api === "/onecall") {
      callAPI(api, { lon: longitude1, lat: latitude1}).then(
        (response) => {
          setDataOneCall(response.data);
        }
      );
    }
  }, [api]);

  const { main } = currentWeather;



  const currentWeatherList = currentWeather?.weather?.map((el, pos) => (
    <div key={pos}>
      <img
        src={"http://openweathermap.org/img/w/" + el.icon + ".png"}
        alt="please check for internet connection"
      />
      <span className="description">{el.description}</span>
    </div>
  ));



  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div class="col-3">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Weather Application</span>
          </div>
        </div>

        <div class="col-4">
          <div class="row">
            <div class="col-auto">
              <input
                className="form-control"
                type="text"
                placeholder="Enter your city"
                onChange={setCityName}
              />
            </div>
            <div class="col-auto">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={searchHandler}
              >
                Search.
              </button>
            </div>
          </div>
        </div>
        <div class = "col-2">
            <div className = "day_error_wrapper">
                <div>
                    <input
                    className = "form-control"
                    type="number"
                    placeholder="Enter the Days between 1 to 40"
                    onChange={setDays}
                    />
                </div>
                <p className="error_message_box">{message}</p>
            </div>
        </div>
        <div class="col-3">
            <div className="location_details">  
                <span className="city_name"> {city} </span>
                <span className = "weather-list"> 
                  {currentWeatherList} 
                </span>
                {/* <span>{parseFloat(main?.temp - 273.15.toFixed(1))}&deg;C</span> */}
            </div>
        </div>
      </nav>

      <div className="button-flex">

        <div className = "five_call_container">
            <div>
                <button type="submit" onClick={showDayWiseData} className = "btn btn-primary mt-2"> 5Day/3Hours.</button>
            </div>
            <div className = "five_call_error">{dayFiveMessage}</div>
        </div>

        <div className = "one_call_container">
            <div>
                <button type="button" onClick={oneApiCall} className = "btn btn-primary mt-2"> OneCall </button>
            </div>
            <div className = "one_call_error">{oneApiMessage}</div>
        </div>
      </div>

         <div className={`card w-50 mx-auto mb-3 ${!currentWeatherList ? 'd-none' : ''}`}>
            <div class="card-body">
                <h5>CURRENT WEATHER</h5>
                <span>{new Date(currentWeather.dt).toLocaleTimeString("en-US")}</span>
                <div className = "card_weather_list">{currentWeatherList}</div>
                <h5 class="card-title">{parseFloat(main?.temp - 273.15).toFixed(1)}&deg;C</h5>
                <h5 class="card-title">{city}</h5>
                <div className = "list">
                    <p>Humidity : {main?.humidity}</p>
                    <p>Pressure : {main?.pressure}</p>
                    <p>Sea Level : {main?.sea_level}</p>
                    <p>Maximum Temperature : {main?.temp_max}</p>
                    <p>Minimum Temperature : {main?.temp_min}</p>
                </div>
                {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Button</a> */}
            </div>
        </div>
        
        
      
          <div className= {`four-container ${!weather4Data ? 'd-none' : ''}`}>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                    {headArray1.map((el)=>(
                        <th>{el}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {weather4Data?.list?.map((el, pos) => (
                  <tr key={pos}>
                    <td>{el.dt_txt.split(" ")[0]}</td>
                    <td>{el.dt_txt.split(" ")[1]}</td>
                    <td>{el.main.humidity}%</td>
                    <td>{el.main.pressure} Pa</td>
                    <td>
                      {parseFloat(el.main.temp - 273.15).toFixed(1)}&deg;C
                    </td>
                    <td>
                      {parseFloat(el.main.temp_max - 273.15).toFixed(1)}&deg;C
                    </td>
                    <td>
                      {parseFloat(el.main.temp_min - 273.15).toFixed(1)}&deg;C
                    </td>
                  </tr>
                ))}
              </tbody>
            </ReactBootStrap.Table>
          </div>
        

      
        <div className = {`${!dataOneCall ? 'd-none' : ''}`}>
          <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                {
                    headArray2.map((item)=>(
                        <th>{item}</th>
                    ))
                }
              </tr>
            </thead>
            <tbody>
              {dataOneCall?.daily?.map((el, pos) => (
                <tr key={pos}>
                  <td>{new Date(el.dt).toLocaleTimeString("en-US")}</td>
                  <td>{el.humidity}%</td>
                  <td>{el.pressure} Pa</td>
                  <td>{el.wind_speed}</td>
                  <td>{el.wind_gust}</td>
                </tr>
              ))}
            </tbody>
          </ReactBootStrap.Table>
        </div>
      
    </>
  );
};

export default NewWeather;
