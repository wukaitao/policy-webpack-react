import React from 'react';
import {Link} from 'react-router';
import Nav from '../containers/Nav.js';
import Popup from '../containers/Popup.js';
//声明组件
const Main = React.createClass({
	getInitialState(){
		return {
			isLogin: true,
			userName: 'Nicky.Wu'
		};
	},
	render(){
		const path = this.props.routes[1].path;
		let test = {flag:'true'};
		return(
			<div className="wrap">
				<Nav path={path} test={test}/>
				{this.props.children}
				<Popup/>
			</div>
		)
	}
});
//导出组件
export default Main;
