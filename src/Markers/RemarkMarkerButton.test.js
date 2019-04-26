import React from 'react';
import ReactDOM from 'react-dom';
import RemarkMarkerButton from './RemarkMarkerButton';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RemarkMarkerButton />, div);
});