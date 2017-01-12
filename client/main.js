import React from 'react';
import ReactDom from 'react-dom';
import {Router,Route,IndexRoute,hashHistory,IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';
import Main from './components/Main.jsx';
import Login from './containers/Login.js';
import PolicyManage from './containers/PolicyManage.js';
import PolicyEdit from './components/PolicyEdit.jsx';
import PointChoose from './components/PointChoose.jsx';
import PointDrag from './components/PointDrag.jsx';
import PointManage from './components/PointManage.jsx';
import PointCreate from './components/PointCreate.jsx';
require('./assets/css/main.scss');

const store = configureStore();

const App = React.createClass({
	requireAuth(nextState,replace){
		//登录认证
		console.log('requireAuth');
	},
	judgeLogin(nextState,replace){
		//登录判断
		console.log('judgeLogin');
	},
	render(){
		return(
			<Router history={hashHistory}>
				<Route path='/' component={Main}>
					<IndexRoute component={Login} onEnter={this.judgeLogin}/>
					<Route path='/login' component={Login} onEnter={this.judgeLogin}/>
					<Route path='/policymanage' component={PolicyManage} onEnter={this.requireAuth}/>
					<Route path='/policyadd' component={PolicyEdit} onEnter={this.requireAuth}/>
					<Route path='/policyview/:id' component={PolicyEdit} onEnter={this.requireAuth} yui="yes"/>
					<Route path='/policyedit/:id' component={PolicyEdit} onEnter={this.requireAuth}/>
					<Route path='/policycopy/:id' component={PolicyEdit} onEnter={this.requireAuth}/>
					<Route path='/pointchoose' component={PointChoose} onEnter={this.requireAuth}/>
					<Route path='/pointdrag' component={PointDrag} onEnter={this.requireAuth}/>
					<Route path='/pointmanage' component={PointManage} onEnter={this.requireAuth}/>
					<Route path='/cateadd/:type' component={PointCreate} onEnter={this.requireAuth}/>
					<Route path='/cateedit/:id' component={PointCreate} onEnter={this.requireAuth}/>
					<Route path='/pointadd/:type/:parentId' component={PointCreate} onEnter={this.requireAuth}/>
					<Route path='/pointedit/:pointId' component={PointCreate} onEnter={this.requireAuth}/>
				</Route>
			</Router>
		)
	}
});
ReactDom.render((
	<Provider store={store}>
		<App/>
	</Provider>
	),$('#app')[0]
);