import React from 'react';
import {Link} from 'react-router';
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
		console.log('存在期:componentDidUpdate');
	},
	componentWillUnmount(){
		console.log('销毁期:componentWillUnmount');
	},
	logout(){
		this.props.logout();
	},
	render(){
		console.log('组件渲染:render');
		const isLoginPage = window.location.hash=='#/login'||window.location.hash=='#/';
		if(isLoginPage){return false};
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
