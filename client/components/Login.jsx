import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5';
//声明组件
const Login = React.createClass({
	getInitialState(){
		return {
			userName: 'admin3',
			password: md5('5tgbSDFG')
		};
	},
	login(){
		const param = {
			userName: this.state.userName,
			password: this.state.password
		};
		fetch('/hmc_ghb_server/tob/tobLogin',{
			method: 'post',
			body: JSON.stringify(param)
		}).then(response=>response.text())
		.then(data=>{
			console.log('登录成功!');
			console.log(data);
		}).catch(err=>{
			console.log('登录失败!');
		});
	},
	render(){
		return(
			<div>
				This is Login.
				<Link to="/login" activeClassName="current">Login</Link>
				<Link to="/policymanage" activeClassName="current">PolicyManage</Link>
				<button onClick={this.login}>登录</button>
			</div>
		)
	}
});
//导出组件
export default Login;