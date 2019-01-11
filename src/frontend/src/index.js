import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './Store';
import './index.css';

// ========================================

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const render = () => {
  ReactDOM.render(<App state={store.getState()} />, document.getElementById('root'));
};

// render App everytime store is updatet
store.subscribe(render);
// render App on start
render();
