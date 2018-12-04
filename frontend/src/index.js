import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Start from './DevSecOps/Watcher/Start';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(<Start />, document.getElementById('root'));
registerServiceWorker();
