import React from "react";
import "./weather.css";
import axios from "axios";
import ReactTable from "react-table";


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
    const[dayThirty,setDayThirty] = React.useState("1");
    const[daySixteen,setDaySixteen] = React.useState("1");
    const[dayFive,setDayFive] = React.useState("1");
    const[day30,setDay30] = React.useState("");
    const[day16,setDay16] = React.useState("");
    const[day5,setDay5] = React.useState("");

    function changeHandler(event) {
        if (event.key === "Enter") {
            SetAnswer(event.target.value);
            setApi("/weather")
        }
    }

    function showDuration30() {
        SetDuration30(answer);
        setApi("/climate/month");
        setDay30("30");
    }

    function showDuration16() {
        SetDuration16(answer);
        setApi("/forecast/daily");
        setDay16("16");
    }

    function showDuration5() {
        SetDuration5(answer);
        setApi("/forecast");
        setDay5("5");
    }

    function setDurationDay30(days){
        setDayThirty(days)
    }
    
    function setDurationDay16(d){
        setDaySixteen(d)
    }

    function setDurationDay5(da){
        setDayFive(da)
    }

    function callAPI(API_URL, keyword) {
        return axios.get(API_BASE_URL + API_URL, {
            params: {
                q: keyword
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': '7a10b99d60msh1aed7ccfeb2d675p196213jsn10fe4078a284'
            }
        })
    }

    React.useEffect(() => {
        if(answer === '') return;
        callAPI(api, answer).then((response) => {
            
            if(api === "/weather"){
                setData(response.data)
            }else if(api === "/climate/month"){
                setWeatherThirthy(response.data)
            }else if(api === "/forecast/daily"){
                setWeather(response.data)
            }else{
                setFive(response.data)
            }

            // console.log("my data -->",response.data)
        })
        .catch((err) => {
            console.log(err);
        });
    },[answer,duration30,duration16,duration5])

    const newWeatherThirty = weatherthirty?.list?.splice(0,dayThirty);
    const weatherListThirty = newWeatherThirty?.map((el,pos)=>(
        <div key = {pos}>
            <p>{"Humidity thirty --> " + el.humidity + "kg-1"}</p>
            <p>{"Pressure -->" + el.pressure + "N/m2"}</p>
            <p>{"WindSpeed -->" + el.wind_speed + "m/s"}</p>
            <hr/>
        </div>
    ))


    console.log(newWeatherThirty,dayThirty)

    const newWeatherListSixteen = weather?.list?.splice(0,daySixteen)
    const weatherListSixteen = newWeatherListSixteen?.map((el,pos) => (
        <div key = {pos}>
            <p>{"Gust sixteen -->" + el.gust}</p>
            <p>{"Sunrise --> " + el.sunrise}</p>
            <p>{"Sunset -->" + el.sunset}</p>
            <hr/>
        </div>
    ));

    const newWeatherListFive = five?.list?.splice(0,dayFive);
    const weatherListFive = newWeatherListFive?.map((el,pos) => (
        <div key = {pos}>
            <p>{"humidity five-->"+el.main.humidity}</p>
            <p>{"Temperature -->"+el.main.temp}</p>
            <p>{"Feels Like -->"+el.main.feels_like}</p>
            <p>{"Minimum Temperature -->"+el.main.temp_min}</p>
            <p>{"Maximum Temperature -->"+el.main.temp_max}</p>
            <p>{"Pressure-->"+el.main.pressure}</p>
            <hr/>
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
                <button onClick = {showDuration30} className = "thirty">{dayThirty} days </button>
                <label for="days">Choose a days:</label>
                <select name="days" id="days" onChange = {(e)=>setDurationDay30(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                </select>
                
            </div>
            <div>
                <button className="sixteen" onClick={showDuration16}>{daySixteen} day/daily</button>
                <label for="days">Choose a days:</label>
                <select name="days" id="days" onChange = {(e)=>setDurationDay16(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>      
                </select>
                  
            </div>
            <div>
                <button className = "fiveday-btn" onClick = {showDuration5}>{dayFive} day/3 hour</button>
                <label for="days">Choose a days:</label>
                <select name="days" id="days" onChange = {(e)=>setDurationDay5(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                     <option value="10">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                </select>
                 
            </div> 
        </div>

        <div>
            {/* {
                (day30 === "30") ? 
                    <div className = "thirty-container">{weatherListThirty}</div> :
                (day16 === "16") ?
                    <div className="sixteen-container">{weatherListSixteen}</div> :
                (day5 === "5") ?
                <div className = "fiveday-container">{weatherListFive}</div> :null 
            } */}



             <div className = "thirty-container">{day30 === "30" && weatherListThirty}</div>
             <div className="sixteen-container">{day16 === "16" && weatherListSixteen}</div>
             <div className = "fiveday-container">{day5 === "5" && weatherListFive}</div>
        </div>
    </>
    );
};

export default Weather;
