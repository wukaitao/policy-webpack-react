import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5';
//声明组件
const Login = React.createClass({
	componentDidUpdate(){
		//监听props和state变化
		if(this.props.loginData.statusCode==0){
			//请求成功
			console.log('登录成功.');
			this.props.router.replace('/policymanage');
		}
	},
	login(event){
		event.preventDefault();
		//前端校验
		const userNameReg = /^[a-zA-Z\d]\w{3,11}[a-zA-Z\d]$/;
		const passwordReg = /^(\w){6,20}$/;
		this.refs.userName.value = this.refs.userName.value.replace(/^\s+|\s+$/g,'');
		this.refs.password.value = this.refs.password.value.replace(/^\s+|\s+$/g,'')
		if(!userNameReg.test(this.refs.userName.value)){
			console.log('用户名必须是以数字或字母开头，4-12位字符');
			return;
		}else if(!passwordReg.test(this.refs.password.value)){
			console.log('密码必须是6-20位字母、数字、下划线');
			return;
		};
		//后端校验(模拟)admin3 5tgbSDFG
		if(this.refs.userName.value!='admin'||this.refs.password.value!='123456'){
			console.log('账号不存在或者密码错误');
			return;
		};
		const param = {
			userName: this.refs.userName.value,
			password: md5(this.refs.password.value)
		};
		this.props.login(param);
		/*
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
		*/
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
									<input id="userName" type="text" ref="userName" autoComplete="off" maxLength="12" placeholder="请输入用户名" className="textbox-text"/>
								</div>
								<div className="form-row">
									<label htmlFor="password">
										<span style={{letterSpacing: "1em"}}>密</span>码：
									</label>
									<input id="password" type="password" ref="password" autoComplete="off" maxLength="20" placeholder="请输入密码" className="textbox-text"/>
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