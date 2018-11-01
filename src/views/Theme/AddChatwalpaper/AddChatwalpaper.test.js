import React from 'react';
import ReactDOM from 'react-dom';
import AddChatwalpaper from './AddChatwalpaper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddChatwalpaper />, div);
  ReactDOM.unmountComponentAtNode(div);
});
