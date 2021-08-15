import React from 'react';
import ReactDOM from 'react-dom';

// Importing CSS style sheets
import './css/reset.css';
import './css/global.css';

import { Provider } from './Context';
import App from './App';

ReactDOM.render(
    // Wrapping the whole App inside the Provider tags, so that <App /> is now a child of Provider and can be rendered by it
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
);