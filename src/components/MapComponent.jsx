

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

// Custom car icon
const carIcon = new L.Icon({
  iconUrl: 'https://www.svgrepo.com/show/503783/car.svg',  // Path to car icon image
  iconSize: [50, 50],  // Size of the icon
  iconAnchor: [25, 50],  // Anchor point for the icon
});

// Default center position
const center = [17.385044, 78.486671];

const mapboxAccessToken = 'pk.eyJ1IjoicmV2YXRoaW1vaGFuIiwiYSI6ImNtMHh4NmZvczAzMHoyaXM5ODNsOGd2eHoifQ.FwuZQRXh-plqcvOVoOp8Ww';

const MapComponent = () => {
  const [vehiclePosition, setVehiclePosition] = useState(center);
  const [route, setRoute] = useState([]);
  const [day, setDay] = useState('Today');
  const [carData, setCarData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state for data loading

  // Fetch vehicle data based on selected day
  const fetchVehicleData = async (selectedDay) => {
    try {
      setIsDataLoaded(false); // Set to false before fetching data
    //   const response = await axios.get(`http://localhost:5000/api/location?day=${selectedDay}`);
      const response = await axios.get(`https://backendtichtechcmytask.onrender.com/api/location?day=${selectedDay}`);

      const data = response.data;
      setCarData(data);
      if (data.length > 0) {
        setVehiclePosition({
          lat: data[0].latitude,
          lng: data[0].longitude,
        });
        setRoute(data.map(point => ({ lat: point.latitude, lng: point.longitude })));
      }
      setIsDataLoaded(true); // Set to true after data is successfully fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsDataLoaded(false); // Ensure it's false if there's an error
    }
  };

  useEffect(() => {
    fetchVehicleData(day);
  }, [day]);

  // Handle play button click
  const handlePlayButtonClick = () => {
    if (!isDataLoaded) return; // Prevent play if data isn't loaded yet

    let index = 0;
    const interval = setInterval(() => {
      if (index < carData.length) {
        setVehiclePosition({
          lat: carData[index].latitude,
          lng: carData[index].longitude,
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Speed of movement
  };

  // Handle day change in dropdown
  const handleDayChange = (event) => {
    const selectedDay = event.target.value;
    setDay(selectedDay);
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer style={mapContainerStyle} center={vehiclePosition} zoom={15}>
        <TileLayer
        //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       
        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        id="mapbox/streets-v11"
      />
        
        <Marker
          position={vehiclePosition}
          icon={carIcon}
        />
        {route.length > 0 && <Polyline positions={route} color="red" />}
      </MapContainer>

      <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000 }}>
        <select onChange={handleDayChange} value={day}>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="This Week">This Week</option>
          <option value="Previous Week">Previous Week</option>
          <option value="This Month">This Month</option>
          <option value="Previous Month">Previous Month</option>
          <option value="Custom">Custom</option>
        </select>
        <button onClick={() => fetchVehicleData(day)}>Show</button>
        {isDataLoaded && <button onClick={handlePlayButtonClick}>Play</button>} {/* Conditional rendering of Play button */}
      </div>
    </div>
  );
};

export default MapComponent;
