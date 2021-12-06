import React from "react";
import "./weather.css";
import axios from "axios";

const currentWeather =
  "https://community-open-weather-map.p.rapidapi.com/weather";

const Weather = () => {
  let [data, setData] = React.useState("");
  let [answer, SetAnswer] = React.useState("");

  function changeHandler(event) {
    if(event.key === "Enter"){
        SetAnswer(event.target.value)
    }
  }

  React.useEffect(() => {

    axios
      .get(currentWeather, {
        params: {
          q: answer || 'noida' ,
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "2322907e88msh323aeb45d46445bp1e87e5jsn445088b15555",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [answer]);

  console.log(answer)

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Enter your city"
          onKeyDown={changeHandler}
        />
      </div>

      <div className="container">
        {data?.weather?.map((el) => (
          <div>
            <h1> {el.description} </h1>
            <img src = {"http://api.openweathermap.org/img/w/"+el.icon+".png"} alt = "please check internet"  />
            
          </div>
        ))}
      </div>
    </>
  );
};

export default Weather;
