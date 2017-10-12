import React, {Component} from 'react';
import {render} from 'react-dom';
import _ from 'lodash';
import moment from 'moment';
// import LightIcon from 'lighticon';
import App from './App';

//append div to document, then can see hello webpack on screen
//document.body.appendChild(component());
render(<App />, document.getElementById('root'));
