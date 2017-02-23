import React from 'react';
import ReactDom from 'react-dom';
import {Router,Route,IndexRoute,Redirect,hashHistory,IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';
import Main from './components/Main.jsx';
import Login from './containers/Login.js';
import PolicyManage from './containers/PolicyManage.js';
import PolicyEdit from './containers/PolicyEdit.js';
import PointChoose from './containers/PointChoose.js';
import PointDrag from './containers/PointDrag.js';
import PointManage from './containers/PointManage.js';
import PointEdit from './containers/PointEdit.js';
import NotFound from './components/NotFound.jsx';
require('./assets/css/main.scss');

const store = configureStore();

const App = React.createClass({
	requireAuth(nextState,replace,next){
		//刷新跳转/登录认证
		const path = nextState.location.pathname;
		const isRefreshPolicyPointPath = ['pointchoose','pointdrag'].indexOf(path.split('/')[1])!=-1&&!store.getState().policyDetail.benefitList;
		const isRefreshPointEditPath = ['cateadd','cateedit','pointadd','pointedit'].indexOf(path.split('/')[1])!=-1&&!store.getState().pointList.length;
		const isLogin = store.getState().pageStatus.isLogin;
		if(isRefreshPolicyPointPath){
			replace('/policymanage');
			next();
		}else if(isRefreshPointEditPath){
			replace('/pointmanage');
			next();
		}else if(!isLogin){
			replace('/login');
			next();
		}else next();
	},
	judgeLogin(nextState,replace,next){
		//登录判断
		const isLogin = store.getState().pageStatus.isLogin;
		if(!isLogin) next();
		else{
			replace('/policymanage');
			next();
		};
	},
	render(){
		return(
			<Router history={hashHistory}>
				<Route path='/' component={Main}>
					<IndexRoute component={Login} onEnter={this.judgeLogin}/>
					<Route path='/login' component={Login} onEnter={this.judgeLogin}/>
					<Route path='/policymanage' component={PolicyManage} onEnter={this.requireAuth}/>
					<Route path='/policyadd' component={PolicyEdit} onEnter={this.requireAuth}/>
					<Route path='/policyview/:id' component={PolicyEdit} onEnter={this.requireAuth}/>
					<Route path='/policyedit/:id' component={PolicyEdit} onEnter={this.requireAuth}/>
					<Route path='/policycopy/:id' component={PolicyEdit} onEnter={this.requireAuth}/>
					<Route path='/pointchoose' component={PointChoose} onEnter={this.requireAuth}/>
					<Route path='/pointdrag' component={PointDrag} onEnter={this.requireAuth}/>
					<Route path='/pointmanage' component={PointManage} onEnter={this.requireAuth}/>
					<Route path='/cateadd/:type' component={PointEdit} onEnter={this.requireAuth}/>
					<Route path='/cateedit/:type/:id' component={PointEdit} onEnter={this.requireAuth}/>
					<Route path='/pointadd/:type/:parentId' component={PointEdit} onEnter={this.requireAuth}/>
					<Route path='/pointedit/:pointId' component={PointEdit} onEnter={this.requireAuth}/>" +
					<Route path='/404' component={NotFound}/>
					<Redirect from='*' to='/404'/>
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