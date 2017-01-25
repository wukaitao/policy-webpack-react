import React from 'react';
import {Link,hashHistory} from 'react-router';
//声明组件
const Nav = React.createClass({
	getDefaultProps(){
		//console.log('创建期:getDefaultProps');
	},
	getInitialState(){
		//console.log('创建期:getInitialState');
		return {
			isLogin: !this.isLoginPage()
		};
	},
	componentWillMount(){
		//console.log('创建期:componentWillMount');
	},
	componentDidMount(){
		//console.log('创建期:componentDidMount');
	},
	componentWillReceiveProps(nextProps){
		//监听props和state变化
		if(!nextProps.pageStatus.isLogin&&this.state.isLogin){
			this.setState({
				isLogin: false
			});
			this.props.popup.dialogOpen({
				type: 'toast',
				icon: 'icon-circle-check',
				message: '退出成功',
				callback: function(){
					hashHistory.push('/login');
				}
			});
		};
	},
	shouldComponentUpdate(){
		//console.log('存在期:shouldComponentUpdate');
		return true;
	},
	componentWillUpdate(){
		//console.log('存在期:componentWillUpdate');
	},
	componentDidUpdate(){
	},
	componentWillUnmount(){
		//console.log('销毁期:componentWillUnmount');
	},
	logout(){
		this.props.page.logout();
	},
	isLoginPage(){
		return !this.props.path||this.props.path=='/'||this.props.path=='/login';
	},
	render(){
		console.log('组件渲染:render');
		const data = this.props.pageStatus;
		if(this.isLoginPage()){return false};
		return(
			<header className="head">
				<nav className="nav">
					<div className="title">POLICY管理系统</div>
					<div className="welcome">
						欢迎您，<strong>{data.userName}</strong> | 
						<span onClick={this.logout} className="logout">退出</span>
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
