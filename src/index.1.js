import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './rootReducer';

import './index.scss';

const defaultState = {
	// setLists: [
	// 	/* {
	// 		newSong: "",
	// 		songList: [],
	// 		used: false,
	// 		timeStamp: ""
	// 	} */
	// ],
	// count: 0,
	// login: false,
	// currentUser: null
}

const store = createStore(rootReducer, defaultState, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
	<Provider store={ store }>
		<Router/> 
	</Provider>,
	document.getElementById('root')
);

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
