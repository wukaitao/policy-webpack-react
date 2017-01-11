import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5';
//声明组件
const Login = React.createClass({
	getDefaultProps(){
		console.log('创建期:Login+getDefaultProps');
	},
	getInitialState(){
		return {
			userName: 'admin3',
			password: md5('5tgbSDFG')
		};
	},
	componentWillMount(){
		console.log('创建期:Login+componentWillMount');
	},
	componentDidMount(){
		this.props.router.setRouteLeaveHook(
			this.props.route,
			this.routerWillLeave
		);
	},
	routerWillLeave(nextLocation){
		//返回false会停留当前页面
		//否则,返回一个字符串,会显示给用户,让其自己决定
		//if(!this.state.isSaved){
			return '内容还没有保存,确定要离开?';
		//};
	},
	login(event){
		event.preventDefault();
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
			<section className="main login-container">
				<div className="login-head">
					<div className="logo"></div>
					<div className="name">
						<h1>POLICY管理系统</h1>
					</div>
				</div>
				<div className="login-main">
					<div className="login-area">
						<div className="login-box">
							<h2 className="title">用户登录</h2>
							<form id="formLogin" method="post" onSubmit={this.login}>
								<div className="form-row">
									<label htmlFor="userName">
										用户名：
									</label>
									<input id="userName" type="text" name="userName" autoComplete="off" maxLength="12" placeholder="请输入用户名" className="textbox-text"/>
								</div>
								<div className="form-row">
									<label htmlFor="password">
										<span style={{letterSpacing: "1em"}}>密</span>码：
									</label>
									<input id="password" type="password" name="password" autoComplete="off" maxLength="20" placeholder="请输入密码" className="textbox-text"/>
								</div>
								<div className="btn-area">
									<button id="btnLogin" className="btn" type="submit">登录</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="login-foot">
					<p>Powered By 招商信诺信息技术中心</p>
				</div>
			</section>
		)
	}
});
//导出组件
export default Login;