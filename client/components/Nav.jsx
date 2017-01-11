import React from 'react';
import {Link} from 'react-router';
//声明组件
const Nav = React.createClass({
	getInitialState(){
		return {
			isLogin: true,
			userName: 'Nicky.Wu'
		};
	},
	render(){
		const loginHtml = this.state.isLogin ? (
			<div className="logined">
				欢迎您:{this.state.userName}
			</div>
		) : (
			<div className="no-login">未登录.</div>
		);
		return(
			<header className="head">
				{loginHtml}
				<div><span className="icon-monitor"></span></div>
				<Link to="/login" activeClassName="current">登录</Link>
				<nav className="nav">
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
				</nav>
			</header>
		)
	}
});
//导出组件
export default Nav;
