import React from "react";
import "./weather.css";
import axios from "axios";
import WeatherThirty from "./WeatherThirty";
import FiveDay from "./FiveDay";
import WeatherSixteen from "./WeatherSixteen";


const currentWeather ="https://community-open-weather-map.p.rapidapi.com/weather";



const Weather = () => {

  const [data, setData] = React.useState("");
  const [answer, SetAnswer] = React.useState("");
  const [check, setCheck] = React.useState(false);


  function clickHandler() {
    setCheck((prev) => {
      return prev ? false : true;
    });
  }

  function changeHandler(event) {
    if (event.key === "Enter") {
      SetAnswer(event.target.value);
    }
  }

  React.useEffect(() => {
    axios
      .get(currentWeather, {
        params: {
          q: answer || "noida",
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "10e92000e2msha02a3a21cb31d0dp169ed5jsn6b843d9a7c37",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [answer]);


  return (
    <>
      <h2 class="main">Real Time Weather Application</h2>
      <div className="search">
        <input
          type="text"
          placeholder="Enter your city to see the current weather"
          onKeyDown={changeHandler}
        />
      </div>

      <div className="container">
        {data?.weather?.map((el) => (
          <div>
            <h1> {el.description} </h1>
            <img
              src={"http://api.openweathermap.org/img/w/" + el.icon + ".png"}
              alt="please check internet"
            />
          </div>
        ))}
      </div>
      <div className="flex-container">
        <WeatherThirty answer = {answer} clickHandler = {clickHandler} check = {check} />
        <WeatherSixteen answer = {answer} clickHandler = {clickHandler} check  = {check} />
        <FiveDay answer={answer} clickHandler = {clickHandler} check = {check}  />
      </div>
    </>
  );
};

export default Weather;
