import React from "react";
import { MapContainer } from "./components/googlemap";
import GoogleApiWrapper from "./components/googlemap";

const App = () => {

  return (
      <div>
        <GoogleApiWrapper>
          <MapContainer />
        </GoogleApiWrapper>
      </div>
 
  );
};

export default App;
