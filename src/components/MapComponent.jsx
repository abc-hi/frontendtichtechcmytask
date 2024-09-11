// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
// import axios from 'axios';


// const mapContainerStyle = {
//   width: '100%',
//   height: '100vh'
// };

// const center = {
//   lat: 17.385044,
//   lng: 78.486671
// };

// const MapComponent = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(center);
//   const [route, setRoute] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Fetch location data every few seconds
//       axios.get('http://localhost:5000/api/location')
//         .then(response => {
//           const data = response.data;
//           const latestPosition = {
//             lat: data[data.length - 1].latitude,
//             lng: data[data.length - 1].longitude
//           };
//           setVehiclePosition(latestPosition);
//           setRoute(data.map(item => ({
//             lat: item.latitude,
//             lng: item.longitude
//           })));
//         })
//         .catch(error => console.error('Error fetching data:', error));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={15}
//         center={vehiclePosition}
//       >
//         {/* Vehicle Marker */}
//         <Marker position={vehiclePosition} />

//         {/* Route Polyline */}
//         {route.length > 0 && <Polyline path={route} options={{ strokeColor: '#FF0000' }} />}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;


// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
// import axios from 'axios';

// const MapComponent = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(null);
//   const [route, setRoute] = useState([]);
//   const [wireless, setWireless] = useState(''); // Wireless dropdown value
//   const [day, setDay] = useState('Today'); // Day dropdown value
//   const [carData, setCarData] = useState([]); // All data for selected day

//   useEffect(() => {
//     if (day) {
//       fetchVehicleData();
//     }
//   }, [day]);

//   const fetchVehicleData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/location?day=${day}`);
//       const data = response.data;
//       setCarData(data);
//       setVehiclePosition({
//         lat: data[0].latitude,
//         lng: data[0].longitude,
//       });
//       setRoute(data.map(point => ({ lat: point.latitude, lng: point.longitude })));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handlePlayClick = () => {
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < carData.length) {
//         setVehiclePosition({
//           lat: carData[index].latitude,
//           lng: carData[index].longitude,
//         });
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 1000); // Speed of movement
//   };

//   return (
//     <div>
//       <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//   mapContainerStyle={{ width: '100%', height: '80vh' }}
//   zoom={15}
//   center={vehiclePosition || { lat: 17.385044, lng: 78.486671 }}
// >
//   {/* Car Marker */}
//   {vehiclePosition && (
//     <Marker
//       position={vehiclePosition}
//       icon={{
//         url: '/path_to_car_icon.png', // Replace with the actual path to your car icon
//         scaledSize: new window.google.maps.Size(50, 50), // Set the size of the car icon
//       }}
//     />
//   )}

//   {/* Route Polyline */}
//   {route.length > 0 && <Polyline path={route} options={{ strokeColor: '#FF0000' }} />}
// </GoogleMap>

//       </LoadScript>

//       {/* Dropdowns for wireless and day options */}
//       <div style={{ padding: '10px', textAlign: 'center' }}>
//         <select value={wireless} onChange={e => setWireless(e.target.value)}>
//           <option value="4G">4G</option>
//           <option value="5G">5G</option>
//           <option value="WiFi">WiFi</option>
//         </select>

//         <select value={day} onChange={e => setDay(e.target.value)}>
//           <option value="Today">Today</option>
//           <option value="Yesterday">Yesterday</option>
//           <option value="This Week">This Week</option>
//           <option value="Previous Week">Previous Week</option>
//           <option value="This Month">This Month</option>
//           <option value="Previous Month">Previous Month</option>
//           <option value="Custom">Custom</option>
//         </select>

//         {/* Show and Play Buttons */}
//         <button onClick={fetchVehicleData}>Show</button>
//         <button onClick={handlePlayClick}>Play</button>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import axios from 'axios';

// const mapContainerStyle = {
//   width: '100%',
//   height: '100vh',
// };
// // Custom car icon
// const carIcon = new L.Icon({
//   iconUrl: 'path_to_your_car_icon.png',  // Path to your car icon image
//   iconSize: [50, 50],  // Size of the icon
//   iconAnchor: [25, 50],  // Anchor point for the icon
// });
// const center = [17.385044, 78.486671];

