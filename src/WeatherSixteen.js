import React from "react";
import "./weather.css";
import axios from "axios";

const sixteenWeather ="https://community-open-weather-map.p.rapidapi.com/forecast/daily";

const WeatherSixteen = (props)=>{
    const [weather, setWeather] = React.useState("");

     React.useEffect(() => {
    axios
      .get(
        sixteenWeather,
        {
          params: {
            q: props.answer || "noida",
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
  }, [props.answer]);

   const weatherList = weather?.list?.map((el) => (
    <div>
      <p>{"Sunrise --> " + el.sunrise}</p>
      <p>{"Sunset -->" + el.sunset}</p>
      <p>{"Gust -->" + el.gust}</p>
    </div>
  ));

    return(
        <>
        <button className="sixteen" onClick={props.clickHandler}>
          16 Days
        </button>
        <div className="sixteen-container">{props.check && weatherList}</div>
        </>
    )
}

export default WeatherSixteen;