import React from 'react';
import {Link,hashHistory} from 'react-router';
//声明组件
const Nav = React.createClass({
	getDefaultProps(){
		console.log('创建期:getDefaultProps');
	},
	getInitialState(){
		console.log('创建期:getInitialState');
		return {
			isLogin: true,
			userName: 'Nicky.Wu'
		};
	},
	componentWillMount(){
		console.log('创建期:componentWillMount');
	},
	componentDidMount(){
		console.log('创建期:componentDidMount');
	},
	componentWillReceiveProps(){
		console.log('存在期:componentDidMount');
	},
	shouldComponentUpdate(){
		console.log('存在期:shouldComponentUpdate');
		return true;
	},
	componentWillUpdate(){
		console.log('存在期:componentWillUpdate');
	},
	componentDidUpdate(){
		//监听props和state变化
		if(!this.isLoginPage()&&this.props.logoutData.statusCode==0){
			//请求成功
			console.log('退出成功.');
			//hashHistory.push('/login');
		};
	},
	componentWillUnmount(){
		console.log('销毁期:componentWillUnmount');
	},
	logout(){
		this.props.logout();
	},
	isLoginPage(){
		return !this.props.path||this.props.path=='/'||this.props.path=='/login';
	},
	render(){
		console.log('组件渲染:render');
		if(this.isLoginPage()){return false};
		return(
			<header className="head">
				<nav className="nav">
					<div className="title">POLICY管理系统</div>
					<div className="welcome">
						欢迎您，<strong>{this.state.userName}</strong> | <span onClick={this.logout} className="logout">退出</span>
					</div>
					<div className="menu">
						<Link to="/policymanage" activeClassName="current">保单管理</Link>
						<span className="br">｜</span>
						<Link to="/pointmanage" activeClassName="current">节点管理</Link>
					</div>
				</nav>
			</header>
		)
	}
});
//导出组件
export default Nav;
