
import React, { Component } from 'react';
import {  withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
import './App.css';

class Maps extends Component {
  state = {
    markerPosition: { lat: 46.490887, lng: 30.746284 },
    address: '-',
  };

  handleMapClick = (event) => {
    const { latLng } = event;

    if (latLng) {
      const markerPosition = { lat: latLng.lat(), lng: latLng.lng() };
      const geocoder = new window.google.maps.Geocoder();

      this.setState({ markerPosition });

      geocoder.geocode({ latLng }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results.length > 0) {
            this.setState({ address: results[0].formatted_address });
          }
        }
      });
    }
  };

  render() {
    const { isMarkerShown } = this.props;
    const { markerPosition, address } = this.state;

    return (
      <div>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={markerPosition}
          onClick={this.handleMapClick}
        >
          {isMarkerShown && <Marker position={markerPosition} />}
        </GoogleMap>
        <p>
          Address: {address}
        </p>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(Maps));
