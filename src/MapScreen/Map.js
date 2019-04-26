import './Map.sass'
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from '../Markers/LocationMarker';
import RemarkMarkerButton from '../Markers/RemarkMarkerButton';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 1,
      lng: 100
    },
    zoom: 1
  };

  onMapDrag(map) {
    // We receive here many interesting metrics, for example north east, north west
    // south east, south west coordinates. So we can calculate visible radius. And later
    // use it for fetching remarks for particular radius
    let renderedCenter = { lat: map.center.lat, lng: map.center.lng };
    this.props.onMapCenterChange(renderedCenter);
  };

  render() {
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY, language: 'uk', region: 'uk' }} // enable later
          center={this.props.center}
          zoom={this.props.zoom}
          onChange={(map) => this.onMapDrag(map)}
          yesIWantToUseGoogleMapApiInternals
        >
          <LocationMarker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
          />

          {this.props.groupedRemarks.map((remark, index) =>
            <RemarkMarkerButton
              key={index}
              groupId={index}
              text={remark.count}
              lat={remark.lat}
              lng={remark.lng}
              onClick={this.props.onMarkerClick}
            />
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;