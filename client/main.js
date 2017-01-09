import React from 'react';
import ReactDom from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import PolicyManage from './containers/PolicyManage.js';
require('./assets/css/main.scss');

const store = configureStore();

const App = React.createClass({
	render(){
		return(
			<div>
				<Nav/>
				<Router history={hashHistory}>
					<Route path='/' component={Login}/>
					<Route path='/login' component={Login}/>
					<Route path='/policymanage' component={PolicyManage}/>
				</Router>
			</div>
		)
	}
});
ReactDom.render((
	<Provider store={store}>
		<App/>
	</Provider>
	),$('#app')[0]
);