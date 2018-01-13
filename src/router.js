import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App.js';


const history = createBrowserHistory();

const router = (props) => {
	return (
		<Router history={history}>
			<App history={history}/>
		</Router>
	)
}

export default router;