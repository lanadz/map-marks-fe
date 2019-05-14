import React from 'react';
import './LocationMarker.sass';

const LocationMarker = () => (
  <div className="current-position">
    <svg height="60" width="60">
      <circle cx="30" cy="30" r="28" />
      <circle cx="30" cy="30" r="18" />
      <circle className="inner" cx="30" cy="30" r="8" />
    </svg>
  </div>
);

export default LocationMarker;
