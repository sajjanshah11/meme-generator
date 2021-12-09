import React from "react";
import "./weather.css";
import axios from "axios";
// import FiveDay from "./FiveDay";

const API_BASE_URL = "https://community-open-weather-map.p.rapidapi.com";

const Weather = () => {
  const [data, setData] = React.useState("");
  const [answer, SetAnswer] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const [weatherthirty, setWeatherThirthy] = React.useState("");
  const [weather, setWeather] = React.useState("");
  const [five, setFive] = React.useState();

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
      .get(API_BASE_URL + "/weather", {
        params: {
          q: answer || "noida",
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "011f22e004msh454fb3bbf894d8fp19efeajsneb48311842f1",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        API_BASE_URL + "/climate/month",
        {
          params: {
            q: answer || "noida",
          },
          headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key":
              "011f22e004msh454fb3bbf894d8fp19efeajsneb48311842f1",
          },
        },
        {}
      )
      .then((response) => {
        setWeatherThirthy(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get(
        API_BASE_URL + "/forecast/daily",
        {
          params: {
            q: answer || "noida",
          },
          headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key":
              "2322907e88msh323aeb45d46445bp1e87e5jsn445088b15555",
          },
        },
        {}
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get(API_BASE_URL + "/forecast", {
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
        setFive(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [answer]);

  const weatherList1 = weatherthirty?.list?.map((el) => (
    <>
      <p key={el.uniqueId}>{"Humidity --> " + el.humidity + "kg-1"}</p>
      <p key={el.uniqueId}>{"Pressure -->" + el.pressure + "N/m2"}</p>
      <p key={el.uniqueId}>{"WindSpeed -->" + el.wind_speed + "m/s"}</p>
    </>
  ));

  const weatherList = weather?.list?.map((el, uid) => (
    <div>
      <p key={el.uniqueId}>{"Sunrise --> " + el.sunrise}</p>
      <p key={el.uniqueId}>{"Sunset -->" + el.sunset}</p>
      <p key={el.uniqueId}>{"Gust -->" + el.gust}</p>
    </div>
  ));
  const fivedayElement = five?.list?.map((el, uid) => (
    <div>
      <p key={el.uniqueId}>{"humidity -->" + el.main.humidity}</p>
      <p key={el.uniqueId}>{"Temperature -->" + el.main.temp}</p>
      <p key={el.uniqueId}>{"Feels Like -->" + el.main.feels_like}</p>
      <p key={el.uid}>{"Minimum Temperature -->" + el.main.temp_min}</p>
      <p key={el.uniqueId}>{"Maximum Temperature -->" + el.main.temp_max}</p>
      <p key={el.uniqueId}>{"Pressure-->" + el.main.pressure}</p>
    </div>
  ));

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
        {data?.weather?.map((el) => (
          <div>
            <h1 key={el.uniqueId}> {el.description} </h1>
            <img
              key={el.uniqueId}
              src={"http://api.openweathermap.org/img/w/" + el.icon + ".png"}
              alt="please check internet"
            />
          </div>
        ))}
      </div>
      <div className="flex-container">
        <button onClick={clickHandler} className="thirty">
          30 days{" "}
        </button>
        <div className="thirty-container">{check && weatherList1}</div>
        <button className="sixteen" onClick={clickHandler}>
          16 Days
        </button>
        <div className="sixteen-container">{check && weatherList}</div>
        <button className="fiveday-btn" onClick={clickHandler}>
          5 days
        </button>
        <div className="fiveday-container">{check && fivedayElement}</div>
      </div>
    </>
  );
};

export default Weather;
