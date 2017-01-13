import React from 'react';
import {Link} from 'react-router';
import Nav from '../containers/Nav.js';
import Popup from '../components/Popup.jsx';
//声明组件
const Main = React.createClass({
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
			<div className="wrap">
				<Nav/>
				{this.props.children}
				<Popup/>
			</div>
		)
	}
});
//导出组件
export default Main;
