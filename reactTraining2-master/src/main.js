/* eslint-disable */


//might use it for some operation so import jquery

//everything is managed by DOM and virtual dom in real world
import jquery from 'jquery';
window.$ = window.jQuery=jquery;

//require is es5 
//react nav does routing
import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';

//top level componet is app.js wrap inside hash router which we get form hashrouter
//hash router allows to cache some and allows to hyperlink

import {App} from './components/App.js';

ReactDom.render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('app'));
  