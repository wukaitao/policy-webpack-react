import React from 'react';
import ReactDom from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';
import Nav from './components/Nav.jsx';
import Popup from './components/Popup.jsx';
import Login from './components/Login.jsx';
import PolicyManage from './containers/PolicyManage.js';
import PolicyEdit from './components/PolicyEdit.jsx';
import PointChoose from './components/PointChoose.jsx';
import PointDrag from './components/PointDrag.jsx';
import PointManage from './components/PointManage.jsx';
import PointCreate from './components/PointCreate.jsx';
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
					<Route path='/policyadd' component={PolicyEdit}/>
					<Route path='/policyview/:id' component={PolicyEdit}/>
					<Route path='/policyedit/:id' component={PolicyEdit}/>
					<Route path='/policycopy/:id' component={PolicyEdit}/>
					<Route path='/pointchoose' component={PointChoose}/>
					<Route path='/pointdrag' component={PointDrag}/>
					<Route path='/pointmanage' component={PointManage}/>
					<Route path='/cateadd/:type' component={PointCreate}/>
					<Route path='/cateedit/:id' component={PointCreate}/>
					<Route path='/pointadd/:type/:parentId' component={PointCreate}/>
					<Route path='/pointedit/:pointId' component={PointCreate}/>
				</Router>
				<Popup/>
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