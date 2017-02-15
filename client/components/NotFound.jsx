import React,{PropTypes} from 'react';
import addons from 'react-addons';
//声明组件
const NotFound = React.createClass({
	render(){
		return (
			<section className="main">
				页面不存在.
			</section>
		)
	}
});

//导出组件
export default NotFound;