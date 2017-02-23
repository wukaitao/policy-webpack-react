import React from 'react';
import {Link,hashHistory} from 'react-router';
//声明组件
const NotFound = React.createClass({
	getInitialState(){
		return {
			second: 5
		};
	},
	componentDidMount(){
		const self = this;
		const timer = setInterval(function(){
			self.setState({
				second: self.state.second-1
			});
			if(!self.state.second){
				clearInterval(timer);
				hashHistory.push('/policymanage');
			};
		},1000);
	},
	backHandler(){
		window.history.back();
	},
	render(){
		return (
			<section className="main notfound">
				<div className="notfound-container">
					<div className="title">
						<i className="icon-sad"></i>
						页面不存在.
					</div>
					<div className="content">
						<span className="second">{this.state.second}</span>
						秒后将会跳转到保单管理首页
					</div>
					<div className="btn-area">
						<button className="btn" onClick={this.backHandler}>返回</button>
						<Link to="/policymanage" className="btn btn-primary">保单管理</Link>
					</div>
				</div>
			</section>
		)
	}
});

//导出组件
export default NotFound;