import React from 'react';
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const WeatherMap = (props) => {

  console.log(props.description)
  const mapStyles = {        
    height: "50vh",
    width: "100%",
    // marginLeft:"25rem",
    // marginBottom:"5rem"
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
              <Marker 
                position={{lat:props.lat , lng:props.lng}} 
                icon = {props.iconmarker}
                label = {props.description}
              />
            ) 
        }

        </GoogleMap>
     </LoadScript>
  )
}

export default WeatherMap;