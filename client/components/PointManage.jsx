import React,{PropTypes} from 'react';
import {Link} from 'react-router';
//声明组件
const PointManage = React.createClass({
	componentWillMount(){
		//默认加载列表
		this.getAllPoint();
	},
	getAllPoint(){
		this.props.queryAllPoint();
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