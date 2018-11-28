import React from 'react';
import ReactDOM from 'react-dom';
import AddImage from './AddImage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddImage />, div);
    ReactDOM.unmountCompondfddsentAtNode(div);
});