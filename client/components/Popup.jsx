import React,{PropTypes} from 'react';
//声明组件
const Popup = React.createClass({
	propTypes: {
		//组件的props安全
	},
	render(){
		return false;
		return (
			<div className="popup">
				Popup.
				{this.props.children}
			</div>
		)
	}
});

//导出组件
export default Popup;