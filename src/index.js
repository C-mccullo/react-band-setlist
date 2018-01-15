import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer, { defaultState } from './rootReducer';

const store = createStore(rootReducer, defaultState, compose(
	applyMiddleware(thunkMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

const Root = ({store}) => {
	return (
		<Provider store={store}>
			<Router/>
		</Provider>
	)
}

ReactDOM.render(
	<Root store={ store }/>,
	document.getElementById('root')
);

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
