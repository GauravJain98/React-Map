import React, { Component } from "react";
// import GoogleMapReact from "google-map-react";
import Pointer from "./components/pointer";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import styles from "./index.css";

class Contents extends Component {
  state = {
    position: null
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({ position: place.geometry.location });
    });
  }

  render() {
    const { position } = this.state;

    return (
      <div className={styles.flexWrapper}>
        <div className={styles.left}>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Enter a location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
            />

            <input className={styles.button} type="submit" value="Go" />
          </form>

          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
        </div>

        <div className={styles.right}>
          <Map
            {...this.props}
            center={position}
            centerAroundCurrentLocation={false}
            containerStyle={{
              height: "100vh",
              position: "relative",
              width: "100%"
            }}
          >
            <Marker position={position} />
          </Map>
        </div>
      </div>
    );
  }
}

const MapWrapper = props => (
  <Map className="map" google={props.google} visible={false}>
    <Contents {...props} />
  </Map>
);

export default GoogleApiWrapper({
  apiKey: "AIzaSyBw9fBoPfdryxzY1bTDzTMXYJHfhiVaCBQ"
})(MapWrapper);

// function createMapOptions(maps) {
//   // next props are exposed at maps
//   // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
//   // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
//   // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
//   // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
//   // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
//   return {
//     zoomControlOptions: {
//       position: maps.ControlPosition.RIGHT_CENTER,
//       style: maps.ZoomControlStyle.SMALL
//     },
//     mapTypeControlOptions: {
//       position: maps.ControlPosition.TOP_RIGHT
//     },
//     mapTypeControl: true
//   };
// }

// class App extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };

//   static style = {
//     width: '100%',
//     height: '100%'
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: "60vh", width: "60vh", display: "flex" }}>
//         <div style={{ float: "left" }}>
//           <h1>Hello World</h1>
//         </div>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: "AIzaSyBw9fBoPfdryxzY1bTDzTMXYJHfhiVaCBQ" }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//           options={createMapOptions}
//         >
//           <Pointer
//             lat={59.955413}
//             lng={30.337844}
//             text={"A"} /* Kreyser Avrora */
//           />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }
// class App extends Component {
//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <GoogleApiWrapper
//         style={{
//           width: "100%",
//           height: "100%"
//         }}
//       />
//     );
//   }
// }

// export default App;
// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// // import any from "./components/any";
// import GoogleMapReact from "google-map-react";
// const AnyReactComponent = ({ text, lat, lng }) => (
//   <div
//     style={{
//       color: "white",
//       background: "grey",
//       padding: "15px 10px",
//       display: "inline-flex",
//       textAlign: "center",
//       alignItems: "center",
//       justifyContent: "center",
//       borderRadius: "100%",
//       transform: "translate(-50%, -50%)"
//     }}
//   >
//     {text}
//   </div>
// );

// class App extends Component {
//   static defaultProps = {
//     center: { lat: 59.95, lng: 30.33 },
//     zoom: 11
//   };

//   render() {
//     return (
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyBw9fBoPfdryxzY1bTDzTMXYJHfhiVaCBQ" }}
//         defaultCenter={this.props.center}
//         defaultZoom={this.props.zoom}
//       >
//         <AnyReactComponent
//           lat={59.955413}
//           lng={30.337844}
//           text={"Kreyser Avrora"}
//         />
//       </GoogleMapReact>
//     );
//   }
// }

// export default App;
