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
	getPath(){
		console.log('组件方法:getPath.');
		return true;
	},
	render(){
		console.log('组件渲染:render');
		const loginHtml = this.state.isLogin ? (
			<span className="logined">
				欢迎您:{this.state.userName}
			</span>
		) : (
			<span className="no-login">未登录.</span>
		);
		const path = this.getPath();
		return(
			<header className="head">
				{/*<nav className="nav hide">
					{loginHtml}
					<Link to="/login" activeClassName="current">登录</Link>
					<Link to="/policymanage" activeClassName="current">保单管理</Link>
					<Link to="/policyadd" activeClassName="current">新建保单</Link>
					<Link to="/policyview/12" activeClassName="current">查看保单</Link>
					<Link to="/policyedit/2" activeClassName="current">编辑保单</Link>
					<Link to="/policycopy/3" activeClassName="current">复制保单</Link>
					<Link to="/pointchoose" activeClassName="current">挑选节点</Link>
					<Link to="/pointdrag" activeClassName="current">节点排序</Link>
					<Link to="/pointmanage" activeClassName="current">节点管理</Link>
					<Link to="/cateadd/2" activeClassName="current">新建分类</Link>
					<Link to="/cateedit/185" activeClassName="current">编辑分类</Link>
					<Link to="/pointadd/2/185" activeClassName="current">新建节点</Link>
					<Link to="/pointedit/155" activeClassName="current">编辑节点</Link>
				</nav>*/}
				<nav className="nav">
					<div className="title">POLICY管理系统</div>
					<div className="welcome">
						欢迎您，<strong>{this.state.userName}</strong> | <span className="logout">退出</span>
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
