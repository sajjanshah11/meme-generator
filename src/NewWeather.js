import React, {useState,useEffect} from "react";
import "./weather.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";


const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

const NewWeather = () =>{

    const[city,setCity] = useState("");
    const[api,setApi] = useState("");
    const[currentWeather, setCurrentWeather] = useState("");
    const[weather4Data,setWeather4Data] = useState("");
    const[dayCount,setDayCount] = useState("");
    const[message,setMessage] = useState("");
    const[latitude,setLatitude] = useState("");
    const[longitude,setLongitude] = useState("");
    const[dataOneCall,setDataOneCall] = useState("");
    const[toogle,setToogle] = useState(true)

    function callAPI(API_URL,params){
        return axios.get(API_BASE_URL + API_URL,{
            params: {
                ...params,
                APPID:'57d277927c76ef5e55af9e48d8425fed'
            }
        })
    }

    function setCityName(event){
            setCity(event.target.value)
            
    }

    function oneApiCall(lat, long){
        setLatitude(lat);
        setLongitude(long)
        setApi('/onecall')
    }
    function searchHandler(){
        setApi("/weather");
        console.log("hi")
        
    }

    function showDayWiseData(){
        setApi("/forecast");
        setToogle(prev => !prev);
    }

    function setDays(event){
        if(event.target.value <= 40 && event.target.value > 0){
            setDayCount(event.target.value)
        }else{
            setMessage("please enter number between 1 to 40")
        }
    }

    useEffect(()=>{
        if(city === '') return;
        
        if(api === "/weather"){
            callAPI(api,{q : city ,cnt : dayCount}).then((response)=>{
                setCurrentWeather(response.data)
             
            })
        }else if(api === "/forecast"){
            callAPI(api,{q : city ,cnt : dayCount}).then((response)=>{
                setWeather4Data(response.data)
            }) 
        }else if(api === "/onecall"){
            callAPI(api,{lon:longitude, lat: latitude,cnt : dayCount}).then((response)=>{
                setDataOneCall(response.data)
            }) 
        }
        
    },[api])

    // console.log(currentWeather)
    
    let {coord} = currentWeather;
    console.log(dataOneCall);

    const currentWeatherList = currentWeather?.weather?.map((el,pos)=>(
        <div key = {pos}>
            <h1>{el.description}</h1>
            <img
                src = {"http://openweathermap.org/img/w/" + el.icon + ".png"} 
                alt = "please check for internet connection"
            />
        </div>
    ))

    // console.log(currentWeather);

    return(
        <>
            <h2 className="main">Real Time Weather Application</h2>
                <div className="search">
                    <input
                        className = "searchTerm"
                        type="text"
                        placeholder="Enter your city to see the current weather"
                        onChange={setCityName}
                    />
                    <button type="submit" class="searchButton" onClick = {searchHandler}>
                        Search.
                    </button>
                </div>

                
            <div className = "container">
                {/* <p>Current Weather</p> */}
                <div className = "name-container">{city}</div>
                {currentWeatherList}
            </div>
            <div className="form_wrapper">
                <h2 id = "center">Enter the Number of days to see the weather forecast</h2>
                <div className = "flex-container">
                    <div>
                        <input
                            id = "days"
                            type="number"
                            placeholder="Enter the Days between 1 to 40"
                            onChange={setDays}
                        />
                    </div>
                    <p className = "error_message_box">{message}</p>
                </div>
            </div>

            <div className = "button-flex">
                <button type="submit" onClick = {showDayWiseData} >
                            5Day/3Hours.
                </button>

                <button type="button" onClick= {()=>oneApiCall(coord?.lat, coord?.lon)}>
                            OneCall
                </button>
            </div>


            <div>
                {toogle && <div className = "four-container">
                     <ReactBootStrap.Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Serial No.</th>
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
                                    <td>{pos + 1}</td>
                                    <td>{el.main.humidity}%</td>
                                    <td>{el.main.pressure} Pa</td>
                                    <td>{parseFloat(el.main.temp - 273.15).toFixed(1)}&deg;C</td>
                                    <td>{parseFloat(el.main.temp_max - 273.15).toFixed(1)}&deg;C</td>
                                    <td>{parseFloat(el.main.temp_min - 273.15).toFixed(1)}&deg;C</td>
                                </tr>
                            ))}
                        </tbody>
                     </ReactBootStrap.Table>
                </div>}
                
            </div>

                {toogle && <div>
                    <ReactBootStrap.Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th>Humidity</th>
                                    <th>Pressure</th>
                                    <th>Wind Speed</th>
                                    <th>Wind Gust</th>
                                </tr>
                            </thead>
                            <tbody>
                                { dataOneCall?.daily?.map((el,pos)=>(
                                    <tr key = {pos}>
                                        <td>{pos + 1}</td>
                                        <td>{el.humidity}%</td>
                                        <td>{el.pressure} Pa</td>
                                        <td>{el.wind_speed}</td>
                                        <td>{el.wind_gust}</td>
                                    </tr>
                                ))}
                            </tbody>
                    </ReactBootStrap.Table>
                </div>}
                
        </>
    )
}

export default NewWeather;