// const MapComponent = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(center);
//   const [route, setRoute] = useState([]);
//   const [day, setDay] = useState('Today');
//   const [carData, setCarData] = useState([]);

//   const fetchVehicleData = async (selectedDay) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/location?day=${selectedDay}`);
//       const data = response.data;
//       setCarData(data);
//       if (data.length > 0) {
//         setVehiclePosition({
//           lat: data[0].latitude,
//           lng: data[0].longitude,
//         });
//         setRoute(data.map(point => ({ lat: point.latitude, lng: point.longitude })));
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchVehicleData(day);
//   }, [day]);

//   const handlePlayButtonClick = () => {
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < carData.length) {
//         setVehiclePosition({
//           lat: carData[index].latitude,
//           lng: carData[index].longitude,
//         });
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 1000); // Speed of movement
//   };

//   const handleDayChange = (event) => {
//     const selectedDay = event.target.value;
//     setDay(selectedDay); // Update day state
//   };

//   return (
//     <div style={{ position: 'relative' }}>
//       <MapContainer style={mapContainerStyle} center={vehiclePosition} zoom={15}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker
//           position={vehiclePosition}
//           icon={L.icon({
//             iconUrl: 'https://www.svgrepo.com/show/503783/car.svg', 
//                         iconSize: [50, 50], // Size of the icon
//           })}
//         />
//         {route.length > 0 && <Polyline positions={route} color="red" />}
//       </MapContainer>

//       <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000 }}>
//         <select onChange={handleDayChange} value={day}>
//           <option value="Today">Today</option>
//           <option value="Yesterday">Yesterday</option>
//           <option value="This Week">This Week</option>
//           <option value="Previous Week">Previous Week</option>
//           <option value="This Month">This Month</option>
//           <option value="Previous Month">Previous Month</option>
//           <option value="Custom">Custom</option>
//         </select>
//         <button onClick={handlePlayButtonClick}>Play</button>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;

// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import axios from 'axios';
// import FilterControls from './FilterControls';

// const mapContainerStyle = {
//   width: '100%',
//   height: '100vh',
// };

// // Custom car icon
// const carIcon = new L.Icon({
//   iconUrl: 'path_to_your_car_icon.png', // Path to your car icon image
//   iconSize: [50, 50], // Size of the icon
//   iconAnchor: [25, 50], // Anchor point for the icon
// });
// const center = [17.385044, 78.486671];

// const MapComponent = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(center);
//   const [route, setRoute] = useState([]);
//   const [carData, setCarData] = useState([]);
//   const [day, setDay] = useState('Today');
//   const mapRef = useRef();

//   const fetchVehicleData = async (selectedDay) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/location?day=${selectedDay}`);
//       const data = response.data;
//       setCarData(data);
//       if (data.length > 0) {
//         setVehiclePosition([data[0].latitude, data[0].longitude]);
//         setRoute(data.map(point => [point.latitude, point.longitude]));
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleShowClick = (selectedDay) => {
//     setDay(selectedDay);
//     fetchVehicleData(selectedDay);
//   };

//   const handlePlayClick = () => {
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < carData.length) {
//         setVehiclePosition([carData[index].latitude, carData[index].longitude]);
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 1000); // Speed of movement
//   };

//   useEffect(() => {
//     fetchVehicleData(day);
//   }, [day]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <MapContainer style={mapContainerStyle} center={vehiclePosition} zoom={15} ref={mapRef}>
//         <TileLayer
//           url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker
//           position={vehiclePosition}
//                      icon={L.icon({
//                        iconUrl: 'https://www.svgrepo.com/show/503783/car.svg', 
//                                    iconSize: [50, 50], // Size of the icon
//                      })}
//         />
//         {route.length > 0 && <Polyline positions={route} color="red" />}
//       </MapContainer>

//       <FilterControls
//         onDayChange={(selectedDay) => setDay(selectedDay)}
//         onShowClick={handleShowClick}
//         onPlayClick={handlePlayClick}
//       />
//     </div>
//   );
// };

// export default MapComponent;

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
// import axios from 'axios';

// const MapComponent = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(null);
//   const [route, setRoute] = useState([]);
//   const [wireless, setWireless] = useState(''); // Wireless dropdown value
//   const [day, setDay] = useState('Today'); // Day dropdown value
//   const [carData, setCarData] = useState([]); // All data for selected day

