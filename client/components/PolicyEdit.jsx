import React,{PropTypes} from 'react';
import {Link} from 'react-router';
//声明组件
const PolicyEdit = React.createClass({
	propTypes: {
		//组件的props安全
	},
	getInitialState(){
		console.log('PolicyEdit+getInitialState');
		return {};
	},
	componentDidMount(){
		//this.props.router.setRouteLeaveHook(
		//	this.props.route,
		//	this.routerWillLeave
		//);
	},
	routerWillLeave(nextLocation){
		//返回false会停留当前页面
		//否则,返回一个字符串,会显示给用户,让其自己决定
		//if(!this.state.isSaved){
			return '内容还没有保存,确定要离开?';
		//};
	},
	render(){
		return (
			<section className="main">
				PolicyEdit.
			</section>
		)
	}
});

//导出组件
export default PolicyEdit;