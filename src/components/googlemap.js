import React, { useState, useRef, useEffect } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  infoWindow,
  google,
} from "google-maps-react";
import Card from "./inforCard";
import PlaceAutocompletefunc from './placeAutocomplete';

const mapStyles = {
  width: "40%",
  height: "60%",
};

const loca = [
  {
    city: "Seattle",
    coordination: { lat: 47.42842322178224, lng: -122.08769037141076 },
  },
  {
    city: "Chicago",
    coordination: { lat: 41.67328275935963, lng: -87.54147243851116 },
  },
  {
    city: "Newyork",
    coordination: { lat: 40.54757758936804, lng: -73.92362787141076 },
  },
];

const GroupBuyLeaerInfo = [
  {
    city: "Seattle",
    name: "Frank",
    location: " 605-ft.-tall spire at the Seattle Center",
    Email: "frank@groupby.com",
    phone: "001-111-123",
  },
  {
    city: "Chicago",
    name: "Brank",
    location: " 605-ft.-tall spire at the Seattle Center2",
    Email: "Brank@groupby.com",
    phone: "001-222-124",
  },
  {
    city: "Newyork",
    name: "Trank",
    location: " 605-ft.-tall spire at the Seattle Center3",
    Email: "Trank@groupby.com",
    phone: "001-333-123",
  },
];

export const MapContainer = (props) => {
  const [groupBuyleaderId, setGroupBuyleaderId] = useState("");
  const [filterLeaderInfo, setFilterLeaderInfo] = useState({});
  const [initialLocation,setInitialLocation] =useState({lat: 56.5, lng: -158.75,});
  const [currentLocation, setCurrentLocation] = useState({});

  const [showCurrentLocaMark, setShowCurrentLocaMark] = useState(false);
  const [zoomsize, setzoom] = useState(6);

  const clickRef = useRef(groupBuyleaderId);
  clickRef.current = groupBuyleaderId;

  const currentRef = useRef(currentLocation);
  currentRef.current = currentLocation;

  const locationReceiveHanlder = (location)=>{
    setInitialLocation(location);
  }

  const GroupLeaderInfoSendHandler = (id) => {
    setGroupBuyleaderId(id);
    for (let key in GroupBuyLeaerInfo) {
      if (GroupBuyLeaerInfo[key].city === clickRef.current) {
        return setFilterLeaderInfo({ ...GroupBuyLeaerInfo[key] });
      }
    }
  };

  let marker = null;

  const CurrentLocationIdentifier = () => {
    console.log("1");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(pos);
      });
        
        
      
     
      //setShowCurrentLocaMark(true);
      /*infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);*/
    }
  };
  console.log("iniLat:"+initialLocation.lat,"iniLag:"+initialLocation.lng);
  return (
    <div className="grid grid-cols-2 bg-gray-200 h-screen">
      <div className="pt-20 pl-10 ">
        <button id="CurLoca" onClick={CurrentLocationIdentifier}>
          Pan to current Location
        </button>
        <PlaceAutocompletefunc LocaReceiver={locationReceiveHanlder}/>
        <Map
          id="map"
          google={props.google}
          zoom={zoomsize}
          style={mapStyles}
          initialCenter={{
            lat:initialLocation.lat,
            lng: initialLocation.lng
           //lat: 38.51417683162813,
           //lng: -99.32401849641076,
          }}
        >
          <Marker position={initialLocation}/>
          <Marker position={currentRef.current}/>
          {loca.map((location) => {
            return (
              <Marker
                onClick={() => GroupLeaderInfoSendHandler(location.city)}
                key={location.city}
                position={location.coordination}
              />
            );
          })}
        </Map>
      </div>
      <div className="pt-20 pr-5">
        <Card
          name={filterLeaderInfo.name}
          location={filterLeaderInfo.location}
          Email={filterLeaderInfo.Email}
          phone={filterLeaderInfo.phone}
        />
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCTpHLuaRccfwl4bU5ru-o4jiEOY5D0ADM",
})(MapContainer);
