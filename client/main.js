import React from 'react';
import ReactDom from 'react-dom';
import {Router,Route,IndexRoute,hashHistory,IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import configureStore from './store/configureStore.js';
import Main from './components/Main.jsx';
import Login from './containers/Login.js';
import PolicyManage from './containers/PolicyManage.js';
import PolicyEdit from './containers/PolicyEdit.js';
import PointChoose from './components/PointChoose.jsx';
import PointDrag from './components/PointDrag.jsx';
import PointManage from './containers/PointManage.js';
import PointCreate from './containers/PointCreate.js';
require('./assets/css/main.scss');
//test drag and drop with react
import DustbinSingleTarget from './Single Target/index.js';

const store = configureStore();
//console.log(store.getState());

const history = syncHistoryWithStore(hashHistory, store);

/*
function showMine(name,age,school){
	console.log('My name is:'+name+', age:'+age+', school:'+school);
};
var args = ['Nicky.Wu',28,'scau'];
showMine(...args);
let state = {
    resultList: [],
    currentPage: 0,
    totalRows: {}
};
let data = {
    resultList: [{new:'new'}],
    currentPage: 2,
    totalRows: {row:'row'}
};
let combile = {
    resultList: [
        ...state.resultList,
        ...data.resultList
    ],
    currentPage: data.currentPage,
    totalRows: data.totalRows
};
console.log(combile);
*/

const App = React.createClass({
	requireAuth(nextState,replace){
		//登录认证
		console.log('requireAuth');
	},
	judgeLogin(nextState,replace){
		//登录判断
		console.log('judgeLogin');
	},
	onRouteChange(newState){
		//页面状态变化
		console.log('newState:');
		console.log(newState);
	},
	render(){
		return(
			<Router history={history}>
				<Route path='/' component={Main}>
					<IndexRoute component={Login} onEnter={this.judgeLogin}/>
					<Route path='/login' component={Login} onEnter={this.judgeLogin} callbackRootRoute={this.onRouteChange}/>
					<Route path='/policymanage' component={PolicyManage} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/policyadd' component={PolicyEdit} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/policyview/:id' component={PolicyEdit} onEnter={this.requireAuth} yui="yes" callbackRootRoute={this.onRouteChange}/>
					<Route path='/policyedit/:id' component={PolicyEdit} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/policycopy/:id' component={PolicyEdit} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/pointchoose' component={PointChoose} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/pointdrag' component={PointDrag} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/pointmanage' component={PointManage} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/cateadd/:type' component={PointCreate} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/cateedit/:id' component={PointCreate} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/pointadd/:type/:parentId' component={PointCreate} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/pointedit/:pointId' component={PointCreate} onEnter={this.requireAuth} callbackRootRoute={this.onRouteChange}/>
					<Route path='/testdrag' component={DustbinSingleTarget}/>
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