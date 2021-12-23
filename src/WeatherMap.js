import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const WeatherMap = () => {
  
  const mapStyles = {        
    height: "60vh",
    width: "50%",
    marginLeft:"25rem"
    };
  
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyDAQELn-wNytOliNGxRo8BZbYqNcOvzfcc'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default WeatherMap;