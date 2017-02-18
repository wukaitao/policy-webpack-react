import React from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const Nav = React.createClass({
	logout(){
		//退出
		const self = this;
		self.props.popup.dialogOpen({
			type: 'confirm',
			message: '请确认是否退出系统',
			callback: function(){
				self.props.page.logout(function(){
					self.props.popup.dialogOpen({
						type: 'toast',
						icon: 'icon-circle-check',
						message: '退出成功',
						callback: function(){
							hashHistory.push('/login');
						}
					});
				});
			}
		});
	},
	initPagePath(){
		return {
			pagePath: this.props.path,
			loginPath: ['','/','/login'],
			policyManagePath: ['/policymanage','/policyview/:id','/404'],
			policyEditPath: ['/policyadd','/policyedit/:id','/policycopy/:id'],
			policyPointPath: ['/pointchoose','/pointdrag'],
			pointManagePath: ['/pointmanage'],
			pointEditPath: ['/cateadd/:type','/cateedit/:type/:id','/pointadd/:type/:parentId','/pointedit/:pointId']
		};
	},
	isLoginPath(){
		//登录页面
        const pagePath = this.initPagePath().pagePath;
		return this.initPagePath().loginPath.indexOf(pagePath)!=-1;
	},
  	isPolicyPath: function(){
  		//保单页面
        const pagePath = this.initPagePath().pagePath;
  		return this.initPagePath().policyManagePath.indexOf(pagePath)!=-1||this.isPolicyEditPath()||this.isPolicyPointPath();
  	},
  	isPolicyEditPath: function(){
  		//保单编辑页面
        const pagePath = this.initPagePath().pagePath;
        return this.initPagePath().policyEditPath.indexOf(pagePath)!=-1;
  	},
  	isPolicyPointPath: function(){
  		//保单节点操作页面
        const pagePath = this.initPagePath().pagePath;
        return this.initPagePath().policyPointPath.indexOf(pagePath)!=-1;
  	},
  	isPointPath: function(){
  		//节点页面
        const pagePath = this.initPagePath().pagePath;
        return this.initPagePath().pointManagePath.indexOf(pagePath)!=-1||this.isPointEditPath();
  	},
  	isPointEditPath: function(){
  		//节点编辑页面
        const pagePath = this.initPagePath().pagePath;
        return this.initPagePath().pointEditPath.indexOf(pagePath)!=-1;
  	},
	render(){
		const data = this.props.pageStatus;
		const classSet = addons.classSet;
		const tabPolicyClass = classSet({
			'current': this.isPolicyPath()
		});
		const tabPointClass = classSet({
			'current': this.isPointPath()
		});
		if(this.isLoginPath()){return false};
		return(
			<header className="head">
				<nav className="nav">
					<div className="title">POLICY管理系统</div>
					<div className="welcome">
						欢迎您，<strong>{data.userName}</strong>
						|
						<span onClick={this.logout} className="logout">退出</span>
					</div>
					<div className="menu">
						<Link to="/policymanage" className={tabPolicyClass}>保单管理</Link>
						<span className="br">｜</span>
						<Link to="/pointmanage" className={tabPointClass}>节点管理</Link>
					</div>
				</nav>
			</header>
		)
	}
});
//导出组件
export default Nav;