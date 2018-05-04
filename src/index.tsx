import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import './App.css';

let div = document.createElement('div')
div.id = 'root'
let body = document.getElementsByTagName('Body')
body[0].appendChild(div)

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
