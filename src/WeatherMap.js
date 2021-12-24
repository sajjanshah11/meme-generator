import React, {useState,useEffect} from 'react';
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const WeatherMap = (props) => {

  console.log(props)
  
  const mapStyles = {        
    height: "60vh",
    width: "50%",
    marginLeft:"25rem"
    };
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyDAQELn-wNytOliNGxRo8BZbYqNcOvzfcc'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={props}
        >
        {
            props.lat &&
            ( 
              <Marker position={props} />
            ) 
        }

        </GoogleMap>
     </LoadScript>
  )
}

export default WeatherMap;