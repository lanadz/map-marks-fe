import React from 'react';
import ReactDOM from 'react-dom';
import RemarkMarker from './RemarkMarker';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RemarkMarker />, div);
});