import React, { useState, useEffect } from "react";
import "./weather.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import WeatherMap from "./WeatherMap";
import { useHistory } from "react-router-dom";

let cityArray = [];
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
  const [oneApiMessage, setOneApiMessage] = useState("");
  const [dayFiveMessage, setDayFiveMessage] = useState("");
  const [toogle, setToogle] = useState("");

  let history = useHistory();

  const headArray1 = [
    "Date",
    "Time",
    "Humidity",
    "Pressure",
    "Temperature",
    "Maximum Temperature",
    "Minimum Temperature",
  ];
  const headArray2 = [
    "Time",
    "Humidity",
    "Pressure",
    "Wind Speed",
    "Wind Gust",
  ];

  function callAPI(API_URL, params) {
    return axios.get(API_BASE_URL + API_URL, {
      params: {
        ...params,
        APPID: "57d277927c76ef5e55af9e48d8425fed",
      },
    });
  }

  function logoutHandler() {
    localStorage.clear();
    history.push("/");
  }

  function setCityName(event) {
    if (event.target.value) {
      setDayFiveMessage("");
      setOneApiMessage("");
    }
    setCity(event.target.value);
  }

  console.log(cityArray);

  console.log(cityArray, "cityArray");

  function oneApiCall() {
    if (latitude1 && longitude1) {
      setApi("/onecall");
    } else {
      setOneApiMessage("Enter the city Name and click on the search button ");
    }

    setToogle("one");
  }
  async function searchHandler() {
    setApi("/weather");
    setOneApiMessage("");
    cityArray.push(city);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let callData = {
        cityArray: cityArray,
        email: localStorage.getItem("email"),
      };
      const { data } = await axios.post("/api/location/city", callData, config);

      console.log(data)
    } catch (error) {
      console.log(error.message);
    }
  }

  

  function showDayWiseData() {
    if (city && dayCount) {
      setApi("/forecast");
      setDayFiveMessage("");
    } else if (!city) {
      setDayFiveMessage("City Name is Missing");
    } else if (dayCount === null) {
      setDayFiveMessage("Day count is null");
    } else if (!dayCount) {
      setDayFiveMessage("day is missing");
    } else {
      setDayFiveMessage("day and city name is missing");
    }
    setToogle("five");
  }

  function setDays(event) {
    // console.log(event.target.value)
    if (event.target.value <= 40 && event.target.value > 0) {
      // console.log("greater than 40")
      setDayCount(event.target.value);
      setMessage("");
      setDayFiveMessage("");
    } else if (event.target.value === "") {
      setMessage("");
      setDayCount("");
    } else {
      setMessage("please enter days between 1 to 40");
      setDayCount(null);
    }
  }

  console.log(dayCount);

  useEffect(() => {
    if (city === "") return;
    // console.log(city)
    if (api === "/weather") {
      callAPI(api, { q: city, cnt: dayCount }).then((response) => {
        setCurrentWeather(response.data);
        setLatitude1(response.data.coord.lat);
        setLongitude1(response.data.coord.lon);
        setApi("");
      });
    } else if (api === "/forecast") {
      callAPI(api, { q: city, cnt: dayCount }).then((response) => {
        setWeather4Data(response.data);
        setApi("");
      });
    } else if (api === "/onecall") {
      callAPI(api, { lon: longitude1, lat: latitude1 }).then((response) => {
        setDataOneCall(response.data);
      });
    }
  }, [api]);

  const currentWeatherList = currentWeather?.weather?.map((el, pos) => (
    <div key={pos}>
      <img
        src={"http://openweathermap.org/img/w/" + el.icon + ".png"}
        alt="please check for internet connection"
      />
      <span className="description">{el.description}</span>
    </div>
  ));

  const { main, weather } = currentWeather;

  // console.log(city)

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3 mycutomnav">
        <div class="col-3">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1 customheader">
              Weather Application
            </span>
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
        <div class="col-2">
          <div className="day_error_wrapper">
            <div>
              <input
                className="form-control"
                type="number"
                placeholder="Enter the Days between 1 to 40"
                onChange={setDays}
              />
            </div>

          {
            message && 
            <div class="col-sm-12 error_message_box">
              <div class="alert alert-danger" role="alert">
              <i class="start-icon  fa fa-info-circle faa-shake animated"></i>
              <strong>Heads up! {message}</strong> 
              </div>
            </div>
          }            
          </div>
        </div>
        <div class="col-3">
          <div className="location_details">
            <span className="city_name"> {city} </span>
            <span className="weather-list">{currentWeatherList}</span>
          </div>
        </div>
      </nav>

      <div className="button-flex">
        <div className="five_call_container">
          <div>
            <button
              type="submit"
              onClick={showDayWiseData}
              className="btn btn-primary mt-2"
            >
              {" "}
              5Day/3Hours.
            </button>
          </div>

          {
            dayFiveMessage && 
            <div class="col-sm-12">
              <div class="alert alert-danger" role="alert">
              <i class="start-icon  fa fa-info-circle faa-shake animated"></i>
              <strong>Heads up! {dayFiveMessage}</strong> 
              </div>
            </div>
          }
        
        </div>

        <div className="one_call_container">
          <div>
            <button
              type="button"
              onClick={oneApiCall}
              className="btn btn-primary mt-2"
            >
              {" "}
              OneCall{" "}
            </button>
          </div>

          {
            oneApiMessage && 
            <div class="col-sm-12 one_call_error">
              <div class="alert alert-danger" role="alert">
              <i class="start-icon  fa fa-info-circle faa-shake animated"></i>
              <strong>Heads up! {oneApiMessage}</strong> 
              </div>
            </div>
          } 
          {/* <div className="one_call_error">{oneApiMessage}</div> */}
        </div>

        <div>
          <button className="btn btn-danger mt-2" onClick={logoutHandler}>
            LOGOUT
          </button>
        </div>
      </div>

      <div className="one-container">
        <div className="weather-map">
          {weather?.length && (
            <WeatherMap
              lat={latitude1}
              lng={longitude1}
              iconmarker={
                "http://openweathermap.org/img/w/" + weather[0].icon + ".png"
              }
              description={weather[0].description}
            />
          )}
        </div>

        <div
          className={`card w-50 mx-auto m-4  ${
            !currentWeatherList ? "d-none" : ""
          }`}
        >
          <div class="card-body">
            <div className="left">
              <h5>CURRENT WEATHER</h5>
              <hr />
              <span>
                {new Date(currentWeather.dt).toLocaleTimeString("en-US")}
              </span>
              <hr />
              <div className="card_weather_list">{currentWeatherList}</div>
              <hr />
              <h5 class="card-title">
                {parseFloat(main?.temp - 273.15).toFixed(1)}&deg;C
              </h5>
              <hr />
              <h5 class="card-title">{city}</h5>
              <hr />
            </div>
            <div className="list">
              <p>Humidity : {main?.humidity}</p>
              <hr />
              <p>Pressure : {main?.pressure}</p>
              <hr />
              <p>Sea Level : {main?.sea_level}</p>
              <hr />
              <p>Maximum Temperature : {main?.temp_max}</p>
              <hr />
              <p>Minimum Temperature : {main?.temp_min}</p>
              <hr />
            </div>
          </div>
        </div>
      </div>

      {toogle === "five" && (
        <div className={`four-container ${!weather4Data ? "d-none" : ""}`}>
          <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                {headArray1.map((el) => (
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
                  <td>{parseFloat(el.main.temp - 273.15).toFixed(1)}&deg;C</td>
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
      )}

      {toogle === "one" && (
        <div className={`${!dataOneCall ? "d-none" : ""}`}>
          <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                {headArray2.map((item) => (
                  <th>{item}</th>
                ))}
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
      )}
    </>
  );
};

export default NewWeather;
