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