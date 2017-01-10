import React from 'react';
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
			<div className="nav">
				{loginHtml}
				<div><span className="icon-monitor"></span></div>
			</div>
		)
	}
});
//导出组件
export default Nav;
