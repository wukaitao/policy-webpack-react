import React from 'react';
import {Link} from 'react-router';
import Nav from '../containers/Nav.js';
import Popup from '../containers/Popup.js';
//声明组件
const Main = React.createClass({
	render(){
		const path = this.props.routes[1].path;
		return(
			<div className="wrap">
				<Nav path={path}/>
				{this.props.children}
				<Popup/>
			</div>
		)
	}
});
//导出组件
export default Main;