import React from 'react';
import ReactDOM from 'react-dom';
import ListRemarks from './ListRemarks';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListRemarks remarks={[]} />, div);
});