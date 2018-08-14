import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Pointer from "./components/pointer";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { TextField } from "@material-ui/core";

// import styles from "./autocomplete.module.css";
const styles = {};
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
      <div style={{ backgroundColor: "#006db3", height: "100vh" }}>
        <div
          style={{
            padding: "0",
            border: "0.25em solid #cfcfcf",
            fontSize: "1.5em",
            backgroundColor: "#63ccff"
          }}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: "0",
              margin: "2em"
            }}
          >
            <form
              className="flexWrapper left"
              style={{ fontSize: "2rem", margin: "2px" }}
              onSubmit={this.onSubmit}
            >
              <TextField
                placeholder="Enter a location"
                inputRef={inputRef => (this.autocomplete = inputRef)}
                type="text"
                inputProps={{
                  style: { flex: 1, order: 1, margin: "1em", fontSize: "2rem" }
                }}
              />{" "}
              <div
                style={{
                  overflow: "x-scroll",
                  flex: 2,
                  order: 2,
                  margin: "1em"
                }}
              >
                Lat: {position && position.lat()}
              </div>
              <div
                style={{
                  overflow: "x-scroll",
                  flex: 3,
                  order: 3,
                  margin: "1em"
                }}
              >
                Lng: {position && position.lng()}
              </div>
            </form>
          </div>
        </div>
        <div className="right" style={{ height: "80vh" }}>
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
