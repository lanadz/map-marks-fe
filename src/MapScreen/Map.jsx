import './Map.sass';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import LocationMarker from '../Markers/LocationMarker';
import RemarkMarkerButton from '../Markers/RemarkMarkerButton';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 1,
      lng: 100,
    },
    zoom: 1,
    groupedRemarks: [],
  };

  static propTypes = {
    onMapChange: PropTypes.func.isRequired,
    center: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    zoom: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    groupedRemarks: PropTypes.array,
    onMarkerClick: PropTypes.func.isRequired,
  };

  onMapChange(map) {
    // We receive here many interesting metrics, for example north east, north west
    // south east, south west coordinates. So we can calculate visible radius. And later
    // use it for fetching remarks for particular radius
    const renderedCenterAndZoom = {
      center: { lat: map.center.lat, lng: map.center.lng },
      zoom: map.zoom,
    };
    const { onMapChange } = this.props;
    onMapChange(renderedCenterAndZoom);
  }

  render() {
    const {
      center, zoom, groupedRemarks, onMarkerClick,
    } = this.props;

    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY, language: 'uk', region: 'uk' }} // enable later
          center={center}
          zoom={zoom}
          onChange={map => this.onMapChange(map)}
          yesIWantToUseGoogleMapApiInternals
        >
          <LocationMarker
            lat={center.lat}
            lng={center.lng}
          />

          {groupedRemarks.map((remark, index) => (
            <RemarkMarkerButton
              key={remark.id}
              groupId={index}
              text={remark.count}
              lat={remark.lat}
              lng={remark.lng}
              onClick={onMarkerClick}
            />
          ))
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
