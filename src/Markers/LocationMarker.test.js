import React from 'react';
import ReactDOM from 'react-dom';
import LocationMarker from './LocationMarker';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LocationMarker />, div);
});