//   useEffect(() => {
//     if (day) {
//       fetchVehicleData();
//     }
//   }, [day]);

//   const fetchVehicleData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/location?day=${day}`);
//       const data = response.data;
//       setCarData(data);
//       if (data.length > 0) {
//         setVehiclePosition({
//           lat: data[0].latitude,
//           lng: data[0].longitude,
//         });
//         setRoute(data.map(point => ({ lat: point.latitude, lng: point.longitude })));
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handlePlayClick = () => {
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < carData.length) {
//         setVehiclePosition({
//           lat: carData[index].latitude,
//           lng: carData[index].longitude,
//         });
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 1000); // Speed of movement
//   };

//   return (
//     <div>
//       <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//         <GoogleMap
//           mapContainerStyle={{ width: '100%', height: '80vh' }}
//           zoom={15}
//           center={vehiclePosition || { lat: 17.385044, lng: 78.486671 }}
//         >
//           {/* Car Marker */}
//           {vehiclePosition && (
//             <Marker
//               position={vehiclePosition}
//               icon={{
//                 url: 'https://www.svgrepo.com/show/503783/car.svg', // Replace with the actual path to your car icon
//                 scaledSize: new window.google.maps.Size(50, 50), // Set the size of the car icon
//               }}
//             />
//           )}

//           {/* Route Polyline */}
//           {route.length > 0 && <Polyline path={route} options={{ strokeColor: '#FF0000' }} />}
//         </GoogleMap>
//       </LoadScript>

//       {/* Dropdowns for wireless and day options */}
//       <div style={{ padding: '10px', textAlign: 'center' }}>
//         <select value={wireless} onChange={e => setWireless(e.target.value)}>
//           <option value="4G">4G</option>
//           <option value="5G">5G</option>
//           <option value="WiFi">WiFi</option>
//         </select>

//         <select value={day} onChange={e => setDay(e.target.value)}>
//           <option value="Today">Today</option>
//           <option value="Yesterday">Yesterday</option>
//           <option value="This Week">This Week</option>
//           <option value="Previous Week">Previous Week</option>
//           <option value="This Month">This Month</option>
//           <option value="Previous Month">Previous Month</option>
//           <option value="Custom">Custom</option>
//         </select>

//         {/* Show and Play Buttons */}
//         <button onClick={fetchVehicleData}>Show</button>
//         <button onClick={handlePlayClick}>Play</button>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import axios from 'axios';

// // Map container style
// const mapContainerStyle = {
//   width: '100%',
//   height: '100vh',
// };

// // Custom car icon
// const carIcon = new L.Icon({
//   iconUrl: 'https://www.svgrepo.com/show/503783/car.svg',  // Path to your car icon image
//   iconSize: [50, 50],  // Size of the icon
//   iconAnchor: [25, 50],  // Anchor point for the icon
// });


// // Default center position
// const center = [17.385044, 78.486671];

// const MapComponent = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(center);
//   const [route, setRoute] = useState([]);
//   const [day, setDay] = useState('Today');
//   const [carData, setCarData] = useState([]);

//   // Fetch vehicle data based on selected day
//   const fetchVehicleData = async (selectedDay) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/location?day=${selectedDay}`);
//       const data = response.data;
//       setCarData(data);
//       if (data.length > 0) {
//         setVehiclePosition({
//           lat: data[0].latitude,
//           lng: data[0].longitude,
//         });
//         setRoute(data.map(point => ({ lat: point.latitude, lng: point.longitude })));
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchVehicleData(day);
//   }, [day]);

//   // Handle play button click
//   const handlePlayButtonClick = () => {
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < carData.length) {
//         setVehiclePosition({
//           lat: carData[index].latitude,
//           lng: carData[index].longitude,
//         });
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 1000); // Speed of movement
//   };

//   // Handle day change in dropdown
//   const handleDayChange = (event) => {
//     const selectedDay = event.target.value;
//     setDay(selectedDay);
//   };

