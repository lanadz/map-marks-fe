import React from 'react';
import ReactDOM from 'react-dom';
import MyRemarksButton from './MyRemarksButton';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MyRemarksButton />, div);
});