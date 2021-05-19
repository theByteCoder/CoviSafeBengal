/* global google */
import React from "react";
import { DirectionsRenderer } from "@react-google-maps/api";

class MapDirectionsRenderer extends React.Component {
  state = {
    directions: null,
    error: null,
  };

  componentDidMount() {
    const { places, travelMode } = this.props;

    const waypoints = places.map((p) => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true,
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          this.setState({ error: result });
        }
      }
    );
  }

  render() {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
    return (
      this.state.directions && (
        <DirectionsRenderer directions={this.state.directions} />
      )
    );
  }
}

export default MapDirectionsRenderer;
