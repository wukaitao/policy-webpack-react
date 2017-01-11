import React,{PropTypes} from 'react';
import {Link} from 'react-router';
//声明组件
const PointManage = React.createClass({
	propTypes: {
		//组件的props安全
	},
	getDefaultProps(){
		console.log('创建期:PointManage+getDefaultProps');
	},
	getInitialState(){
		console.log('创建期:PointManage+getInitialState');
		return {};
	},
	render(){
		return (
			<section className="main">
				PointManage.
			</section>
		)
	}
});

//导出组件
export default PointManage;