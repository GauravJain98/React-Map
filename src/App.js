import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Pointer from "./components/pointer";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

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
      <div style={{ border: "5px green" }}>
        <div className="">
          <form className="flexWrapper" onSubmit={this.onSubmit}>
            <Input
              className="left"
              placeholder="Enter a location"
              inputRef={inputRef => (this.autocomplete = inputRef)}
              type="text"
            />

            <Button className="right" type="submit">
              Go
            </Button>
          </form>

          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
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