//   return (
//     <div style={{ position: 'relative' }}>
//       <MapContainer style={mapContainerStyle} center={vehiclePosition} zoom={15}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker
//           position={vehiclePosition}
//           icon={carIcon}
//         />
//         {route.length > 0 && <Polyline positions={route} color="red" />}
//       </MapContainer>

//       <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000 }}>
//         <select onChange={handleDayChange} value={day}>
//           <option value="Today">Today</option>
//           <option value="Yesterday">Yesterday</option>
//           <option value="This Week">This Week</option>
//           <option value="Previous Week">Previous Week</option>
//           <option value="This Month">This Month</option>
//           <option value="Previous Month">Previous Month</option>
//           <option value="Custom">Custom</option>
//         </select>
//         <button onClick={handlePlayButtonClick}>Play</button>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import axios from 'axios';

// // Map container style
// const mapContainerStyle = {
//   width: '100%',
//   height: '100vh',
// };

// // Custom car icon
// const carIcon = new L.Icon({
//   iconUrl: 'https://www.svgrepo.com/show/503783/car.svg',
//   iconSize: [50, 50],
//   iconAnchor: [25, 50],
// });

// // Default center position
// const center = [17.385044, 78.486671];

// const MapComponent = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(center);
//   const [route, setRoute] = useState([]);
//   const [day, setDay] = useState('Today');
//   const [carData, setCarData] = useState([]);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Fetch vehicle data based on selected day
// //   const fetchVehicleData = async (selectedDay) => {
// //     try {
// //       const response = await axios.get(`http://localhost:5000/api/location?day=${selectedDay}`);
// //       const data = response.data;
// //       setCarData(data);
// //       if (data.length > 0) {
// //         setVehiclePosition({
// //           lat: data[0].latitude,
// //           lng: data[0].longitude,
// //         });
// //         setRoute(data.map(point => ({ lat: point.latitude, lng: point.longitude })));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     }
// //   };
// const fetchVehicleData = async (selectedDay) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/location?day=${selectedDay}`);
//       const data = response.data;
//       console.log('Fetched data:', data); // Debugging line
//       setCarData(data);
//       if (data.length > 0) {
//         setVehiclePosition({
//           lat: data[0].latitude,
//           lng: data[0].longitude,
//         });
//         setRoute(data.map(point => ({ lat: point.latitude, lng: point.longitude })));
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  

//   useEffect(() => {
//     if (isPlaying) {
//       let index = 0;
//       const interval = setInterval(() => {
//         if (index < carData.length) {
//           setVehiclePosition({
//             lat: carData[index].latitude,
//             lng: carData[index].longitude,
//           });
//           index++;
//         } else {
//           clearInterval(interval);
//           setIsPlaying(false);
//         }
//       }, 1000); // Speed of movement
//       return () => clearInterval(interval); // Cleanup interval on component unmount
//     }
//   }, [isPlaying, carData]);

//   // Handle play button click
//   const handlePlayButtonClick = () => {
//     setIsPlaying(true);
//   };

//   // Handle day change in dropdown
//   const handleDayChange = (event) => {
//     const selectedDay = event.target.value;
//     setDay(selectedDay);
//   };

//   // Handle show button click
//   const handleShowButtonClick = () => {
//     fetchVehicleData(day);
//   };

//   return (
//     <div style={{ position: 'relative' }}>
//       <MapContainer style={mapContainerStyle} center={vehiclePosition} zoom={15}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker
//           position={vehiclePosition}
//           icon={carIcon}
//         />
//         {route.length > 0 && <Polyline positions={route} color="red" />}
//       </MapContainer>

//       <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000 }}>
//         <select onChange={handleDayChange} value={day}>
//           <option value="Today">Today</option>
//           <option value="Yesterday">Yesterday</option>
//           <option value="This Week">This Week</option>
//           <option value="Previous Week">Previous Week</option>
//           <option value="This Month">This Month</option>
//           <option value="Previous Month">Previous Month</option>
//           <option value="Custom">Custom</option>
//         </select>
//         <button onClick={handleShowButtonClick}>Show</button>
//         <button onClick={handlePlayButtonClick}>Play</button>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;


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
  iconUrl: 'https://www.svgrepo.com/show/503783/car.svg',  // Path to your car icon image
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
      const response = await axios.get(`http://localhost:5000/api/location?day=${selectedDay}`);
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
